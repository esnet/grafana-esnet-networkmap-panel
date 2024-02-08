import { expect, Request, Page } from '@playwright/test';
import testIds from '../src/constants';
import e2eConfig from '../e2e/e2e.config.json';
import { getHostInfo } from './config.info';
import credentials from '../playwright/.auth/credentials.json';
import { ITargets } from './interfaces/Targets.interface';
import { pluginTest } from './plugin-def';
import { getFolderDashboardTargets } from './folderDashboardInit';

const { protocolHostPort } = getHostInfo(credentials);
const { targetDashboard } = e2eConfig;

const getHomepageUrl = (orgId?: string | number) => {
  const { protocolHostPort } = getHostInfo(credentials);
  if (orgId) {
    return `${protocolHostPort}/?orgId=${orgId}`;
  } else {
    return protocolHostPort;
  }
}

const getEditNetworkMapPanelUrl = (targetDashboardUid: string, targetDb: string, panelId: string | number, orgId?: string | number) => {
    const { protocolHostPort } = getHostInfo(credentials);
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
    return `${protocolHostPort}/d/${targetDashboardUid}/${targetDb}?${paramArr.join('&')}`;
};

pluginTest.describe("plugin testing", () => {
  pluginTest.use({
    targets: async ({}, use) => {
      const newFixtureObj = await getFolderDashboardTargets();
      use(newFixtureObj);
    }
  });

  pluginTest("has title", async ({ page }) => {
    await page.goto(protocolHostPort);

    // Expect a title "to contain" a substring.
    await expect(page).toHaveTitle(/Grafana/);
  });

  pluginTest("login access", async ({ page, targets }: { page: Page, targets: ITargets }) => {
    await page.goto(getHomepageUrl(targets.orgId));

    // Expects page to have a heading with the name of Installation.
    await expect(page.getByText("Welcome to Grafana")).toBeVisible();
  });

  pluginTest("dashboards access", async ({ page, targets }: { page: Page, targets: ITargets}) => {
    await page.goto(getHomepageUrl(targets.orgId));
    // click the dashboards button
    await page.getByRole("link").and(page.getByLabel("Dashboards")).click();
    await page.waitForURL("**/dashboards");

    // Expects page to have an entry with the target dashboard listed
    await expect(page.locator('[data-testid*="Search section"]:first-child')).toBeVisible();
  });

  // TODO: disabled for now, not a target to test, but retained for navigational aide if needed
  pluginTest.skip(`navigate to dashboard ${targetDashboard}`, async ({ page, targets }: { page: Page, targets: ITargets}) => {
    await page.goto(getHomepageUrl(targets.orgId));

    // promise for list of dashboards to be populated
    const searchPromise = page.waitForRequest("**/api/search?limit=1000&**");
    let search: Request | null = null;
    searchPromise.then(result => {
      if (!search && result !== null) {
        search = result;
      }
    });

    await page.getByRole("link").and(page.getByLabel("Dashboards")).click();
    await page.waitForURL("**/dashboards");

    // click the dashboard item for the target dashboard
    await page.getByText(targetDashboard).click();
    await page.waitForURL(`**/d/**/${targetDashboard}?orgId=1`);
  });

  // limited testing of sliding switches for hide/show map canvas features
  // TODO: add additional e2e tests, may refactor into seperate tests
  pluginTest("load plugin edit page - view options", async ({ page, targets }: { page: Page, targets: ITargets}) => {
    // load plugin edit page
    const fnName = "plugin.spec['load plugin edit page - view options']";
    const { targetDashboardUid, targetFolder, targetDashboard, targetPanelId, orgId } = targets;
    const editNetworkMapPanelUrl = `${getEditNetworkMapPanelUrl(targetDashboardUid, targetDashboard, targetPanelId, orgId)}`;
    await page.goto(editNetworkMapPanelUrl);

    // wait for page to load up canvas
    const mapEditorCanvas = await page.waitForSelector("[aria-label='Panel editor content'] esnet-map-canvas");

    // define canvas controls under the control of view options

    await mapEditorCanvas.waitForSelector(".leaflet-control-zoom");

    // check title
    const titleSuffix = '\\s+-\\s+Dashboards\\s+-\\s+Grafana';
    const expectedTitleRegExp = new RegExp(`Edit\\s+panel\\s+-\\s+${targetDashboard}\\s+-\\s+${targetFolder}${titleSuffix}`);
    const actualTitle = await page.title();
    await expect(expectedTitleRegExp.test(actualTitle)).toBeTruthy();

    const mapZoomInControl = await page.getByTestId(testIds.zoomInBtn);
    const mapZoomOutControl = await page.getByTestId(testIds.zoomOutBtn);

    const mapEditEdgeToggleControl = await page.getByTestId(testIds.editEdgeToggleBtn);
    const mapEditNodeToggleControl = await page.getByTestId(testIds.editNodeToggleBtn);
    const mapAddNodeControl = await page.getByTestId(testIds.addNodeBtn);
    const mapAddEdgeControl = await page.getByTestId(testIds.addEdgeBtn);

    // define Grafana controls/panels for view options

    const showViewControlGroup = await page.getByLabel("Show View Controls");
    const enableMapScrollingOnDragControlGroup = await page.getByLabel("Enable Map Scrolling on Drag");  // TODO: test movability
    const enableMapEditingControlGroup = await page.getByLabel("Enable Map Editing");
    const enableNodeSelectionAnimationsControlGroup = await page.getByLabel("Enable Node Selection Animations");  // TODO: test animations
    const enableEdgeTrafficDirectionAnimationsControlGroup = await page.getByLabel("Enable Edge Traffic Direction Animations");  // TODO: test animations

    const sidebarControlLocatorSelector = "div div:has(input[type='checkbox'])";
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

    // check Show View Controls
    await showViewControlGroup.scrollIntoViewIfNeeded();
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

});