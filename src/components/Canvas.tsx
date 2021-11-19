import React, { useEffect } from 'react';
import NetworkMap from './RenderMap.js';
import { SideBar } from 'components/SideBar';
import '../css/esmap.css';
import '../css/leaflet.css';
// import { urlUtil } from '@grafana/data';

export const Canvas = (props) => {
  // var print = props.options.mapjson;
  const panelId = props.panelId;
  const data = { layer1: props.dataL1, layer2: props.dataL2, layer3: props.dataL3 };
  const mapData = { layer1: props.mapDataL1, layer2: props.mapDataL2, layer3: props.mapDataL3 };
  const options = props.options;
  const updateMapJson = props.updateMapJson;
  const height = props.height;
  const width = props.width;
  const updateCenter = props.updateCenter;
  const editMode = props.editMode;
  const layer2 = props.options.layer2;
  const layer1 = props.options.layer1;
  const layer3 = props.options.layer3;

  // var params = urlUtil.getUrlSearchParams();
  // if (params.editPanel != null) {
  //   props.editMode = 1;
  //   // call update map?
  // } else {
  //   props.editMode = 0;
  // }
  const mapHeight = props.height - 25;
  const tooltipWidth = 150;
  const mapWidth = width - tooltipWidth;
  useEffect(() => {
    const map = new NetworkMap('Map_' + panelId);
    var thisMap = map.renderMap(data, mapData, options, updateMapJson, updateCenter, mapWidth, height);

    return () => {
      // updateMapJson();
      // SUPER IMPORTANT!!! this removes the old map before rerendering
      if (thisMap) {
        thisMap.off();
        thisMap.remove();
      }
    };
  }, [width, height, panelId, editMode, layer2, layer1, layer3]); // adding options var here breaks it

  return (
    <div>
      {/* <div className={'tooltip'}></div> */}
      <div id={'Map_' + props.panelId} style={{ height: mapHeight, width: mapWidth, float: 'left' }}></div>
      <SideBar
        height={height}
        width={tooltipWidth}
        panelId={panelId}
        options={options}
        editMode={options.editMode}
        toggleLayer={props.toggleLayer}
      />
      <button type={'button'} id={'edit_mode'}>
        Turn Edit Mode Off
      </button>
    </div>
  );
};
