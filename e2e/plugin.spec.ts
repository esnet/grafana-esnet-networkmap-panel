import { expect, Locator, Page } from '@playwright/test';
import testIds from '../src/constants';
import { pluginTest } from './plugin-def';
import { getHostInfo } from './config.info';
import credentials from '../playwright/.auth/credentials.json';
import { IFixtures } from './interfaces/Fixtures.interface';
import * as pubsub from '../src/components/lib/pubsub';
import { IFlowSheet } from '../src/types';
import { getEditNetworkMapPanelUrl, getHomepageUrl } from './util/urlHelpers';
import { setupFixtures } from './util/fixtures';
import { BasicColorMatcher } from './matchers/BasicColorMatcher';
import { IThreshold } from './interfaces/Threshold.interface';

const PubSub = pubsub.PubSub;

const PLUGIN_TEST_TIMEOUT = 120000; // 120s for plugin test

/**
 *  Checks the color of strokes for a given array of edge names.
 * */
const getCheckStrokeColorFn = (page: Page) => {
  return async (edgeNames: string[], colorNameMatcher?: RegExp | string) => {
    // actual paths in gray by default
    let edgeCount = edgeNames.length;
    for (const testEdge of edgeNames) {
      console.log(`Test Edge: ${testEdge}`);
      const edgeLocator: Locator = await page.locator(`.topology > path[class*="edge-az-${testEdge}"]`);
      if ((await edgeLocator.all()).length > 0) {
        await expect(edgeLocator).toHaveCSS('stroke', colorNameMatcher ?? BasicColorMatcher.GREY);
      }
    }

    // control paths in orange (always orange, but may not visible depending on enable/disable edge edit mode)
    for (let cpIndex = 0; cpIndex < edgeCount; cpIndex++) {
      const controlPathLocator: Locator = await page.locator(`.cp > path[data-index="${cpIndex}"]`);
      if (await controlPathLocator.isVisible()) {
        await expect(controlPathLocator).toHaveCSS('stroke', BasicColorMatcher.ORANGE);
      }
    }
  };
};

const getThresholds = async (inFs: IFlowSheet, page: Page): Promise<IThreshold[]> => {
  // only need the first swatch for the high value
  let baseThresholdLoc: Locator = page.locator('#Thresholds [class*="inputWrapper"]').getByRole('button').first();
  const baseLabelAttr = await baseThresholdLoc.getAttribute('aria-label');
  expect(baseLabelAttr).toMatch(/color/);

  const thresholdsLoc = page.locator('#Thresholds');

  // all remaining swatches work their way from high to base
  const colorSwatches: Locator[] = await thresholdsLoc.getByRole('button').all();
  colorSwatches.shift();
  let thresholdsRemaining = colorSwatches.length;
  let thresholdsAppended = 0;

  const resultThresholds: IThreshold[] = [];

  while (thresholdsRemaining > 0) {
    const colorSwatchLoc: Locator = colorSwatches.pop()!;

    // derive color from class
    const swatchAttr = colorSwatchLoc.getAttribute ? await colorSwatchLoc.getAttribute('aria-label') : null;
    const attrVals = swatchAttr ? swatchAttr.split(' ') : null;
    if (!attrVals || attrVals.find(val => /Remove/.test(val))) {
      thresholdsRemaining--;
      continue;
    }
    const swatchColor = attrVals.filter(s => s !== 'color').join(' ');

    // derive flow threshold level from order
    let expectedFlow;
    if (thresholdsRemaining === 1) {
      expectedFlow = 'high';
    } else if (thresholdsRemaining > 1 && thresholdsAppended > 0) {
      expectedFlow = `base+${thresholdsRemaining}`;
    } else {
      expectedFlow = 'base';
    }

    // derive meta data from flowsheet
    const endpoint = inFs.name;

    // append to thresholds
    const currentThreshold: IThreshold = {
      locator: colorSwatchLoc,
      expectedFlow,
      swatchColor,
      meta: {
        type: 'edge',
        endpoints: [endpoint]
      }
    };
    resultThresholds.push(currentThreshold);
    thresholdsAppended++;
    thresholdsRemaining--;
  }

  return resultThresholds;
};


pluginTest.describe("plugin testing", () => {
  pluginTest.describe.configure({ mode: "serial" });
  pluginTest.setTimeout(PLUGIN_TEST_TIMEOUT);

  setupFixtures(pluginTest);

  pluginTest("has title", async ({ page }) => {
    const { protocolHostPort } = await getHostInfo();
    await page.goto(protocolHostPort);

    // Expect a title "to contain" a substring.
    await expect(page).toHaveTitle(/Grafana/);
  });

  pluginTest("login access", async ({ page, fixtures }: { page: Page, fixtures: IFixtures }) => {
    await page.goto(await getHomepageUrl(fixtures.orgId));

    // Expects page to have a heading with the name of Installation.
    await expect(page.getByText("Welcome to Grafana")).toBeVisible();
  });

  pluginTest("dashboards access", async ({ page, fixtures }: { page: Page, fixtures: IFixtures }) => {
    const homepageUrl = await getHomepageUrl(fixtures.orgId);
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
  pluginTest("load plugin edit page - view options", async ({ page, fixtures }: { page: Page, fixtures: IFixtures }) => {
    // load plugin edit page
    const _fnName = "plugin.spec['load plugin edit page - view options']";
    const { targetDashboardUid, targetFolder, targetDashboard, targetPanelId, orgId } = fixtures;
    expect(targetDashboard).toBeDefined();
    const allFlowsEditNetworkMapPanelUrl = `${await getEditNetworkMapPanelUrl(targetDashboardUid, targetDashboard!, targetPanelId, orgId)}`;
    await page.goto(allFlowsEditNetworkMapPanelUrl);

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
  });
});
