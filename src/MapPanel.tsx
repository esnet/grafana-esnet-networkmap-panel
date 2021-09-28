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

  updateMapJson = (newData, zoom, center) => {
    const { options } = this.props;
    let { mapjson, startLat, startLng, startZoom } = options;
    mapjson = JSON.stringify(newData);
    startZoom = zoom;
    startLat = center.lat;
    startLng = center.lng;
    this.props.onOptionsChange({ ...options, mapjson, startZoom, startLat, startLng });
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
    var colors = {
      defaultColor: options.color,
      nodeHighlight: options.nodeHighlight,
    };
    var fields = {
      srcField: options.srcField,
      dstField: options.dstField,
      valField: options.valField,
      endpointId: options.endpointId,
    };
    var parsedData = {};
    var mapData;

    try {
      parsedData = parseData(data, options.mapjson, colors, fields);
      mapData = parsedData[3];
    } catch (error) {
      console.error('Parsing error : ', error);
    }
    return (
      <Canvas
        height={height}
        width={width}
        panelId={id}
        options={options}
        data={parsedData}
        mapData={mapData}
        updateMapJson={this.updateMapJson}
        updateCenter={this.updateCenter}
        editMode={0}
      />
    );
  }
}
