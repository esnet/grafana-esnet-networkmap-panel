import * as es from './esmap.js';
import * as pubsub from './pubsub.js';
const PubSub = pubsub.PubSub;
import * as maplayers from './maplayers.js';
import * as utils from './utils.js';

// these imports are the result of very significant trial and error.
// they allow ES6 browser imports to propagate, but also use static import
// statements, without which some of these libraries (d3 in particular) 
// will not function. This can also be accomplished using the `import()` function
// but it causes the code to become complexly asynchronous. keeping these as
// static imports allows the best balance of simplicity and functionality
import * as d3_import from './d3.min.js';
// populate either with import or ES6 root-scope version
const d3 = window['d3'] || d3_import; 

import * as React_import from "./react.js";
// populate either with import or ES6 root-scope version
const React = window['React'] || React_import;

// dynamic import of modules that must be handled this way
var locationService = { "partial": function(){ } }
// require is only defined in the webpack context, not ES6
var L = window['L'];
if(typeof require !== "undefined"){
  var L = require('./leaflet.js');
  const m = require('@grafana/runtime');
  locationService = m.locationService;
}

var leafletMap = null;
export const getCurrentLeafletMap = function getCurrentLeafletMap(mapContainer, startLat, startLng, startZoom, tileSetLayer, boundaryLayer, labelLayer) {
  console.log("mapContainer is currently:", mapContainer);
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
      L.tileLayer(maplayers.TILESETS[tileSetLayer].url, maplayers.TILESETS[tileSetLayer].attributes).addTo(leafletMap);
      if(boundaryLayer){
        L.tileLayer(maplayers.BOUNDARIES[boundaryLayer].url, maplayers.BOUNDARIES[boundaryLayer].attributes).addTo(leafletMap);
      }
      if(labelLayer){
        L.tileLayer(maplayers.LABELS[labelLayer].url, maplayers.LABELS[labelLayer].attributes).addTo(leafletMap);
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
  constructor(container, options, topology, updateMapJson, updateCenter) {
    this.container = container;
    this.options = options;
    this.topology = topology;
    this.editMode = false;
    this.g1 = null;
    this.g2 = null;
    this.g3 = null;
    console.log(updateMapJson, updateCenter);

    //--- grab copy or instantiate the current leaflet map singleton
    this.leafletMap = getCurrentLeafletMap(
      this.container, 
      this.options.startLat, 
      this.options.startLng,
      this.options.startZoom,
      this.options.tileSetLayer,
      this.options.boundaryLayer,
      this.options.labelLayer);

    //--- Initialize the SVG layer
    const overlay = d3.select(this.leafletMap.getPanes().overlayPane);
    this.svgLayer = overlay.select('svg').attr('pointer-events', 'all');
    this.sidebar = d3.selectAll('#sidebar-tooltip');

    this.esmap = new es.EsMap(
      this.leafletMap,
      this.svgLayer,
      this.sideBar,
      d3.curveNatural,
      this.options,
      updateMapJson,
      updateCenter,
      this.options.width,
      this.options.height);

    // set 'self' in stone so it can't be twisted around later.
    const self = this;
    // wrap subscriptions in functions so we can set scope closure.
    pubsub.PubSub.subscribe("setVariables", function(d){ self.setDashboardVariables(d) })
    pubsub.PubSub.subscribe("setEdgeEdit", function(){ self.toggleEdgeEdit() });
    pubsub.PubSub.subscribe("setNodeEdit", function(){ self.toggleNodeEdit() });
    pubsub.PubSub.subscribe("renderMap", function(topology){ self.renderMapLayers(topology) });
  }

  /**
   * Renders the Network Map in the panel.
   *
   * @param parsedData - the parsed data from parseData.js
   * @param topology - the topology data from the json input
   * @param options - 
   * @param updateMapJson, @param updateCenter - functions from MapPanel.tsx to update the mapJson & center in the editor
   * @param width, @param height - determined by Grafana panel size
   * @param editMode - whether the panel is in editMode or not
   * @param mapContainer - the container the map is drawn in.
   */

  updateOptions(options){
    this.options = options;
  }

  updateTopology(topology){
    this.topology = topology;
  }

  setDashboardVariables(event){
    const l1var = "var-"+this.options["dashboardVarL1"];
    const l2var = "var-"+this.options["dashboardVarL2"];
    const l3var = "var-"+this.options["dashboardVarL3"];
    var setLocation = { }
    setLocation[l1var] = null;
    setLocation[l2var] = null;
    setLocation[l3var] = null;
    if(event && event.nodeA && event.nodeZ){
      const dashboardVariable = "var-"+this.options["dashboardVarL" + event.layer];
      const srcVariable = this.options["srcVarL" + event.layer];
      const dstVariable = this.options["dstVarL" + event.layer];
      setLocation[dashboardVariable] = [
          srcVariable + "|=|" + event.nodeA,
          dstVariable + "|=|" + event.nodeZ
      ]        
    }
    console.log("locationService", locationService);

    locationService.partial(setLocation, false)
  }

  toggleEdgeEdit() {
    var edge_button = d3.selectAll('#edge_edit_mode');
    var node_button = d3.selectAll('#node_edit_mode');
    if (!!this.esmap.editEdges) {
      this.esmap.editNodeMode(false);
      this.esmap.editEdgeMode(false);
      edge_button.html('Edit Edges: Off');
      node_button.html('Edit Nodes: Off');
    } else {
      this.esmap.editNodeMode(false);
      this.esmap.editEdgeMode(true);
      edge_button.html('Edit Edges: On');
      node_button.html('Edit Nodes: Off');
    }
  }

  toggleNodeEdit() {
    var node_button = d3.selectAll('#node_edit_mode');
    var edge_button = d3.selectAll('#edge_edit_mode');
    if (!!this.esmap.editNodes) {
      this.esmap.editEdgeMode(false);
      this.esmap.editNodeMode(false);
      node_button.html('Edit Nodes: Off');
      edge_button.html('Edit Edges: Off');
    } else {
      this.esmap.editEdgeMode(false);
      this.esmap.editNodeMode(true);
      node_button.html('Edit Nodes: On');
      edge_button.html('Edit Edges: Off');
    }
  }

  renderMapLayers(newTopology) {
    if(newTopology){ this.topology = newTopology; }
    if(this.g1) this.g1.remove();
    if(this.g2) this.g2.remove();
    if(this.g3) this.g3.remove();
    //try {
      // Draw the map json topology data!!! Currently supports up to 3 layers
      if (this.options.layer1 && this.topology.layer1) {
        this.g1 = this.esmap.addNetLayer('layer1', this.topology.layer1);
      }
      if (this.options.layer2 && this.topology.layer2) {
        this.g2 = this.esmap.addNetLayer('layer2', this.topology.layer2);
      }
      if (this.options.layer3 && this.topology.layer3) {
        this.g3 = this.esmap.addNetLayer('layer3', this.topology.layer3);
      }
    /*} catch(e) {
      console.error("had an issue rendering map layers...")
    }*/
  }

  renderMap() {
    if (!this.options || !this.topology) {
      return;
    }

    const params = utils.getUrlSearchParams();
    if (params.editPanel != null) {
      this.esmap.editEdgeMode(true);
      this.editMode = true;
    } else {
      this.esmap.editEdgeMode(false);
      this.esmap.editNodeMode(false);
      this.editMode = false;
    }

    d3.selectAll('#edge_edit_mode').on('click', this.toggleEdgeEdit);
    d3.selectAll('#node_edit_mode').on('click', this.toggleNodeEdit);

    this.renderMapLayers();

    return this.map;
  }
}