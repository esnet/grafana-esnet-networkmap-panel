import { createDashboard, createFolder, getCurrentOrg, getDashboard, updateDashboard } from './grafana-api';
import { getHostInfo, getGoogleSheetInfo } from './config.info';
import credentials from '../playwright/.auth/credentials.json';
import e2eConfig from './e2e.config.json';
import mockPanelImport from './mock.panel.json';
import { ITargets } from './interfaces/Targets.interface';
import { IDataSource } from './interfaces/DataSource.interface';
import { INetworkPanelParams } from './interfaces/PanelParams.interface';
import { IDashboardResponse, INetworkMapPanel, IOrganization, IPanel } from './plugin-def';

let targetFolderUid;
let targetDashboardUid;
const { targetFolder, targetDashboard: targetDashboardTitle, fileId, topologySheetUrl, targetPanelType } = e2eConfig;
const mockPanel: IPanel = mockPanelImport as IPanel;
const DEFAULT_DATASOURCE_NAME = "network-traffic-flow";

const pluginTestSetupFnName = 'folder-dashboard.setup.getFolderDashboardTargets';

export const initCSVDatasource = async (): Promise<{ dataSource: IDataSource, topologyUrl: string}> => {
  const fnName = "folderDashboardInit.initCSVDatasource";
  const { basicAuthHeader, protocolHostPort } = await getHostInfo(credentials);
  const dataFlowUrl = getGoogleSheetInfo(fileId);

  let resultDataSource;
  try {
    const jsonHeaders = {
      "Accept": "application/json",
      "Content-Type": "application/json"
    };

    // check if datasource exists already
    const dataSrcCheckResponse: Response = await fetch(`${protocolHostPort}/api/datasources/name/${DEFAULT_DATASOURCE_NAME}`, {
      headers: {
        ...basicAuthHeader,
        ...jsonHeaders
      },
      redirect: "follow"
    });

    if (dataSrcCheckResponse.ok) {
      // if so, return info
      resultDataSource  = await dataSrcCheckResponse.json();
    } else if (!dataSrcCheckResponse.ok && dataSrcCheckResponse.status === 404) {
      // if not, create
      const dataSrcCreateResponse: Response = await fetch(`${protocolHostPort}/api/datasources`, {
        method: "POST",
        headers: {
          ...basicAuthHeader,
          ...jsonHeaders
        },
        redirect: 'follow',
        body: JSON.stringify({
          "name": DEFAULT_DATASOURCE_NAME,
          "type": "marcusolsson-csv-datasource",
          "url": dataFlowUrl,
          "access": "proxy"
        })
      });
      const jsonResponse = await dataSrcCreateResponse.json();
      resultDataSource = jsonResponse.datasource;
    } else if (!dataSrcCheckResponse.ok) {
      throw new Error(`HTTP Response ${dataSrcCheckResponse.status}: ${dataSrcCheckResponse.statusText}`);
    }
  } catch (e) {
    console.error(`[${fnName}: Error ${e.message}`);
  }

  return {
    dataSource: resultDataSource,
    topologyUrl: topologySheetUrl
  };
}

/**
 * This creates and populates the folder for the Network Map Panel
 *
 * @param {INetworkPanelParams|undefined} params       Optional. Allow setting either a topology and data source or both.
 *
 * @returns {Promise<ITargets>}
 */
export const getFolderDashboardTargets = async (params?: INetworkPanelParams): Promise<ITargets> => {
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
  const dashboardSearchResponse: Response = await fetch(`${protocolHostPort}/api/search?folderIds=${folderId}&type=dash-db&query=${targetDashboardTitle}`, {
    headers: basicAuthHeader
  });
  const dashboardSearchResponseJson = await dashboardSearchResponse.json();
  let dashboardJsonStr;
  targetDashboardUid = 'pending';
  if (dashboardSearchResponseJson.length === 0) {
    const targetDashboardJsonStr = await createDashboard(targetFolderUid, {
      title: targetDashboardTitle
    });
    // store targetDashboardUid for later
    const targetDashboard = JSON.parse(targetDashboardJsonStr);
    targetDashboardUid = targetDashboard.uid;
    dashboardJsonStr = await getDashboard(targetDashboardUid);
  } else if (dashboardSearchResponseJson.length === 1) {
    const targetIdx = 0;
    targetDashboardUid = dashboardSearchResponseJson[targetIdx].uid;
    dashboardJsonStr = await getDashboard(targetDashboardUid);
  } else if (targetDashboardUid !== 'pending') {
    throw new Error(`${pluginTestSetupFnName}: cannot resolve targetDashboard, multiple dashboards matched on dashboard search.`);
  }

  // get the created or fetched dashboard

  let dashboardInfo: IDashboardResponse = JSON.parse(dashboardJsonStr);

  // add panel

  let currentPanels: IPanel[] = [];
  let targetPanel = dashboardInfo?.dashboard?.panels?.find(panel => panel.type === targetPanelType);
  if (!targetPanel) {
    // add panel to dashboard
    if (dashboardInfo.dashboard?.panels) {
      currentPanels = dashboardInfo.dashboard?.panels;
    }
    let panelCount = currentPanels.length;
    currentPanels.push(mockPanel);
    targetPanel = currentPanels[panelCount];
  }
  const targetPanelId = targetPanel!.id as number;

  // get org id
  const currentOrg: IOrganization = await getCurrentOrg();
  let orgId = undefined;
  if (!!currentOrg) {
    orgId = currentOrg.id;
  }

  // set topology and traffic flow data if specified
  if (params) {
    // topology
    if (params.topology) {
      const { panels } = dashboardInfo.dashboard || {panels: currentPanels};
      const updatedPanels: IPanel[] = [];
      for (const panel of panels) {
        if (panel.type === "esnet-networkmap-panel") {
          let { options, datasource } = panel as INetworkMapPanel;
          // assigns the topology
          options.layers[0].mapjson = JSON.stringify(params.topology);
          // traffic flow data from a data source
          if (params.uid) {
            datasource = {
              type: "marcusolsson-csv-datasource",
              uid: params.uid
            }
          }
        }
        updatedPanels.push(panel);
      }
      dashboardInfo.dashboard = {
        ...dashboardInfo.dashboard,
        panels: updatedPanels,
      };
    }
  }

  await updateDashboard(targetFolderUid, dashboardInfo);

  const targetsFixtureObj = {
    targetDashboardUid,
    targetFolderUid,
    targetPanelId,
    targetFolder,
    targetDashboard: dashboardInfo.dashboard,
    targetPanel,
    orgId
  };
  return targetsFixtureObj;
};
