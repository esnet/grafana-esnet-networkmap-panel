import { test, expect, Request } from '@playwright/test';
import testConfig from './e2e.config.json';

const { protocolHostPort, homepage, dashboard, editNetworkMapPanelPath, testIds } = testConfig;

test("has title", async ({ page }) => {
  await page.goto(protocolHostPort);

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Grafana/);
});

test("login access", async ({ page }) => {
  await page.goto(`${protocolHostPort}${homepage}`);

  // Expects page to have a heading with the name of Installation.
  await expect(page.getByText("Welcome to Grafana")).toBeVisible();
});

test("dashboards access", async ({ page }) => {
  await page.goto(`${protocolHostPort}${homepage}`);
  // click the dashboards button
  await page.getByRole("link").and(page.getByLabel("Dashboards")).click();
  await page.waitForURL("**/dashboards");

  // Expects page to have an entry with the target dashboard listed
  await expect(page.getByTestId(/Search section/)).toBeVisible();
});

// TODO: disabled for now, not a target to test, but retained for navigational aide if needed
test.skip(`navigate to dashboard ${dashboard}`, async ({ page }) => {
  await page.goto(`${protocolHostPort}${homepage}`);
  console.log(`get dashboard ${dashboard}: ${page.url()}`);

  // promise for list of dashboards to be populated
  const searchPromise = page.waitForRequest("**/api/search?limit=1000&**");
  let search: Request | null = null;
  searchPromise.then(result => {
    console.log("get dashboard ${dashboard}: result received");
    if (!search && result !== null) {
      search = result;
      console.log(`get dashboard ${dashboard}: searchPromise resolved: ${search.url()}`);
    }
  });

  await page.getByRole("link").and(page.getByLabel("Dashboards")).click();
  await page.waitForURL("**/dashboards");
  console.log(`get dashboard ${dashboard}: ${page.url()}`);

  // click the dashboard item for the target dashboard
  await page.getByText(dashboard).click();
  console.log(`get dashboard ${dashboard}: ${page.url()}`);
  await page.waitForURL(`**/d/**/${dashboard}?orgId=1`);
  console.log(`get dashboard ${dashboard}: ${page.url()}`);
});

// limited testing of sliding switches for hide/show map canvas features
// TODO: add additional e2e tests, may refactor into seperate tests
test("load plugin edit page - view options", async ({ page }) => {
  // load plugin edit page
  await page.goto(`${protocolHostPort}${editNetworkMapPanelPath}`);
  await expect(page).toHaveTitle(new RegExp(`Edit panel.*${dashboard}`));

  // wait for page to load up canvas
  const mapEditorCanvas = await page.waitForSelector("[aria-label='Panel editor content'] esnet-map-canvas");

  // define canvas controls under control of view options

  await mapEditorCanvas.waitForSelector(".leaflet-control-zoom");
  // await mapEditorCanvas.waitForSelector('.leaflet-control-zoom-in[data-testid]');
  // await mapEditorCanvas.waitForSelector('.leaflet-control-zoom-out[data-testid]');

  const mapZoomInControl = await page.getByTestId(testIds.zoomInBtn);
  const mapZoomOutControl = await page.getByTestId(testIds.zoomOutBtn);

  const mapEditEdgeToggleControl = await page.getByTestId(testIds.editEdgeToggleBtn);
  const mapEditNodeToggleControl = await page.getByTestId(testIds.editNodeToggleBtn);
  const mapAddNodeControl = await page.getByTestId(testIds.addNodeBtn);
  const mapAddEdgeControl = await page.getByTestId(testIds.addEdgeBtn);

  // define Grafana controls/panels for view options
  const showViewControlGroup = await page.getByLabel("Show View Controls");
  const enableMapScrollingOnDragControlGroup = await page.getByLabel("Enable Map Scrolling on Drag");
  const enableMapEditingControlGroup = await page.getByLabel("Enable Map Editing");
  const enableNodeSelectionAnimationsControlGroup = await page.getByLabel("Enable Node Selection Animations");
  const enableEdgeTrafficDirectionAnimationsControlGroup = await page.getByLabel("Enable Edge Traffic Direction Animations");

  const sidebarControlLocatorSelector = "div div:has(input[type='checkbox'])";
  const showViewControlsControl = showViewControlGroup.locator(sidebarControlLocatorSelector);
  const enableMapScrollingOnDragControl = enableMapScrollingOnDragControlGroup.locator(sidebarControlLocatorSelector);
  const enableMapEditingControl = enableMapEditingControlGroup.locator(sidebarControlLocatorSelector);
  const enableNodeSelectionAnimationsControl = enableNodeSelectionAnimationsControlGroup.locator(sidebarControlLocatorSelector);
  const enableEdgeTrafficDirectionAnimationsControl = enableEdgeTrafficDirectionAnimationsControlGroup.locator(sidebarControlLocatorSelector);

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

  // node selection animations enabled, but no node selected
  await expect(page.locator(".control.control-selected")).toBeEmpty();

  // CHECK CONTROL ACTIONS (upon click/edit)

  // check Show View Controls
  await showViewControlGroup.scrollIntoViewIfNeeded();
  await showViewControlGroup.click({ force: true });
  await expect(mapZoomInControl).not.toBeVisible();
  await expect(mapZoomOutControl).not.toBeVisible();

  // check enable map editing
  await enableMapEditingControlGroup.scrollIntoViewIfNeeded();
  await enableMapEditingControlGroup.click({ force: true });
  await expect(mapEditEdgeToggleControl).not.toBeVisible();
  await expect(mapEditNodeToggleControl).not.toBeVisible();
  await expect(mapAddEdgeControl).not.toBeVisible();
  await expect(mapAddNodeControl).not.toBeVisible();

  // check enable node selection animation
});