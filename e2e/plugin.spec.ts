import { expect, Page } from '@playwright/test';
import testIds from '../src/constants';
import { topologySheetUrl as topologyUrl, fileId } from '../e2e/e2e.config.json';
import { getHostInfo } from './config.info';
import credentials from '../playwright/.auth/credentials.json';
import { ITargets } from './interfaces/Targets.interface';
import { IDashboard, pluginTest } from './plugin-def';
import { getFolderDashboardTargets } from './folderDashboardInit';
import { createDatasource } from './grafana-api';
import { removeRepeats } from '../test/utils';

const getHomepageUrl = async (orgId?: string | number) => {
  const { protocolHostPort } = await getHostInfo(credentials);
  if (orgId) {
    return `${protocolHostPort}/?orgId=${orgId}`;
  } else {
    return protocolHostPort;
  }
}

const getEditNetworkMapPanelUrl = async (targetDashboardUid: string, targetDb: IDashboard | string, panelId: string | number, orgId?: string | number) => {
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

pluginTest.describe("plugin testing", () => {
  pluginTest.describe.configure({ mode: "serial" });

  pluginTest.use({
    targets: async ({}, use) => {
      // setup data source
      const dataSource = await createDatasource(fileId);

      // get topology
      const topologyResponse: Response = await fetch(topologyUrl, {
        redirect: 'follow'
      });
      let topologyResponseEscaped = await topologyResponse.text();
      const topologyResponseUnescaped = removeRepeats(topologyResponseEscaped, '"', true);

      const topology = JSON.parse(topologyResponseUnescaped);
      // setup dashboard, including topology data from datasource uid
      const newFixtureObj = await getFolderDashboardTargets({
        topology,
        uid: dataSource.uid
      });

      // check panel is populated
      expect(newFixtureObj.targetPanel).not.toBeUndefined();

      use(newFixtureObj);
    }
  });

  pluginTest("has title", async ({ page }) => {
    const { protocolHostPort } = await getHostInfo();
    await page.goto(protocolHostPort);

    // Expect a title "to contain" a substring.
    await expect(page).toHaveTitle(/Grafana/);
  });

  pluginTest ("login access", async ({ page, targets }: { page: Page, targets: ITargets }) => {
    await page.goto(await getHomepageUrl(targets.orgId));

    // Expects page to have a heading with the name of Installation.
    await expect(page.getByText("Welcome to Grafana")).toBeVisible();
  });

  pluginTest("dashboards access", async ({ page, targets }: { page: Page, targets: ITargets}) => {
    const homepageUrl = await getHomepageUrl(targets.orgId);
    await page.goto(homepageUrl);
    await page.waitForURL(homepageUrl);

    // open the side menu for the dashboards if not already open
    let dashboardBtn = page.getByTestId(/navigation mega-menu/).getByRole('link', { name: 'Dashboards' });
    if (!(await dashboardBtn.isVisible())) {
      const menu = await page.getByTestId(/Toggle menu/);
      await menu.click();
    }

    // click the dashboards button

    // get again in case component reloaded after click
    const { protocolHostPort, version } = await getHostInfo(credentials);
    const isGrafanaVersionBelow10 = /^[0-9]\..*/.test(version);
    if (!isGrafanaVersionBelow10) {
      dashboardBtn = page.getByTestId(/navigation mega-menu/).getByRole('link', { name: 'Dashboards' });
      const apiResponsePromise = page.waitForResponse(`${protocolHostPort}/api/search**`);
      await dashboardBtn.click();
      expect(page.url().endsWith("/dashboards")).toBeTruthy();

      // Check table to have an entry with the target dashboard listed after API response
      await apiResponsePromise;
      // const asListLocator = await page.getByTitle(/View as list/);
      // asListLocator.click();
      const dbTable = await page.getByRole('table');
      const dbCell = dbTable.getByRole('cell', { name: /network-map-test-folder/ });
      await expect(dbCell).toBeVisible();
    } else {
      await page.getByRole("link").and(page.getByLabel("Dashboards")).click();
      await page.waitForURL("**/dashboards");

      // Expects page to have an entry with the target dashboard listed
      await expect(page.locator('[data-testid*="Search section"]:first-child')).toBeVisible();
    }
  });

  // limited testing of sliding switches for hide/show map canvas features
  // TODO: add additional e2e tests, may refactor into seperate tests
  pluginTest("load plugin edit page - view options", async ({ page, targets }: { page: Page, targets: ITargets}) => {
    // load plugin edit page
    const fnName = "plugin.spec['load plugin edit page - view options']";
    const { targetDashboardUid, targetFolder, targetDashboard, targetPanelId, orgId } = targets;
    expect(targetDashboard).toBeDefined();
    const editNetworkMapPanelUrl = `${await getEditNetworkMapPanelUrl(targetDashboardUid, targetDashboard!, targetPanelId, orgId)}`;
    await page.goto(editNetworkMapPanelUrl);

    // wait for page to load up canvas
    const mapEditorCanvas = await page.waitForSelector("[aria-label='Panel editor content'] esnet-map-canvas");

    // define canvas controls under the control of view options

    await mapEditorCanvas.waitForSelector(".leaflet-control-zoom");

    // check title
    const titleSuffix = '\\s+-\\s+Dashboards\\s+-\\s+Grafana';
    const expectedTitleRegExp = new RegExp(`Edit\\s+panel\\s+-\\s+${targetDashboard?.title}\\s+-\\s+${targetFolder}${titleSuffix}`);
    const actualTitle = await page.title();
    await expect(expectedTitleRegExp.test(actualTitle)).toBeTruthy();

    const mapZoomInControl = await page.getByTestId(testIds.zoomInBtn);
    const mapZoomOutControl = await page.getByTestId(testIds.zoomOutBtn);

    const mapEditEdgeToggleControl = await page.getByTestId(testIds.editEdgeToggleBtn);
    const mapEditNodeToggleControl = await page.getByTestId(testIds.editNodeToggleBtn);
    const mapAddNodeControl = await page.getByTestId(testIds.addNodeBtn);
    const mapAddEdgeControl = await page.getByTestId(testIds.addEdgeBtn);

    // define Grafana controls/panels for view options

    const showViewControlGroup = await page.getByLabel(/Show View Controls/);
    const enableMapScrollingOnDragControlGroup = await page.getByLabel("Enable Map Scrolling on Drag");  // TODO: test movability
    const enableMapEditingControlGroup = await page.getByLabel("Enable Map Editing");
    const enableNodeSelectionAnimationsControlGroup = await page.getByLabel("Enable Node Selection Animations");  // TODO: test animations
    const enableEdgeTrafficDirectionAnimationsControlGroup = await page.getByLabel("Enable Edge Traffic Direction Animations");  // TODO: test animations

    const sidebarControlLocatorSelector = "div div:has(div input[type='checkbox']) label";
    const showViewControlsControl = showViewControlGroup.locator(sidebarControlLocatorSelector);
    const enableMapScrollingOnDragControl = enableMapScrollingOnDragControlGroup.locator(sidebarControlLocatorSelector);  // TODO: test movability
    const enableMapEditingControl = enableMapEditingControlGroup.locator(sidebarControlLocatorSelector);
    const enableNodeSelectionAnimationsControl = enableNodeSelectionAnimationsControlGroup.locator(sidebarControlLocatorSelector);  // TODO: test animations
    const enableEdgeTrafficDirectionAnimationsControl = enableEdgeTrafficDirectionAnimationsControlGroup.locator(sidebarControlLocatorSelector);  // TODO: test animations

    // CHECK DEFAULTS (all enabled/checked)

    // show view controls visible initally
    await expect(showViewControlGroup).toBeVisible();
    await expect(mapZoomInControl).toBeVisible();
    await expect(mapZoomOutControl).toBeVisible();

    // map editing enabled
    await expect(enableMapEditingControlGroup).toBeVisible();
    await expect(mapEditEdgeToggleControl).toBeVisible();
    await expect(mapEditNodeToggleControl).toBeVisible();
    await expect(mapAddEdgeControl).toBeVisible();
    await expect(mapAddNodeControl).toBeVisible();

    // CHECK CONTROL ACTIONS (upon click/edit)

    // check Show View Controls, reassign to avoid target closure
    // showViewControlsControl = page.locator('[id="View Options"] > div > div:nth-child(2) > div label').first();
    await showViewControlsControl.click();
    await expect(mapZoomInControl).not.toBeVisible();
    await expect(mapZoomOutControl).not.toBeVisible();

    // check enable map editing
    await enableMapEditingControlGroup.scrollIntoViewIfNeeded();
    await enableMapEditingControl.click();

    await expect(mapEditEdgeToggleControl).not.toBeVisible();
    await expect(mapEditNodeToggleControl).not.toBeVisible();
    await expect(mapAddEdgeControl).not.toBeVisible();
    await expect(mapAddNodeControl).not.toBeVisible();

    // check enable node selection animation
    // TODO
  });

  pluginTest("test coloration", () => {
    // on first render of a topology loaded from a remote URL


    // on render of a 'normal' topology

    // in a partial match situation

    // in situations where something other than 'POPs' are used as a matching criterion
  });
});