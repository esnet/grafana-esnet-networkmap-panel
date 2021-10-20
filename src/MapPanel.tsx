import React, { Component } from 'react';
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

  updateMapJson = (newDataL1, newDataL2, zoom, center) => {
    const { options } = this.props;
    let { mapjsonL1, mapjsonL2, startLat, startLng, startZoom } = options;
    mapjsonL1 = JSON.stringify(newDataL1);
    mapjsonL2 = JSON.stringify(newDataL2);
    startZoom = zoom;
    startLat = center.lat;
    startLng = center.lng;
    this.props.onOptionsChange({ ...options, mapjsonL1, mapjsonL2, startZoom, startLat, startLng });
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
    var colorsL1 = {
      defaultColor: options.color,
      nodeHighlight: options.nodeHighlightL1,
    };
    var colorsL2 = {
      defaultColor: options.color,
      nodeHighlight: options.nodeHighlightL2,
    };
    var fieldsL1 = {
      srcField: options.srcFieldL1,
      dstField: options.dstFieldL1,
      valField: options.valFieldL1,
      endpointId: options.endpointIdL1,
    };
    var fieldsL2 = {
      srcField: options.srcFieldL2,
      dstField: options.dstFieldL2,
      valField: options.valFieldL2,
      endpointId: options.endpointIdL2,
    };
    var parsedDataL1 = {};
    var parsedDataL2 = {};
    var mapDataL1;
    var mapDataL2;

    try {
      parsedDataL1 = parseData(data, options.mapjsonL1, colorsL1, fieldsL1);
      mapDataL1 = parsedDataL1[3];
      if (options.mapjsonL2) {
        parsedDataL2 = parseData(data, options.mapjsonL2, colorsL2, fieldsL2);
        mapDataL2 = parsedDataL2[3];
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
        mapDataL1={mapDataL1}
        mapDataL2={mapDataL2}
        updateMapJson={this.updateMapJson}
        updateCenter={this.updateCenter}
        editMode={0}
      />
    );
  }
}
