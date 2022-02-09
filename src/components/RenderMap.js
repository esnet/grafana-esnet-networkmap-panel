import * as d3 from './d3.min.js';
import * as L from 'components/leaflet';
import * as es from './esmap.js';
import { urlUtil } from '@grafana/data';
import React from 'react';

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

    // set variables
    const startLat = options.startLat;
    const startLng = options.startLng;
    const startZoom = options.startZoom;
    var div = d3.selectAll('#sidebar-tooltip');

    //--- Create Leaflet Map with custom tile layer
    var map = L.map(mapContainer, {
      zoomAnimation: false,
      fadeAnimation: false,
      zoomSnap: 0.25,
      zoomDelta: 0.25,
      scrollWheelZoom: false,
      doubleClickZoom: false,
    }).setView([startLat, startLng], startZoom);
    L.tileLayer(
      'https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}',
      {
        attribution: 'Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ',
        minZoom: 2,
        maxZoom: 10,
        ext: 'png',
      }
    ).addTo(map);

    //--- Initialize the SVG layer
    L.svg({ clickable: true }).addTo(map); // we have to make the svg layer clickable
    const overlay = d3.select(map.getPanes().overlayPane);
    const svg = overlay.select('svg').attr('pointer-events', 'all');

    //--- create network map within leaflet
    //---  note:  1 map could have multiple esmap svg layers
    var nm = new es.EsMap(map, svg, div, d3.curveNatural, options, updateMapJson, updateCenter, width, height);

    const params = urlUtil.getUrlSearchParams();
    if (params.editPanel != null) {
      nm.editMode(1);
      editMode = true;
    } else {
      nm.editMode(0);
      editMode = false;
    }

    function toggleEdit() {
      var d = d3.selectAll('#edit_mode');
      if (nm.edit == 1) {
        nm.editMode(0);
        d.html('Turn Edit Mode On');
      } else {
        nm.editMode(1);
        d.html('Turn Edit Mode Off');
      }
    }

    var edit_mode = d3.selectAll('#edit_mode').on('click', toggleEdit);

    // Draw the map json topology data!!! Currently supports up to 3 layers
    if (options.layer1 && mapData.layer1) {
      var g1 = nm.addNetLayer('layer1', mapData.layer1);
    }
    if (options.layer2 && mapData.layer2) {
      var g2 = nm.addNetLayer('layer2', mapData.layer2);
    }
    if (options.layer3 && mapData.layer3) {
      var g3 = nm.addNetLayer('layer3', mapData.layer3);
    }

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
      var edges = nm.data[name]['edges'];
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
