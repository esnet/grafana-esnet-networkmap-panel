import dockerInfo from '../e2e/grafana-docker.json';
import e2eConfig from '../e2e/e2e.config.json';

const moduleName = 'config.info';
const { fileId } = e2eConfig;
const targetGrafanaInstanceName = e2eConfig.grafanaInstanceName || "grafana";
const grafanaInfo = (dockerInfo as Array<any>).find(nfo => nfo.Name == `/${targetGrafanaInstanceName}`);
if (!grafanaInfo) {
  const configInstr = 'Configure one in e2e.config.json under the key "grafanaInstanceName" or use "grafana" as the name';
  const err = `${moduleName}: No Docker instance named "${targetGrafanaInstanceName}" could be found. ${configInstr}`;
  throw new Error(err);
}
const { IPAddress, Ports } = grafanaInfo?.NetworkSettings;

export const getGoogleSheetInfo = (fileId: string, sheetName?: string): string | { topologyUrl: string; flowsUrl: string } => {
  const baseUrl = `https://docs.google.com/spreadsheets/d/${fileId}/gviz/tq?tqx=out:csv`;
  if (sheetName) {
    return `${baseUrl}/&sheet=${sheetName}`;
  } else {
    return {
      topologyUrl: `${baseUrl}&sheet=Topology`,
      flowsUrl: `${baseUrl}&sheet=--`
    };
  }
};

/**
 * Returns a promise to fetch the basic auth header, plus the version of and URL to the configured Grafana server.
 *
 * @param {{username: string, password: string}} credentials
 * @returns {Promise<{ protocolHostPort: string, basicAuthHeader: {[headerName: string]: string}, version: string}>}
 */
export const getHostInfo = async (credentials?: {username: string, password: string}) => {
  const fnName = 'auth.setup.getHostInfo';
  let protocolHostPort;
  const portKeys = Object.keys(Ports);

  if (portKeys.length > 0) {
    const portInfo = Ports[portKeys[0]] as {
      HostIp: string;
      HostPort: string;
    }[];
    if (portInfo.length > 0) {
      protocolHostPort = `http://${IPAddress || 'localhost'}:${portInfo[0].HostPort}`;
      let basicAuthHeader = {};
      if (credentials) {
        const credentialsBuf = Buffer.from(`${credentials.username}:${credentials.password}`, 'base64');
        basicAuthHeader["Authorization"] = `Basic ${credentialsBuf.toString('base64')}`;
      }
      const response: Response = await fetch(`${protocolHostPort}/api/health`);
      if (response.status !== 200) {
        throw new Error(`${fnName}: cannot derive API health response from Grafana server for version`);
      }
      const { version } = await response.json();
      const result = { protocolHostPort, version, basicAuthHeader: {} };
      if (Object.keys(basicAuthHeader).length > 0) {
        result.basicAuthHeader = basicAuthHeader;
      }
      return result;
    } else {
      throw new Error(`${fnName}: cannot derive port number from Docker NetworkSettings.Ports inspection:\n${JSON.stringify(Ports)}`)
    }
  } else {
    throw new Error(`${fnName}: cannot derive port number from Docker NetworkSettings.Ports inspection:\n${JSON.stringify(Ports)}`)
  }
};