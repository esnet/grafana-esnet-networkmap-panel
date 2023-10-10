import { standardEditorsRegistry, FieldConfigProperty, PanelPlugin, FieldOverrideContext, getFieldDisplayName } from '@grafana/data';
import { MapOptions } from './types';
import { MapPanel } from './MapPanel';
import { CustomTextArea } from './components/CustomTextArea';
import { CoordinateButton } from './components/CoordinateButton';
import { ViewportCoordinateButton } from './components/ViewportCoordinateButton';

import { ViewStrategies, BaseTilesets, PoliticalBoundaryTilesets, PoliticalLabelTilesets, LegendPositionOptions, LegendBehaviorOptions } from './options'

const customEditors = {
  "CoordinateButton": CoordinateButton,
  "CustomTextArea": CustomTextArea,
  "ViewportCoordinateButton": ViewportCoordinateButton
}

export const plugin = new PanelPlugin<MapOptions>(MapPanel);

function checkBool(settingName: string, value: any) {
  return function (config: MapOptions) {
    return config[settingName] === value;
  };
}

function checkBools(settings: object) {
  return function (config: MapOptions) {
    let keys = Object.keys(settings);
    for (let i = 0; i < keys.length; i++) {
      let settingName = keys[i];
      let value = settings[settingName];
      if (config[settingName] !== value) {
        return false;
      }
    }
    return true;
  };
}

