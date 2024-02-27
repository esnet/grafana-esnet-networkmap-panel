import React, { Component } from 'react';
import { PanelProps, createTheme, DataFrameView, getValueFormat } from '@grafana/data';
import { MapOptions } from './types';
import { parseData } from './components/lib/dataParser';
import { sanitizeTopology } from './components/lib/topologyTools';
import 'components/MapCanvas.component.js';
import { PubSub } from './components/lib/pubsub.js';
import { locationService } from '@grafana/runtime';
import { resolvePath, setPath, LAYER_LIMIT } from "./components/lib/utils.js"
interface Props extends PanelProps<MapOptions> {}

export class MapPanel extends Component<Props> {
  mapCanvas: any;
  lastOptions: any;
  theme: any;
  mapjsonCache: any;

  constructor(props: Props) {
    super(props);
    this.mapCanvas = React.createRef();
    this.mapjsonCache = {
      L1: {},
      L2: {},
      L3: {},
    };
    this.lastOptions = {...this.props.options};
    this.theme = createTheme();
    PubSub.subscribe('returnMapCenterAndZoom', this.updateCenter);
    PubSub.subscribe('returnMapViewport', this.updateMapViewport);
  }

  setDashboardVariables() {
    let self = this;
    return (event) => {
      let setLocation = {};
      for (let i = 0; i < LAYER_LIMIT; i++) {
        const srcVar = 'var-' + self.props.options.layers[i]['dashboardEdgeSrcVar'];
        const dstVar = 'var-' + self.props.options.layers[i]['dashboardEdgeDstVar'];
        const nodeVar = 'var-' + self.props.options.layers[i]['dashboardNodeVar'];
        setLocation[srcVar] = null;
        setLocation[dstVar] = null;
        setLocation[nodeVar] = null;
      }
      if (event && event.nodeA && event.nodeZ) {
        const srcVariable = 'var-' + self.props.options.layers[event.layer]['dashboardEdgeSrcVar'];
        setLocation[srcVariable] = event.nodeA;
        const dstVariable = 'var-' + self.props.options.layers[event.layer]['dashboardEdgeDstVar'];
        setLocation[dstVariable] = event.nodeZ;
      }
      if (event && event.type === 'node') {
        const dashboardVariable = 'var-' + self.props.options.layers[event.layer]['dashboardNodeVar'];
        setLocation[dashboardVariable] = event.selection.name;
      }

      locationService.partial(setLocation, false);
    };
  }

  updateCenter = (centerData) => {
    let viewport = {
      "zoom": centerData.zoom,
      "center": {
        "lat": centerData.center.lat,
        "lng": centerData.center.lng,
      }
    }
    this.props.onOptionsChange({ ...this.props.options, viewport });
  };

  updateMapViewport = (viewportData) => {
    const coordinates = viewportData.coordinates;
    this.props.onOptionsChange({
      ...this.props.options,
      "viewport": {
        "top": coordinates.getNorth().toFixed(2),
        "left": coordinates.getWest().toFixed(2),
        "bottom": coordinates.getSouth().toFixed(2),
        "right": coordinates.getEast().toFixed(2),
      }
    });
  };

  // A function to update the map jsons in the Edit panel based on the current map state
  // Used in esmap.js
  updateMapJson = (mapData) => {
    const { options } = this.props;
    let update = { ...options }
    if(!update.layers){
      update.layers = [];
    }
    let layerUpdates = [
        options.layers[0].mapjson,
        options.layers[1].mapjson,
        options.layers[2].mapjson,
    ];
    for(let i=0; i<LAYER_LIMIT; i++){
      if (mapData[i] != null) {
        layerUpdates[i] = JSON.stringify(sanitizeTopology(mapData[i]));
      }
      if(update.layers[i]){
        update.layers[i].mapjson = layerUpdates[i];
      }
    }
    this.props.onOptionsChange(update);
  };

