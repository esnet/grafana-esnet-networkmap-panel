import * as d3 from './d3.min.js';
import * as L from 'components/leaflet';
import * as es from './esmap.js';
import * as pubsub from './pubsub.js';
import { urlUtil } from '@grafana/data';
import React from 'react';
import { locationService } from '@grafana/runtime';
import { PubSub } from 'components/pubsub.js';

var TILESETS = {
  "arcgis": {
    url: 'https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}',
    attributes: {
      attribution: 'Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ',
      minZoom: 2,
      maxZoom: 10,
      ext: 'png',
    },
  },
  "usgs": {
    url: 'https://basemap.nationalmap.gov/arcgis/rest/services/USGSImageryOnly/MapServer/tile/{z}/{y}/{x}',
    attributes: {
      maxZoom: 20,
      attribution: 'Tiles courtesy of the <a href="https://usgs.gov/">U.S. Geological Survey</a>',
    },
  },
  "esri.shaded": {
    url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Shaded_Relief/MapServer/tile/{z}/{y}/{x}',
    attributes: {
      attribution: 'Tiles &copy; Esri &mdash; Source: Esri',
      maxZoom: 13,
    },
  },
  "geoportail": {
    url: 'https://wxs.ign.fr/{apikey}/geoportail/wmts?REQUEST=GetTile&SERVICE=WMTS&VERSION=1.0.0&STYLE={style}&TILEMATRIXSET=PM&FORMAT={format}&LAYER=ORTHOIMAGERY.ORTHOPHOTOS&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}',
    attributes: {
      attribution: '<a target="_blank" href="https://www.geoportail.gouv.fr/">Geoportail France</a>',
      bounds: [
        [-75, -180],
        [81, 180],
      ],
      minZoom: 2,
      maxZoom: 19,
      apikey: 'choisirgeoportail',
      format: 'image/jpeg',
      style: 'normal',
    },
  },
  "cartodb.labeled": {
    url: 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png',
    attributes: {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
      subdomains: 'abcd',
      maxZoom: 20,
    },
  },
  "cartodb.unlabeled": {
    url: 'https://{s}.basemaps.cartocdn.com/dark_nolabels/{z}/{x}/{y}{r}.png',
    attributes: {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
      subdomains: 'abcd',
      maxZoom: 20,
    },
  },
  "opentopomap": {
    url: 'https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png',
    attributes: {
      maxZoom: 17,
      attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
    }
  }
}
var BOUNDARIES = {
  "toner.boundaries": {
    url: 'https://stamen-tiles-{s}.a.ssl.fastly.net/toner-lines/{z}/{x}/{y}{r}.{ext}',
    attributes: {
      attribution:
        'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      subdomains: 'abcd',
      minZoom: 0,
      maxZoom: 20,
      ext: 'png',
    },
  },
}
var LABELS = {
  "toner.labels": {
    url: 'https://stamen-tiles-{s}.a.ssl.fastly.net/toner-labels/{z}/{x}/{y}{r}.{ext}',
    attributes: {
      attribution:
        'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      subdomains: 'abcd',
      minZoom: 0,
      maxZoom: 20,
      ext: 'png',
    },
  }
}

var leafletMap = null;
export const getCurrentLeafletMap = function getCurrentLeafletMap(mapContainer, startLat, startLng, startZoom, tileSetLayer, boundaryLayer, labelLayer) {
  if(!leafletMap){
    leafletMap = L.map(mapContainer, {
        zoomAnimation: false,
        fadeAnimation: false,
        zoomSnap: 0.25,
        zoomDelta: 0.25,
        scrollWheelZoom: false,
        doubleClickZoom: false,
        keyboard: false,
      }).setView([startLat, startLng], startZoom);
      L.tileLayer(TILESETS[tileSetLayer].url, TILESETS[tileSetLayer].attributes).addTo(leafletMap);
      if(boundaryLayer){
        L.tileLayer(BOUNDARIES[boundaryLayer].url, BOUNDARIES[boundaryLayer].attributes).addTo(leafletMap);
      }
      if(labelLayer){
        L.tileLayer(LABELS[labelLayer].url, LABELS[labelLayer].attributes).addTo(leafletMap);
      }
      L.svg({ clickable: true }).addTo(leafletMap); // we have to make the svg layer clickable
  }
  return leafletMap;
}

export const destroyCurrentLeafletMap = function destroyCurrentLeafletMap() {
  if(leafletMap){
    leafletMap.off();
    leafletMap.remove();
    leafletMap = null;
  }
  PubSub.clearAllCallbacks();
}
PubSub.subscribe('destroyMap', destroyCurrentLeafletMap);

export default class NetworkMap {
  constructor(id) {
    this.containerID = id;
  }

  /**
   * Renders the Network Map in the panel.
   *
   * @param parsedData - the parsed data from parseData.js
   * @param mapData - the topology data from the json input
   * @param options - 
   * @param updateMapJson, @param updateCenter - functions from MapPanel.tsx to update the mapJson & center in the editor
   * @param width, @param height - determined by Grafana panel size
   * @param editMode - whether the panel is in editMode or not
   * @param mapContainer - the container the map is drawn in.
   */

