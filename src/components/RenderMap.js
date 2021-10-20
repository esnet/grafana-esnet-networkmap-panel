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
   * @param header1, @param header2 - headers for the two x-axis labels, set in options panel
   * @param hoverColor - the color the lines will change to when hovering, set in options panel
   */

  renderMap(parsedData, mapData, options, updateMapJson, updateCenter) {
    if (!parsedData || !mapData) {
      return;
    }

    // SUPER IMPORTANT! This clears old chart before drawing new one...
    // d3.select('#' + this.containerID)
    //   .selectAll('svg')
    //   .remove();

    d3.select('#' + this.containerID)
      .select('.tooltip')
      .remove();
    // ----------------------------------------------------------

    // set variables
    const startLat = options.startLat;
    const startLng = options.startLng;
    const startZoom = options.startZoom;

    var div = d3.select('body').append('div').attr('class', 'tooltip').style('opacity', 0);
    //--- Create Leaflet Map with custom tile layer
    var map = L.map(this.containerID, {
      zoomAnimation: false,
      fadeAnimation: false,
      zoomSnap: 0.25,
      zoomDelta: 0.5,
      scrollWheelZoom: false,
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
    //---         this can be used to allow leaflet to turn on and off layers at
    //---         different zoom levels in the future(imagine a regional and national map)
    var nm = new es.EsMap(map, svg, div, d3.curveNatural, options, updateMapJson, updateCenter);

    const params = urlUtil.getUrlSearchParams();
    if (params.editPanel != null) {
      nm.editMode(1);
      // editMode = 1;
      d3.select('button#edit_mode').style('visibility', 'visible');
      // call update map?
    } else {
      nm.editMode(0);
      // editMode = 0;
      d3.select('button#edit_mode').style('visibility', 'hidden');
    }

    function toggleEdit(e) {
      var d = d3.select('button#edit_mode');
      if (nm.edit == 1) {
        nm.editMode(0);
        d.html('Turn Edit Mode On');
      } else {
        nm.editMode(1);
        d.html('Turn Edit Mode Off');
      }
    }

    var edit_mode = d3.select('button#edit_mode').on('click', toggleEdit);

    var g1 = nm.addNetLayer('esnet', mapData.layer1); // DO IT LIKE THISSSSS
    if (options.layer2) {
      var g2 = nm.addNetLayer('esnet', mapData.layer2);
    }
    // twinkle(nm, g2, 'esnet');

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
