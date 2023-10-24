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
]
