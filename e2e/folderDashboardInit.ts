import { createDashboard, createFolder, getCurrentOrg, getDashboard, updateDashboard } from './grafana-api';
import { getHostInfo, getGoogleSheetInfo } from './config.info';
import credentials from '../playwright/.auth/credentials.json';
import e2eConfig from './e2e.config.json';
import mockPanelImport from './mock.panel.json';
import { ITargets } from './interfaces/Targets.interface';
import { INetworkPanelParams } from './interfaces/PanelParams.interface';
import { IDashboardResponse, INetworkMapPanel, IOrganization, IPanel } from './plugin-def';

let targetFolderUid;
let targetDashboardUid;
const { targetFolder, targetDashboard: targetDashboardTitle, targetPanelType } = e2eConfig;
const mockPanel: INetworkMapPanel = mockPanelImport as INetworkMapPanel;

const pluginTestSetupFnName = 'folder-dashboard.setup.getFolderDashboardTargets';

/**
 * This creates and populates the folder for the Network Map Panel
 *
 * @param {INetworkPanelParams|undefined} params       Optional. Allow setting either a topology and data source or both.
 *
 * @returns {Promise<ITargets>}
 */
export const getFolderDashboardTargets = async (params?: INetworkPanelParams): Promise<ITargets> => {
  const { basicAuthHeader, protocolHostPort } = await getHostInfo(credentials);
  const fnName = 'folderDashboardInit.getFolderDashboardTargets';

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

  // get ref to panels in dashboard
  let currentPanels: INetworkMapPanel[] = [];
  let targetPanel = dashboardInfo?.dashboard?.panels?.find(panel => panel.type === targetPanelType);
  if (!targetPanel) {
    // add panel to dashboard
    if (dashboardInfo.dashboard?.panels) {
      currentPanels = dashboardInfo.dashboard?.panels as INetworkMapPanel[];
    }
    let panelCount = currentPanels.length;
    currentPanels.push({
      ...mockPanel,
      datasource: {
        ...mockPanel.datasource,
        uid: `${params?.uid}`
      },
    });
    targetPanel = currentPanels[panelCount];
  }
  const targetPanelId = targetPanel!.id as number;

  // get org id
  const currentOrg: IOrganization = await getCurrentOrg();
  let orgId = undefined;
  if (!!currentOrg) {
    orgId = currentOrg.id;
  }

  // update dashboard values data structure w/ topology and traffic flow data if specified into panel
  if (params) {
    // topology
    if (params.topology) {
      const { panels } = dashboardInfo.dashboard || {panels: currentPanels};
      const updatedPanels: INetworkMapPanel[] = [];
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
        updatedPanels.push(panel as INetworkMapPanel);
      }
      dashboardInfo.dashboard = {
        ...dashboardInfo.dashboard,
        panels: updatedPanels,
      };
    }
  }

  // invoke API update
  try {
    const updateResult = await updateDashboard(targetFolderUid, dashboardInfo);
    console.log(`[${fnName}] Dashboard update result:\n`, JSON.stringify(updateResult, null, 2));
  } catch (e) {
    console.log(`[${fnName}] Dashboard update error:\n`, e.message);
  }

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
