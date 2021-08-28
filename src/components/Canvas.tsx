import React, { useEffect } from 'react';
import NetworkMap from './RenderMap.js';
import '../css/esmap.css';
import '../css/leaflet.css';

export const Canvas = (props) => {
  useEffect(() => {
    const id = props.panelId;
    const map = new NetworkMap('Map_' + id);

    var thisMap = map.renderMap(props.data, props.mapData);
    // SUPER IMPORTANT!!! this removes the old map before rerendering
    return () => {
      thisMap.off();
      thisMap.remove();
    };
  });
  const mapHeight = props.height - 150;

  return (
    <div>
      {console.log('map data')}
      {console.log(props.mapData)}
      <div style={{ height: '100px', width: props.width }}>
        Put some thing here to test layout and click to geo mapping
      </div>
      <div className={'tooltip'}></div>
      <div id={'Map_' + props.panelId} style={{ height: mapHeight, width: props.width }}></div>
      <button type="button" id="edit_mode">
        Turn Edit Mode Off
      </button>
    </div>
  );
};
