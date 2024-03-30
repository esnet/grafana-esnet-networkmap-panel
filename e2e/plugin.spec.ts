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

/**
 * Returns the URL for the network map panel
 *
 * @param {string} targetDashboardUid     The dashboard UID
 * @param {string} targetDb               The target DB for the panel
 * @param {string | number} panelId       The panel's ID
 * @param {string | number} orgId         The organization for the user
 * @param {boolean} isEdit                Optional. Set to true if the URL to return should refer to the edit URL for the panel.
 * @returns {string}
 */
const getNetworkMapPanelUrl = (targetDashboardUid: string, targetDb: string, panelId: string | number, orgId?: string | number, isEdit = false) => {
    const { protocolHostPort } = getHostInfo(credentials);
    const paramObj = {
      'var-node': 'ALBQ',
    };
    if (isEdit) {
      paramObj['editPanel'] = panelId;
    }
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

  // limited testing of sliding switches for hide/show map canvas features
  // TODO: add additional e2e tests, may refactor into seperate tests
  pluginTest("load plugin edit page - view options", async ({ page, targets }: { page: Page, targets: ITargets}) => {
    // load plugin edit page
    const { targetDashboardUid, targetFolder, targetDashboard, targetPanelId, orgId } = targets;
    const editNetworkMapPanelUrl = getNetworkMapPanelUrl(targetDashboardUid, targetDashboard, targetPanelId, orgId, true);
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

  pluginTest("confirm node changes upon clicking Grafana's Apply button", async ({ page, targets }: { page: Page, targets: ITargets}) => {
    const { targetDashboardUid, targetDashboard, targetPanelId, orgId } = targets;
    const testName = "confirm node changes upon clicking Grafana's Apply button";

    // parameters for test
    const nodeSelector = ".node .node-B"; // reference to node to operate test upon
    const dragDelta = { dx: 100, dy: 50 }; // mouse drag parameters

    // go to view mode
    const viewNetworkMapPanelUrl = getNetworkMapPanelUrl(targetDashboardUid, targetDashboard, targetPanelId, orgId);
    await page.goto(viewNetworkMapPanelUrl);

    // get pre edit view node reference
    const preEditViewNodeEl = await page.waitForSelector(nodeSelector);
    const preEditViewNodeBox = (await preEditViewNodeEl.boundingBox())!;
    const originalViewBrowserX = preEditViewNodeBox.x + preEditViewNodeBox.width / 2;
    const originalViewBrowserY = preEditViewNodeBox.y + preEditViewNodeBox.height / 2;
    const originalViewX = originalViewBrowserX;
    const originalViewY = originalViewBrowserY;
    console.log(`[${testName}] Center Position of target node in original view mode ${nodeSelector}: (${originalViewX}, ${originalViewY})`);

    // go to edit mode
    const editNetworkMapPanelUrl = getNetworkMapPanelUrl(targetDashboardUid, targetDashboard, targetPanelId, orgId, true);
    await page.goto(editNetworkMapPanelUrl);

    // get a reference to an edit node
    await page.waitForSelector(nodeSelector);
    const preEditNodeLocator = await page.locator(nodeSelector);
    const preEditNodeElHandle = await preEditNodeLocator.elementHandle();
    const preEditBox = (await preEditNodeElHandle?.boundingBox())!; // relative to browser viewport
    const originalBrowserX = preEditBox.x + preEditBox.width / 2;
    const originalBrowserY = preEditBox.y + preEditBox.height / 2;
    console.log(`[${testName}] Center Position of target node in original edit mode ${nodeSelector}: (${originalBrowserX}, ${originalBrowserY})`);

    const originalEditX = originalBrowserX;
    const originalEditY = originalBrowserY;

    // drag and drop node in edit mode to change its position

    await page.mouse.move(originalEditX, originalEditY);
    await page.mouse.down();
    await page.mouse.move(originalEditX + dragDelta.dx, originalEditY + dragDelta.dy);
    await page.mouse.up();

    // click apply button directly, without exiting edit mode, should navigate to view mode
    const applyButton = page.getByRole("button", { name: /apply/i});
    await applyButton.click();

    // apply button, defying convention goes directly to view mode after saving changes (and save btn saves, but stays in edit mode)
    await page.waitForSelector('.panel-title');
    expect(page).not.toHaveTitle(/edit panel/i);

    // verify that the ctrl point for the B node is not at original position
    const postEditViewNodeEl = await page.waitForSelector(nodeSelector);
    const postEditViewNodeBox = (await postEditViewNodeEl.boundingBox())!;
    const newBrowserX = postEditViewNodeBox.x + postEditViewNodeBox.width / 2;
    const newBrowserY = postEditViewNodeBox.y + postEditViewNodeBox.height / 2;

    const newX = newBrowserX;
    const newY = newBrowserY;
    expect(newX).not.toBe(originalViewX);
    expect(newY).not.toBe(originalViewY);
    console.log(`[${testName}] Node Position in view: old (${originalViewX}, ${originalViewY}); new (${newX}, ${newY})`);
  });

  pluginTest.skip("confirm edge changes upon clicking Grafana's Apply button", async ({ page, targets }: { page: Page, targets: ITargets}) => {
    const { targetDashboardUid, targetDashboard, targetPanelId, orgId } = targets;
    const editNetworkMapPanelUrl = getNetworkMapPanelUrl(targetDashboardUid, targetDashboard, targetPanelId, orgId, true);
    await page.goto(editNetworkMapPanelUrl);

    // should already be in edit mode, get a reference to a edge control point (using B--C)
    const bcEdgeSelector = ".control-point-for-edge-B--C:nth-child(2)";
    const dragDelta = { dx: 100, dy: 50 };

    await page.waitForSelector(bcEdgeSelector);
    const preEditBCEdgeLocator = await page.locator(bcEdgeSelector);
    const preEditBCEdgeElHandle = await preEditBCEdgeLocator.elementHandle();
    const { x: originalX, y: originalY } = (await preEditBCEdgeElHandle?.boundingBox())!;
    await preEditBCEdgeLocator.hover();
    await page.mouse.down();
    await page.mouse.move(originalX + dragDelta.dx, originalY + dragDelta.dy);
    await page.mouse.up();

    // click apply button directly, without exiting edit mode
    const applyButton = page.getByRole("button", { name: /apply/i});
    await applyButton.click();
    expect(page).not.toHaveTitle(/edit panel/i);

    // verify that the ctrl point for the B-C edge is not at original position
    const postEditBCEdgeEl = await page.waitForSelector(bcEdgeSelector);
    const { x: newX, y: newY } = (await postEditBCEdgeEl.boundingBox())!;
    expect(newX).not.toBe(originalX);
    expect(newY).not.toBe(originalY);
  });
});