  calculateOptionsChanges = () => {
    let changed: string[];
    changed = [];

    const optionsToWatch = [
      'background',
      'tileset.geographic',
      'tileset.boundaries',
      'tileset.labels',
      'showSidebar',
      'showViewControls',
      'showLegend',
      'customLegend',
      'customLegendValue',
      'legendColumnLength',
      'legendPosition',
      'thresholds',
      'enableScrolling',
      'enableEditing',
      'enableNodeAnimation',
      'enableEdgeAnimation',
      'enableCustomNodeTooltip',
      'enableCustomEdgeTooltip',
      'customNodeTooltip',
      'customEdgeTooltip',

      'resolvedLat',
      'resolvedLng',
    ];
    for(let i=0; i<LAYER_LIMIT; i++){
      optionsToWatch.push(`layers[${i}].visible`);
      optionsToWatch.push(`layers[${i}].color`);
      optionsToWatch.push(`layers[${i}].endpointId`);
      optionsToWatch.push(`layers[${i}].nodeHighlight`);
      optionsToWatch.push(`layers[${i}].nodeWidth`);
      optionsToWatch.push(`layers[${i}].mapjson`);
      optionsToWatch.push(`layers[${i}].edgeWidth`);
      optionsToWatch.push(`layers[${i}].pathOffset`);
      optionsToWatch.push(`layers[${i}].name`);
      optionsToWatch.push(`layers[${i}].legend`);
      optionsToWatch.push(`layers[${i}].dstFieldLabel`);
      optionsToWatch.push(`layers[${i}].srcFieldLabel`);
      optionsToWatch.push(`layers[${i}].dataFieldLabel`);
    }
    optionsToWatch.forEach((option) => {
      let lastValue = resolvePath(this.lastOptions, option);
      let currentValue = resolvePath(this.props.options, option);
      if(option === 'thresholds'){
        // test these for relative equality; this object memory ref changes on each option change.
        lastValue = JSON.stringify(lastValue);
        currentValue = JSON.stringify(currentValue);
      }
      if (lastValue !== currentValue) {
        if (option === 'background') {
          this.props.options.background = this.theme.visualization.getColorByName(this.props.options.background);
        }
        if(Array.isArray(this.props.options[option])){
          let newOption = [...resolvePath(this.props.options, option)];
          setPath(this.lastOptions, option, newOption);
        } else {
          setPath(this.lastOptions, option, resolvePath(this.props.options, option));
        }
        changed.push(option);
      }
    });
    return changed;
  };

  // A function to turn layers on or off. Takes in the layer and boolean value
  // Used in SideBar.tsx
  toggleLayer = (layer, value) => {
    let update = { ...this.props.options };
    update.layers[layer].visible = value;
    this.props.onOptionsChange(update);
  };

  resolveLatLngFromVars(options, data, replaceVariables) {
    // set a sensible default output: 0,0 in case we can't resolve.
    let output = {
      resolvedLat: 0,
      resolvedLng: 0,
    };
    if (this.props.options.initialViewStrategy === 'variables') {
      let frames: any[];
      frames = data.series.map((series) => {
        return new DataFrameView(series);
      });
      const toResolve = {
        latitudeVar: 'resolvedLat',
        longitudeVar: 'resolvedLng',
      };

      Object.keys(toResolve).forEach((variableName) => {
        const resolvedName = toResolve[variableName];
        let fieldName = options[variableName];
        // if the latitudeVar contains the string "__data.fields"
        if (options[variableName].indexOf('__data.fields') >= 0) {
          // we're trying to get the field name from the interior of the string,
          // surrounded by quotation marks
          fieldName = this.props.options[variableName].split('"')[1];
        }
        // this block attempts to resolve "template level" i.e. dashboard vars
        let candidateVal = parseFloat(replaceVariables(fieldName));
        if (!isNaN(candidateVal)) {
          output[resolvedName] = candidateVal;
        } else {
          // in the case that we can't resolve the dashboard var,
          // loop through the dataframeview searching for our field,
          // and once the field is found, loop through until we find the
          // first value. Then set the var and return
          frames.forEach((frame) => {
            frame.forEach((row) => {
              if (!!row[fieldName]) {
                output[resolvedName] = row[fieldName];
              }
            });
          });
        }
      });
    }
    return output;
  }

