import React, { Component } from 'react';
import { PanelProps } from '@grafana/data';
import { MapOptions } from 'types';
import { parseData } from 'dataParser';
import { sanitizeTopology } from 'topologyTools';
import { PubSub } from 'components/pubsub.js';
import 'components/MapCanvas.component.js';

interface Props extends PanelProps<MapOptions> {}

export class MapPanel extends Component<Props> {
  mapCanvas: any;
  lastOptions: any;

  constructor(props: Props) {
    super(props);
    // ref approach... doesn't seem to want to work.
    this.mapCanvas = React.createRef();
    this.lastOptions = {};
    PubSub.subscribe('updateTopology', this.updateMapJson, this);
    PubSub.subscribe('updateOptions', this.updateCenter, this);
    //PubSub.subscribe('toggleLayer', this.toggleLayer);
  }

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
    console.log(this);
    console.log(this.props);
    console.log(this.props.onOptionsChange);
    var theObj: any;
    theObj = { ...options, mapjsonL1, mapjsonL2, mapjsonL3 };
    console.log(theObj);
    this.props.onOptionsChange(theObj);
  };

  straightenEdges = (mapJson) => {
    mapJson = JSON.parse(mapJson);
    for (let i = 0; i < mapJson.edges.length; i++) {
      let edge = mapJson.edges[i];
      let zIdx = edge.latLngs.length - 1;
      let a = edge.latLngs[0];
      let z = edge.latLngs[zIdx];
      let midpoint = [(a[0] + z[0]) / 2, (a[1] + z[1]) / 2];
      mapJson.edges[i].latLngs = [a, midpoint, z];
    }
    return JSON.stringify(mapJson);
  };

  recalcEdges = () => {
    const { options } = this.props;
    let { mapjsonL1, mapjsonL2, mapjsonL3 } = options;
    mapjsonL1 = this.straightenEdges(mapjsonL1);
    mapjsonL2 = this.straightenEdges(mapjsonL2);
    mapjsonL3 = this.straightenEdges(mapjsonL3);
    this.props.onOptionsChange({ ...options, mapjsonL1, mapjsonL2, mapjsonL3 });
    setTimeout(function () {
      PubSub.publish('repaint', null);
    }, 10);
  };

  // A function to update the map jsons in the Edit panel based on the current map state
  // Used in esmap.js
  updateCenter = (updateData) => {
    let zoom = updateData['zoom'];
    let center = updateData['center'];
    console.log('MapPanel.updateCenter');
    const { options } = this.props;
    let { startLat, startLng, startZoom } = options;
    startZoom = zoom;
    startLat = center.lat;
    startLng = center.lng;
    this.props.onOptionsChange({ ...options, startZoom, startLat, startLng });
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

  componentDidUpdate() {
    const optionsToWatch = [
      'tileSetLayer',
      'boundaryLayer',
      'labelLayer',

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
    var changed: string[];
    changed = [];

    optionsToWatch.forEach((option) => {
      if (this.lastOptions[option] !== this.props.options[option]) {
        this.lastOptions[option] = this.props.options[option];
        changed.push(option);
      }
    });
    if (changed.length > 0) {
      PubSub.publish('updateMapOptions', { options: this.lastOptions, changed: changed });
    }
  }

  render() {
    const { options, data, width, height } = this.props;
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
    /*var resultL1 = [false, ''];
    var resultL2 = [false, ''];
    var resultL3 = [false, ''];*/

    try {
      if (data) {
        if (options.mapjsonL1) {
          //resultL1 = testJsonSchema(JSON.parse(options.mapjsonL1));
          parsedDataL1 = parseData(data, options.mapjsonL1, colorsL1, fieldsL1, 1);
          mapDataL1 = parsedDataL1[3];
        }
        if (options.mapjsonL2) {
          //resultL2 = testJsonSchema(JSON.parse(options.mapjsonL2));
          parsedDataL2 = parseData(data, options.mapjsonL2, colorsL2, fieldsL2, 2);
          mapDataL2 = parsedDataL2[3];
        }
        if (options.mapjsonL3) {
          //resultL3 = testJsonSchema(JSON.parse(options.mapjsonL3));
          parsedDataL3 = parseData(data, options.mapjsonL3, colorsL3, fieldsL3, 3);
          mapDataL3 = parsedDataL3[3];
        }
      }
    } catch (error) {
      console.error('Parsing error : ', error);
    }

    var output = React.createElement('map-canvas', {
      options: JSON.stringify(options),
      topology: JSON.stringify({
        layer1: mapDataL1,
        layer2: mapDataL2,
        layer3: mapDataL3,
      }),
      width: width,
      height: height,
      ref: this.mapCanvas,
    });
    PubSub.publish('updateMapTopology', {
      layer1: mapDataL1,
      layer2: mapDataL2,
      layer3: mapDataL3,
    });
    PubSub.publish('updateMapDimensions', {
      width: width,
      height: height,
    });
    console.log(this.mapCanvas);

    return output;
  }
}
