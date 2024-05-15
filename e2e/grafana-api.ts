import { getGoogleSheetInfo, getHostInfo } from "./config.info";
import credentials from '../playwright/.auth/credentials.json';
import networkMapPanel from '../e2e/networkMapPanel.json';
import { IDataSource } from "./interfaces/DataSource.interface";
import { IOrganization, makeDashboard } from "./plugin-def";

interface Dashboard {
  dataSource: Partial<IDataSource>;
  title: string;
  uid: string;
  [key: string]: any;
}

const DEFAULT_DATASOURCE_NAME = "network-traffic-flow";

/**
 * Creates a datasource. optionally initializing with traffic flow data from a Google sheet, given by its fileId.
 * If one already exists for the given URL the fileId resolves to, the matching datasource is returned unless the
 * forceCreate flag is set.
 *
 * @param {string | null} fileId
 * @param {boolean} forceCreate
 * @returns
 */
export const createDatasource = async (fileId?: string, forceCreate = false): Promise<IDataSource> => {
  const fnName = "folderDashboardInit.initCSVDatasource";
  const { basicAuthHeader, protocolHostPort } = await getHostInfo(credentials);
  let dataFlowUrl: string | null = null;
  if (fileId) {
    dataFlowUrl = getGoogleSheetInfo(fileId);
  }

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
      // if exists, return info
      resultDataSource = await dataSrcCheckResponse.json();
      console.log(`[${fnName}] Fetched Existing Datasource:\n`, JSON.stringify(resultDataSource, null, 2));
    } else if (!dataSrcCheckResponse.ok && dataSrcCheckResponse.status === 404) {
      // if does not exist, create it
      const inObj = {
        name: DEFAULT_DATASOURCE_NAME,
        type: "marcusolsson-csv-datasource",
        access: "proxy"
      };
      // initialize with data url
      if (dataFlowUrl) {
        inObj["url"] = dataFlowUrl;
      }
      const dataSrcCreateResponse: Response = await fetch(`${protocolHostPort}/api/datasources`, {
        method: "POST",
        headers: {
          ...basicAuthHeader,
          ...jsonHeaders
        },
        redirect: 'follow',
        body: JSON.stringify(inObj)
      });
      const jsonResponse = await dataSrcCreateResponse.json();
      resultDataSource = jsonResponse.datasource;
      console.log(`[${fnName}] Create New Datasource:\n`, JSON.stringify(resultDataSource, null, 2));
    } else if (!dataSrcCheckResponse.ok) {
      throw new Error(`HTTP Response ${dataSrcCheckResponse.status}: ${dataSrcCheckResponse.statusText}`);
    }
  } catch (e) {
    console.error(`[${fnName}]: Error ${e.message}`);
  }

  return resultDataSource;
}

/**
 * Returns a Promise for a JSON string containing detailed information about a single dashboard, fetched by
 * its assigned uid.
 *
 * The response fetched contains information about the various panels, options, and other configuration.
 *
 * If no dashboard for the given dbUid exists, null is returned.
 * @param {dbUid} string        The UID for the dashboard
 * @returns {Promise<string>}
 * @throws {Error}
 */
export const getDashboard = async (dbUid: string): Promise<string | null> => {
  const { basicAuthHeader, protocolHostPort } = await getHostInfo(credentials);
  let responseJson: string | null = null;
  try {
    const dashboardGetResponse: Response = await fetch(`${protocolHostPort}/api/dashboards/uid/${dbUid}`, {
      headers: basicAuthHeader,
    });
    if (dashboardGetResponse.ok) {
      responseJson = await dashboardGetResponse.json();
    } else if (dashboardGetResponse.status === 404) {
      responseJson = null;
    }
  } catch (e) {
    console.error(`[grafana-api.getDashboard]: Error: ${e.message}`);
    responseJson = '';
  }
  return JSON.stringify(responseJson);
}

/**
 * Returns the organization of the current user
 * @returns {IOrganization}      The JSON string descripting the id, name, and address for the current users organiztion.
 */
