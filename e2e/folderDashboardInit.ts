import { createDashboard, createFolder, getCurrentUser, getDashboard, updateDashboard } from './grafana-api';
import { getHostInfo, getGoogleSheetInfo } from './config.info';
import credentials from '../playwright/.auth/credentials.json';
import e2eConfig from './e2e.config.json';
import { ITargets } from './interfaces/Targets.interface';
import { IPanel } from './interfaces/Panel.inteface';
import { IDataSource } from './interfaces/DataSource.interface';
import { ITopology } from './interfaces/Topology.interface';

let targetFolderUid;
let targetDashboardUid;
const { targetFolder, targetDashboard, fileId } = e2eConfig;

const pluginTestSetupFnName = 'folder-dashboard.setup.getFolderDashboardTargets';

export const initCSVDatasource = async (): Promise<IDataSource> => {
  const fnName = "folderDashboardInit.initCSVDatasource";
  const { basicAuthHeader, protocolHostPort } = await getHostInfo(credentials);
  const sheetInfo = getGoogleSheetInfo(fileId);
  let dataFlowUrl: string;
  if (typeof(sheetInfo) === 'string') {
    dataFlowUrl = sheetInfo as string;
  } else {
    dataFlowUrl = sheetInfo.flowsUrl;
  }

  let jsonResponse;
  try {
    const dataSrcCreateResponse: Response = await fetch(`${protocolHostPort}/api/datasources`, {
      method: "POST",
      headers: {
        ...basicAuthHeader,
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        "name": "network-traffic-flow",
        "type": "marcusolsson-csv-datasource",
        "url": dataFlowUrl,
        "access": "",
        "basicAuth": false,
      })
    });
    jsonResponse = await dataSrcCreateResponse.json();
  } catch (e) {
    console.error(`[${fnName}: Error ${e.message}`);
    console.error(`[${fnName}: init data source response:\n${JSON.stringify(jsonResponse, null, 2)}`);
  }

  return jsonResponse.datasource;
}

/**
 * This creates and populates the folder for the Network Map Panel
 * @returns
 */
export const getFolderDashboardTargets = async (topology?: ITopology): Promise<ITargets> => {
  const { basicAuthHeader, protocolHostPort } = await getHostInfo(credentials);

  // check if folder exists already, if not, create it
  const foldersResponse: Response = await fetch(`${protocolHostPort}/api/folders?limit=1000`, {
    headers: basicAuthHeader
  });
  const foldersJsonResponse = await foldersResponse.json();
  const matchedFolder = foldersJsonResponse.find(r => r.title === targetFolder);
  let folderId;
  if (!matchedFolder) {
    const result = await createFolder("network-map-test-folder");
    targetFolderUid = result.uid;
    folderId = result.id;
  } else {
    targetFolderUid = matchedFolder.uid;
    folderId = matchedFolder.id;
  }

  // check if dashboard exists already, if not create it
  const dashboardSearchResponse: Response = await fetch(`${protocolHostPort}/api/search?folderIds=${folderId}&type=dash-db&query=${targetDashboard}`, {
    headers: basicAuthHeader
  });
  const dashboardSearchResponseJson = await dashboardSearchResponse.json();
  let dashboardJsonStr;
  targetDashboardUid = 'pending';
  if (dashboardSearchResponseJson.length === 0) {
    const targetDashboardJsonStr = await createDashboard(targetFolderUid, targetDashboard);  // store targetDashboardId for later
    const createdDashboard = JSON.parse(targetDashboardJsonStr);
    targetDashboardUid = createdDashboard.uid;
    dashboardJsonStr = await getDashboard(createdDashboard.uid);
  } else if (dashboardSearchResponseJson.length === 1) {
    const targetIdx = 0;
    targetDashboardUid = dashboardSearchResponseJson[targetIdx].uid;
    dashboardJsonStr = await getDashboard(targetDashboardUid);
  } else if (targetDashboardUid !== 'pending') {
    throw new Error(`${pluginTestSetupFnName}: cannot resolve targetDashboard, multiple dashboards matched on dashboard search.`);
  }

  let dashboardInfo = JSON.parse(dashboardJsonStr);
  // get target panel
  const targetPanel = (dashboardInfo.dashboard.panels as Array<IPanel>).find(panel => panel.type === e2eConfig.targetPanelType);
  if (!targetPanel) {
    throw new Error(`${pluginTestSetupFnName}: cannot resolve targetPanel, none matching '${e2eConfig.targetPanelType}' found.`);
  }
  const targetPanelId = targetPanel.id as number;

  // get org id
  const currentUserResponseJsonStr = await getCurrentUser();
  let orgId = undefined;
  if (!!currentUserResponseJsonStr) {
    orgId = JSON.parse(currentUserResponseJsonStr).orgId;
  }

  // set topology if specified
  if (topology) {
    dashboardInfo = {
      ...dashboardInfo,
      panels: {
        ...dashboardInfo.panels,
        options: {
          ...dashboardInfo.options,
          layers: [
            {
              ...dashboardInfo.options.layers[0],
              mapjson: JSON.stringify(topology),
            },
          ]
        }
      }
    };
    await updateDashboard(targetFolderUid, dashboardInfo);
  }

  const targetsFixtureObj = {
    targetDashboardUid,
    targetFolderUid,
    targetPanelId,
    targetFolder,
    targetDashboard,
    targetPanel,
    orgId
  };
  return targetsFixtureObj;
};
