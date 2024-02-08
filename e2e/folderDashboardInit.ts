import { createDashboard, createFolder, getDashboard } from './grafana-api';
import { getHostInfo } from './config.info';
import credentials from '../playwright/.auth/credentials.json';
import e2eConfig from './e2e.config.json';
import { ITargets } from './interfaces/Targets.interface';
import { IPanel } from './interfaces/Panel.inteface';

let targetFolderUid;
let targetDashboardUid;
const { targetFolder, targetDashboard, targetPanel } = e2eConfig;

const pluginTestSetupFnName = 'folder-dashboard.setup.getFolderDashboardTargets';

export const getFolderDashboardTargets = async (): Promise<ITargets> => {
  const { basicAuthHeader, protocolHostPort } = getHostInfo(credentials);

  // check if folder exists already, if not, create it
  const foldersResponse: Response = await fetch(`${protocolHostPort}/api/folders?limit=1000`, {
    headers: basicAuthHeader
  });
  const foldersJsonResponse = await foldersResponse.json();
  console.log(`folderDashboardInit.getFolderDashboardTargets: ${JSON.stringify(foldersJsonResponse, null, 2)}`);
  const matchedFolder = foldersJsonResponse.find(r => r.title === targetFolder);
  let folderId;
  if (!matchedFolder) {
    console.log(`${pluginTestSetupFnName}: No folder "${targetFolder}" found, creating new one...`);
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
  console.log(`${pluginTestSetupFnName}: fetch dashboard "${targetDashboard}" response`);
  console.log(JSON.stringify(dashboardSearchResponseJson, null, 2));
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
  console.log(`${pluginTestSetupFnName}: dashboardInfo for uid ${targetDashboardUid}:`);
  console.log(JSON.stringify(dashboardInfo, null, 2));
  const targetPanel = (dashboardInfo.dashboard.panels as Array<IPanel>).find(panel => panel.type === 'esnet-networkmap-panel');
  if (!targetPanel) {
    throw new Error(`${pluginTestSetupFnName}: cannot resolve targetPanel, none matching 'esnet-networkmap-panel' found.`);
  }
  const targetPanelId = targetPanel.id as number;


  const targetsFixtureObj = {
    targetDashboardUid,
    targetFolderUid,
    targetPanelId,
    targetFolder,
    targetDashboard,
    targetPanel,
  };
  console.log(`${pluginTestSetupFnName}: targetsFixtureObj:\n${JSON.stringify(targetsFixtureObj, null, 2)}`);
  return targetsFixtureObj;
};
