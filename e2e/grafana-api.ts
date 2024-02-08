import { getHostInfo } from "./config.info";
import credentials from '../playwright/.auth/credentials.json';
import networkMapPanel from '../e2e/networkMapPanel.json';

/**
 * Returns a Promise for a JSON string containing detailed information about a single dashboard by its assigned uid.
 * The response fetched contains information about the various panels, options, and other configuration.
 * @param {dbUid} string        The UID for the dashboard
 * @returns {Promise<string>}
 */
export const getDashboard = async (dbUid: string): Promise<string> => {
  const { basicAuthHeader, protocolHostPort } = getHostInfo(credentials);
  const dashboardGetResponse: Response = await fetch(`${protocolHostPort}/api/dashboards/uid/${dbUid}`, {
    headers: basicAuthHeader,
  });
  const responseJson = await dashboardGetResponse.json();
  return JSON.stringify(responseJson);
}

/**
 * Returns information about the current logged in user as a JSON string. If no information is available or the user
 * is not logged in, a stack trace is issued and the Promise resolves with undefined.
 * @returns {Promise<string | undefined>}
 */
export const getCurrentUser = async (): Promise<string | undefined> => {
  const { basicAuthHeader, protocolHostPort } = getHostInfo(credentials);
  try {
    const userResponse: Response = await fetch(`${protocolHostPort}/api/user`, {
      headers: {
        ...basicAuthHeader,
        'Content-Type': 'application/json'
      }
    });
    const responseJsonStr = JSON.stringify(await userResponse.json(), null, 2);
    return responseJsonStr;
  } catch (e) {
    console.trace(`grafana-api.getCurrentUser: Error in fetching current user: ${e.message}`);
    return undefined;
  }
}

/**
 * Creates a new dashboard with the given title and optional UID.
 * @param {string} folderUid                    The UID of the folder to create the dashboard in.
 * @param {string|undefined} dashboardTitle     Optional. Title for the dashboard. If one is not given,
 *                                              the title 'network-map-test-dashboard' will be assigned.
 * @param {string|undefined} dashboardUid       Optional. A given UID for the created dashboard.
 * @returns {Promise<string>} The JSON string for the created dashboard.
 */
export const createDashboard = async (folderUid: string, dashboardTitle?: string, dashboardUid?: string): Promise<string> => {
    const { basicAuthHeader, protocolHostPort } = getHostInfo(credentials);
    const inObj = {
      dashboard: {
        id: null,
        uid: dashboardUid,
        type: "db",
        editable: true,
        fiscalYearStartMonth: 0,
        graphTooltip: 0,
        links: [],
        liveNow: false,
        title: dashboardTitle || 'network-map-test-dashboard',
        tags: [],
        panels: [networkMapPanel],
        refresh: "",
        revision: 1,
        schemaVersion: 38,
        style: "dark",
        templating: {
            list: []
        },
        time: {
            from: "now-6h",
            to: "now"
        },
        timepicker: {},
        timezone: "",
        version: 4,
        weekStart: ""
      },
      folderUid,
      message: "",
      overwrite: true,
    };
    const dashboardCreateResponse: Response = await fetch(`${protocolHostPort}/api/dashboards/db`, {
      method: 'post',
      body: JSON.stringify(inObj),
      headers: {
        ...basicAuthHeader,
        'Content-Type': 'application/json'
      }
    });
    const dashboardCreateResponseJson = await dashboardCreateResponse.json();
    return JSON.stringify(dashboardCreateResponseJson);
  };
  
/**
 * Createa a new folder with the given title and optional UID.
 * @param {string} folderTitle                      The title of the new folder.
 * @param {string|undefined} folderUid              Optional. A given UID for the created folder.
 * @return {Promise<{uid: string, id: string}>} An object with UID and ID for the folder, whether it was created or already existing.
 */
export const createFolder = async (folderTitle: string, folderUid?: string): Promise<{uid: string, id: string}> => {
    const { basicAuthHeader, protocolHostPort } = getHostInfo(credentials);
    const inObj = {"title": folderTitle};
    if (folderUid) {
        inObj['uid'] = folderUid;
    }
    const folderCreateResponse: Response = await fetch(`${protocolHostPort}/api/folders`, {
        method: "post",
        body: JSON.stringify(inObj),
        headers: {
            ...basicAuthHeader,
            'Content-Type': 'application/json'
        }
    });
    const createFolderJsonResponse = await folderCreateResponse.json();
    return {
        id: createFolderJsonResponse.id,
        uid: createFolderJsonResponse.uid,
    };
};
