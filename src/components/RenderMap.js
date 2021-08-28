import * as d3 from './d3.min.js';
import * as L from 'components/leaflet';
import * as es from './esmap.js';
import esnetjson from './esnet.json';

export default class NetworkMap {
  constructor(id) {
    this.containerID = id;
  }

  /**
   * Renders the Network Map in the panel.
   *
   * @param parseData - the paresed data from parseData.js
   * @param header1, @param header2 - headers for the two x-axis labels, set in options panel
   * @param hoverColor - the color the lines will change to when hovering, set in options panel
   */

  renderMap(parsedData, mapData) {
    if (!parsedData || !mapData) {
      return;
    }

    // SUPER IMPORTANT! This clears old chart before drawing new one...
    // d3.select('#' + this.containerID)
    //   .selectAll('svg')
    //   .remove();

    // d3.select('#' + this.containerID)
    //   .select('.tooltip')
    //   .remove();
    // ----------------------------------------------------------

    const dataPairs = parsedData[0];
    const dataEnd1 = parsedData[1];
    const dataEnd2 = parsedData[2];

    //--- Create Leaflet Map with custom tile layer
    var map = L.map(this.containerID, {
      zoomAnimation: false,
      fadeAnimation: false,
    }).setView([42, -105], 4);
    L.tileLayer(
      'https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}',
      {
        attribution: 'Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ',
        maxZoom: 18,
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
    var nm = new es.EsMap(map, svg, d3.curveNatural);

    nm.editMode(1);

    function toggleEdit(e) {
      var d = d3.select('button#edit_mode');
      if (nm.edit == 1) {
        nm.editMode(0);
        d.html('Turn Edit Mode Off');
      } else {
        nm.editMode(1);
        d.html('Turn Edit Mode On');
      }
    }

    var edit_mode = d3.select('button#edit_mode').on('click', toggleEdit);

    //--- test 1 loads data from inline json
    // var map1 = {
    //   edges: [
    //     {
    //       name: 'CKT-BIG-A-Z',
    //       latLngs: [
    //         [50, -120],
    //         [55, -110],
    //         [45, -77],
    //       ],
    //       color: 'blue'
    //     },
    //   ],
    //   nodes: [
    //     { name: 'A', latLng: [50, -120], color: 'grey' },
    //     { name: 'Z', latLng: [45, -77], color: 'grey' },
    //   ],
    // };
    // var g = nm.addNetLayer('JohnNet', map1); // DO IT LIKE THISSSSS
    var g2 = nm.addNetLayer('esnet', mapData); // DO IT LIKE THISSSSS
    // twinkle(nm, g2, 'esnet');

    //--- lets configure a popup to fire when a user clicks on CKT-BIG-A-Z
    if (0) {
      //--- this seems to mess with events destined to the lower z indexes even when opacity is 0
      d3.select('div.tooltip')
        .style('opacity', 0)
        .style('position', 'absolute')
        .style('width', '100px')
        .style('height', '50px')
        .style('background-color', '#eee')
        .style('border', 'solid')
        .style('border-width', '1px')
        .style('border-radius', '5px')
        .style('padding', '10px')
        .style('z-index', 100);

      function me(e, d) {
        var tooltip = d3.select('div.tooltip');
        tooltip
          .html('this is a tool tip')
          .style('opacity', 1)
          .style('left', e.clientX + 'px')
          .style('top', e.clientY + 'px');
      }
      function ml(e, d) {
        var tooltip = d3.select('div.tooltip');
        tooltip.style('opacity', 0);
      }

      //--- show the popup when mouse is over the circuit, not great for touch pads
      //--- but shows what can be done
      g.select('path.edge-az-CKT-BIG-A-Z').on('mouseenter', me).on('mouseleave', ml);
      g.select('path.edge-za-CKT-BIG-A-Z').on('mouseenter', me).on('mouseleave', ml);
    }

    //--- test 2 loads data from web svc
    // var map2 = d3.json(esnetjson).then(function (data) {
    //   console.log('test2');
    //   console.log(data);
    //   var g = nm.addNetLayer('esnet', data);
    //   twinkle(nm, g, 'esnet');
    // });

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
