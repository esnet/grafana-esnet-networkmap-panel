import React, { Component } from 'react';
import { PanelProps, createTheme, DataFrameView, getValueFormat } from '@grafana/data';
import { MapOptions } from 'types';
import { parseData } from 'components/lib/dataParser';
import { sanitizeTopology } from 'components/lib/topologyTools';
import 'components/MapCanvas.component.js';
import { PubSub } from 'components/lib/pubsub.js';
import { locationService } from '@grafana/runtime';

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
    this.lastOptions = this.props.options;
    this.theme = createTheme();
    PubSub.subscribe('returnMapCenterAndZoom', this.updateCenter);
    PubSub.subscribe('returnMapViewport', this.updateMapViewport);
  }

  setDashboardVariables() {
    let self = this;
    return function (event) {
      let setLocation = {};
      for (let i = 1; i < 3; i++) {
        const srcVar = 'var-' + self.props.options['dashboardEdgeSrcVarL' + i];
        const dstVar = 'var-' + self.props.options['dashboardEdgeDstVarL' + i];
        const nodeVar = 'var-' + self.props.options['dashboardNodeVarL' + i];
        setLocation[srcVar] = null;
        setLocation[dstVar] = null;
        setLocation[nodeVar] = null;
      }
      if (event && event.nodeA && event.nodeZ) {
        const srcVariable = 'var-' + self.props.options['dashboardEdgeSrcVarL' + event.layer];
        setLocation[srcVariable] = event.nodeA;
        const dstVariable = 'var-' + self.props.options['dashboardEdgeDstVarL' + event.layer];
        setLocation[dstVariable] = event.nodeZ;
      }
      if (event && event.type === 'node') {
        const dashboardVariable = 'var-' + self.props.options['dashboardNodeVarL' + event.layer];
        setLocation[dashboardVariable] = event.selection.name;
      }

      locationService.partial(setLocation, false);
    };
  }

  updateCenter = (centerData) => {
    const startLat = centerData.center.lat;
    const startLng = centerData.center.lng;
    const startZoom = centerData.zoom;
    this.props.onOptionsChange({ ...this.props.options, startLat, startLng, startZoom });
  };

  updateMapViewport = (viewportData) => {
    const coordinates = viewportData.coordinates;
    const viewportTopLeftLat = coordinates.getNorth().toFixed(2);
    const viewportTopLeftLng = coordinates.getWest().toFixed(2);
    const viewportBottomRightLat = coordinates.getSouth().toFixed(2);
    const viewportBottomRightLng = coordinates.getEast().toFixed(2);
    this.props.onOptionsChange({
      ...this.props.options,
      viewportTopLeftLat,
      viewportTopLeftLng,
      viewportBottomRightLat,
      viewportBottomRightLng,
    });
  };

  // A function to update the map jsons in the Edit panel based on the current map state
  // Used in esmap.js
  updateMapJson = (mapData) => {
    const { options } = this.props;
    let { mapjsonL1, mapjsonL2, mapjsonL3 } = options;
    if (mapData.layer1 != null) {
      mapjsonL1 = JSON.stringify(sanitizeTopology(mapData.layer1));
    }
    if (mapData.layer2 != null) {
      mapjsonL2 = JSON.stringify(sanitizeTopology(mapData.layer2));
    }
    if (mapData.layer3 != null) {
      mapjsonL3 = JSON.stringify(sanitizeTopology(mapData.layer3));
    }
    this.props.onOptionsChange({ ...this.props.options, mapjsonL1, mapjsonL2, mapjsonL3 });
  };

  calculateOptionsChanges = () => {
    let changed: string[];
    changed = [];

    const optionsToWatch = [
      'background',
      'tileSetLayer',
      'boundaryLayer',
      'labelLayer',
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

      'layer1',
      'color1',
      'endpointIdL1',
      'nodeHighlightL1',
      'nodeWidthL1',
      'edgeWidthL1',
      'pathOffsetL1',
      'layerName1',
      'legendL1',
      'dstFieldLabelL1',
      'srcFieldLabelL1',
      'dataFieldLabelL1',

      'layer2',
      'color2',
      'endpointIdL2',
      'nodeHighlightL2',
      'nodeWidthL2',
      'edgeWidthL2',
      'pathOffsetL2',
      'layerName2',
      'legendL2',
      'dstFieldLabelL2',
      'srcFieldLabelL2',
      'dataFieldLabelL2',

      'layer3',
      'color3',
      'endpointIdL3',
      'nodeHighlightL3',
      'nodeWidthL3',
      'edgeWidthL3',
      'pathOffsetL3',
      'layerName3',
      'legendL3',
      'dstFieldLabelL3',
      'srcFieldLabelL3',
      'dataFieldLabelL3',

      'resolvedLat',
      'resolvedLng',
    ];

    optionsToWatch.forEach((option) => {
      if (this.lastOptions[option] !== this.props.options[option]) {
        if (option === 'background') {
          this.props.options[option] = this.theme.visualization.getColorByName(this.props.options.background);
        }
        this.lastOptions[option] = this.props.options[option];
        changed.push(option);
      }
    });
    return changed;
  };

  // A function to turn layers on or off. Takes in the layer and boolean value
  // Used in SideBar.tsx
  toggleLayer = (layer, value) => {
    const { options } = this.props;
    let { layer1, layer2, layer3 } = options;
    if (layer === 'layer1') {
      layer1 = value;
    }
    if (layer === 'layer2') {
      layer2 = value;
    }
    if (layer === 'layer3') {
      layer3 = value;
    }
    this.props.onOptionsChange({ ...options, layer1, layer2, layer3 });
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

  resolveMapData(layer: string, replaceVariables) {
    const { options } = this.props;
    // if we want to fetch from a url, check the cache or return a live response
    if (options['jsonFromUrl' + layer]) {
      let jsonUrl = replaceVariables(options['mapjsonUrl' + layer]);
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
      if (options['mapjson' + layer]) {
        resolve(options['mapjson' + layer]); // if local data is set, return it
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

    let colorsL1 = {
      defaultColor: options.color1,
      nodeHighlight: options.nodeHighlightL1,
    };
    let fieldsL1 = {
      srcField: options.srcFieldL1,
      dstField: options.dstFieldL1,
      inboundValueField: options.inboundValueFieldL1,
      outboundValueField: options.outboundValueFieldL1,
      endpointId: options.endpointIdL1,
    };
    let colorsL2 = {
      defaultColor: options.color2,
      nodeHighlight: options.nodeHighlightL2,
    };
    let fieldsL2 = {
      srcField: options.srcFieldL2,
      dstField: options.dstFieldL2,
      inboundValueField: options.inboundValueFieldL2,
      outboundValueField: options.outboundValueFieldL2,
      endpointId: options.endpointIdL2,
    };
    let colorsL3 = {
      defaultColor: options.color3,
      nodeHighlight: options.nodeHighlightL3,
    };
    let fieldsL3 = {
      srcField: options.srcFieldL3,
      dstField: options.dstFieldL3,
      inboundValueField: options.inboundValueFieldL3,
      outboundValueField: options.outboundValueFieldL3,
      endpointId: options.endpointIdL3,
    };
    let topology = {
      layer1: { nodes: [], edges: [] },
      layer2: { nodes: [], edges: [] },
      layer3: { nodes: [], edges: [] },
    };

    try {
      if (data) {
        Promise.all([
          this.resolveMapData('L1', replaceVariables),
          this.resolveMapData('L2', replaceVariables),
          this.resolveMapData('L3', replaceVariables),
        ]).then((topologyData) => {
          let parsedDataL1 = parseData(data, topologyData[0], colorsL1, fieldsL1, 1);
          let parsedDataL2 = parseData(data, topologyData[1], colorsL2, fieldsL2, 1);
          let parsedDataL3 = parseData(data, topologyData[2], colorsL3, fieldsL3, 1);
          topology['layer1'] = parsedDataL1[3];
          topology['layer2'] = parsedDataL2[3];
          topology['layer3'] = parsedDataL3[3];
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
