import { createDashboard, createFolder, getCurrentUser, getDashboard } from './grafana-api';
import { getHostInfo } from './config.info';
import credentials from '../playwright/.auth/credentials.json';
import e2eConfig from './e2e.config.json';
import { ITargets } from './interfaces/Targets.interface';
import { IPanel } from './interfaces/Panel.inteface';

let targetFolderUid;
let targetDashboardUid;
const { targetFolder, targetDashboard } = e2eConfig;

const pluginTestSetupFnName = 'folder-dashboard.setup.getFolderDashboardTargets';

export const getFolderDashboardTargets = async (): Promise<ITargets> => {
  const { basicAuthHeader, protocolHostPort } = getHostInfo(credentials);

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
  if (dashboardSearchResponseJson.length === 0) {
    targetDashboardUid = 'pending';
    const targetDashboardJsonStr = await createDashboard(targetFolderUid, targetDashboard);  // store targetDashboardId for later
    const createdDashboard = JSON.parse(targetDashboardJsonStr);
    dashboardJsonStr = await getDashboard(createdDashboard.uid);
  } else if (dashboardSearchResponseJson.length === 1) {
    const targetIdx = 0;
    targetDashboardUid = dashboardSearchResponseJson[targetIdx].uid;
    dashboardJsonStr = await getDashboard(targetDashboardUid);
  } else if (targetDashboardUid !== 'pending') {
    throw new Error(`${pluginTestSetupFnName}: cannot resolve targetDashboard, multiple dashboards matched on dashboard search.`);
  }

  const dashboardInfo = JSON.parse(dashboardJsonStr);
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
