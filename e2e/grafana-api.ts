import { getHostInfo } from "./config.info";
import credentials from '../playwright/.auth/credentials.json';
import networkMapPanel from '../e2e/networkMapPanel.json';
import { IDataSource } from "./interfaces/DataSource.interface";
import { IDashboard, IOrganization, makeDashboard } from "./plugin-def";

interface Dashboard {
  dataSource: Partial<IDataSource>;
  title: string;
  uid: string;
  [key: string]: any;
}

/**
 * Creates a datasource. optionally initializing with traffic flow data from a Google sheet, given by its fileId.
 * If one already exists for the given URL the fileId resolves to, the matching datasource is returned unless the
 * forceCreate flag is set.
 *
 * @param {string | null} fileId
 * @param {boolean} forceCreate
 * @returns
 */
export const createDatasource = async (datasourceName, forceCreate = false): Promise<IDataSource> => {
  const fnName = "folderDashboardInit.initCSVDatasource";
  const { basicAuthHeader, protocolHostPort } = await getHostInfo(credentials);

  let resultDataSource;
  try {
    const jsonHeaders = {
      "Accept": "application/json",
      "Content-Type": "application/json"
    };

    // check if datasource exists already
    const dataSrcCheckResponse: Response = await fetch(`${protocolHostPort}/api/datasources/name/${datasourceName}`, {
      headers: {
        ...basicAuthHeader,
        ...jsonHeaders
      },
      redirect: "follow"
    });

    if (dataSrcCheckResponse.ok && !forceCreate) {
      // if exists, return info
      resultDataSource = await dataSrcCheckResponse.json();
    } else if (!dataSrcCheckResponse.ok && dataSrcCheckResponse.status === 404 || forceCreate) {
      // if does not exist or forced to create, create it
      const inObj = {
        name: datasourceName,
        type: "yesoreyeram-infinity-datasource",
        access: "proxy"
      };
      // no need to use URL, that is specified at the dashboard level
      // post url to grafana API for data source config
      const dataSrcCreateResponse: Response = await fetch(`${protocolHostPort}/api/datasources`, {
        method: "POST",
        headers: {
          ...basicAuthHeader,
          ...jsonHeaders
        },
        body: JSON.stringify(inObj)
      });
      const jsonResponse = await dataSrcCreateResponse.json();
      resultDataSource = jsonResponse.datasource;
    } else if (!dataSrcCheckResponse.ok) {
      throw new Error(`HTTP Response ${dataSrcCheckResponse.status}: ${dataSrcCheckResponse.statusText}`);
    }
  } catch (e) {
    console.error(`[${fnName}]: Error ${e.message}`);
  }

  return resultDataSource;
}

/**
 * Deletes a given datasource through its UID dsUid.
 * @param {string} dsUid
 */
export const deleteDatasource = async (dsUid: string) => {
  const { basicAuthHeader, protocolHostPort } = await getHostInfo(credentials);
  const deleteDataSourceResponse: Response = await fetch(`${protocolHostPort}/api/datasources/uid/${dsUid}`, {
    method: 'DELETE',
    headers: {
      ...basicAuthHeader,
      "Accept": "application/json",
      "Content-Type": "application/json"
    }
  });

  if (!deleteDataSourceResponse.ok) {
    throw new Error(`[grafana-api.deleteDatasource]: Error in deleting datasource ${dsUid}; ${deleteDataSourceResponse.statusText}`);
  }
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
      panels[0].datasource.uid = dbParams.dataSource.uid;
    }
    const defaultDashboard = makeDashboard();
    const inObj = {
      dashboard: defaultDashboard,
      folderUid,
    };
    const body = JSON.stringify(inObj, null, 2);
    const dashboardCreateResponse: Response = await fetch(`${protocolHostPort}/api/dashboards/db`, {
      method: "POST",
      body,
      headers: {
        ...basicAuthHeader,
        "Content-Type": "application/json"
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
  return responseJson;
};

/**
 * Deletes the dashboard given by the target targetDashboardUid.
 * @param {string} targetDashboardUid
 * @returns {Promise<void>} A Promise that resolves when the delete operation completes.
 * @throws {Error} When the Promise returned from this fails to resolve and is rejected.
 */
export const deleteDashboard = async (targetDashboardUid: string): Promise<void> => {
  const { basicAuthHeader, protocolHostPort } = await getHostInfo(credentials);
  const fnName = 'grafana-api.deleteDashboard';

  const dbDeleteResponse: Response = await fetch(`${protocolHostPort}/api/dashboards/uid/${targetDashboardUid}`, {
    method: "DELETE",
    headers: {
      ...basicAuthHeader,
      "Accept": "application/json",
      "Content-Type": "application/json",
    }
  });

  if (dbDeleteResponse.ok) {
    return;
  } else {
    throw new Error(`[${fnName}] Error in deleting dashboard UID ${targetDashboardUid}: ${dbDeleteResponse.statusText}`);
  }
}
