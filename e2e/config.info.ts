import dockerInfo from '../e2e/grafana-docker.json';
import e2eConfig from '../e2e/e2e.config.json';
import { IHostPort } from '../e2e/interfaces/HostPort.interface';

const moduleName = 'config.info';
const { flowSheets } = e2eConfig;
const targetGrafanaInstanceName = e2eConfig.grafanaInstanceName || "grafana";
const grafanaInfo = (dockerInfo as Array<any>).find(nfo => nfo.Name == `/${targetGrafanaInstanceName}`);
if (!grafanaInfo) {
  const configInstr = 'Configure one in e2e.config.json under the key "grafanaInstanceName" or use "grafana" as the name';
  const err = `${moduleName}: No Docker instance named "${targetGrafanaInstanceName}" could be found. ${configInstr}`;
  throw new Error(err);
}
const { IPAddress } = grafanaInfo?.NetworkSettings;
const { HostConfig } = grafanaInfo;

/**
 * Returns a promise to fetch the basic auth header, plus the version of and URL to the configured Grafana server.
 *
 * @param {{username: string, password: string}} credentials
 * @returns {Promise<{ protocolHostPort: string, basicAuthHeader: {[headerName: string]: string}, version: string}>}
 */
export const getHostInfo = async (credentials?: {username: string, password: string}) => {
  const fnName = 'auth.setup.getHostInfo';
  let protocolHostPort;
  const bindingsObj: { [key: string]: IHostPort[] } = HostConfig.PortBindings;
  const portKeys = Object.entries(bindingsObj).reduce((acc: IHostPort[], [bindingKey, bindingList]) => {
    if (bindingKey === "3000/tcp") {
      acc.push(...bindingList);
    }
    return acc;
  }, []);

  if (portKeys.length > 0) {
    const portInfo = portKeys[0] as IHostPort;

    protocolHostPort = `http://${IPAddress || 'localhost'}:${portInfo.HostPort}`;
    let basicAuthHeader = {};
    if (credentials) {
      const credStr = `${credentials.username}:${credentials.password}`;
      const credentialsBuf = Buffer.from(credStr);
      basicAuthHeader["Authorization"] = `Basic ${credentialsBuf.toString('base64')}`;
    }
    let version;
    try {
      const response: Response = await fetch(`${protocolHostPort}/api/health`);
      if (response.status !== 200) {
        throw new Error(`${fnName}: cannot derive API health response from Grafana server for version`);
      }
      version = (await response.json()).version;
    } catch (e) {
      console.error(`${fnName}: Error: ${e.message}`);
    }
    const result = { protocolHostPort, version, basicAuthHeader: {} };
    if (Object.keys(basicAuthHeader).length > 0) {
      result.basicAuthHeader = basicAuthHeader;
    }
    return result;
  } else {
    throw new Error(`${fnName}: cannot derive port number from Docker HostConfig.PortBindings inspection:\n${JSON.stringify(HostConfig.PortBindings)}`)
  }
};