export const getCurrentOrg = async (): Promise<IOrganization> => {
  const fnName = "createDashboard";
  const { basicAuthHeader, protocolHostPort } = await getHostInfo(credentials);

  const currentOrgResponse: Response = await fetch(`${protocolHostPort}/api/org`, {
    headers: basicAuthHeader
  });
  const orgResponseJson = await currentOrgResponse.json();
  return orgResponseJson;
}

/**
 * Creates a new dashboard with the given title and optional UID.
 * @param {string} folderUid                         The UID of the folder to create the dashboard in.
 * @param {Partial<Dashboard>|undefined} dbParams    Optional. Used to set dashboard parameters explicitly upon creation.
 *                                                   If a title is no provided, 'network-map-test-dashboard' will be assigned.
 * @returns {Promise<string>} The JSON string for the created dashboard.
 */
export const createDashboard = async (folderUid: string, dbParams?: Partial<Dashboard>): Promise<string> => {
    const fnName = "createDashboard";
    const { basicAuthHeader, protocolHostPort } = await getHostInfo(credentials);
    const panels = [networkMapPanel];
    if (dbParams && dbParams?.dataSource?.uid) {
      console.log(`${fnName}: Overriding dataSource.uid with that generated from created dataSource ${dbParams.dataSource.uid}`)
      panels[0].datasource.uid = dbParams.dataSource.uid;
    }
    const defaultDashboard = makeDashboard();
    const inObj = {
      dashboard: defaultDashboard,
      folderUid,
    };
    const body = JSON.stringify(inObj, null, 2);
    console.log(`[grafana-api.createDashboard]: Creating dashboard\n${body}`);
    const dashboardCreateResponse: Response = await fetch(`${protocolHostPort}/api/dashboards/db`, {
      method: "POST",
      body,
      headers: {
        ...basicAuthHeader,
        "Content-Type": "application/json"
      }
    });
    const dashboardCreateResponseJson = await dashboardCreateResponse.json();
    console.log(`[Create Dashboard] Result:\n`, JSON.stringify(dashboardCreateResponseJson, null, 2));
    return JSON.stringify(dashboardCreateResponseJson);
  };
  
/**
 * Createa a new folder with the given title and optional UID.
 * @param {string} folderTitle                      The title of the new folder.
 * @param {string|undefined} folderUid              Optional. A given UID for the created folder.
 * @return {Promise<{uid: string, id: string}>} An object with UID and ID for the folder, whether it was created or already existing.
 */
export const createFolder = async (folderTitle: string, folderUid?: string): Promise<{uid: string, id: string}> => {
    const { basicAuthHeader, protocolHostPort } = await getHostInfo(credentials);
    const inObj = {"title": folderTitle};
    if (folderUid) {
        inObj["uid"] = folderUid;
    }
    const folderCreateResponse: Response = await fetch(`${protocolHostPort}/api/folders`, {
        method: "POST",
        body: JSON.stringify(inObj),
        headers: {
            ...basicAuthHeader,
            "Content-Type": "application/json"
        }
    });
    const createFolderJsonResponse = await folderCreateResponse.json();
    return {
        id: createFolderJsonResponse.id,
        uid: createFolderJsonResponse.uid,
    };
};

export const updateDashboard = async (folderUid: string, targetDashboard): Promise<string> => {
  const { basicAuthHeader, protocolHostPort } = await getHostInfo(credentials);
  const inObj ={
    dashboard: targetDashboard.dashboard,
    folderUid,
    message: "Populated panel item",
    overwrite: true
  };

  const dbUpdateResponse: Response = await fetch(`${protocolHostPort}/api/dashboards/db`, {
    method: "POST",
    headers: {
      ...basicAuthHeader,
      "Accept": "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(inObj)
  });

  const responseJson = await dbUpdateResponse.json();
  console.log(`[Update Dashboard]:\n`, JSON.stringify(responseJson, null, 2));
  return responseJson;
}

