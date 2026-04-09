import { LAYER_LIMIT } from "./constants.js"

export const ViewStrategies = [
  {
    label: 'Specify Static Center, No zoom on resize',
    value: 'static',
  },
  {
    label: 'Specify Lat/Lng Viewport, Zoom to fit on resize',
    value: 'viewport',
  },
  {
    label: 'Set Map Center from Variables, No Zoom on resize',
    value: 'variables',
  },
]

export const BaseTilesets = [
  {
    label: '[Blank Tileset]',
    value: null,
  },
  {
    label: 'ArcGIS Default Set',
    value: 'arcgis',
  },
  {
    label: 'Open Topography Map',
    value: 'opentopomap',
  },
  {
    label: 'USGS Satellite Imagery',
    value: 'usgs',
  },
  {
    label: 'ESRI World Shaded Relief',
    value: 'esri.shaded',
  },
  {
    label: 'Geoportail France',
    value: 'geoportail',
  },
  {
    label: 'CartoDB DarkMatter (Labeled)',
    value: 'cartodb.labeled',
  },
  {
    label: 'CartoDB DarkMatter (No Labels)',
    value: 'cartodb.unlabeled',
  },
]

export const TopologySources = [
  {
    label: "Manual (Local JSON)",
    value: "json"
  },
  {
    label: "Autodetect from Data",
    value: "autodetect"
  },
  {
    label: "Load separate URLs for each layer",
    value: "layerurls"
  },
  {
    label: "Load config and all topologies from one URL",
    value: "url"
  },
]

export const PoliticalBoundaryTilesets = [
  {
    label: '[No Political Boundaries]',
    value: null,
  },
  {
    label: '"Toner" Political Boundaries (Unlabeled)',
    value: 'toner.boundaries',
  },
]

export const PoliticalLabelTilesets = [
  {
    label: '[No Political Labels]',
    value: null,
  },
  {
    label: '"Toner" Political Labels',
    value: 'toner.labels',
  },
]

export const LegendPositionOptions = [
  {
    label: 'Bottom Right',
    value: 'bottomright',
  },
  {
    label: 'Bottom Left',
    value: 'bottomleft',
  },
  {
    label: 'Top Right',
    value: 'topright',
  },
]

export const LegendBehaviorOptions = [
  {
    label: 'Visible',
    value: 'visible',
  },
  {
    label: 'Minimized',
    value: 'minimized',
  },
];

export const monospacedFontSize = '10pt';

/**
 * An SVG image of a gauge with a rim and needle indicator.
 */
const svgGauge = `
  <svg xmlns="http://www.w3.org/2000/svg"
      role="graphics-symbol"
      aria-labelledby="Rate"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-linecap="round"
      stroke-linejoin="round"
      class="lucide lucide-gauge"
  >
      <path d="m12 14 4-4"/>
      <path d="M3.34 19a10 10 0 1 1 17.32 0"/>
  </svg>
`;

/**
 * An SVG image of an arrow pointing right, meeting with a vertical line at the arrow's point.
 */
export const svgArrowRightToLine = `
  <svg xmlns="http://www.w3.org/2000/svg"
    role="graphics-symbol"
    aria-labelledby="In Volume"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="2"
    stroke-linecap="round"
    stroke-linejoin="round"
    class="lucide lucide-arrow-right-to-line"
  >
    <path d="M17 12H3"/>
    <path d="m11 18 6-6-6-6"/>
    <path d="M21 5v14"/>
  </svg>`;

  /**
   * An SVG image of an arrow pointing left, away from a vertical line at the arrow's base.
   */
  export const svgArrowLeftFromLine = `
    <svg xmlns="http://www.w3.org/2000/svg"
      role="graphics-symbol"
      aria-labelledby="Out Volume"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      class="lucide lucide-arrow-left-from-line"
    >
      <path d="m9 6-6 6 6 6"/>
      <path d="M3 12h14"/>
      <path d="M21 19V5"/>
    </svg>
  `;

/**
 * The default tooltip markup to render for nodes.
 */
export const defaultNodeTooltip = `
  <div class="flow-tooltip">
    <strong>\${name}</strong>
  </div>
  <div class="flow-tooltip">
    <strong>${svgArrowRightToLine} \${inValue}</strong>
  </div>
  <div class="flow-tooltip">
    <strong>${svgArrowLeftFromLine} \${outValue}</strong>
  </div>
`;

/**
 * The initial/default markup to render for custom node tooltip markup.
 */
export const defaultCustomNodeTooltip = `
  <div class="flow-tooltip">
    <strong>\${name}</strong>
  </div>
  <div class="flow-tooltip">
    <strong>In Volume: \${inValue}</strong>
  </div>
  <div class="flow-tooltip">
    <strong>Out Volume: \${outValue}</strong>
  </div>
`;

/**
 * The initial/default markup to render for custom edge tooltip markup.
 */
export const defaultCustomEdgeTooltip = `
  <div class="flow-tooltip">
    <strong>
      \${forward.from} → \${forward.to}
      <br />
      Rate: \${forward.dataPoint}
    </strong>
  </div>
  <div class="flow-tooltip">
    <span>
      \${reverse.from} → \${reverse.to}
      <br />
      Rate: \${reverse.dataPoint}
    </span>
  </div>
`;

/**
 * The default tooltip markup to render for edges.
 */
export const defaultEdgeTooltip = `
  <div class="flow-tooltip">
    <strong>
      \${forward.from} → \${forward.to}
      <br />
      ${svgGauge} \${forward.dataPoint}
    </strong>
  </div>
  <div class="flow-tooltip">
    <span>
      \${reverse.from} → \${reverse.to}
      <br />
      ${svgGauge} \${reverse.dataPoint}
    </span>
  </div>
`;

/**
 * The tooltip for when "displayName" is set
 */
export const defaultDisplayNameTooltip = `
  <div class="flow-tooltip">
    <strong>
      \${meta.displayName}
    </strong>
  </div>
`;

// Options for Layers up to the Limit
export const LayerOptions = (()=>{
  let options = [];
  for(var i=1; i<LAYER_LIMIT; i++){
    options.push({
      label: `${i}`,
      value: i
    })
  }
  return options;
})()
