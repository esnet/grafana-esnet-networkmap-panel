import { expect, Locator, Page } from '@playwright/test';
import { createTheme } from "@grafana/data";
import { PubSub } from "../src/components/lib/pubsub";
import { IFlowSheet } from "../src/types";
import { reverseStr } from "../test/utils";
import { IFixtures } from "./interfaces/Fixtures.interface";
import { IThreshold } from "./interfaces/Threshold.interface";
import { BasicColorMatcher } from "./matchers/BasicColorMatcher";
import { pluginTest as ecTest } from "./plugin-def";
import { getEditNetworkMapPanelUrl } from "./util/urlHelpers";
import { topologySheetUrl as topologyUrl, flowSheets } from './e2e.config.json';
import { setupFixtures } from './util/fixtures';


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

/**
 *  Checks the color of strokes for a given array of edge names.
 * */
const getCheckStrokeColorFn = (page: Page) => {
  return async (edgeNames: string[], colorNameMatcher?: RegExp | string) => {
    // actual paths in gray by default
    let edgeCount = edgeNames.length;
    for (const testEdge of edgeNames) {
      const testEdgeAlt = testEdge.split('--').reverse().join('--');
      console.log(`Test Edge: ${testEdge}`);
      // get plain edges, hence .edge class, as opposed to .control-edge
      const edgeLocator: Locator = await page.locator(`.edge.edge-az-${testEdge}, .edge.edge-za-${testEdgeAlt}`);
      await expect(edgeLocator).toHaveCSS('stroke', colorNameMatcher ?? BasicColorMatcher.GREY);
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

ecTest.describe('edge coloration', () => {

  setupFixtures(ecTest);

  ecTest("test edge coloration on default load", async ({ page, fixtures }: { page: Page, fixtures: IFixtures }) => {
    // load plugin edit page
    const _fnName = "edgeColoration.spec['test edge coloration on default load']";
    const { targetDashboardUid, targetDashboard, targetPanelId: allFlowsPanelId, orgId } = fixtures;
    const { targetPanelId: partialFlowsPanelId } = fixtures;

    // navigate to first panel for testing all flows

    expect(targetDashboard).toBeDefined();
    const editNetworkMapPanelUrl = `${await getEditNetworkMapPanelUrl(targetDashboardUid, targetDashboard!, allFlowsPanelId, orgId)}`;
    await page.goto(editNetworkMapPanelUrl);

    // wait for page to load up canvas
    await page.waitForSelector("[aria-label='Panel editor content'] esnet-map-canvas");

    // on first render of a topology loaded from a remote URL

    // step 0: test default topology, should be gray

    // const layer1DefaultColorDropdownSelector = '[id="Layer 1: Basic Options"] > div:nth-child(3) > div:nth-child(2) > div > .css-efx5mg';
    const layer1DefaultColorDropdownSelector = '[id="Layer 1: Basic Options"] > div:nth-child(3) > div:nth-child(2) > div > div';
    let layer1DefaultColorDropdown = await page.locator(layer1DefaultColorDropdownSelector);
    let layer1DefaultColorDropdownSelected = await layer1DefaultColorDropdown.innerText();
    await expect(layer1DefaultColorDropdownSelected).toMatch(BasicColorMatcher.GREY);

    const topologyNodes = ['A', 'B', 'C'];
    const testEdges = topologyNodes.reduce((acc: string[], outNode: string) => {
      for (const inNode of topologyNodes) {
        if (inNode !== outNode) {
          acc.push(`${inNode}--${outNode}`);
        }
      }
      return acc;
    }, []);

    // check color of the strokes
    const checkStrokeColorFn = getCheckStrokeColorFn(page);
    await checkStrokeColorFn(testEdges);

    // step 1: trigger elements to fetch config remote url containing 'normal' topology

    // update topology source to URL
    const topologySidebarCtrlGrp = '[id="Network Map Panel"] [aria-label*="Topology Source"]';
    const topologySourceDropdownSelector = `${topologySidebarCtrlGrp} [role="combobox"]`;
    const topologySourceDropdown = page.locator(topologySourceDropdownSelector).first();
    await topologySourceDropdown.click();
    const topologySourceUrlDropdownItem = page.getByRole('listbox').locator('[aria-label*="Select option"]', { hasText: 'URL' });
    await topologySourceUrlDropdownItem.click();
    // provide URL
    const fetchConfigUrlField = await page.locator('[id="Network Map Panel"]').getByRole('textbox').first();
    await fetchConfigUrlField.fill(topologyUrl);
    // trigger the load
    let hasCompletedMapRender = false;
    // setup promise to wait for loading event
    const makeRenderPromise = (stateObj?: string, targetKey?: string) => {
      return new Promise<void>((res) => {
        const handle = setInterval(() => {
          if (targetKey && stateObj && stateObj[targetKey] !== undefined) {
            clearInterval(handle);
            res();
          } else if (hasCompletedMapRender) {
            clearInterval(handle);
            res();
          }
        }, 100);
      });
    };
    // setup subscription to watch for render event
    PubSub.subscribe('renderMap', () => {
      hasCompletedMapRender = true;
    }, this);
    makeRenderPromise();
    // trigger render
    await page.locator('[id="Network Map Panel"]').first().click();

    // step 1: navigate to second panel for testing partial flows

    const partialFlowsEditNetworkMapPanelUrl = `${await getEditNetworkMapPanelUrl(targetDashboardUid, targetDashboard!, partialFlowsPanelId, orgId)}`;
    await page.goto(partialFlowsEditNetworkMapPanelUrl);

    // wait for page to load up canvas
    await page.waitForSelector("[aria-label='Panel editor content'] esnet-map-canvas");

    // step 2: turn off edit mode
    await page.locator('#edge_edit_mode').click();

    // step 3: check render of partial data

    // define helper functions

    const disableAllQueries = async () => {
      const btnsToDisable: Locator[] = await page.getByTestId('query-editor-rows').getByLabel('Disable query').all();
      for (const currBtn of btnsToDisable) {
        const currBtnEl = await currBtn.elementHandle();
        if (!currBtnEl) {
          throw new Error(`[edgeColoration.spec.disableAllQueries]: Cannot find element handel for locator ${await currBtn.textContent()}`);
        }
        const ariaPressed = await currBtnEl.getAttribute('aria-pressed');
        if (ariaPressed === 'true') {
          await currBtn.click();
        }
      }
    };

    const enableTargetQuery = async (inFs: IFlowSheet) => {
      console.info(`[edgeColoration.spec.enableTargetQuery]: inFs name: ${inFs.name}`);
      const targetDisableBtn: Locator = page.getByTestId('query-editor-row').filter({ hasText: inFs.name }).getByRole('button', { name: 'Disable query' });
      const targetDisableBtnEl = await targetDisableBtn.elementHandle();
      const ariaPressed = await targetDisableBtnEl?.getAttribute('aria-pressed');
      if (ariaPressed !== 'true') {
        await targetDisableBtn.click();
      }
    };

    const testFlowSheet = async (inFs: IFlowSheet) => {

      // enable only the targeted flow sheet
      await disableAllQueries();
      await enableTargetQuery(inFs);

      // save dashboard changes and refresh page
      // TODO: @sanchezelton, check if initial grey state for edge coloration persists after merging refactoring of render code
      // if so, remove the following step
      await page.getByRole('button', { name: 'save' }).click();
      await page.getByRole('button', { name: 'Dashboard settings Save Dashboard Modal Save button' }).click();
      await page.getByTestId('fdc230').click();

      await page.getByTestId(/RefreshPicker/).click();

      // obtain thresholds
      const thresholds: IThreshold[] = await getThresholds(inFs, page);

      // check flowSheet expected threshold swatches vs. rendered values
      const { visualization } = createTheme();
      let expectedFlowEdges: Locator[];
      if (inFs.name === 'All') {
        expectedFlowEdges = await page.locator('.edge > .edge-az, .edge > .edge-za').all();
      } else {
        expectedFlowEdges = await page.locator(`.edge-az-${inFs.name}, .edge-za-${reverseStr(inFs.name)}`).all();
      }

      let expectedStroke;
      const matchingThreshhold = thresholds.find(t => t.expectedFlow === inFs.expectedFlow);
      if (!matchingThreshhold) {
        fail(`No matching threshold found for flowSheet ${inFs.name} with expectedFlow ${inFs.expectedFlow}`);
      } else {
        expectedStroke = matchingThreshhold.swatchColor;
      }

      for (const expectedFlowEdge of expectedFlowEdges) {
        let foundStroke = await expectedFlowEdge.getAttribute('stroke');
        if (!foundStroke?.startsWith('#')) {
          foundStroke = visualization.getColorByName(expectedStroke);
        }
        expect(visualization.getColorByName(expectedStroke)).toEqual(foundStroke);
      }
    };

    // run actual tests on flowsheet
    for (const fSheet of flowSheets) {
      await testFlowSheet(fSheet);
    }
  });

  // TODO: @sanchezelton, see ticket TERR-421
  ecTest.skip("test edge coloration on edge preset/custom color change", async ({ page, fixtures }: { page: Page, fixtures: IFixtures }) => {
    const testFlowSheet = async (inFs: IFlowSheet) => {
      // obtain thresholds
      const thresholds: IThreshold[] = await getThresholds(inFs, page);
      const { visualization } = createTheme();

      // check color selection change for thresholds
      const swatchPrefixes = ["dark-", "semi-dark-", "", "light-", "super-light-"];
      for (const threshold of thresholds) {
        if (!threshold.meta) {
          throw Error('[testFlowSheet]: A returned threshold does not have any meta data for edge context');
        }

        const mapRenderState: { [swatchKey: string]: boolean } = {};

        for (const prefix of swatchPrefixes) {
          for (const baseColor of visualization.palette) {
            // step 1: update the color in the threshold controls
            const targetColor = `${prefix}${baseColor}`;
            const targetColorHex = visualization.getColorByName(targetColor);

            // clicks the control to select the threshold
            threshold.locator.click();
            // clicks the new swatch color for the threshold selected
            const swatchBtn = page
              .getByTestId('data-testid-colorswatch')
              .getByLabel(new RegExp(targetColor))
              .first();
            mapRenderState[targetColor] = false;
            const thresholdChangeWatcher = async () => {
              await new Promise<void>((res, rej) => {
                document.addEventListener('thresholdsChanged', () => {
                  res();
                });
              });
            };
            await swatchBtn.click();
            await page.waitForFunction(thresholdChangeWatcher);
            // update threshold object for consistency
            threshold.swatchColor = targetColor;

            // confirm threshold object's endpoints have edges in map in the threshold's color
            const edges = await page.locator('esnet-map-canvas .edge > [class*="edge"]').all();
            for (const edge of edges) {
              const strokeColor = await edge.getAttribute('stroke');
              const edgeClass = await edge.getAttribute('class');
              if (!edgeClass) {
                const msg = 'There is incongruence between the topology in the map and this flow traffic; this edge could be not found in the topology';
                fail(`[testFlowSheet]: ${msg}:\n${JSON.stringify(edge, null, 2)}`);
              }
              if (!Array.isArray(threshold.meta!.endpoints)) {
                continue;
              }
              let hasMatchingEndpoint = false;
              if (threshold.meta!.endpoints[0] === 'All') {
                hasMatchingEndpoint = true;
              } else {
                let endpointMatchRegEx: RegExp = new RegExp(`(${threshold.meta!.endpoints.join('|')})`, 'i');
                const matchingEndpoints = threshold.meta?.endpoints;
                hasMatchingEndpoint = !!matchingEndpoints?.find(ep => endpointMatchRegEx.test(ep));
              }
              if (edgeClass && hasMatchingEndpoint) {
                expect(strokeColor).toBe(targetColorHex);
              }
            }
          }
        }
      }
    };

    // get thresholds swatch colors and expected flow levels

    for (const flowSheet of flowSheets) {
      testFlowSheet(flowSheet);
    }
  });
});
