
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

export const defaultNodeTooltip = `
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
export const defaultCustomNodeTooltip = `
`;

const svgGauge = `
<svg xmlns="http://www.w3.org/2000/svg"
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
</svg>`;

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
