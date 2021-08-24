import React from 'react';
import { PanelProps } from '@grafana/data';
import { MapOptions } from 'types';
import { parseData } from 'parseData.js';
import { Canvas } from 'components/Canvas';

interface Props extends PanelProps<MapOptions> {}

export const MapPanel: React.FC<Props> = ({ options, data, width, height, id }) => {
  let graphOptions = {
    ...options,
  };

  var parsedData = {};
  try {
    parsedData = parseData(data);
    console.log(parsedData);
  } catch (error) {
    console.error('Parsing error : ', error);
  }

  // return <div>Hello World</div>;

  return (
    <Canvas
      height={height}
      width={width}
      panelId={id}
      options={graphOptions}
      data={parsedData}
      mapData={graphOptions.mapjson}
    />
  );
};
