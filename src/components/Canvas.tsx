import React, { useEffect } from 'react';
import NetworkMap from './RenderMap.js';
import '../css/esmap.css';
import '../css/leaflet.css';
import { urlUtil } from '@grafana/data';

export const Canvas = (props) => {
  // var print = props.options.mapjson;
  const panelId = props.panelId;
  const data = { layer1: props.dataL1, layer2: props.dataL2 };
  const mapData = { layer1: props.mapDataL1, layer2: props.mapDataL2 };
  const options = props.options;
  const updateMapJson = props.updateMapJson;
  const height = props.height;
  const width = props.width;
  const updateCenter = props.updateCenter;
  const editMode = props.editMode;
  const layer2 = props.options.layer2;
  const layer1 = props.options.layer1;

  var params = urlUtil.getUrlSearchParams();
  if (params.editPanel != null) {
    props.editMode = 1;
    // call update map?
  } else {
    props.editMode = 0;
  }

  useEffect(() => {
    const map = new NetworkMap('Map_' + panelId);
    var thisMap = map.renderMap(data, mapData, options, updateMapJson, updateCenter);

    return () => {
      // updateMapJson();
      // SUPER IMPORTANT!!! this removes the old map before rerendering
      if (thisMap) {
        thisMap.off();
        thisMap.remove();
      }
    };
  }, [width, height, panelId, editMode, layer2, layer1]); // adding options var here breaks it
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
