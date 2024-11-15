import { getHostInfo } from "../config.info";
import credentials from '../../playwright/.auth/credentials.json';
import { IDashboard } from "../plugin-def";

export const getHomepageUrl = async (orgId?: string | number) => {
    const { protocolHostPort } = await getHostInfo(credentials);
    if (orgId) {
      return `${protocolHostPort}/?orgId=${orgId}`;
    } else {
      return protocolHostPort;
    }
  }
  
export const getEditNetworkMapPanelUrl = async (targetDashboardUid: string, targetDb: IDashboard | string, panelId: string | number, orgId?: string | number) => {
    const { protocolHostPort } = await getHostInfo(credentials);
    const paramObj = {
      editPanel: panelId,
      'var-node': 'ALBQ',
    };
    if (!!orgId) {
      paramObj['orgId'] = orgId;
    }
    const paramArr = Object.entries(paramObj).reduce((acc, paramVal) => {
      const [param, val] = paramVal;
      acc.push(`${param}=${val}`);
      return acc;
    }, [] as string[]);
    const targetDbTitle = typeof targetDb == 'string' ? targetDb : targetDb.title;
    return `${protocolHostPort}/d/${targetDashboardUid}/${targetDbTitle}?${paramArr.join('&')}`;
  };