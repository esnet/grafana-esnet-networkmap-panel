import React, { useEffect } from 'react';
import NetworkMap from './RenderMap.js';
import '../css/esmap.css';
import '../css/leaflet.css';

export const Canvas = (props) => {
  // var print = props.options.mapjson;
  const panelId = props.panelId;
  const data = props.data;
  const mapData = props.mapData;
  const options = props.options;
  const updateMapJson = props.updateMapJson;
  // const json = props.json;
  // const setJson = props.setJson;

  useEffect(() => {
    const map = new NetworkMap('Map_' + panelId);
    var thisMap = map.renderMap(data, mapData, options, updateMapJson);

    return () => {
      // updateMapJson();
      // SUPER IMPORTANT!!! this removes the old map before rerendering
      if (thisMap) {
        thisMap.off();
        thisMap.remove();
      }
    };
  });
  const mapHeight = props.height - 25;

  return (
    <div>
      <div className={'tooltip'}></div>
      <div id={'Map_' + props.panelId} style={{ height: mapHeight, width: props.width }}></div>
      <button type="button" id="edit_mode">
        Turn Edit Mode Off
      </button>
    </div>
  );
};