  resolveMapData(layer: number, replaceVariables) {
    const { options } = this.props;
    // if we want to fetch from a url, check the cache or return a live response
    if (options.layers[layer]['jsonFromUrl']) {
      let jsonUrl = replaceVariables(options.layers[layer]['mapjsonUrl']);
      if (this.mapjsonCache[layer][jsonUrl]) {
        // if we have a cached copy of the response, return it wrapped in a promise
        return new Promise((resolve) => {
          resolve(this.mapjsonCache[layer][jsonUrl]);
        });
      }
      // otherwise return a promise from `fetch`
      return fetch(jsonUrl)
        .then((response) => {
          this.mapjsonCache[layer][jsonUrl] = response.text();
          return this.mapjsonCache[layer][jsonUrl];
        })
        .catch((error) => {
          // Handle the error
          // this is important logging for end users.
          console.error('Failed to fetch JSON from URL: ', encodeURI(jsonUrl));
          return JSON.stringify({ nodes: [], edges: [] });
        });
    }
    // in the case that we don't want to fetch from a url, return a promise with local data
    return new Promise((resolve) => {
      if (options.layers[layer]['mapjson']) {
        resolve(options.layers[layer]['mapjson']); // if local data is set, return it
      } else {
        resolve({ nodes: [], edges: [] }); // default value: empty layer
      }
    });
  }

  updateMap() {
    const { options, data, width, height, replaceVariables, fieldConfig } = this.props;

    const latLng = this.resolveLatLngFromVars(options, data, replaceVariables);

    this.mapCanvas.current.updateTopology = this.updateMapJson;
    if (fieldConfig.defaults?.unit) {
      this.mapCanvas.current.valueFormat = getValueFormat(fieldConfig.defaults?.unit);
    }

    this.mapCanvas.current.setAttribute('startlat', latLng['resolvedLat']);
    this.mapCanvas.current.setAttribute('startlng', latLng['resolvedLng']);

    let colors: any[] = [];
    let fields: any[] = [];
    for(let i=0; i<LAYER_LIMIT; i++){
      if(!options.layers[i]){ continue; }
      colors.push({
        defaultColor: options.layers[i].color,
        nodeThresholds: options.layers[i].nodeThresholds?.steps || [],
      })
      fields.push({
        srcField: options.layers[i].srcField,
        dstField: options.layers[i].dstField,
        inboundValueField: options.layers[i].inboundValueField,
        outboundValueField: options.layers[i].outboundValueField,
        endpointId: options.layers[i].endpointId,
        nodeNameMatchField: options.layers[i].nodeNameMatchField,
        nodeValueField: options.layers[i].nodeValueField,
      })
    }
    let topology = [
      { nodes: [], edges: [] },
      { nodes: [], edges: [] },
      { nodes: [], edges: [] },
    ]

    try {
      if (data) {
        Promise.all([
          this.resolveMapData(0, replaceVariables),
          this.resolveMapData(1, replaceVariables),
          this.resolveMapData(2, replaceVariables),
        ]).then((topologyData) => {
          for(let i=0; i<LAYER_LIMIT; i++){
            try {
              // @ts-ignore
              topology[i] = parseData(data, topologyData[i], colors[i], fields[i], i);
            } catch(e) {
              if(!this.mapCanvas.jsonResults){
                this.mapCanvas.jsonResults = [];
              }
              // @ts-ignore
              topology[i] = topologyData[i];
              console.error(e);
            }
          }
          this.mapCanvas.current.updateMapTopology(topology);
          this.mapCanvas.current.updateMapDimensions({ width: width, height: height });
          PubSub.publish('hideTooltip', null, this.mapCanvas.current);
        });
      }
    } catch (error) {
    }

    PubSub.subscribe('setVariables', this.setDashboardVariables(), this.mapCanvas.current);
    PubSub.subscribe(
      'updateTopologyData',
      () => {
        this.updateMapJson(this.mapCanvas.current['topology']);
      },
      this.mapCanvas.current
    );
  }
  componentDidMount() {
    this.updateMap();
  }

  componentDidUpdate() {
    this.updateMap();

    let changed = this.calculateOptionsChanges();

    if (changed.length > 0) {
      this.mapCanvas.current.updateMapOptions({ options: this.lastOptions, changed: changed });
    }
  }

  render() {
    const { options, width, height, data, replaceVariables, fieldConfig } = this.props;

    let thresholds: any[];
    thresholds = [];
    fieldConfig.defaults?.thresholds?.steps?.forEach((threshold) => {
      thresholds.push({
        color: this.theme.visualization.getColorByName(threshold.color),
        value: threshold.value,
      });
    });
    options.thresholds = thresholds;
    options.zIndexBase = 200;

    const output = this.resolveLatLngFromVars(options, data, replaceVariables);
    return React.createElement('esnet-map-canvas', {
      options: JSON.stringify(options),
      width: width,
      height: height,
      startlat: output['resolvedLat'],
      startlng: output['resolvedLng'],
      ref: this.mapCanvas,
    });
  }
}
