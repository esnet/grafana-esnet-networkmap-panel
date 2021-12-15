import React, { useEffect } from 'react';
import { urlUtil } from '@grafana/data';
import NetworkMap from './RenderMap.js';
import { SideBar } from 'components/SideBar';
import '../css/esmap.css';
import '../css/leaflet.css';

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
  const editMode = props.options.editMode;
  const layer2 = props.options.layer2;
  const layer1 = props.options.layer1;
  const layer3 = props.options.layer3;
  const mapHeight = props.height - 25;
  const tooltipWidth = '15%';
  const mapWidth = '85%';
  // const mapWidth = width - tooltipWidth;
  var params = urlUtil.getUrlSearchParams();
  if (params.editPanel != null) {
    options.editMode = true;
  } else {
    options.editMode = false;
  }
  const mapContainer = 'Map_' + panelId + options.editMode.toString();

  useEffect(() => {
    const map = new NetworkMap(mapContainer);
    var thisMap = map.renderMap(
      data,
      mapData,
      options,
      updateMapJson,
      updateCenter,
      mapWidth,
      height,
      editMode,
      mapContainer
    );

    return () => {
      // SUPER IMPORTANT!!! this removes the old map before rerendering
      if (thisMap) {
        thisMap.off();
        thisMap.remove();
      }
    };
  }, [width, height, panelId, editMode, layer2, layer1, layer3]); // adding options var here breaks it

  return (
    <div>
      <div id={mapContainer} style={{ height: mapHeight, width: mapWidth, float: 'left' }}></div>
      <SideBar
        height={height}
        width={tooltipWidth}
        panelId={panelId}
        options={options}
        toggleLayer={props.toggleLayer}
      />
      <button type={'button'} id={'edit_mode'} hidden={!editMode}>
        Turn Edit Mode Off
      </button>
    </div>
  );
};
