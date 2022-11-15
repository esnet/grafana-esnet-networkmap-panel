import { FieldConfigProperty, PanelPlugin, FieldOverrideContext, getFieldDisplayName } from '@grafana/data';
import { MapOptions } from './types';
import { MapPanel } from './MapPanel';
import { CustomTextArea } from './components/CustomTextArea';
import { CoordinateButton } from './components/CoordinateButton';
import { ViewportCoordinateButton } from './components/ViewportCoordinateButton';

const FieldsCategory = ['Choose Fields'];
const LayersCategory = ['Layer options'];
const SidebarCategory = ['Sidebar options'];
const LegendCategory = ['Legend options'];
const ViewCategory = ['View options'];
const QueryCategory = ['Ad-hoc Query Variable Bindings'];

export const plugin = new PanelPlugin<MapOptions>(MapPanel);

function checkBool(settingName: string, value: any) {
  return function (config: MapOptions) {
    return config[settingName] === value;
  };
}
function checkInArray(settingName: string, values: any[]) {
  return function (config: MapOptions) {
    for (var i = 0; i < values.length; i++) {
      if (values[i] === config[settingName]) {
        return true;
      }
    }
    return false;
  };
}

async function buildChoices(context: FieldOverrideContext) {
  const options: any[] = [{ value: null, label: '- No Mapping -' }];
  if (context && context.data) {
    for (const frame of context.data) {
      const frameName = frame.refId;
      for (const field of frame.fields) {
        const name = getFieldDisplayName(field, frame, context.data);
        const value = field.name;
        options.push({ value, label: (!!frameName ? '[' + frameName + '] ' : '') + name });
      }
    }
  }
  return Promise.resolve(options);
}

async function buildChoicesWithSuggestions(context: FieldOverrideContext) {
  const options: any[] = [{ value: null, label: '- No Mapping -' }];
  if (context !== undefined && context.getSuggestions) {
    const suggestions: any[] = context.getSuggestions();
    suggestions.forEach((suggestion: any) => {
      if (suggestion.orgin === 'template') {
        options.push(suggestion);
      }
    });
  }
  if (context && context.data) {
    for (const frame of context.data) {
      const frameName = frame.refId;
      for (const field of frame.fields) {
        const name = getFieldDisplayName(field, frame, context.data);
        const value = field.name;
        options.push({ value, label: (!!frameName ? '[' + frameName + '] ' : '') + name });
      }
    }
  }
  return Promise.resolve(options);
}

