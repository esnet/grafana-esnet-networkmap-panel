import {
  createDashboard,
  createFolder,
  deleteDashboard,
  deleteDatasource,
  getCurrentOrg,
  getDashboard,
  updateDashboard
} from './grafana-api';
import { getHostInfo } from './config.info';
import credentials from '../playwright/.auth/credentials.json';
import e2eConfig from './e2e.config.json';
import mockPanelImport from './mock.panel.json';
import { IFixtures } from './interfaces/Fixtures.interface';
import { INetworkPanelParams } from './interfaces/PanelParams.interface';
import {
  DEFAULT_DATASOURCE_NAME,
  FIELD_TYPE_DATETIME,
  FIELD_TYPE_NUMBER,
  FIELD_TYPE_STRING,
  IDashboard,
  IDashboardResponse,
  INetworkMapPanel,
  IOrganization,
  IPanel,
  ITarget
} from './plugin-def';
import { IColumn } from '../src/types';

let targetFolderUid;
let targetDashboardUid;
const { targetFolder, targetDashboard: targetDashboardTitle, targetPanelType } = e2eConfig;
const mockPanel: Partial<INetworkMapPanel> = mockPanelImport;

const pluginTestSetupFnName = 'folder-dashboard.setup.getFolderDashboardTargets';
const TYPE_INFINITY_DATASOURCE = 'yesoreyeram-infinity-datasource';

const COLUMNS_MAP = {
  "src": FIELD_TYPE_STRING,
  "dst": FIELD_TYPE_STRING,
  "datetime": FIELD_TYPE_DATETIME,
  "src_total": FIELD_TYPE_NUMBER,
  "in_bits": FIELD_TYPE_NUMBER,
  "out_bits": FIELD_TYPE_NUMBER,
  "src_lat": FIELD_TYPE_NUMBER,
  "src_lng": FIELD_TYPE_NUMBER,
  "dst_lat": FIELD_TYPE_NUMBER,
  "dst_lng": FIELD_TYPE_NUMBER
};

/**
 * This creates and populates the folder for a single panel instances of Network Map Panel.
 * Two queries are setup in the instance, both utilizing the Infinity datasource:
 * <ol>
 *  <li>the first for all traffic data, sourced from the flowSheetUrl value in the e2e.config module.</li>
 *  <li>the second for a partial match of data, sourced from the partialMatchFlowSheetUrl value in the e2e.config module.</li>
 * </ol>
 *
 * @param {INetworkPanelParams|undefined} params       Optional. Allow setting either a topology and data source or both.
 *
 * @returns {Promise<IFixtures>}
 */
export const getFolderDashboardTargets = async (params?: INetworkPanelParams): Promise<IFixtures> => {
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
      ...mockPanel as INetworkMapPanel,
      datasource: {
        type: `${mockPanel.datasource?.type ?? TYPE_INFINITY_DATASOURCE}`,
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
    if (params.flowSheets || params.queryType) {
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

        // iterate through all infinity targets, updating those with param url and type...
        const targetArr: ITarget[] = [];
        e2eConfig.flowSheets.forEach((flowSheet, fsIdx) => {
          let currTarget = currPanel.targets![fsIdx] ?? undefined;
          const { url, name: refId } = flowSheet;

          // create target for query
          currTarget = {
            ...currTarget,
            ...updatedTargetPartial,
            url,
            refId,
            columns: Object.entries(COLUMNS_MAP).reduce((acc, [selector, type]) => {
              acc.push({
                selector,
                text: "",
                type
              });
              return acc;
            }, [] as IColumn[])
          };
          targetArr.push(currTarget);
        });

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
      const { panels } = dashboardInfo.dashboard || { panels: currentPanels };
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
    await updateDashboard(targetFolderUid, dashboardInfo);
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

/**
 * Removes all existing datasources of type Infinity datasource named 'network-traffic-flow', as defined by
 * DEFAULT_DATASOURCE_NAME. If none exists, then the function's returned promise resolves.
 */
export const removeExistingDatasources = async () => {
  const { basicAuthHeader, protocolHostPort } = await getHostInfo(credentials);

  const getAllDatasourcesDbResponse: Response = await fetch(`${protocolHostPort}/api/datasources`, {
    method: 'GET',
    headers: {
      ...basicAuthHeader,
      "Accept": "application/json",
      "Content-Type": "application/json",
    }
  });

  try {
    if (getAllDatasourcesDbResponse.ok) {
      const allDatasources = await getAllDatasourcesDbResponse.json();
      const dataSourceTarget = allDatasources.find(ds => ds.type === TYPE_INFINITY_DATASOURCE && ds.name === DEFAULT_DATASOURCE_NAME);
      dataSourceTarget && await deleteDatasource(dataSourceTarget.uid);
    } else {
      throw new Error(`[folderDashboardInit.removeExistingDatasources]: Unable to fetch all datasources: ${getAllDatasourcesDbResponse.statusText}`);
    }
  } catch (e) {
    throw new Error(`[folderDashboardInit.removeExistingDatasources]: Unable to fetch all datasources: ${(e as Error).message}`);
  }
}

export const removeExistingTestDashboards = async () => {
  const { basicAuthHeader, protocolHostPort } = await getHostInfo(credentials);

  const searchQuery = 'network-map-test-dashboard';
  const networkMapTestSearchDbResponse: Response = await fetch(`${protocolHostPort}/api/search?query=${searchQuery}`, {
    method: 'GET',
    headers: {
      ...basicAuthHeader,
      "Accept": "application/json",
      "Content-Type": "application/json",
    }
  });
  let uids: string[] = [];
  if (networkMapTestSearchDbResponse.ok) {
    const jsonResponse = await networkMapTestSearchDbResponse.json();
    for (const entry of jsonResponse.filter(item => item.type === 'dash-db')) {
      uids.push((entry as IDashboard).uid);
    }
  } else {
    throw new Error(`[removeExistingTestDashboards] Error in searching dashboards for ${searchQuery}: ${networkMapTestSearchDbResponse.statusText}`);
  }

  for (const uid of uids) {
    await deleteDashboard(uid);
  }
};