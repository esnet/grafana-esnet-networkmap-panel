import { DEFAULT_DATASOURCE_NAME } from '../plugin-def';
import { getFolderDashboardFixtures, removeExistingDatasources, removeExistingTestDashboards } from '../folderDashboardInit';
import { createDatasource } from '../grafana-api';
import { topologySheetUrl as topologyUrl, flowSheets } from '../e2e.config.json';
import { IFlowSheet } from '../../src/types';
import { expect } from '@playwright/test';

export const setupFixtures = (pluginTest) => {
  /**
     * The targets async function, part of the parameter object upon invoking pluginTest.use,
     * sets up the dashboard, data sources, and panels via the Grafana API prior to running the
     * test use cases.
     */
  pluginTest.use({
    fixtures: async ({ }, use) => {

      // remove all data sources
      await removeExistingDatasources();

      // remove any dashboards used for test topology
      await removeExistingTestDashboards();

      // setup data sources
      const dataSource = await createDatasource(DEFAULT_DATASOURCE_NAME);

      // get topology (to be used with each panel)
      const topologyResponse: Response = await fetch(topologyUrl, {
        redirect: 'follow'
      });

      const topology = JSON.parse(await topologyResponse.text());

      // setup dashboard, including topology data from datasource uid
      const fixtures = await getFolderDashboardFixtures({
        queryType: 'tsv',
        topology,
        flowSheets: flowSheets as IFlowSheet[],
        uid: dataSource.uid
      });

      // check panel is populated
      expect(fixtures.targetPanel).not.toBeUndefined();

      use(fixtures);
    }
  });
};
