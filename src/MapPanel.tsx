import React, { Component } from 'react';
import { PanelProps } from '@grafana/data';
import { MapOptions } from 'types';
import { parseData } from 'dataParser';
import { testJsonSchema } from 'components/schema';
import { Canvas } from 'components/Canvas';

interface Props extends PanelProps<MapOptions> {}

export class MapPanel extends Component<Props> {
  constructor(props: Props) {
    super(props);
  }

  sanitizeNode = (node) => {
    return {
      name: node.name,
      meta: node.meta,
      latLng: node.latLng,
    };
  };
  sanitizeEdge = (edge) => {
    return {
      name: edge.name,
      meta: edge.meta,
      latLngs: edge.latLngs,
      children: edge.children,
    };
  };
  sanitizeMapJsonLayer = (layerData) => {
    return {
      name: layerData.name,
      layer: layerData.layer,
      pathLayout: layerData.pathLayout,
      edges: layerData.edges.reduce((output, edge) => {
        output.push(this.sanitizeEdge(edge));
        return output;
      }, []),
      nodes: layerData.nodes.reduce((output, node) => {
        output.push(this.sanitizeNode(node));
        return output;
      }, []),
    };
  };
  // A function to update the map jsons in the Edit panel based on the current map state
  // Used in esmap.js
  updateMapJson = (newDataL1, newDataL2, newDataL3) => {
    const { options } = this.props;
    let { mapjsonL1, mapjsonL2, mapjsonL3 } = options;
    if (newDataL1 != null) {
      mapjsonL1 = JSON.stringify(this.sanitizeMapJsonLayer(newDataL1));
    }
    if (newDataL2 != null) {
      mapjsonL2 = JSON.stringify(this.sanitizeMapJsonLayer(newDataL2));
    }
    if (newDataL3 != null) {
      mapjsonL3 = JSON.stringify(this.sanitizeMapJsonLayer(newDataL3));
    }
    this.props.onOptionsChange({ ...options, mapjsonL1, mapjsonL2, mapjsonL3 });
  };

  // A function to update the map jsons in the Edit panel based on the current map state
  // Used in esmap.js
  updateCenter = (zoom, center) => {
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

  render() {
    const { options, data, width, height, id } = this.props;
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
    var resultL1 = [false, ''];
    var resultL2 = [false, ''];
    var resultL3 = [false, ''];

    try {
      if (data) {
        if (options.mapjsonL1) {
          resultL1 = testJsonSchema(JSON.parse(options.mapjsonL1));
          parsedDataL1 = parseData(data, options.mapjsonL1, colorsL1, fieldsL1, 1);
          mapDataL1 = parsedDataL1[3];
        }
        if (options.mapjsonL2) {
          resultL2 = testJsonSchema(JSON.parse(options.mapjsonL2));
          parsedDataL2 = parseData(data, options.mapjsonL2, colorsL2, fieldsL2, 2);
          mapDataL2 = parsedDataL2[3];
        }
        if (options.mapjsonL3) {
          resultL3 = testJsonSchema(JSON.parse(options.mapjsonL3));
          parsedDataL3 = parseData(data, options.mapjsonL3, colorsL3, fieldsL3, 3);
          mapDataL3 = parsedDataL3[3];
        }
      }
    } catch (error) {
      console.error('Parsing error : ', error);
    }

    return (
      <Canvas
        height={height}
        width={width}
        panelId={id}
        options={options}
        dataL1={parsedDataL1}
        dataL2={parsedDataL2}
        dataL3={parsedDataL3}
        mapDataL1={mapDataL1}
        mapDataL2={mapDataL2}
        mapDataL3={mapDataL3}
        updateMapJson={this.updateMapJson}
        updateCenter={this.updateCenter}
        toggleLayer={this.toggleLayer}
        jsonSchemaL1={resultL1}
        jsonSchemaL2={resultL2}
        jsonSchemaL3={resultL3}
      />
    );
  }
}