function checkInArray(settingName: string, values: any[]) {
  return function (config: MapOptions) {
    for (let i = 0; i < values.length; i++) {
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

function resolveSetting(path, setting){
  let output = {...setting}
  if(output.hasOwnProperty('editor')){
    let editorName = output.editor;
    console.log(editorName);
    if(editorName in customEditors){
      output.editor = customEditors[editorName];
    } else {
      output.editor = standardEditorsRegistry.get(editorName).editor
    }
  }
  if(output.hasOwnProperty('category')){
    output.category = categories[output.category];
  }
  output.path = path;
  output.id = path;
  return output
}

let layerOptions = {

}

/*`
Name Remapping, so far:
viewportTopLeftLat -> viewport.top
viewportTopLeftLng -> viewport.left
viewportBottomRightLat -> viewport.bottom
viewportBottomRightLat -> viewport.right

startLat -> viewport.center.lat
startLng -> viewport.center.lng
startZoom -> viewport.zoom

tilesetLayer -> tileset.geographic
boundaryLayer -> tileset.boundaries
labelLayer -> tileset.labels
`*/

const options = {
  "initialViewStrategy": {
      editor: "select",
      name: 'Map Initial View Strategy',
      description: 'Strategy to set the initial center and zoom level of the map',
      settings: { allowCustomValue: false, options: ViewStrategies, },
  },
  //////////////
  // Variables for center and zoom level options
  //////////////
  "latitudeVar": {
    editor: "select",
    name: 'Latitude Variable',
    description: 'Select a dashboard or query variable to set initial latitude of map',
    showIf: checkBool('initialViewStrategy', 'variables'),
    settings: {
      allowCustomValue: false,
      getOptions: buildChoicesWithSuggestions,
    },
  },
  'longitudeVar': {
    editor: "select",
    name: 'Longitude Variable',
    description: 'Select a dashboard or query variable to set initial longitude of map',
    showIf: checkBool('initialViewStrategy', 'variables'),
    settings: {
      allowCustomValue: false,
      options: [],
      getOptions: buildChoicesWithSuggestions,
    },
  },
  //////////////
  // Static center and zoom level options
  //////////////
  'setLatLngZoom': {
    name: 'Set Default Latitude / Longitude / Zoom',
    description:
      'Set the default Latitude, Longitude and Zoom level to the current map Latitude, Longitude and Zoom level.',
    showIf: checkBool('initialViewStrategy', 'static'),
    settings: { label: 'Set Lat/Lng & Zoom' },
    editor: "CoordinateButton",
  },
  "viewport.center.lat": {
    name: 'Starting Latitude of map',
    description: 'This will be the center of the map when it loads',
    showIf: checkBool('initialViewStrategy', 'static'),
    defaultValue: 39,
    settings: { useTextarea: true, rows: 1 },
    editor: "CustomTextArea",
  },
  "viewport.center.lng": {
    name: 'Starting Longitude of map',
    description: 'This will be the center of the map when it loads',
    showIf: checkBool('initialViewStrategy', 'static'),
    defaultValue: -98,
    settings: { useTextarea: true, rows: 1 },
    editor: "CustomTextArea",
  },
  'viewport.zoom': {
    editor: "slider",
    name: 'Starting zoom level of map',
    showIf: checkInArray('initialViewStrategy', ['static', 'variables']),
    defaultValue: 5,
    settings: {
      min: 1,
      max: 15,
      step: 0.5,
    },
  },
  //////////////
  // "Viewport" top-left, bottom-right and auto-resize options
  //////////////
  "setViewport": {
    name: 'Set Zoom Viewport to Current Map View',
    description: 'Set the top-left Lat & Lng and bottom-right Lat & Lng to the currently displayed map viewport.',
    showIf: checkBool('initialViewStrategy', 'viewport'),
    settings: { label: 'Set Viewport Coordinates' },
    editor: "ViewportCoordinateButton",
  },
  "viewport.top": {
    name: 'Initial viewport: Top Left: Latitude',
    description: 'Zoom viewport: Top, left coordinate, Latitude. (numbers only)',
    showIf: checkBool('initialViewStrategy', 'viewport'),
    settings: { useTextarea: true, rows: 1 },
    editor: "CustomTextArea",
  },
  "viewport.left": {
    name: 'Initial viewport: Top Left: Longitude',
    description: 'Zoom viewport: Top, left coordinate, Longitude. (numbers only)',
    showIf: checkBool('initialViewStrategy', 'viewport'),
    settings: { useTextarea: true, rows: 1 },
    editor: "CustomTextArea",
  },
  "viewport.bottom": {
    name: 'Initial viewport: Bottom Right: Latitude',
    description: 'Zoom viewport: Bottom, right coordinate, Latitude. (numbers only)',
    showIf: checkBool('initialViewStrategy', 'viewport'),
    settings: { useTextarea: true, rows: 1 },
    editor: "CustomTextArea",
  },
  "viewport.right": {
    name: 'Initial viewport: Bottom Right: Longitude',
    description: 'Zoom viewport: Bottom, right coordinate, Longitude. (numbers only)',
    showIf: checkBool('initialViewStrategy', 'viewport'),
    settings: { useTextarea: true, rows: 1 },
    editor: "CustomTextArea",
  },
  ///////////////
  // Background layers & color
  ///////////////
  "background": {
    editor: 'color',
    name: 'Map Background Color',
    description: 'The default color for the background, with no tileset',
    defaultValue: '#EDEDED',
  },
  "tileset.geographic": {
    editor: "select",
    name: 'Geographic Tileset',
    description: 'Select a geographical tileset for the map.',
    settings: {
      allowCustomValue: false,
      options: BaseTilesets,
    },
  },
  "tileset.boundaries": {
    editor: "select",
    name: 'Political Boundary Tileset',
    description: 'Select a political boundary tileset for the map.',
    settings: {
      allowCustomValue: false,
      options: PoliticalBoundaryTilesets,
    },
  },
  "tileset.labels": {
    editor: "select",
    name: 'Political Label Tileset',
    description: 'Select a political label tileset for the map.',
    settings: {
      allowCustomValue: false,
      options: PoliticalLabelTilesets,
    },
  },
  "showViewControls": {
    editor: "boolean",
    name: 'Show View Controls',
    description: 'show zoom in/out and "home" button',
    category: "View Options",
    defaultValue: true,
  },
  "enableScrolling": {
    editor: "boolean",
    name: 'Enable Map Scrolling on Drag',
    description: 'allows user to scroll map on drag',
    category: "View Options",
    defaultValue: true,
  },
  "enableEditing": {
    editor: "boolean",
    name: 'Enable Map Editing',
    description: 'Enable map editing controls in edit mode',
    category: "View Options",
    defaultValue: true,
  },
  "enableNodeAnimation": {
    editor: "boolean",
    name: 'Enable Node Selection Animations',
    description: 'Enable throb animation for nodes. May be CPU/GPU intensive in some browsers.',
    category: "View Options",
    defaultValue: true,
  },
  "enableEdgeAnimation": {
    editor: "boolean",
    name: 'Enable Edge Traffic Direction Animations',
    description: 'Enable animations for traffic direction on edges. May be CPU/GPU intensive in some browsers.',
    category: "View Options",
    defaultValue: true,
  },

  // -------------------- Layer Options -------------------
  "layer1": {
    editor: "boolean",
    name: 'Layer 1 on',
    category: "Layer Options",
    defaultValue: true,
  },
  "jsonFromUrlL1": {
    editor: "boolean",
    name: 'Fetch Layer 1 JSON from URL',
    showIf: checkBool('layer1', true),
    category: "Layer Options",
    defaultValue: false,
  },
  "mapjsonUrlL1": {
    editor: "text",
    name: 'Layer 1 Map data (URL)',
    category: "Layer Options",
    showIf: checkBools({ layer1: true, jsonFromUrlL1: true }),
    description: 'URL that returns JSON with edges and nodes of network map',
    defaultValue: '',
  },
  "mapjsonL1": {
    id: 'mapjsonL1',
    name: 'Layer 1 Map data (json)',
    category: "Layer Options",
    showIf: checkBools({ layer1: true, jsonFromUrlL1: false }),
    description: 'JSON with edges and nodes of network map',
    defaultValue: '{"edges":[], "nodes":[]}',
    settings: { useTextarea: true, rows: 10 },
    editor: "CustomTextArea",
  },
  "color1": {
    editor: "color",
    name: 'Layer 1 Default color',
    category: "Layer Options",
    showIf: checkBool('layer1', true),
    description: 'The default color for nodes and links on Layer 1',
    defaultValue: 'grey',
  },
  "endpointIdL1": {
    editor: "text",
    name: 'Layer 1 Endpoint Identifier',
    category: "Layer Options",
    showIf: checkBool('layer1', true),
    description: 'The endpoint identifier in the meta data to match to the query',
    defaultValue: 'pops',
  },
  "nodeHighlightL1": {
    editor: "color",
    name: 'Layer 1 Node highlight color',
    category: "Layer Options",
    showIf: checkBool('layer1', true),
    description: 'The color to highlight nodes that match the query',
    defaultValue: 'red',
  },
  "nodeWidthL1": {
    editor: "slider",
    name: 'Layer 1 Node Size',
    category: "Layer Options",
    showIf: checkBool('layer1', true),
    defaultValue: 5,
    settings: {
      min: 1,
      max: 15,
      step: 0.5,
    },
  },
  "edgeWidthL1": {
    editor: "slider",
    name: 'Layer 1 Edge Width',
    defaultValue: 3,
    category: "Layer Options",
    showIf: checkBool('layer1', true),
    settings: {
      min: 1,
      max: 15,
      step: 0.5,
    },
  },
  "pathOffsetL1": {
    editor: "slider",
    name: 'Layer 1 Edge Offset',
    description: 'The offset between AZ path and ZA path',
    defaultValue: 3,
    category: "Layer Options",
    showIf: checkBool('layer1', true),
    settings: {
      min: 1,
      max: 15,
      step: 0.5,
    },
  },

  "layer2": {
    editor: "boolean",
    name: 'Layer 2 on',
    category: "Layer Options",
    defaultValue: false,
  },
  "jsonFromUrlL2": {
    editor: "boolean",
    name: 'Fetch Layer 2 JSON from URL',
    showIf: checkBool('layer2', true),
    category: "Layer Options",
    defaultValue: false,
  },
  "mapjsonUrlL2": {
    editor: "text",
    name: 'Layer 2 Map data (URL)',
    category: "Layer Options",
    showIf: checkBools({ layer2: true, jsonFromUrlL2: true }),
    description: 'URL that returns JSON with edges and nodes of network map',
    defaultValue: '',
  },
  'mapjsonL2': {
    id: 'mapjsonL2',
    name: 'Layer 2 Map data (json)',
    category: "Layer Options",
    showIf: checkBools({ layer2: true, jsonFromUrlL2: false }),
    description: 'JSON with edges and nodes of network map',
    defaultValue: '{"edges":[], "nodes":[]}',
    settings: { useTextarea: true, rows: 10 },
    editor: "CustomTextArea",
  },
  "color2": {
    editor: "color",
    name: 'Layer 2 Default color',
    category: "Layer Options",
    showIf: checkBool('layer2', true),
    description: 'The default color for nodes and links on Layer 2',
    defaultValue: 'grey',
  },
  "endpointIdL2": {
    editor: "text",
    name: 'Layer 2 Endpoint Identifier',
    category: "Layer Options",
    description: 'The endpoint identifier in the meta data to match to the query',
    showIf: checkBool('layer2', true),
    defaultValue: 'pops',
  },
  "nodeHighlightL2": {
    editor: "color",
    name: 'Layer 2 Node highlight color',
    category: "Layer Options",
    description: 'The color to highlight nodes that match the query',
    showIf: checkBool('layer2', true),
    defaultValue: 'red',
  },
  "nodeWidthL2": {
    editor: "slider",
    name: 'Layer 2 Node Size',
    category: "Layer Options",
    showIf: checkBool('layer2', true),
    defaultValue: 5,
    settings: {
      min: 1,
      max: 15,
      step: 0.5,
    },
  },
  "edgeWidthL2": {
    editor: "slider",
    name: 'Layer 2 Edge Width',
    defaultValue: 3,
    category: "Layer Options",
    showIf: checkBool('layer2', true),
    settings: {
      min: 1,
      max: 15,
      step: 0.5,
    },
  },
  "pathOffsetL2": {
    editor: "slider",
    name: 'Layer 2 Edge Offset',
    description: 'The offset between AZ path and ZA path',
    defaultValue: 3,
    category: "Layer Options",
    showIf: checkBool('layer2', true),
    settings: {
      min: 1,
      max: 15,
      step: 0.5,
    },
  },

  // Layer 3
  "layer3": {
    editor: "boolean",
    name: 'Layer 3 on',
    category: "Layer Options",
    defaultValue: false,
  },
  "jsonFromUrlL3": {
    editor: "boolean",
    name: 'Fetch Layer 3 JSON from URL',
    showIf: checkBool('layer3', true),
    category: "Layer Options",
    defaultValue: false,
  },
  "mapjsonUrlL3": {
    editor: "text",
    name: 'Layer 3 Map data (URL)',
    category: "Layer Options",
    showIf: checkBools({ layer3: true, jsonFromUrlL3: true }),
    description: 'URL that returns JSON with edges and nodes of network map',
    defaultValue: '',
  },
  'mapjsonL3': {
    id: 'mapjsonL3',
    name: 'Layer 3 Map data (json)',
    category: "Layer Options",
    showIf: checkBools({ layer3: true, jsonFromUrlL3: false }),
    description: 'JSON with edges and nodes of network map',
    defaultValue: '{"edges":[], "nodes":[]}',
    settings: { useTextarea: true, rows: 10 },
    editor: "CustomTextArea",
  },
  "color3": {
    editor: "color",
    name: 'Layer 3 Default color',
    category: "Layer Options",
    showIf: checkBool('layer3', true),
    description: 'The default color for nodes and links on Layer 3',
    defaultValue: 'grey',
  },
  "endpointIdL3": {
    editor: "text",
    name: 'Layer 3 Endpoint Identifier',
    category: "Layer Options",
    description: 'The endpoint identifier in the meta data to match to the query',
    showIf: checkBool('layer3', true),
    defaultValue: 'pops',
  },
  "nodeHighlightL3": {
    editor: "color",
    name: 'Layer 3 Node highlight color',
    category: "Layer Options",
    description: 'The color to highlight nodes that match the query',
    showIf: checkBool('layer3', true),
    defaultValue: 'red',
  },
  "nodeWidthL3": {
    editor: "slider",
    name: 'Layer 3 Node Size',
    category: "Layer Options",
    showIf: checkBool('layer3', true),
    defaultValue: 5,
    settings: {
      min: 1,
      max: 15,
      step: 0.5,
    },
  },
  "edgeWidthL3": {
    editor: "slider",
    name: 'Layer 3 Edge Width',
    defaultValue: 3,
    category: "Layer Options",
    showIf: checkBool('layer3', true),
    settings: {
      min: 1,
      max: 15,
      step: 0.5,
    },
  },
  "pathOffsetL3": {
    editor: "slider",
    name: 'Layer 3 Edge Offset',
    description: 'The offset between AZ path and ZA path',
    defaultValue: 3,
    category: "Layer Options",
    showIf: checkBool('layer3', true),
    settings: {
      min: 1,
      max: 15,
      step: 0.5,
    },
  },

  // -------------------- Tooltip Category ---------------------
  "srcFieldLabelL1": {
    editor: "text",
    name: 'Layer 1 "Source" Field Label',
    description: 'Label for "source" datapoint for layer 1',
    category: 'Tooltip Options',
    showIf: checkBool('layer1', true),
    defaultValue: 'From:',
  },
  "dstFieldLabelL1": {
    editor: "text",
    name: 'Layer 1 "Destination" Field Label',
    description: 'Label for "destination" datapoint for layer 1',
    category: 'Tooltip Options',
    showIf: checkBool('layer1', true),
    defaultValue: 'To:',
  },
  "dataFieldLabelL1": {
    editor: "text",
    name: 'Layer 1 "Data" Field Label',
    description: 'Label for "Inbound/Outbound" field for layer 1',
    category: 'Tooltip Options',
    showIf: checkBool('layer1', true),
    defaultValue: 'Volume:',
  },

  "srcFieldLabelL2": {
    editor: "text",
    name: 'Layer 2 "Source" Field Label',
    description: 'Label for "source" datapoint for layer 2',
    category: 'Tooltip Options',
    showIf: checkBool('layer2', true),
    defaultValue: 'From:',
  },
  "dstFieldLabelL2": {
    editor: "text",
    name: 'Layer 2 "Destination" Field Label',
    description: 'Label for "destination" datapoint for layer 2',
    category: 'Tooltip Options',
    showIf: checkBool('layer2', true),
    defaultValue: 'To:',
  },
  "dataFieldLabelL2": {
    editor: "text",
    name: 'Layer 2 "Data" Field Label',
    description: 'Label for "Inbound/Outbound" field for layer 2',
    category: 'Tooltip Options',
    showIf: checkBool('layer2', true),
    defaultValue: 'Volume:',
  },

  "srcFieldLabelL3": {
    editor: "text",
    name: 'Layer 3 "Source" Field Label',
    description: 'Label for "source" datapoint for layer 3',
    category: 'Tooltip Options',
    showIf: checkBool('layer3', true),
    defaultValue: 'From:',
  },
  "dstFieldLabelL3": {
    editor: "text",
    name: 'Layer 3 "Destination" Field Label',
    description: 'Label for "destination" datapoint for layer 3',
    category: 'Tooltip Options',
    showIf: checkBool('layer3', true),
    defaultValue: 'To:',
  },
  "dataFieldLabelL3": {
    editor: "text",
    name: 'Layer 3 "Data" Field Label',
    description: 'Label for "Inbound/Outbound" field for layer 3',
    category: 'Tooltip Options',
    showIf: checkBool('layer3', true),
    defaultValue: 'Volume:',
  },



  // -------------------- Choose Fields --------------------
  "srcFieldL1": {
    editor: "select",
    name: 'Layer 1 Source Field',
    description: 'Data field identifying the "source" for Layer 1',
    category: 'Data Mappings',
    showIf: checkBool('layer1', true),
    settings: {
      allowCustomValue: false,
      options: [],
      getOptions: buildChoices,
    },
  },
  "dstFieldL1": {
    editor: "select",
    name: 'Layer 1 Destination Field',
    description: 'Data field identifying the "destination" for Layer 1',
    category: 'Data Mappings',
    showIf: checkBool('layer1', true),
    settings: {
      allowCustomValue: false,
      options: [],
      getOptions: buildChoices,
    },
  },
  "inboundValueFieldL1": {
    editor: "select",
    name: 'Layer 1 Inbound Value Field',
    description: 'Data field showing traffic from "destination" to "source" for Layer 1',
    showIf: checkBool('layer1', true),
    category: 'Data Mappings',
    settings: {
      allowCustomValue: false,
      options: [],
      getOptions: buildChoices,
    },
  },
  "outboundValueFieldL1": {
    editor: "select",
    name: 'Layer 1 Outbound Value Field',
    description: 'Data field showing traffic from "source" to "destination" for Layer 1',
    showIf: checkBool('layer1', true),
    category: 'Data Mappings',
    settings: {
      allowCustomValue: false,
      options: [],
      getOptions: buildChoices,
    },
  },
  "nodeFieldL1": {
    editor: "select",
    name: 'Layer 1 Node Color Field',
    description: 'Data field mapped to node color for Layer 1',
    category: 'Data Mappings',
    showIf: checkBool('layer1', true),
    settings: {
      allowCustomValue: false,
      options: [],
      getOptions: buildChoices,
    },
  },
  "srcFieldL2": {
    editor: "select",
    name: 'Layer 2 Source Field',
    description: 'Data field identifying the "source" for Layer 2',
    showIf: checkBool('layer2', true),
    category: 'Data Mappings',
    settings: {
      allowCustomValue: false,
      options: [],
      getOptions: buildChoices,
    },
  },
  "dstFieldL2": {
    editor: "select",
    name: 'Layer 2 Destination Field',
    description: 'Data field identifying the "destination" for Layer 2',
    showIf: checkBool('layer2', true),
    category: 'Data Mappings',
    settings: {
      allowCustomValue: false,
      options: [],
      getOptions: buildChoices,
    },
  },
  "inboundValueFieldL2": {
    editor: "select",
    name: 'Layer 2 Inbound Value Field',
    description: 'Data field showing traffic from "destination" to "source" for Layer 2',
    showIf: checkBool('layer2', true),
    category: 'Data Mappings',
    settings: {
      allowCustomValue: false,
      options: [],
      getOptions: buildChoices,
    },
  },
  "outboundValueFieldL2": {
    editor: "select",
    name: 'Layer 2 Outbound Value Field',
    description: 'Data field showing traffic from "source" to "destination" for Layer 2',
    showIf: checkBool('layer2', true),
    category: 'Data Mappings',
    settings: {
      allowCustomValue: false,
      options: [],
      getOptions: buildChoices,
    },
  },
  "nodeFieldL2": {
    editor: "select",
    name: 'Layer 2 Node Color Field',
    description: 'Data field mapped to node color for Layer 2',
    category: 'Data Mappings',
    showIf: checkBool('layer2', true),
    settings: {
      allowCustomValue: false,
      options: [],
      getOptions: buildChoices,
    },
  },
  "srcFieldL3": {
    editor: "select",
    name: 'Layer 3 Source Field',
    description: 'Data field identifying the "source" for Layer 3',
    category: 'Data Mappings',
    showIf: checkBool('layer3', true),
    settings: {
      allowCustomValue: false,
      options: [],
      getOptions: buildChoices,
    },
  },
  "dstFieldL3": {
    editor: "select",
    name: 'Layer 3 Destination Field',
    description: 'Data field identifying the "destination" for Layer 3',
    category: 'Data Mappings',
    showIf: checkBool('layer3', true),
    settings: {
      allowCustomValue: false,
      options: [],
      getOptions: buildChoices,
    },
  },
  "inboundValueFieldL3": {
    editor: "select",
    name: 'Layer 3 Inbound Value Field',
    description: 'Data field showing traffic from "destination" to "source" for Layer 3',
    showIf: checkBool('layer3', true),
    category: 'Data Mappings',
    settings: {
      allowCustomValue: false,
      options: [],
      getOptions: buildChoices,
    },
  },
  "outboundValueFieldL3": {
    editor: "select",
    name: 'Layer 3 Outbound Value Field',
    description: 'Data field showing traffic from "source" to "destination" for Layer 3',
    showIf: checkBool('layer3', true),
    category: 'Data Mappings',
    settings: {
      allowCustomValue: false,
      options: [],
      getOptions: buildChoices,
    },
  },
  "nodeFieldL3": {
    editor: "select",
    name: 'Layer 3 Node Color Field',
    description: 'Data field mapped to node color for Layer 3',
    category: 'Data Mappings',
    showIf: checkBool('layer3', true),
    settings: {
      allowCustomValue: false,
      options: [],
      getOptions: buildChoices,
    },
  },
  // -------------------- Ad-Hoc Query Variable Bindings --------------------
  "dashboardNodeVarL1": {
    editor: "text",
    name: 'Binding: Node Layer 1',
    showIf: checkBool('layer1', true),
    category: "Variable Bindings",
    defaultValue: 'node',
  },
  "dashboardEdgeSrcVarL1": {
    editor: "text",
    name: 'Binding: Edge "Source" Layer 1',
    showIf: checkBool('layer1', true),
    category: "Variable Bindings",
    defaultValue: 'source',
  },
  "dashboardEdgeDstVarL1": {
    editor: "text",
    name: 'Binding: Edge "Destination" Layer 1',
    showIf: checkBool('layer1', true),
    category: "Variable Bindings",
    defaultValue: 'dest',
  },
  "dashboardNodeVarL2": {
    editor: "text",
    name: 'Binding: Node Layer 2',
    showIf: checkBool('layer2', true),
    category: "Variable Bindings",
    defaultValue: 'node',
  },
  "dashboardEdgeSrcVarL2": {
    editor: "text",
    name: 'Binding: Edge "Source" Layer 2',
    showIf: checkBool('layer2', true),
    category: "Variable Bindings",
    defaultValue: 'source',
  },
  "dashboardEdgeDstVarL2": {
    editor: "text",
    name: 'Binding: Edge "Destination" Layer 2',
    showIf: checkBool('layer2', true),
    category: "Variable Bindings",
    defaultValue: 'dest',
  },
  "dashboardNodeVarL3": {
    editor: "text",
    name: 'Binding: Node Layer 3',
    showIf: checkBool('layer3', true),
    category: "Variable Bindings",
    defaultValue: 'node',
  },
  "dashboardEdgeSrcVarL3": {
    editor: "text",
    name: 'Binding: Edge "Source" Layer 3',
    showIf: checkBool('layer3', true),
    category: "Variable Bindings",
    defaultValue: 'src',
  },
  "dashboardEdgeDstVarL3": {
    editor: "text",
    name: 'Binding: Edge "Destination" Layer 3',
    showIf: checkBool('layer3', true),
    category: "Variable Bindings",
    defaultValue: 'dest',
  },

  // -------------------- Sidebar Options --------------------
  "showSidebar": {
    editor: "boolean",
    name: 'Show Map Sidebar',
    description: 'Show sidebar. If hidden, tooltips will appear on hover.',
    category: "Sidebar Options",
    defaultValue: true,
  },
  "legendL1": {
    editor: "boolean",
    name: 'Show Layer 1 toggle',
    category: "Sidebar Options",
    showIf: checkBool('showSidebar', true),
    defaultValue: true,
  },
  "layerName1": {
    editor: "text",
    name: 'Layer 1 Display Name',
    category: "Sidebar Options",
    showIf: checkBool('showSidebar', true),
    defaultValue: 'layer 1',
  },
  "legendL2": {
    editor: "boolean",
    name: 'Show Layer 2 toggle',
    category: "Sidebar Options",
    showIf: checkBool('showSidebar', true),
    defaultValue: true,
  },
  "layerName2": {
    editor: "text",
    name: 'Layer 2 Display Name',
    category: "Sidebar Options",
    showIf: checkBool('showSidebar', true),
    defaultValue: 'layer 2',
  },
  "legendL3": {
    editor: "boolean",
    name: 'Show Layer 3 toggle',
    category: "Sidebar Options",
    showIf: checkBool('showSidebar', true),
    defaultValue: true,
  },
  "layerName3": {
    editor: "text",
    name: 'Layer 3 Display Name',
    category: "Sidebar Options",
    showIf: checkBool('showSidebar', true),
    defaultValue: 'layer 3',
  },

  // -------------------- Legend Options --------------------
  "showLegend": {
    editor: "boolean",
    name: 'Show Map Legend',
    description: 'show a traffic levels legend at the bottom of the map',
    category: "Legend Options",
    defaultValue: true,
  },
  "legendColumnLength": {
    editor: "slider",
    name: 'Legend Items per Column',
    category: "Legend Options",
    showIf: checkBool('showLegend', true),
    defaultValue: 3,
    settings: {
      min: 1,
      max: 12,
      step: 1,
    },
  },
  "legendPosition": {
    editor: "select",
    name: 'Legend Position',
    category: "Legend Options",
    showIf: checkBool('showLegend', true),
    description: 'position of the legend on the map',
    defaultValue: 'bottomleft',
    settings: {
      allowCustomValue: false,
      options: LegendPositionOptions,
    },
  },
  "legendDefaultBehavior": {
    editor: "select",
    name: 'Legend Default Behavior',
    category: "Legend Options",
    showIf: checkBool('showLegend', true),
    description: 'should the legend be minimized or visible by default?',
    defaultValue: 'visible',
    settings: {
      allowCustomValue: false,
      options: LegendBehaviorOptions,
    },
  },
}

for(let i=0; i<=2; i++){
  for(let optionName in layerOptions){
    options[optionName.replace("${i}", i.toString())] = {...layerOptions[optionName]};
  }
}

const categories = {}
for(let optionPath in options){
  if(options[optionPath].hasOwnProperty('category')){
    let category = options[optionPath].category;
    categories[category] = [category];
  }
}

// -------------------- Network Map Panel Options --------------------
plugin.setPanelOptions((builder) => {
  for(let optionPath in options){
    builder.addCustomEditor(resolveSetting(optionPath, options[optionPath]))
  }
});

plugin.useFieldConfig({
  disableStandardOptions: [
    FieldConfigProperty.NoValue,
    FieldConfigProperty.Max,
    FieldConfigProperty.Min,
    FieldConfigProperty.DisplayName,
  ],
});
