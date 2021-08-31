import React from 'react';
import { PanelProps } from '@grafana/data';
import { MapOptions } from 'types';
import { parseData } from 'dataParser';
import { Canvas } from 'components/Canvas';

interface Props extends PanelProps<MapOptions> {}

export const MapPanel: React.FC<Props> = ({ options, data, width, height, id }) => {
  let graphOptions = {
    ...options,
  };
  var colors = {
    defaultColor: graphOptions.color,
    nodeHighlight: graphOptions.nodeHighlight,
  };
  var fields = {
    srcField: graphOptions.srcField,
    dstField: graphOptions.dstField,
    valField: graphOptions.valField,
  };
  var parsedData = {};
  var mapData;
  try {
    parsedData = parseData(data, graphOptions.mapjson, colors, fields);
    mapData = parsedData[3];
  } catch (error) {
    console.error('Parsing error : ', error);
  }

  // return <div>Hello World</div>;

  return (
    <Canvas height={height} width={width} panelId={id} options={graphOptions} data={parsedData} mapData={mapData} />
  );
};
