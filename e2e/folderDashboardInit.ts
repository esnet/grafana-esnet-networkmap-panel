import { createDashboard, createFolder, getCurrentOrg, getDashboard, updateDashboard } from './grafana-api';
import { getHostInfo } from './config.info';
import credentials from '../playwright/.auth/credentials.json';
import e2eConfig from './e2e.config.json';
import mockPanelImport from './mock.panel.json';
import { ITargets } from './interfaces/Targets.interface';
import { INetworkPanelParams } from './interfaces/PanelParams.interface';
import { IDashboardResponse, INetworkMapPanel, IOrganization, IPanel, ITarget } from './plugin-def';

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

    // configure query
    const targetDashboard = JSON.parse(targetDashboardJsonStr);

    // store targetDashboardUid for later
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
    // query settings
    if (params.url || params.queryType) {
      let updatedTargetPartial;
      const baseTarget = {
        columns: [],
        filters: [],
        format: "table",
        global_query_id: "",
        root_selector: "",
        skipRows: 0
      }
      if (Array.isArray(dashboardInfo.dashboard.targets)) {
        updatedTargetPartial = {
          ...baseTarget,
          ...dashboardInfo.dashboard.targets[0],
        };
      } else {
        updatedTargetPartial = baseTarget;
      }

      if (params.url) {
        updatedTargetPartial.url = params.url;
      }
      if (params.queryType) {
        updatedTargetPartial.type = params.queryType;
      }

      const panelCount = dashboardInfo.dashboard.panels.length;
      const panelIdx = dashboardInfo.dashboard.panels.findIndex(panel => panel.type === "esnet-network-mappanel");
      let panelsArr: IPanel[] = [];

      // iterate through panels in dashboard
      for (let currPanelIdx = 0; currPanelIdx < panelCount; currPanelIdx++) {

        // in each panel's targets find all targets with infinity datasource
        const currPanel = dashboardInfo.dashboard.panels[currPanelIdx];
        const targetCount = currPanel.targets?.length ?? 0;
        const panelTargetIdxs: number[] | undefined = currPanel.targets?.reduce((acc: number[], target: ITarget, targetIdx: number) => {
          if (target.datasource.type === "yesoreyeram-infinity-datasource") {
            acc.push(targetIdx);
          }
          return acc;
        }, [] as number[]);

        // iterate through all infinity targets, updating those with param url and type...
        const targetArr: ITarget[] = [];
        for (let currTargetIdx = 0; currTargetIdx < targetCount; currTargetIdx++) {
          let currTarget = currPanel.targets![currTargetIdx];
          if (panelTargetIdxs && panelTargetIdxs.includes(currPanelIdx)) {
            currTarget = {
              ...currTarget,
              ...updatedTargetPartial,
            };
          }
          targetArr.push(currTarget);
        }

        // set panel's targets
        currPanel.targets = targetArr;
        // add panel to results
        panelsArr.push(currPanel);
      }

      // update container for dashboard prior to API invocation
      dashboardInfo.dashboard = {
        ...dashboardInfo.dashboard,
        panels: panelsArr
      };
    }
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
              type: "yesoreyeram-infinity-datasource",
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
  } catch (e) {
    console.error(`[${fnName}] Dashboard update error:\n`, e.message);
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