// -------------------- Network Map Panel Options --------------------
plugin.setPanelOptions((builder) => {
  builder.addSelect({
    path: 'initialViewStrategy',
    name: 'Map Initial View Strategy',
    description: 'Strategy to set the initial center and zoom level of the map',
    settings: {
      allowCustomValue: false,
      options: [],
      getOptions: async (context: FieldOverrideContext) => {
        return Promise.resolve([
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
        ]);
      },
    },
  });
  //////////////
  // Variables for center and zoom level options
  //////////////
  builder.addSelect({
    path: 'latitudeVar',
    name: 'Latitude Variable',
    description: 'Select a dashboard or query variable to set initial latitude of map',
    showIf: checkBool('initialViewStrategy', 'variables'),
    settings: {
      allowCustomValue: false,
      options: [],
      getOptions: buildChoicesWithSuggestions,
    },
  });
  builder.addSelect({
    path: 'longitudeVar',
    name: 'Longitude Variable',
    description: 'Select a dashboard or query variable to set initial latitude of map',
    showIf: checkBool('initialViewStrategy', 'variables'),
    settings: {
      allowCustomValue: false,
      options: [],
      getOptions: buildChoicesWithSuggestions,
    },
  });
  //////////////
  // Static center and zoom level options
  //////////////
  builder.addCustomEditor({
    id: 'setLatLngZoom',
    path: 'setLatLngZoom',
    name: 'Set Default Latitude / Longitude / Zoom',
    description:
      'Set the default Latitude, Longitude and Zoom level to the current map Latitude, Longitude and Zoom level.',
    showIf: checkBool('initialViewStrategy', 'static'),
    settings: { label: 'Set Lat/Lng & Zoom' },
    editor: CoordinateButton,
  });
  builder.addCustomEditor({
    id: 'startLat',
    path: 'startLat',
    name: 'Starting Latitude of map',
    description: 'This will be the center of the map when it loads. (numbers only)',
    showIf: checkBool('initialViewStrategy', 'static'),
    defaultValue: 39,
    settings: { useTextarea: true, rows: 1 },
    editor: CustomTextArea,
  });
  builder.addCustomEditor({
    id: 'startLng',
    path: 'startLng',
    name: 'Starting Longitude of map',
    description: 'This will be the center of the map when it loads. (numbers only)',
    showIf: checkBool('initialViewStrategy', 'static'),
    defaultValue: -98,
    settings: { useTextarea: true, rows: 1 },
    editor: CustomTextArea,
  });
  builder.addSliderInput({
    path: 'startZoom',
    name: 'Starting zoom level of map',
    showIf: checkInArray('initialViewStrategy', ['static', 'variables']),
    defaultValue: 5,
    settings: {
      min: 1,
      max: 15,
      step: 0.5,
    },
  });
  //////////////
  // "Viewport" top-left, bottom-right and auto-resize options
  //////////////
  builder.addCustomEditor({
    id: 'setViewport',
    path: 'setViewport',
    name: 'Set Zoom Viewport to Current Map View',
    description: 'Set the top-left Lat & Lng and bottom-right Lat & Lng to the currently displayed map viewport.',
    showIf: checkBool('initialViewStrategy', 'viewport'),
    settings: { label: 'Set Viewport Coordinates' },
    editor: ViewportCoordinateButton,
  });
  builder.addCustomEditor({
    id: 'viewportTopLeftLat',
    path: 'viewportTopLeftLat',
    name: 'Initial viewport: Top Left: Latitude',
    description: 'Zoom viewport: Top, left coordinate, Latitude. (numbers only)',
    showIf: checkBool('initialViewStrategy', 'viewport'),
    settings: { useTextarea: true, rows: 1 },
    editor: CustomTextArea,
  });
  builder.addCustomEditor({
    id: 'viewportTopLeftLng',
    path: 'viewportTopLeftLng',
    name: 'Initial viewport: Top Left: Longitude',
    description: 'Zoom viewport: Top, left coordinate, Longitude. (numbers only)',
    showIf: checkBool('initialViewStrategy', 'viewport'),
    settings: { useTextarea: true, rows: 1 },
    editor: CustomTextArea,
  });
  builder.addCustomEditor({
    id: 'viewportBottomRightLat',
    path: 'viewportBottomRightLat',
    name: 'Initial viewport: Bottom Right: Latitude',
    description: 'Zoom viewport: Bottom, right coordinate, Latitude. (numbers only)',
    showIf: checkBool('initialViewStrategy', 'viewport'),
    settings: { useTextarea: true, rows: 1 },
    editor: CustomTextArea,
  });
  builder.addCustomEditor({
    id: 'viewportBottomRightLng',
    path: 'viewportBottomRightLng',
    name: 'Initial viewport: Bottom Right: Longitude',
    description: 'Zoom viewport: Bottom, right coordinate, Longitude. (numbers only)',
    showIf: checkBool('initialViewStrategy', 'viewport'),
    settings: { useTextarea: true, rows: 1 },
    editor: CustomTextArea,
  });

  builder.addColorPicker({
    path: 'background',
    name: 'Map Background Color',
    description: 'The default color for the background, with no tileset',
    defaultValue: '#EDEDED',
  });
  builder.addSelect({
    path: 'tileSetLayer',
    name: 'Geographic Tileset',
    description: 'Select a geographical tileset for the map.',
    settings: {
      allowCustomValue: false,
      options: [],
      getOptions: async (context: FieldOverrideContext) => {
        return Promise.resolve([
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
        ]);
      },
    },
  });
  builder.addSelect({
    path: 'boundaryLayer',
    name: 'Political Boundary Tileset',
    description: 'Select a political boundary tileset for the map.',
    settings: {
      allowCustomValue: false,
      options: [],
      getOptions: async (context: FieldOverrideContext) => {
        return Promise.resolve([
          {
            label: '[No Political Boundaries]',
            value: null,
          },
          {
            label: '"Toner" Political Boundaries (Unlabeled)',
            value: 'toner.boundaries',
          },
        ]);
      },
    },
  });
  builder.addSelect({
    path: 'labelLayer',
    name: 'Political Label Tileset',
    description: 'Select a political label tileset for the map.',
    settings: {
      allowCustomValue: false,
      options: [],
      getOptions: async (context: FieldOverrideContext) => {
        return Promise.resolve([
          {
            label: '[No Political Labels]',
            value: null,
          },
          {
            label: '"Toner" Political Labels',
            value: 'toner.labels',
          },
        ]);
      },
    },
  });

  builder.addBooleanSwitch({
    path: 'showViewControls',
    name: 'Show View Controls',
    description: 'show zoom in/out and "home" button',
    category: ViewCategory,
    defaultValue: true,
  });
  builder.addBooleanSwitch({
    path: 'enableScrolling',
    name: 'Enable Map Scrolling on Drag',
    description: 'allows user to scroll map on drag',
    category: ViewCategory,
    defaultValue: true,
  });
  builder.addBooleanSwitch({
    path: 'enableEditing',
    name: 'Enable Map Editing',
    description: 'Enable map editing controls in edit mode',
    category: ViewCategory,
    defaultValue: true,
  });
  builder.addBooleanSwitch({
    path: 'enableAnimations',
    name: 'Enable Traffic Direction Animations',
    description: 'Enable animations for traffic direction on edges. May be CPU/GPU intensive in some browsers.',
    category: ViewCategory,
    defaultValue: true,
  });

  // -------------------- Layer Options -------------------
  builder.addBooleanSwitch({
    path: 'layer1',
    name: 'Layer 1 on',
    category: LayersCategory,
    defaultValue: true,
  });
  builder.addCustomEditor({
    id: 'mapjsonL1',
    path: 'mapjsonL1',
    name: 'Layer 1 Map data (json)',
    category: LayersCategory,
    showIf: checkBool('layer1', true),
    description: 'JSON with edges and nodes of network map',
    defaultValue: '{"edges":[], "nodes":[]}',
    settings: { useTextarea: true, rows: 10 },
    editor: CustomTextArea,
  });
  builder.addColorPicker({
    path: 'color1',
    name: 'Layer 1 Default color',
    category: LayersCategory,
    showIf: checkBool('layer1', true),
    description: 'The default color for nodes and links on Layer 1',
    defaultValue: 'grey',
  });
  builder.addTextInput({
    path: 'endpointIdL1',
    name: 'Layer 1 Endpoint Identifier',
    category: LayersCategory,
    showIf: checkBool('layer1', true),
    description: 'The endpoint identifier in the meta data to match to the query',
    defaultValue: 'pops',
  });
  builder.addColorPicker({
    path: 'nodeHighlightL1',
    name: 'Layer 1 Node highlight color',
    category: LayersCategory,
    showIf: checkBool('layer1', true),
    description: 'The color to highlight nodes that match the query',
    defaultValue: 'red',
  });
  builder.addSliderInput({
    path: 'nodeWidthL1',
    name: 'Layer 1 Node Size',
    category: LayersCategory,
    showIf: checkBool('layer1', true),
    defaultValue: 5,
    settings: {
      min: 1,
      max: 15,
      step: 0.5,
    },
  });
  builder.addSliderInput({
    path: 'edgeWidthL1',
    name: 'Layer 1 Edge Width',
    defaultValue: 3,
    category: LayersCategory,
    showIf: checkBool('layer1', true),
    settings: {
      min: 1,
      max: 15,
      step: 0.5,
    },
  });
  builder.addSliderInput({
    path: 'pathOffsetL1',
    name: 'Layer 1 Edge Offset',
    description: 'The offset between AZ path and ZA path',
    defaultValue: 3,
    category: LayersCategory,
    showIf: checkBool('layer1', true),
    settings: {
      min: 1,
      max: 15,
      step: 0.5,
    },
  });

  builder.addBooleanSwitch({
    path: 'layer2',
    name: 'Layer 2 on',
    category: LayersCategory,
    defaultValue: false,
  });
  builder.addCustomEditor({
    id: 'mapjsonL2',
    path: 'mapjsonL2',
    name: 'Layer 2 Map data (json)',
    category: LayersCategory,
    showIf: checkBool('layer2', true),
    description: 'JSON with edges and nodes of network map',
    defaultValue: '{"edges":[], "nodes":[]}',
    settings: { useTextarea: true, rows: 10 },
    editor: CustomTextArea,
  });
  builder.addColorPicker({
    path: 'color2',
    name: 'Layer 2 Default color',
    category: LayersCategory,
    showIf: checkBool('layer2', true),
    description: 'The default color for nodes and links on Layer 2',
    defaultValue: 'grey',
  });
  builder.addTextInput({
    path: 'endpointIdL2',
    name: 'Layer 2 Endpoint Identifier',
    category: LayersCategory,
    description: 'The endpoint identifier in the meta data to match to the query',
    showIf: checkBool('layer2', true),
    defaultValue: 'pops',
  });
  builder.addColorPicker({
    path: 'nodeHighlightL2',
    name: 'Layer 2 Node highlight color',
    category: LayersCategory,
    description: 'The color to highlight nodes that match the query',
    showIf: checkBool('layer2', true),
    defaultValue: 'red',
  });
  builder.addSliderInput({
    path: 'nodeWidthL2',
    name: 'Layer 2 Node Size',
    category: LayersCategory,
    showIf: checkBool('layer2', true),
    defaultValue: 5,
    settings: {
      min: 1,
      max: 15,
      step: 0.5,
    },
  });
  builder.addSliderInput({
    path: 'edgeWidthL2',
    name: 'Layer 2 Edge Width',
    defaultValue: 3,
    category: LayersCategory,
    showIf: checkBool('layer2', true),
    settings: {
      min: 1,
      max: 15,
      step: 0.5,
    },
  });
  builder.addSliderInput({
    path: 'pathOffsetL2',
    name: 'Layer 2 Edge Offset',
    description: 'The offset between AZ path and ZA path',
    defaultValue: 3,
    category: LayersCategory,
    showIf: checkBool('layer2', true),
    settings: {
      min: 1,
      max: 15,
      step: 0.5,
    },
  });

  // Layer 3
  builder.addBooleanSwitch({
    path: 'layer3',
    name: 'Layer 3 on',
    category: LayersCategory,
    defaultValue: false,
  });
  builder.addCustomEditor({
    id: 'mapjsonL3',
    path: 'mapjsonL3',
    name: 'Layer 3 Map data (json)',
    category: LayersCategory,
    showIf: checkBool('layer3', true),
    description: 'JSON with edges and nodes of network map',
    defaultValue: '{"edges":[], "nodes":[]}',
    settings: { useTextarea: true, rows: 10 },
    editor: CustomTextArea,
  });
  builder.addColorPicker({
    path: 'color3',
    name: 'Layer 3 Default color',
    category: LayersCategory,
    showIf: checkBool('layer3', true),
    description: 'The default color for nodes and links on Layer 3',
    defaultValue: 'grey',
  });
  builder.addTextInput({
    path: 'endpointIdL3',
    name: 'Layer 3 Endpoint Identifier',
    category: LayersCategory,
    description: 'The endpoint identifier in the meta data to match to the query',
    showIf: checkBool('layer3', true),
    defaultValue: 'pops',
  });
  builder.addColorPicker({
    path: 'nodeHighlightL3',
    name: 'Layer 3 Node highlight color',
    category: LayersCategory,
    description: 'The color to highlight nodes that match the query',
    showIf: checkBool('layer3', true),
    defaultValue: 'red',
  });
  builder.addSliderInput({
    path: 'nodeWidthL3',
    name: 'Layer 3 Node Size',
    category: LayersCategory,
    showIf: checkBool('layer3', true),
    defaultValue: 5,
    settings: {
      min: 1,
      max: 15,
      step: 0.5,
    },
  });
  builder.addSliderInput({
    path: 'edgeWidthL3',
    name: 'Layer 3 Edge Width',
    defaultValue: 3,
    category: LayersCategory,
    showIf: checkBool('layer3', true),
    settings: {
      min: 1,
      max: 15,
      step: 0.5,
    },
  });
  builder.addSliderInput({
    path: 'pathOffsetL3',
    name: 'Layer 3 Edge Offset',
    description: 'The offset between AZ path and ZA path',
    defaultValue: 3,
    category: LayersCategory,
    showIf: checkBool('layer3', true),
    settings: {
      min: 1,
      max: 15,
      step: 0.5,
    },
  });

  // -------------------- Choose Fields --------------------
  builder.addTextInput({
    path: 'srcFieldLabelL1',
    name: 'Layer 1 Source Field Label',
    description: "Label to be used in edge tooltips for the 'Source' field",
    category: FieldsCategory,
    showIf: checkBool('layer1', true),
    defaultValue: 'From:',
  });
  builder.addSelect({
    path: 'srcFieldL1',
    name: 'Layer 1 Source Field',
    description: 'Select the field to match source nodes',
    category: FieldsCategory,
    showIf: checkBool('layer1', true),
    settings: {
      allowCustomValue: false,
      options: [],
      getOptions: buildChoices,
    },
  });
  builder.addTextInput({
    path: 'dstFieldLabelL1',
    name: 'Layer 1 Destination Field Label',
    description: "Label to be used in edge tooltips for the 'Destination' field",
    category: FieldsCategory,
    showIf: checkBool('layer1', true),
    defaultValue: 'To:',
  });
  builder.addSelect({
    path: 'dstFieldL1',
    name: 'Layer 1 Destination Field',
    description: 'Select the field to match destination nodes',
    category: FieldsCategory,
    showIf: checkBool('layer1', true),
    settings: {
      allowCustomValue: false,
      options: [],
      getOptions: buildChoices,
    },
  });
  builder.addTextInput({
    path: 'dataFieldLabelL1',
    name: 'Layer 1 Data Field Label',
    description: "Label to be used in edge tooltips for the 'Inbound/Outbound' data field",
    category: FieldsCategory,
    showIf: checkBool('layer1', true),
    defaultValue: 'Volume:',
  });
  builder.addSelect({
    path: 'inboundValueFieldL1',
    name: 'Layer 1 Inbound Value Field',
    description: 'Select the field to use for A-Z traffic values',
    showIf: checkBool('layer1', true),
    category: FieldsCategory,
    settings: {
      allowCustomValue: false,
      options: [],
      getOptions: buildChoices,
    },
  });
  builder.addSelect({
    path: 'outboundValueFieldL1',
    name: 'Layer 1 Outbound Value Field',
    description: 'Select the field to use for Z-A traffic values',
    showIf: checkBool('layer1', true),
    category: FieldsCategory,
    settings: {
      allowCustomValue: false,
      options: [],
      getOptions: buildChoices,
    },
  });
  builder.addTextInput({
    path: 'srcFieldLabelL2',
    name: 'Layer 2 Source Field Label',
    description: "Label to be used in edge tooltips for the 'Source' field",
    category: FieldsCategory,
    showIf: checkBool('layer2', true),
    defaultValue: 'From:',
  });
  builder.addSelect({
    path: 'srcFieldL2',
    name: 'Layer 2 Source Field',
    description: 'Select the field to match source nodes',
    showIf: checkBool('layer2', true),
    category: FieldsCategory,
    settings: {
      allowCustomValue: false,
      options: [],
      getOptions: buildChoices,
    },
  });
  builder.addTextInput({
    path: 'dstFieldLabelL2',
    name: 'Layer 2 Destination Field Label',
    description: "Label to be used in edge tooltips for the 'Destination' field",
    category: FieldsCategory,
    showIf: checkBool('layer2', true),
    defaultValue: 'To:',
  });
  builder.addSelect({
    path: 'dstFieldL2',
    name: 'Layer 2 Destination Field',
    description: 'Select the field to match destination nodes',
    showIf: checkBool('layer2', true),
    category: FieldsCategory,
    settings: {
      allowCustomValue: false,
      options: [],
      getOptions: buildChoices,
    },
  });
  builder.addTextInput({
    path: 'dataFieldLabelL2',
    name: 'Layer 2 Data Field Label',
    description: "Label to be used in edge tooltips for the 'Inbound/Outbound' data field",
    category: FieldsCategory,
    showIf: checkBool('layer2', true),
    defaultValue: 'Volume:',
  });
  builder.addSelect({
    path: 'inboundValueFieldL2',
    name: 'Layer 2 Inbound Value Field',
    description: 'Select the field to use for A-Z traffic values',
    showIf: checkBool('layer2', true),
    category: FieldsCategory,
    settings: {
      allowCustomValue: false,
      options: [],
      getOptions: buildChoices,
    },
  });
  builder.addSelect({
    path: 'outboundValueFieldL2',
    name: 'Layer 2 Outbound Value Field',
    description: 'Select the field to use for Z-A traffic values',
    showIf: checkBool('layer2', true),
    category: FieldsCategory,
    settings: {
      allowCustomValue: false,
      options: [],
      getOptions: buildChoices,
    },
  });
  builder.addTextInput({
    path: 'srcFieldLabelL3',
    name: 'Layer 3 Source Field Label',
    description: "Label to be used in edge tooltips for the 'Source' field",
    category: FieldsCategory,
    showIf: checkBool('layer3', true),
    defaultValue: 'From:',
  });
  builder.addSelect({
    path: 'srcFieldL3',
    name: 'Layer 3 Source Field',
    description: 'Select the field to match source nodes',
    category: FieldsCategory,
    showIf: checkBool('layer3', true),
    settings: {
      allowCustomValue: false,
      options: [],
      getOptions: buildChoices,
    },
  });
  builder.addTextInput({
    path: 'dstFieldLabelL3',
    name: 'Layer 3 Destination Field Label',
    description: "Label to be used in edge tooltips for the 'Destination' field",
    category: FieldsCategory,
    showIf: checkBool('layer3', true),
    defaultValue: 'To:',
  });
  builder.addSelect({
    path: 'dstFieldL3',
    name: 'Layer 3 Destination Field',
    description: 'Select the field to match destination nodes',
    category: FieldsCategory,
    showIf: checkBool('layer3', true),
    settings: {
      allowCustomValue: false,
      options: [],
      getOptions: buildChoices,
    },
  });
  builder.addTextInput({
    path: 'dataFieldLabelL3',
    name: 'Layer 3 Data Field Label',
    description: "Label to be used in edge tooltips for the 'Inbound/Outbound' data field",
    category: FieldsCategory,
    showIf: checkBool('layer3', true),
    defaultValue: 'Volume:',
  });
  builder.addSelect({
    path: 'inboundValueFieldL3',
    name: 'Layer 3 Inbound Value Field',
    description: 'Select the field to use for A-Z traffic values',
    showIf: checkBool('layer3', true),
    category: FieldsCategory,
    settings: {
      allowCustomValue: false,
      options: [],
      getOptions: buildChoices,
    },
  });
  builder.addSelect({
    path: 'outboundValueFieldL3',
    name: 'Layer 3 Outbound Value Field',
    description: 'Select the field to use for Z-A traffic values',
    showIf: checkBool('layer3', true),
    category: FieldsCategory,
    settings: {
      allowCustomValue: false,
      options: [],
      getOptions: buildChoices,
    },
  });
  // -------------------- Ad-Hoc Query Variable Bindings --------------------
  builder.addTextInput({
    path: 'dashboardVarL1',
    name: 'Layer 1 Dashboard Variable',
    showIf: checkBool('layer1', true),
    category: QueryCategory,
    defaultValue: 'l1edge',
  });
  builder.addTextInput({
    path: 'srcVarL1',
    name: 'Binding: Edge "Source" Layer 1',
    showIf: checkBool('layer1', true),
    category: QueryCategory,
    defaultValue: 'meta.device_info.loc_name',
  });
  builder.addTextInput({
    path: 'dstVarL1',
    name: 'Binding: Edge "Destination" Layer 1',
    showIf: checkBool('layer1', true),
    category: QueryCategory,
    defaultValue: 'meta.remote.loc_name',
  });
  builder.addTextInput({
    path: 'dashboardVarL2',
    name: 'Layer 2 Dashboard Variable',
    showIf: checkBool('layer2', true),
    category: QueryCategory,
    defaultValue: 'l2edge',
  });
  builder.addTextInput({
    path: 'srcVarL2',
    name: 'Binding: Edge "Source" Layer 2',
    showIf: checkBool('layer2', true),
    category: QueryCategory,
    defaultValue: 'meta.device',
  });
  builder.addTextInput({
    path: 'dstVarL2',
    name: 'Binding: Edge "Destination" Layer 2',
    showIf: checkBool('layer2', true),
    category: QueryCategory,
    defaultValue: 'meta.org.short_name',
  });
  builder.addTextInput({
    path: 'dashboardVarL3',
    name: 'Layer 3 Dashboard Variable',
    showIf: checkBool('layer3', true),
    category: QueryCategory,
    defaultValue: 'l3edge',
  });
  builder.addTextInput({
    path: 'srcVarL3',
    name: 'Binding: Edge "Source" Layer 3',
    showIf: checkBool('layer3', true),
    category: QueryCategory,
    defaultValue: 'meta.device_info.loc_name',
  });
  builder.addTextInput({
    path: 'dstVarL3',
    name: 'Binding: Edge "Destination" Layer 3',
    showIf: checkBool('layer3', true),
    category: QueryCategory,
    defaultValue: 'meta.remote.loc_name',
  });

  // -------------------- Sidebar Options --------------------
  builder.addBooleanSwitch({
    path: 'showSidebar',
    name: 'Show Map Sidebar',
    description: 'Show sidebar. If hidden, tooltips will appear on hover.',
    category: SidebarCategory,
    defaultValue: true,
  });
  builder.addBooleanSwitch({
    path: 'legendL1',
    name: 'Show Layer 1 toggle',
    category: SidebarCategory,
    showIf: checkBool('showSidebar', true),
    defaultValue: true,
  });
  builder.addTextInput({
    path: 'layerName1',
    name: 'Layer 1 Display Name',
    category: SidebarCategory,
    showIf: checkBool('showSidebar', true),
    defaultValue: 'layer 1',
  });
  builder.addBooleanSwitch({
    path: 'legendL2',
    name: 'Show Layer 2 toggle',
    category: SidebarCategory,
    showIf: checkBool('showSidebar', true),
    defaultValue: true,
  });
  builder.addTextInput({
    path: 'layerName2',
    name: 'Layer 2 Display Name',
    category: SidebarCategory,
    showIf: checkBool('showSidebar', true),
    defaultValue: 'layer 2',
  });
  builder.addBooleanSwitch({
    path: 'legendL3',
    name: 'Show Layer 3 toggle',
    category: SidebarCategory,
    showIf: checkBool('showSidebar', true),
    defaultValue: true,
  });
  builder.addTextInput({
    path: 'layerName3',
    name: 'Layer 3 Display Name',
    category: SidebarCategory,
    showIf: checkBool('showSidebar', true),
    defaultValue: 'layer 3',
  });

  // -------------------- Legend Options --------------------
  builder.addBooleanSwitch({
    path: 'showLegend',
    name: 'Show Map Legend',
    description: 'show a traffic levels legend at the bottom of the map',
    category: LegendCategory,
    defaultValue: true,
  });
  builder.addSliderInput({
    path: 'legendColumnLength',
    name: 'Legend Items per Column',
    category: LegendCategory,
    showIf: checkBool('showLegend', true),
    defaultValue: 3,
    settings: {
      min: 1,
      max: 12,
      step: 1,
    },
  });
  builder.addSelect({
    path: 'legendPosition',
    name: 'Legend Position',
    category: LegendCategory,
    showIf: checkBool('showLegend', true),
    description: 'position of the legend on the map',
    defaultValue: 'bottomleft',
    settings: {
      allowCustomValue: false,
      options: [
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
      ],
    },
  });
  builder.addSelect({
    path: 'legendDefaultBehavior',
    name: 'Legend Default Behavior',
    category: LegendCategory,
    showIf: checkBool('showLegend', true),
    description: 'should the legend be minimized or visible by default?',
    defaultValue: 'visible',
    settings: {
      allowCustomValue: false,
      options: [
        {
          label: 'Visible',
          value: 'visible',
        },
        {
          label: 'Minimized',
          value: 'minimized',
        },
      ],
    },
  });
});

plugin.useFieldConfig({
  disableStandardOptions: [
    FieldConfigProperty.NoValue,
    FieldConfigProperty.Max,
    FieldConfigProperty.Min,
    FieldConfigProperty.DisplayName,
  ],
});
