import React, { useEffect, useState } from 'react';
import { urlUtil } from '@grafana/data';
import NetworkMap, { destroyCurrentLeafletMap } from './RenderMap.js';
import { SideBar } from 'components/SideBar';
import '../css/esmap.css';
import '../css/leaflet.css';
import { PubSub } from 'components/pubsub.js';

export const Canvas = (props) => {
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
  var params = urlUtil.getUrlSearchParams();
  if (params.editPanel != null) {
    options.editMode = true;
  } else {
    options.editMode = false;
  }
  options.layerValid1 = props.jsonSchemaL1[1];
  options.layerValid2 = props.jsonSchemaL2[1];
  options.layerValid3 = props.jsonSchemaL3[1];
  const mapContainer = 'Map_' + panelId + options.editMode.toString();

  const [, triggerRefresh] = useState('');

  const setButtonScope = (value) => {
    triggerRefresh('');
  };
  const clearSelection = () => {
    PubSub.publish('setVariables', null);
    PubSub.publish('clearSelection', null);
  };
  const homeMap = () => {
    PubSub.publish('destroyMap', null);
    PubSub.publish('repaint', null);
  };
  const renderButtons = () => {
    return (
      <div className="button-overlay">
        <div className="button" onClick={homeMap}>
          🏠
        </div>
        <div className={'button'} id={'clear_selection'} hidden={!PubSub.last('setVariables')} onClick={clearSelection}>
          &times; Clear Selection
        </div>
        <div className={'button'} id={'edge_edit_mode'} hidden={!params.editPanel}>
          Edit Edges: On
        </div>
        <div className={'button'} id={'node_edit_mode'} hidden={!params.editPanel}>
          Edit Nodes: Off
        </div>
      </div>
    );
  };

  // setup our pubsub callback to allow interoperation with d3
  PubSub.subscribe('setVariables', setButtonScope);

  const drawMap = () => {
    destroyCurrentLeafletMap();
    const map = new NetworkMap(mapContainer);
    map.renderMap(data, mapData, options, updateMapJson, updateCenter, mapWidth, height, editMode, mapContainer);

    return destroyCurrentLeafletMap;
  };
  PubSub.subscribe('repaint', drawMap);

  useEffect(drawMap, [width, height, panelId, editMode, layer2, layer1, layer3]); // adding options var here breaks it
  // above return statement throws a warning that we're not using all the variables, but that's ok.

  const renderLayers = () => {
    if (!params.editPanel) {
      PubSub.publish(
        'renderMap', // the renderMap signal triggers a re-render of json layers
        mapData
      );
    }
  };
  useEffect(renderLayers, [mapData]);

  return (
    <div className="map-panel">
      <div id={mapContainer} style={{ height: mapHeight, width: mapWidth, float: 'left' }}></div>
      {renderButtons()}
      <SideBar
        height={height}
        width={tooltipWidth}
        panelId={panelId}
        options={options}
        toggleLayer={props.toggleLayer}
      />
    </div>
  );
};
