import React, { Component } from 'react';
import { PanelProps, createTheme, DataFrameView } from '@grafana/data';
import { MapOptions } from 'types';
import { parseData } from 'components/lib/dataParser';
import { sanitizeTopology } from 'components/lib/topologyTools';
import 'components/MapCanvas.component.js';
import { PubSub } from 'components/lib/pubsub.js';

interface Props extends PanelProps<MapOptions> {}

export class MapPanel extends Component<Props> {
  mapCanvas: any;
  lastOptions: any;
  theme: any;

  constructor(props: Props) {
    super(props);
    this.mapCanvas = React.createRef();
    this.lastOptions = this.props.options;
    this.theme = createTheme();
    PubSub.subscribe('returnMapCenterAndZoom', this.updateCenter);
  }

  updateCenter = (centerData) => {
    const startLat = centerData.center.lat;
    const startLng = centerData.center.lng;
    const startZoom = centerData.zoom;
    this.props.onOptionsChange({ ...this.props.options, startLat, startLng, startZoom });
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
    var changed: string[];
    changed = [];

    const optionsToWatch = [
      'background',
      'tileSetLayer',
      'boundaryLayer',
      'labelLayer',
      'showSidebar',
      'showViewControls',
      'enableScrolling',
      'enableEditing',

      'layer1',
      'color1',
      'endpointIdL1',
      'nodeHighlightL1',
      'nodeWidthL1',
      'edgeWidthL1',
      'pathOffsetL1',
      'layerName1',
      'legendL1',

      'layer2',
      'color2',
      'endpointIdL2',
      'nodeHighlightL2',
      'nodeWidthL2',
      'edgeWidthL2',
      'pathOffsetL2',
      'layerName2',
      'legendL2',

      'layer3',
      'color3',
      'endpointIdL3',
      'nodeHighlightL3',
      'nodeWidthL3',
      'edgeWidthL3',
      'pathOffsetL3',
      'layerName3',
      'legendL3',
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

  updateMap() {
    const { options, data, width, height } = this.props;

    this.mapCanvas.current.updateTopology = this.updateMapJson;

    var colorsL1 = {
      defaultColor: options.color1,
      nodeHighlight: options.nodeHighlightL1,
    };
    var fieldsL1 = {
      srcField: options.srcFieldL1,
      dstField: options.dstFieldL1,
      inboundValueField: options.inboundValueFieldL1,
      outboundValueField: options.outboundValueFieldL1,
      endpointId: options.endpointIdL1,
    };
    var colorsL2 = {
      defaultColor: options.color2,
      nodeHighlight: options.nodeHighlightL2,
    };
    var fieldsL2 = {
      srcField: options.srcFieldL2,
      dstField: options.dstFieldL2,
      inboundValueField: options.inboundValueFieldL2,
      outboundValueField: options.outboundValueFieldL2,
      endpointId: options.endpointIdL2,
    };
    var colorsL3 = {
      defaultColor: options.color3,
      nodeHighlight: options.nodeHighlightL3,
    };
    var fieldsL3 = {
      srcField: options.srcFieldL3,
      dstField: options.dstFieldL3,
      inboundValueField: options.inboundValueFieldL3,
      outboundValueField: options.outboundValueFieldL3,
      endpointId: options.endpointIdL3,
    };
    var parsedDataL1 = {};
    var parsedDataL2 = {};
    var parsedDataL3 = {};
    var mapDataL1;
    var mapDataL2;
    var mapDataL3;

    try {
      if (data) {
        if (options.mapjsonL1) {
          parsedDataL1 = parseData(data, options.mapjsonL1, colorsL1, fieldsL1, 1);
          mapDataL1 = parsedDataL1[3];
        }
        if (options.mapjsonL2) {
          parsedDataL2 = parseData(data, options.mapjsonL2, colorsL2, fieldsL2, 2);
          mapDataL2 = parsedDataL2[3];
        }
        if (options.mapjsonL3) {
          parsedDataL3 = parseData(data, options.mapjsonL3, colorsL3, fieldsL3, 3);
          mapDataL3 = parsedDataL3[3];
        }
      }
    } catch (error) {
      console.error('Parsing error : ', error);
    }

    const topology = {
      layer1: mapDataL1,
      layer2: mapDataL2,
      layer3: mapDataL3,
    };
    PubSub.subscribe(
      'updateTopologyData',
      () => {
        this.updateMapJson(this.mapCanvas.current['topology']);
      },
      this.mapCanvas.current
    );
    this.mapCanvas.current &&
      this.mapCanvas.current.updateMapTopology &&
      this.mapCanvas.current.updateMapTopology(topology);
    this.mapCanvas.current &&
      this.mapCanvas.current.updateMapDimensions &&
      this.mapCanvas.current.updateMapDimensions({ width: width, height: height });
  }
  componentDidMount() {
    this.updateMap();
  }

  componentDidUpdate() {
    this.updateMap();

    var changed = this.calculateOptionsChanges();

    if (changed.length > 0) {
      this.mapCanvas.current.updateMapOptions({ options: this.lastOptions, changed: changed });
    }
  }

  resolveLatLngFromVars(options, data, replaceVariables) {
    var output = {
      resolvedLat: 0,
      resolvedLng: 0,
    };
    if (this.props.options.mapCenterFromVars) {
      var frames: any[];
      frames = data.series.map((series) => {
        return new DataFrameView(series);
      });
      const toResolve = {
        latitudeVar: 'resolvedLat',
        longitudeVar: 'resolvedLng',
      };
      Object.keys(toResolve).forEach((variableName) => {
        const resolvedName = toResolve[variableName];
        // if the latitudeVar has the string "__data.fields"
        var fieldName = options[variableName];
        if (options[variableName].indexOf('__data.fields') >= 0) {
          fieldName = this.props.options[variableName].split('"')[1];
        }
        var candidateVal = parseFloat(replaceVariables(fieldName));
        if (!isNaN(candidateVal)) {
          output[resolvedName] = candidateVal;
        }
        for (var i = 0; i < frames.length; i++) {
          var frameFields = Object.keys(frames[i].fields);
          if (frameFields.indexOf(fieldName) >= 0) {
            var buffer = frames[i].fields[fieldName].values.buffer;
            output[resolvedName] = buffer[buffer.length - 1];
            break;
          }
        }
      });
    }
    return output;
  }

  render() {
    const { options, width, height, data, replaceVariables } = this.props;
    const output = this.resolveLatLngFromVars(options, data, replaceVariables);
    options['resolvedLat'] = output['resolvedLat'];
    options['resolvedLng'] = output['resolvedLng'];
    return React.createElement('esnet-map-canvas', {
      options: JSON.stringify(options),
      width: width,
      height: height,
      ref: this.mapCanvas,
    });
  }
}
