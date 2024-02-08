import dockerInfo from '../e2e/grafana-docker.json';
import e2eConfig from '../e2e/e2e.config.json';

const moduleName = 'config.info';
const targetGrafanaInstanceName = e2eConfig.grafanaInstanceName || "grafana";
const grafanaInfo = (dockerInfo as Array<any>).find(nfo => nfo.Name == `/${targetGrafanaInstanceName}`);
if (!grafanaInfo) {
  const configInstr = 'Configure one in e2e.config.json under the key "grafanaInstanceName" or use "grafana" as the name';
  const err = `${moduleName}: No Docker instance named "${targetGrafanaInstanceName}" could be found. ${configInstr}`;
  throw new Error(err);
}
const { IPAddress, Ports } = grafanaInfo?.NetworkSettings;

/**
 * Fetches the basic auth header and URL to the configured Grafana server.
 *
 * @param {{username: string, password: string}} credentials
 * @returns {{ protocolHostPort: string, basicAuthHeader: {[headerName: string]: string}}}
 */
export const getHostInfo = (credentials: {username: string, password: string}) => {
  const fnName = 'auth.setup.getHostInfo';
  let protocolHostPort;
  const portKeys = Object.keys(Ports);

  if (portKeys.length === 1) {
    const portInfo = Ports[portKeys[0]] as {
      HostIp: string;
      HostPort: string;
    }[];
    if (portInfo.length === 1) {
      protocolHostPort = `http://${IPAddress || 'localhost'}:${portInfo[0].HostPort}`;
      const basicAuthHeader = {
        "Authorization": `Basic ${btoa(`${credentials.username}:${credentials.password}`)}`
      };
      const result = { protocolHostPort, basicAuthHeader};
      return result;
    } else {
      throw new Error(`${fnName}: cannot derive port number from Docker NetworkSettings.Ports inspection:\n${JSON.stringify(Ports)}`)
    }
  } else {
    throw new Error(`${fnName}: cannot derive port number from Docker NetworkSettings.Ports inspection:\n${JSON.stringify(Ports)}`)
  }
};