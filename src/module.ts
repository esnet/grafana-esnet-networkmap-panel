import { standardEditorsRegistry, FieldConfigProperty, PanelPlugin, FieldOverrideContext, getFieldDisplayName } from '@grafana/data';
import { MapOptions } from './types';
import { MapPanel } from './MapPanel';
import { CustomTextArea } from './components/CustomTextArea';
import { CoordinateButton } from './components/CoordinateButton';
import { ViewportCoordinateButton } from './components/ViewportCoordinateButton';
import { resolvePath } from './components/lib/utils';
import { LAYER_LIMIT } from './constants';
import {
  ViewStrategies,
  BaseTilesets,
  PoliticalBoundaryTilesets,
  PoliticalLabelTilesets,
  LegendPositionOptions,
  LegendBehaviorOptions,
  TopologySources,
  defaultCustomEdgeTooltip,
  defaultCustomNodeTooltip,
  LayerOptions,
} from "./options";

const customEditors = {
  "CoordinateButton": CoordinateButton,
  "CustomTextArea": CustomTextArea,
  "ViewportCoordinateButton": ViewportCoordinateButton
}

export const plugin = new PanelPlugin<MapOptions>(MapPanel);

function checkBools(settings: object) {
  return (config: MapOptions) => {
    let keys = Object.keys(settings);
    for (let i = 0; i < keys.length; i++) {
      let settingName = keys[i];
      let value = settings[settingName];
      // if we're passed an array, check that the value is in the array
      if(Array.isArray(value)){
        // if it's not in the array, return false.
        if (value.indexOf(resolvePath(config, settingName)) < 0){
          return false;
        }
        // otherwise, keep looping, checking that everything matches
      // if we're passed anything other than an array, make sure it's an exact match
      } else {
        // if "__" is in our setting name, we're doing a gt/lt/gte/lte comparison
        if(settingName.indexOf("__") >= 0){
          let [name, comparison] = settingName.split("__");
          const comparators = {
            "lte": function(val, target){ return val <= target; },
            "gte": function(val, target){ return val >= target; },
            "gt" : function(val, target){ return val > target; },
            "lt" : function(val, target){ return val < target; }
          }
          // if the comparison isn't in the list... return false
          if(!comparators.hasOwnProperty(comparison)){
            return false
          }
          // if the comparison returns false, return false
          if (!comparators[comparison](resolvePath(config, name), value)){
            return false
          }
        // otherwise, this is a "standard" equality test
        } else {
          if (resolvePath(config, settingName) !== value) {
            // if it's not an exact match, return false
            return false;
          }
        }
        // otherwise, keep looping, checking that everything matches
      }
    }
    // finally, we've checked everything. Return true.
    return true;
  };
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

function resolveSetting(path, setting) {
  let output = {...setting}
  if(output.hasOwnProperty('editor')){
    let editorName = output.editor;
    if(editorName in customEditors){
      output.editor = customEditors[editorName];
    } else {
      output.editor = standardEditorsRegistry.get(editorName).editor
    }
  }
  if(output.hasOwnProperty('showIf')){
    output.showIf = checkBools(output.showIf)
  }
  if(output.hasOwnProperty('category')){
    output.category = categories[output.category];
  }
  output.path = path;
  output.id = path;
  return output
}

let layerOptions = {
  "layers[${i}].visible": {
    editor: "boolean",
    name: 'Layer ${i+1} on',
    category: "Layers",
    showIf: { "topologySource": ["autodetect", "json", "layerurls"], "layerLimit__gt": "${i}" },
    defaultValue: (layer)=>{ return layer < 3 },
  },

  "layers[${i}].legend": {
    editor: "boolean",
    name: 'Show Layer ${i+1} toggle',
    category: "Layer ${i+1}: Basic Options",
    showIf: { "showSidebar": true, "layers[${i}].visible": true},
    defaultValue: (layer)=>{ return layer < 3 },
  },

  "layers[${i}].remoteUrl": {
    editor: "text",
    name: "Layer ${i+1}: Remote JSON URL",
    category: "Layer ${i+1}: Basic Options",
    showIf: { "layers[${i}].visible": true, "topologySource": "layerurls" },
    defaultValue: "",
  },

  "layers[${i}].name": {
    editor: "text",
    name: 'Layer ${i+1} Display Name',
    category: "Layer ${i+1}: Basic Options",
    showIf: { "topologySource": ["autodetect", "json", "layerurls"], "layers[${i}].visible": true },
    defaultValue: 'Layer ${i+1}',
  },
  "layers[${i}].color": {
    editor: "color",
    name: 'Layer ${i+1} Default color',
    category: "Layer ${i+1}: Basic Options",
    showIf: { "topologySource": ["autodetect", "json", "layerurls"], "layers[${i}].visible": true},
    description: 'The default color for nodes and links on Layer ${i+1}',
    defaultValue: 'grey',
  },
  "layers[${i}].mapjson": {
    name: 'Layer ${i+1} Map data (json)',
    category: "Layer ${i+1}: Basic Options",
    showIf: { "topologySource": ["json"],  "layers[${i}].visible": true },
    description: 'JSON with edges and nodes of network map',
    defaultValue: '{"edges":[], "nodes":[]}',
    settings: { useTextarea: true, rows: 10, isMonospaced: true },
    editor: "CustomTextArea",
  },
  "layers[${i}].endpointId": {
    editor: "text",
    name: 'Layer ${i+1} Endpoint Identifier',
    category: "Layer ${i+1}: Basic Options",
    showIf: { "topologySource": ["url", "json", "layerurls"], "layers[${i}].visible": true},
    description: 'Which topology "meta" field should be used to match topology nodes to query data?',
    defaultValue: 'names',
  },
  "layers[${i}].edgeWidth": {
    editor: "slider",
    name: 'Layer ${i+1} Edge Width',
    defaultValue: 3,
    category: "Layer ${i+1}: Basic Options",
    showIf: { "topologySource": ["autodetect", "json", "layerurls"], "layers[${i}].visible": true},
    settings: {
      min: 1,
      max: 15,
      step: 0.5,
    },
  },
  "layers[${i}].pathOffset": {
    editor: "slider",
    name: 'Layer ${i+1} Edge Offset',
    description: 'The offset between AZ path and ZA path',
    defaultValue: 3,
    category: "Layer ${i+1}: Basic Options",
    showIf: { "topologySource": ["autodetect", "json", "layerurls"], "layers[${i}].visible": true},
    settings: {
      min: 1,
      max: 15,
      step: 0.5,
    }
  },

  "layers[${i}].nodeWidth": {
    editor: "slider",
    name: 'Layer ${i+1} Node Size',
    category: "Layer ${i+1}: Basic Options",
    showIf: { "topologySource": ["autodetect", "json", "layerurls"], "layers[${i}].visible": true},
    defaultValue: 5,
    settings: {
      min: 1,
      max: 15,
      step: 0.5,
    },
  },

  "layers[${i}].autodetect.srcNameColumn": {
    editor: "field-name",
    name: 'Layer ${i+1}: Data Column for "Source" Name',
    category: "Layer ${i+1}: Auto Topology",
    showIf: { "topologySource": ["autodetect"], "layers[${i}].visible": true },
  },
  "layers[${i}].autodetect.srcLatitudeColumn": {
    editor: "field-name",
    name: 'Layer ${i+1}: Data Column for "Source" Latitude',
    category: "Layer ${i+1}: Auto Topology",
    showIf: { "topologySource": ["autodetect"], "layers[${i}].visible": true },
  },
  "layers[${i}].autodetect.srcLongitudeColumn": {
    editor: "field-name",
    name: 'Layer ${i+1}: Data Column for "Source" Longitude',
    category: "Layer ${i+1}: Auto Topology",
    showIf: { "topologySource": ["autodetect"], "layers[${i}].visible": true },
  },
  "layers[${i}].autodetect.dstNameColumn": {
    editor: "field-name",
    name: 'Layer ${i+1}: Data Column for "Destination" Name',
    category: "Layer ${i+1}: Auto Topology",
    showIf: { "topologySource": ["autodetect"], "layers[${i}].visible": true },
  },
  "layers[${i}].autodetect.dstLatitudeColumn": {
    editor: "field-name",
    name: 'Layer ${i+1}: Data Column for "Destination" Latitude',
    category: "Layer ${i+1}: Auto Topology",
    showIf: { "topologySource": ["autodetect"], "layers[${i}].visible": true },
  },
  "layers[${i}].autodetect.dstLongitudeColumn": {
    editor: "field-name",
    name: 'Layer ${i+1}: Data Column for "Destination" Longitude',
    category: "Layer ${i+1}: Auto Topology",
    showIf: { "topologySource": ["autodetect"], "layers[${i}].visible": true },
  },

  "layers[${i}].nodeThresholds": {
    editor: "thresholds",
    name: "Node Thresholds",
    category: "Layer ${i+1}: Data Bindings",
    showIf: { "layers[${i}].visible": true},
    description: "Set thresholds for node coloration. Used to indicate e.g. up/down node information",
  },
  "layers[${i}].nodeNameMatchField": {
    editor: "field-name",
    name: 'Layer ${i+1} Node Match Field',
    description: 'Data field mapped to match a node color row for Layer ${i+1}',
    category: "Layer ${i+1}: Data Bindings",
    showIf: { "layers[${i}].visible": true},
    settings: {
      allowCustomValue: false,
    },
  },
  "layers[${i}].nodeValueField": {
    editor: "field-name",
    name: 'Layer ${i+1} Node Color Field',
    description: 'Data field mapped to node color thresholds for Layer ${i+1}',
    category: "Layer ${i+1}: Data Bindings",
    showIf: { "layers[${i}].visible": true},
    settings: {
      allowCustomValue: false,
    },
  },
  "layers[${i}].srcField": {
    editor: "field-name",
    name: 'Layer ${i+1} Source Field',
    description: 'Data field identifying the "source" for Layer ${i+1}',
    category: "Layer ${i+1}: Data Bindings",
    showIf: { "layers[${i}].visible": true},
    settings: {
      allowCustomValue: false,
    },
  },
  "layers[${i}].dstField": {
    editor: "field-name",
    name: 'Layer ${i+1} Destination Field',
    description: 'Data field identifying the "destination" for Layer ${i+1}',
    category: "Layer ${i+1}: Data Bindings",
    showIf: { "layers[${i}].visible": true},
    settings: {
      allowCustomValue: false,
    },
  },
  "layers[${i}].inboundValueField": {
    editor: "field-name",
    name: 'Layer ${i+1} Inbound Value Field',
    description: 'Data field showing traffic from "destination" to "source" for Layer ${i+1}',
    showIf: { "layers[${i}].visible": true},
    category: "Layer ${i+1}: Data Bindings",
    settings: {
      allowCustomValue: false,
    },
  },
  "layers[${i}].outboundValueField": {
    editor: "field-name",
    name: 'Layer ${i+1} Outbound Value Field',
    description: 'Data field showing traffic from "source" to "destination" for Layer ${i+1}',
    showIf: { "layers[${i}].visible": true},
    category: "Layer ${i+1}: Data Bindings",
    settings: {
      allowCustomValue: false,
    },
  },

  "layers[${i}].dashboardNodeVar": {
    editor: "text",
    name: 'Binding: Node Layer ${i+1}',
    description: "On node click, set this dashboard variable to the name of the selected node.",
    showIf: { "layers[${i}].visible": true},
    category: "Layer ${i+1}: Data Bindings",
    defaultValue: 'node',
  },
  "layers[${i}].dashboardEdgeSrcVar": {
    editor: "text",
    name: 'Binding: Edge "Source" Layer ${i+1}',
    description: "On edge click, set this dashboard variable to the 'source' of the selected edge.",
    showIf: { "layers[${i}].visible": true},
    category: "Layer ${i+1}: Data Bindings",
    defaultValue: 'source',
  },
  "layers[${i}].dashboardEdgeDstVar": {
    editor: "text",
    name: 'Binding: Edge "Destination" Layer ${i+1}',
    description: "On edge click, set this dashboard variable to the 'destination' of the selected edge.",
    showIf: { "layers[${i}].visible": true},
    category: "Layer ${i+1}: Data Bindings",
    defaultValue: 'dest',
  },

}

const options = {
  ///////////////
  // Uncategorized/Main options
  ///////////////
  "topologySource": {
    editor: "select",
    name: 'Topology Source',
    description: 'Method to load topology data',
    settings: {
      allowCustomValue: false,
      options: TopologySources,
    },
    defaultValue: "json",
  },
  "layerLimit": {
    editor: "select",
    name: "Number of Layers",
    description: "How many layers to display in the map?",
    settings: {
      allowCustomValue: false,
      options: LayerOptions,
    },
    showIf: {"topologySource": ["json", "layerurls", "autodetect"]},
    defaultValue: 2
  },
  "configurationUrl": {
    editor: "text",
    name: 'URL to Fetch Configuration From',
    showIf: { "topologySource": ["url"] },
    defaultValue: "",
  },
  "background": {
    editor: 'color',
    name: 'Map Background Color',
    description: 'The default color for the background, with no tileset',
    showIf: { "topologySource": ["autodetect", "json", "layerurls"] },
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
    showIf: { "topologySource": ["autodetect", "json", "layerurls"] },
    defaultValue: "arcgis",
  },
  "tileset.boundaries": {
    editor: "select",
    name: 'Political Boundary Tileset',
    description: 'Select a political boundary tileset for the map.',
    settings: {
      allowCustomValue: false,
      options: PoliticalBoundaryTilesets,
    },
    showIf: { "topologySource": ["autodetect", "json", "layerurls"] },
    defaultValue: null,
  },
  "tileset.labels": {
    editor: "select",
    name: 'Political Label Tileset',
    description: 'Select a political label tileset for the map.',
    settings: {
      allowCustomValue: false,
      options: PoliticalLabelTilesets,
    },
    showIf: { "topologySource": ["autodetect", "json", "layerurls"] },
    defaultValue: null,
  },
  //////////////
  // "Viewport" strategy and options
  //////////////
  "initialViewStrategy": {
      editor: "select",
      name: 'Map Initial View Strategy',
      description: 'Strategy to set the initial center and zoom level of the map',
      category: "Viewport Options",
      settings: { allowCustomValue: false, options: ViewStrategies, },
      showIf: { "topologySource": ["autodetect", "json", "layerurls"] },
      defaultValue: "static",
  },
  "setLatLngZoom": {
    name: 'Set Default Latitude / Longitude / Zoom',
    description:
      'Set the default Latitude, Longitude and Zoom level to the current map Latitude, Longitude and Zoom level.',
    showIf: { "topologySource": ["autodetect", "json", "layerurls"], "initialViewStrategy": 'static'},
    settings: { label: 'Set Lat/Lng & Zoom' },
    category: "Viewport Options",
    editor: "CoordinateButton",
  },
  // --- options for "static" zoom strategy
  "viewport.center.lat": {
    name: 'Starting Latitude of map',
    description: 'This will be the center of the map when it loads',
    showIf: { "topologySource": ["autodetect", "json", "layerurls"], "initialViewStrategy": 'static'},
    defaultValue: 39,
    settings: { useTextarea: true, rows: 1 },
    category: "Viewport Options",
    editor: "CustomTextArea",
  },
  "viewport.center.lng": {
    name: 'Starting Longitude of map',
    description: 'This will be the center of the map when it loads',
    showIf: { "topologySource": ["autodetect", "json", "layerurls"], "initialViewStrategy": 'static'},
    defaultValue: -98,
    settings: { useTextarea: true, rows: 1 },
    category: "Viewport Options",
    editor: "CustomTextArea",
  },
  // --- options for "variables" zoom strategy
  "latitudeVar": {
    editor: "select",
    name: 'Latitude Variable',
    description: 'Select a dashboard or query variable to set initial latitude of map',
    showIf: { "topologySource": ["autodetect", "json", "layerurls"], "initialViewStrategy": 'variables'},
    category: "Viewport Options",
    settings: {
      allowCustomValue: false,
      getOptions: buildChoicesWithSuggestions,
    },
  },
  "longitudeVar": {
    editor: "select",
    name: 'Longitude Variable',
    description: 'Select a dashboard or query variable to set initial longitude of map',
    showIf: { "topologySource": ["autodetect", "json", "layerurls"], "initialViewStrategy": 'variables'},
    category: "Viewport Options",
    settings: {
      allowCustomValue: false,
      options: [],
      getOptions: buildChoicesWithSuggestions,
    },
  },
  // --- options for "static"/"variables" zoom strategy
  "viewport.zoom": {
    editor: "slider",
    name: 'Starting zoom level of map',
    showIf: { "topologySource": ["autodetect", "json", "layerurls"], 'initialViewStrategy': ['static', 'variables']},
    category: "Viewport Options",
    defaultValue: 5,
    settings: {
      min: 1,
      max: 15,
      step: 0.25,
    },
  },
  // --- options for "viewport" zoom strategy
  "setViewport": {
    name: 'Set Zoom Viewport to Current Map View',
    description: 'Set the top-left Lat & Lng and bottom-right Lat & Lng to the currently displayed map viewport.',
    showIf: { "topologySource": ["autodetect", "json", "layerurls"], "initialViewStrategy": 'viewport'},
    settings: { label: 'Set Viewport Coordinates' },
    category: "Viewport Options",
    editor: "ViewportCoordinateButton",
  },
  "viewport.top": {
    name: 'Initial viewport: Northern Boundary (Latitude)',
    description: 'Zoom viewport: Top, left coordinate, Latitude. (numbers only)',
    showIf: { "topologySource": ["autodetect", "json", "layerurls"], "initialViewStrategy": 'viewport'},
    settings: { useTextarea: true, rows: 1 },
    category: "Viewport Options",
    editor: "CustomTextArea",
  },
  "viewport.left": {
    name: 'Initial viewport: Western Boundary (Longitude)',
    description: 'Zoom viewport: Top, left coordinate, Longitude. (numbers only)',
    showIf: { "topologySource": ["autodetect", "json", "layerurls"], "initialViewStrategy": 'viewport'},
    settings: { useTextarea: true, rows: 1 },
    category: "Viewport Options",
    editor: "CustomTextArea",
  },
  "viewport.bottom": {
    name: 'Initial viewport: Eastern Boundary (Latitude)',
    description: 'Zoom viewport: Bottom, right coordinate, Latitude. (numbers only)',
    showIf: { "topologySource": ["autodetect", "json", "layerurls"], "initialViewStrategy": 'viewport'},
    settings: { useTextarea: true, rows: 1 },
    category: "Viewport Options",
    editor: "CustomTextArea",
  },
  "viewport.right": {
    name: 'Initial viewport: Southern Boundary (Longitude)',
    description: 'Zoom viewport: Bottom, right coordinate, Longitude. (numbers only)',
    showIf: { "topologySource": ["autodetect", "json", "layerurls"], "initialViewStrategy": 'viewport'},
    settings: { useTextarea: true, rows: 1 },
    category: "Viewport Options",
    editor: "CustomTextArea",
  },

  //////////////
  // View/UI Controls
  //////////////
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
    showIf: { "topologySource": ["json"] }
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
  "showSidebar": {
    editor: "boolean",
    name: 'Show Map Sidebar',
    description: 'Show sidebar. If hidden, tooltips will appear on hover.',
    category: "View Options",
    defaultValue: true,
  },

  // -------------------- Tooltip Options --------------------
  "enableCustomNodeTooltip": {
    editor: "boolean",
    name: 'Use Custom Node Tooltips',
    description: 'Use custom templates for tooltips for map nodes',
    category: "Tooltip Options",
    defaultValue: false,
  },
  "customNodeTooltip": {
    editor: "CustomTextArea",
    name: 'Custom Node Tooltip',
    description: 'HTML template used for node tooltips',
    category: "Tooltip Options",
    defaultValue: defaultCustomNodeTooltip,
    settings: { useTextarea: true, rows: 10, isMonospaced: true  },
    showIf: {"enableCustomNodeTooltip": true},
  },
  "enableCustomEdgeTooltip": {
    editor: "boolean",
    name: 'Use Custom Edge Tooltips',
    description: 'Use custom templates for tooltips for map edges',
    category: "Tooltip Options",
    defaultValue: false,
  },
  "customEdgeTooltip": {
    editor: "CustomTextArea",
    name: 'Custom Edge Tooltip',
    description: 'HTML template used for edge tooltips',
    category: "Tooltip Options",
    defaultValue: defaultCustomEdgeTooltip,
    settings: { useTextarea: true, rows: 10, isMonospaced: true },
    showIf: {"enableCustomEdgeTooltip": true},
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
    showIf: {"showLegend": true},
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
    showIf: {"showLegend": true},
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
    showIf: {"showLegend": true},
    description: 'should the legend be minimized or visible by default?',
    defaultValue: 'visible',
    settings: {
      allowCustomValue: false,
      options: LegendBehaviorOptions,
    },
  },
}

for(let i=0; i<LAYER_LIMIT; i++){
  // copy all of the options for each layer
  for(let optionName in layerOptions){
    // ensuring that we replace the keys so, for example:
    // "layer[${i}].visible" becomes
    // "layer[0].visible"
    let option = optionName.replace("${i}", i.toString())
    options[option] = {...layerOptions[optionName]};
    if(options[option].hasOwnProperty("name")){
      options[option].name = options[option].name.replace("${i+1}", (i+1).toString());
    }
    if(options[option].hasOwnProperty("description")){
      options[option].description = options[option].description.replace("${i+1}", (i+1).toString());
    }
    if(options[option].hasOwnProperty("category")){
      options[option].category = options[option].category.replace("${i+1}", (i+1).toString());
    }
    if(options[option].hasOwnProperty("defaultValue") && typeof(options[option].defaultValue) === "string"){
      options[option].defaultValue = options[option].defaultValue.replace("${i+1}", (i+1).toString());
    }
    if(options[option].hasOwnProperty("defaultValue") && typeof(options[option].defaultValue) === "function"){
      options[option].defaultValue = options[option].defaultValue(i);
    }
    // reformat the keys in the "showIf" conditions if they exist
    // showIf: {"layer[${i}].visible": true}
    // becomes
    // showIf: { "layer[0].visible": true }
    if(options[option].hasOwnProperty("showIf")){
      let copy = {...options[option].showIf};
      for(let [showIfName, showIfValue] of Object.entries(options[option].showIf)) {
        let accessor = showIfName;
        if(showIfName.indexOf("${i}") >= 0){
          accessor = showIfName.replace("${i}", i.toString())
          copy[accessor] = copy[showIfName];
          delete copy[showIfName]
        }
        if(typeof(showIfValue) === "string" && showIfValue.indexOf("${i}") >= 0){
          copy[accessor] = showIfValue.replace("${i}", i.toString());
        }
      }
      options[option].showIf = copy;
    }
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