  renderMap(parsedData, mapData, options, updateMapJson, updateCenter, width, height, editMode, mapContainer) {
    if (!parsedData || !mapData) {
      return;
    }

    const setDashboardVariables = function(event){
      const l1var = "var-"+options["dashboardVarL1"];
      const l2var = "var-"+options["dashboardVarL2"];
      const l3var = "var-"+options["dashboardVarL3"];
      var setLocation = { }
      setLocation[l1var] = null;
      setLocation[l2var] = null;
      setLocation[l3var] = null;
      if(event && event.nodeA && event.nodeZ){
        const dashboardVariable = "var-"+options["dashboardVarL" + event.layer];
        const srcVariable = options["srcVarL" + event.layer];
        const dstVariable = options["dstVarL" + event.layer];
        setLocation[dashboardVariable] = [
            srcVariable + "|=|" + event.nodeA,
            dstVariable + "|=|" + event.nodeZ
        ]        
      }
      locationService.partial(setLocation, false)
    }
    // setup our pubsub callback to allow interoperation with d3
    pubsub.PubSub.subscribe("setVariables", setDashboardVariables)

    // set variables
    const startLat = options.startLat;
    const startLng = options.startLng;
    const startZoom = options.startZoom;
    const tileSetLayer = options.tileSetLayer;
    const boundaryLayer = options.boundaryLayer;
    const labelLayer = options.labelLayer;
    var div = d3.selectAll('#sidebar-tooltip');

    //--- grab copy or instantiate the current leaflet map singleton
    var map = getCurrentLeafletMap(mapContainer, startLat, startLng, startZoom, tileSetLayer, boundaryLayer, labelLayer);

    //--- Initialize the SVG layer
    const overlay = d3.select(map.getPanes().overlayPane);
    const svg = overlay.select('svg').attr('pointer-events', 'all');

    //--- create network map within leaflet
    //---  note:  1 map could have multiple esmap svg layers
    var esmap = new es.EsMap(map, svg, div, d3.curveNatural, options, updateMapJson, updateCenter, width, height);

    const params = urlUtil.getUrlSearchParams();
    if (params.editPanel != null) {
      esmap.editEdgeMode(1);
      editMode = true;
    } else {
      esmap.editEdgeMode(0);
      esmap.editNodeMode(0);
      editMode = false;
    }

    function toggleEdgeEdit() {
      var edge_button = d3.selectAll('#edge_edit_mode');
      var node_button = d3.selectAll('#node_edit_mode');
      if (esmap.editEdges == 1) {
        esmap.editNodeMode(0);
        esmap.editEdgeMode(0);
        edge_button.html('Edit Edges: Off');
        node_button.html('Edit Nodes: Off');
      } else {
        esmap.editNodeMode(0);
        esmap.editEdgeMode(1);
        edge_button.html('Edit Edges: On');
        node_button.html('Edit Nodes: Off');
      }
    }
    var edit_mode = d3.selectAll('#edge_edit_mode').on('click', toggleEdgeEdit);
    pubsub.PubSub.subscribe("setEdgeEdit", toggleEdgeEdit);

    function toggleNodeEdit() {
      var node_button = d3.selectAll('#node_edit_mode');
      var edge_button = d3.selectAll('#edge_edit_mode');
      if (esmap.editNodes == 1) {
        esmap.editEdgeMode(0);
        esmap.editNodeMode(0);
        node_button.html('Edit Nodes: Off');
        edge_button.html('Edit Edges: Off');
      } else {
        esmap.editEdgeMode(0);
        esmap.editNodeMode(1);
        node_button.html('Edit Nodes: On');
        edge_button.html('Edit Edges: Off');
      }
    }
    var edit_mode = d3.selectAll('#node_edit_mode').on('click', toggleNodeEdit);
    pubsub.PubSub.subscribe("setNodeEdit", toggleNodeEdit);

    var g1 = null;
    var g2 = null;
    var g3 = null;
    function renderMapLayers(mapData){
      if(g1) g1.remove();
      if(g2) g2.remove();
      if(g3) g3.remove();
      try {
        // Draw the map json topology data!!! Currently supports up to 3 layers
        if (options.layer1 && mapData.layer1) {
          g1 = esmap.addNetLayer('layer1', mapData.layer1);
        }
        if (options.layer2 && mapData.layer2) {
          g2 = esmap.addNetLayer('layer2', mapData.layer2);
        }
        if (options.layer3 && mapData.layer3) {
          g3 = esmap.addNetLayer('layer3', mapData.layer3);
        }
      } catch(e) {
        console.error("had an issue rendering map layers...")
      }
    }
    renderMapLayers(mapData);
    pubsub.PubSub.subscribe("renderMap", renderMapLayers);

    //----  helper
    function getRandomInt(min, max) {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
    }
    //---  helper
    function sleep(ms) {
      return new Promise((resolve) => setTimeout(resolve, ms));
    }

    //--- function that changes circuit style, showing how to do so directly using dom.
    async function twinkle(map, g, name) {
      var edges = esmap.data[name]['edges'];
      for (let x = 0; x < 1000; x++) {
        //-- pick random ckt and assign rand colors every 10ms
        var target = edges[getRandomInt(0, edges.length)].name;
        var colorAZ = d3.interpolateRainbow(Math.random());
        var colorZA = d3.interpolateRainbow(Math.random());

        //--- possible remaining issue to contend with relates use of ID and uniqueness
        g.select('path.edge-az-' + target).style('stroke', colorAZ);
        g.select('path.edge-za-' + target).style('stroke', colorZA);
        await sleep(10);
      }
    }
    return map;
  }
}