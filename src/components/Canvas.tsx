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

  const [, setState] = useState('');
  const [showDialog, setDialog] = useState('');
  const [srcDstOptions, setSrcDstOptions] = useState(['']);

  const setButtonScope = (value) => {
    setState('');
  };
  const clearSelection = () => {
    PubSub.publish('setVariables', null);
    PubSub.publish('clearSelection', null);
  };
  const homeMap = () => {
    PubSub.publish('destroyMap', null);
    PubSub.publish('repaint', null);
  };
  const recalcPaths = () => {
    PubSub.publish('recalcPaths', null);
  };
  const showSrcDest = function (event) {
    let selectOptions: any[];
    selectOptions = [];
    let layer = event.target.value;
    let json = { nodes: [] };
    try {
      json = JSON.parse(options['mapjson' + layer]);
    } catch (e) {
      console.error(e);
    }
    for (let i = 0; i < json.nodes.length; i++) {
      let node: { name: null };
      node = json.nodes[i];
      if (node.name) {
        selectOptions.push(node.name);
      }
    }
    setSrcDstOptions(selectOptions);
  };
  const renderSrcDstOptions = (name) => {
    if (srcDstOptions.length === 0) {
      return (
        <div className={'no-node-message'}>
          The Layer You&apos;ve Selected has no Nodes.
          <div className={'add-node-link'} onClick={showAddNodeDialog}>
            Add Node
          </div>
        </div>
      );
    }
    let optionsList =
      srcDstOptions.length > 0 &&
      srcDstOptions.map((value, i) => {
        return (
          <option key={i} value={value}>
            {value}
          </option>
        );
      });
    return <select className={'node_' + name}>{optionsList}</select>;
  };
  const renderDialog = (toRender) => {
    if (toRender === 'addNodeDialog') {
      return (
        <div className={'add_edge_dialog dialog-form'}>
          <form>
            <h2>Add a Node</h2>
            <table>
              <tr>
                <td>
                  <label>Layer:</label>
                </td>
                <td>
                  <select className={'node_layer'} onChange={showSrcDest}>
                    <option value={'L1'}>Layer 1</option>
                    <option value={'L2'}>Layer 2</option>
                    <option value={'L3'}>Layer 3</option>
                  </select>
                </td>
              </tr>
              <tr>
                <td>
                  <label>Name:</label>
                </td>
                <td>
                  <input className={'text-input node_name'} type={'text'}></input>
                </td>
              </tr>
              <tr>
                <td>
                  <label>Latitude:</label>
                </td>
                <td>
                  <input className={'text-input node_lat'} type={'text'}></input>
                </td>
              </tr>
              <tr>
                <td>
                  <label>Longitude:</label>
                </td>
                <td>
                  <input className={'text-input node_lng'} type={'text'}></input>
                </td>
              </tr>
              <tr>
                <td colSpan={2}>
                  <input className={'button'} type={'button'} value={'Create Node'} onClick={createNode} />
                  <input className={'button'} type={'button'} value={'Cancel'} onClick={hideDialogs} />
                </td>
              </tr>
            </table>
          </form>
        </div>
      );
    }
    if (toRender === 'addEdgeDialog') {
      return (
        <div className={'add_edge_dialog dialog-form'}>
          <form>
            <h2>Add an Edge</h2>
            <table>
              <tr>
                <td>
                  <label>Layer:</label>
                </td>
                <td>
                  <select className={'node_layer'} onChange={showSrcDest}>
                    <option value={'L1'}>Layer 1</option>
                    <option value={'L2'}>Layer 2</option>
                    <option value={'L3'}>Layer 3</option>
                  </select>
                </td>
              </tr>
              <tr>
                <td>
                  <label>Source:</label>
                </td>
                <td>{renderSrcDstOptions('source')}</td>
              </tr>
              <tr>
                <td>
                  <label>Destination:</label>
                </td>
                <td>{renderSrcDstOptions('destination')}</td>
              </tr>
              <tr>
                <td colSpan={2}>
                  <input className={'button'} type={'button'} value={'Create Edge'} onClick={createEdge} />
                  <input className={'button'} type={'button'} value={'Cancel'} onClick={hideDialogs} />
                </td>
              </tr>
            </table>
          </form>
        </div>
      );
    }
    return null;
  };
  const createNode = function (event) {
    // so kludgy. yuck react.
    var form = event.target.parentNode.parentNode.parentNode.parentNode;
    var node_layer = form.getElementsByClassName('node_layer')[0].value;
    var node_name = form.getElementsByClassName('node_name')[0].value;
    var node_lat = form.getElementsByClassName('node_lat')[0].value;
    var node_lng = form.getElementsByClassName('node_lng')[0].value;
    var optionsJson: any;
    optionsJson = {};
    var accessors = ['mapjsonL1', 'mapjsonL2', 'mapjsonL3'];
    for (var i = 0; i < accessors.length; i++) {
      try {
        optionsJson[accessors[i]] = JSON.parse(options[accessors[i]]);
      } catch (e) {
        optionsJson[accessors[i]] = { nodes: [], edges: [] };
      }
    }

    optionsJson['mapjson' + node_layer].nodes.push({
      name: node_name,
      meta: {},
      latLng: [Math.floor(node_lat), Math.floor(node_lng)],
      children: [],
    });
    updateMapJson(optionsJson.mapjsonL1, optionsJson.mapjsonL2, optionsJson.mapjsonL3);
    hideDialogs();
    setTimeout(function () {
      PubSub.publish(
        'repaint', // the renderMap signal triggers a re-render of json layers
        mapData
      );
      PubSub.publish('setNodeEdit', null);
    }, 100);
  };
  const createEdge = function (event) {
    // so kludgy. yuck react.
    var form = event.target.parentNode.parentNode.parentNode.parentNode;
    var node_layer = form.getElementsByClassName('node_layer')[0].value;
    var node_source = form.getElementsByClassName('node_source')[0].value;
    var node_destination = form.getElementsByClassName('node_destination')[0].value;

    var optionsJson: any;
    optionsJson = {};

    var accessors = ['mapjsonL1', 'mapjsonL2', 'mapjsonL3'];
    for (var i = 0; i < accessors.length; i++) {
      try {
        optionsJson[accessors[i]] = JSON.parse(options[accessors[i]]);
      } catch (e) {
        optionsJson[accessors[i]] = { nodes: [], edges: [] };
      }
    }

    var latLngs = [null, null];
    for (let i = 0; i < optionsJson['mapjson' + node_layer].nodes.length; i++) {
      if (optionsJson['mapjson' + node_layer].nodes[i].name === node_source) {
        latLngs[0] = optionsJson['mapjson' + node_layer].nodes[i].latLng;
      }
      if (optionsJson['mapjson' + node_layer].nodes[i].name === node_destination) {
        latLngs[1] = optionsJson['mapjson' + node_layer].nodes[i].latLng;
      }
    }
    optionsJson['mapjson' + node_layer].edges.push({
      name: node_source + '--' + node_destination,
      meta: {
        endpoint_identifiers: {
          pops: [node_source, node_destination],
        },
      },
      latLngs: latLngs,
      children: [],
    });
    updateMapJson(optionsJson.mapjsonL1, optionsJson.mapjsonL2, optionsJson.mapjsonL3);
    hideDialogs();
    setTimeout(function () {
      PubSub.publish(
        'repaint', // the renderMap signal triggers a re-render of json layers
        mapData
      );
    }, 100);
  };
  const renderDialogs = () => {
    return (
      <div className={'dialog'} hidden={!showDialog}>
        {renderDialog(showDialog)}
      </div>
    );
  };
  const showAddNodeDialog = () => {
    setDialog('addNodeDialog');
  };
  const showAddEdgeDialog = () => {
    showSrcDest({ target: { value: 'L1' } });
    setDialog('addEdgeDialog');
  };
  const hideDialogs = () => {
    setDialog('');
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
        <div className={'button'} id={'recalc_paths'} hidden={!params.editPanel} onClick={recalcPaths}>
          Straighten All Edges
        </div>
      </div>
    );
  };
  const renderTools = () => {
    return (
      <div className="tools-overlay">
        <div className={'button'} id={'add_node'} hidden={!params.editPanel} onClick={showAddNodeDialog}>
          + Node
        </div>
        <div className={'button'} id={'add_edge'} hidden={!params.editPanel} onClick={showAddEdgeDialog}>
          + Edge
        </div>
      </div>
    );
  };

  // setup our pubsub callback to allow interoperation with d3
  PubSub.subscribe('setVariables', setButtonScope);

  const drawMap = () => {
    // destroys the in-RAM map, and unsubscribes all signals
    destroyCurrentLeafletMap();
    const map = new NetworkMap(mapContainer);
    map.renderMap(data, mapData, options, updateMapJson, updateCenter, mapWidth, height, editMode, mapContainer);
    console.log('resubscribing to recalcPaths');
    // resubscribe to the callback for home and "straighten edges" buttons
    PubSub.subscribe('recalcPaths', props.recalcEdges);
    PubSub.subscribe('repaint', drawMap);

    return destroyCurrentLeafletMap;
  };
  PubSub.subscribe('repaint', drawMap);

  useEffect(drawMap, [
    width,
    height,
    panelId,
    editMode,
    layer2,
    layer1,
    layer3,
    options.tileSetLayer,
    options.boundaryLayer,
    options.labelLayer,
  ]); // adding options var here breaks it
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

  const updateMapWithOptions = () => {
    if (!!params.editPanel) {
      PubSub.publish('updateOptions', options);
      PubSub.publish(
        'renderMap', // the renderMap signal triggers a re-render of json layers
        mapData
      );
    }
  };
  const optionsToWatchInEditMode = [
    options.layer1,
    options.color1,
    options.endpointIdL1,
    options.nodeHighlightL1,
    options.nodeWidthL1,
    options.edgeWidthL1,
    options.pathOffsetL1,
    options.nodeWidthL1,
    options.edgeWidthL1,
    options.pathOffsetL1,
    options.layer2,
    options.color2,
    options.endpointIdL2,
    options.nodeHighlightL2,
    options.nodeWidthL2,
    options.edgeWidthL2,
    options.pathOffsetL2,
    options.nodeWidthL2,
    options.edgeWidthL2,
    options.pathOffsetL2,
    options.layer3,
    options.color3,
    options.endpointIdL3,
    options.nodeHighlightL3,
    options.nodeWidthL3,
    options.edgeWidthL3,
    options.pathOffsetL3,
  ];
  useEffect(updateMapWithOptions, optionsToWatchInEditMode);

  return (
    <div className="map-panel">
      {renderDialogs()}
      <div id={mapContainer} style={{ height: mapHeight, width: mapWidth, float: 'left' }}></div>
      {renderButtons()}
      {renderTools()}
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
