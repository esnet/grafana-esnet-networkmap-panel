import React, { Component } from 'react';
// import { PanelProps, urlUtil } from '@grafana/data';
import { PanelProps } from '@grafana/data';
import { MapOptions } from 'types';
import { parseData } from 'dataParser';
import { Canvas } from 'components/Canvas';

interface Props extends PanelProps<MapOptions> {}

export class MapPanel extends Component<Props> {
  //= ({ options, data, width, height, id }) =>
  constructor(props: Props) {
    super(props);
  }

  // A function to update the map jsons in the Edit panel based on the current map state
  updateMapJson = (newDataL1, newDataL2, newDataL3, zoom, center) => {
    const { options } = this.props;
    let { mapjsonL1, mapjsonL2, mapjsonL3, startLat, startLng, startZoom } = options;
    if (newDataL1 != null) {
      mapjsonL1 = JSON.stringify(newDataL1);
    }
    if (newDataL2 != null) {
      mapjsonL2 = JSON.stringify(newDataL2);
    }
    if (newDataL3 != null) {
      mapjsonL3 = JSON.stringify(newDataL3);
    }
    startZoom = zoom;
    startLat = center.lat;
    startLng = center.lng;
    this.props.onOptionsChange({ ...options, mapjsonL1, mapjsonL2, mapjsonL3, startZoom, startLat, startLng });
  };

  // A function to turn layers on or off. Takes in the layer and boolean value
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

  updateCenter = (zoom, center) => {
    const { options } = this.props;
    let { startLat, startLng, startZoom } = options;
    startZoom = zoom;
    startLat = center.lat;
    startLng = center.lng;
    this.props.onOptionsChange({ ...options, startZoom, startLat, startLng });
  };

  render() {
    const { options, data, width, height, id } = this.props;
    // var params = urlUtil.getUrlSearchParams();
    // if (params.editPanel != null) {
    //   options.editMode = true;
    // } else {
    //   options.editMode = false;
    // }
    var colorsL1 = {
      defaultColor: options.color1,
      nodeHighlight: options.nodeHighlightL1,
    };
    var fieldsL1 = {
      srcField: options.srcFieldL1,
      dstField: options.dstFieldL1,
      valField: options.valFieldL1,
      endpointId: options.endpointIdL1,
    };
    var colorsL2 = {
      defaultColor: options.color2,
      nodeHighlight: options.nodeHighlightL2,
    };
    var fieldsL2 = {
      srcField: options.srcFieldL2,
      dstField: options.dstFieldL2,
      valField: options.valFieldL2,
      endpointId: options.endpointIdL2,
    };
    var colorsL3 = {
      defaultColor: options.color3,
      nodeHighlight: options.nodeHighlightL3,
    };
    var fieldsL3 = {
      srcField: options.srcFieldL3,
      dstField: options.dstFieldL3,
      valField: options.valFieldL3,
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
          parsedDataL1 = parseData(data, options.mapjsonL1, colorsL1, fieldsL1);
          mapDataL1 = parsedDataL1[3];
        }
        if (options.mapjsonL2) {
          parsedDataL2 = parseData(data, options.mapjsonL2, colorsL2, fieldsL2);
          mapDataL2 = parsedDataL2[3];
        }
        if (options.mapjsonL3) {
          parsedDataL3 = parseData(data, options.mapjsonL3, colorsL3, fieldsL3);
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
      />
    );
  }
}
