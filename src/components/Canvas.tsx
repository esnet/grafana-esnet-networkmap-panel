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
  const mapHeight = props.height - 100;

  return (
    <div>
      <div style={{ height: '50px', width: props.width }}>ESnet Network Map - Alpha</div>
      <div className={'tooltip'}></div>
      <div id={'Map_' + props.panelId} style={{ height: mapHeight, width: props.width }}></div>
      <button type="button" id="edit_mode">
        Turn Edit Mode Off
      </button>
    </div>
  );
};
