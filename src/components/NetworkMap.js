import * as es from './lib/esmap.js';
import * as pubsub from './lib/pubsub.js';
import * as L from "./lib/leaflet-src.esm.js";
import { LAYER_LIMIT } from './lib/utils.js'
const PubSub = pubsub.PubSub;

// these imports are the result of very significant trial and error.
// they allow ES6 browser imports to propagate, but also use static import
// statements, without which some of these libraries (d3 in particular)
// will not function. This can also be accomplished using the `import()` function
// but it causes the code to become complexly asynchronous. keeping these as
// static imports allows the best balance of simplicity and functionality
import * as d3_import from './lib/d3.min.js';
// populate either with import or ES6 root-scope version
const d3 = window['d3'] || d3_import;

// dynamic import of modules that must be handled this way
// dynamic import of modules that must be handled this way
var locationService = { "partial": function(query){
    const location = new URL(window.location);
    for(const key of Object.keys(query)){
      if(query[key] === null || query[key] === undefined){
        location.searchParams.delete(key)
      } else {
        location.searchParams.set(key, query[key]);
      }
    }
    const updatedUrl = location.toString();
    window.history.pushState(null, "", updatedUrl);
} }

export default class NetworkMap {
  /**
   * Renders the Network Map in the panel.
   *
   * @param mapCanvas - the parent MapCanvas object.
   */
  constructor(mapCanvas) {
    this.mapCanvas = mapCanvas;
    this.groups = [];

    //--- grab copy or instantiate the current leaflet map singleton
    this.leafletMap = this.mapCanvas.getCurrentLeafletMap();

    //--- Initialize the SVG layer
    var overlayPane = this.leafletMap.getPanes().overlayPane;
    const overlay = d3.select(overlayPane);
    this.svgLayer = overlay.select('svg').attr('pointer-events', 'all');
    this.sideBar = d3.selectAll('#sidebar-tooltip');

    this.esmap = new es.EsMap(
      this.mapCanvas,
      this.svgLayer,
      this.sideBar,
      d3.curveNatural);

    PubSub.subscribe("setEditMode", this.setEditMode, this);
    PubSub.subscribe("renderMap", this.renderMapLayers, this);
  }

  dispatchEvent(event){
    return this.mapCanvas.dispatchEvent(event);
  }


  setEdgeEdit(bool){
      this.esmap.editNodeMode(false);
      this.esmap.editEdgeMode(bool);
  }
  setNodeEdit(bool){
      this.esmap.editEdgeMode(false);
      this.esmap.editNodeMode(bool);
  }

  setEditMode(mode) {
    if(mode == "edge"){
      this.setEdgeEdit(false);
      this.setEdgeEdit(!this.esmap.editEdges);
    }
    if(mode=="node"){
      this.setEdgeEdit(false);
      this.setNodeEdit(!this.esmap.editNodes);
    }
    if(mode === null || mode === undefined){
      this.setEdgeEdit(false);
      this.setNodeEdit(false);
    }
  }

  renderMapLayers() {
    if(this.mapCanvas.topology){
        function getDisplayName(nodeName, nodes){
          var displayName = nodeName;
          nodes.forEach((node)=>{
            if(node.name == nodeName && node.meta.display_name){
              displayName = node.meta.display_name;
            }
          });
          return displayName;
        }
        let l = 0;
        this.mapCanvas.topology.forEach((layer)=>{
          if(!layer || typeof(layer) == "string") return
          for(var e=0; e<layer.edges.length; e++){
            var endpointId = `endpointId`;
            var edge = layer.edges[e];
            edge.nodeA = getDisplayName(edge.meta.endpoint_identifiers[this.mapCanvas.options.layers[l].endpointId][0], layer.nodes);
            edge.nodeZ = getDisplayName(edge.meta.endpoint_identifiers[this.mapCanvas.options.layers[l].endpointId][1], layer.nodes);
          }
          l++; // update the layer index
        });
    }

    // clear all existing layers
    this.groups.forEach((group) => group.remove());
    // Draw the map json topology data!!! Currently supports up to 3 layers
    let emptyLayer = { "nodes": [], "edges": [] };
    let emptyTopology = [emptyLayer, emptyLayer, emptyLayer];
    for(let i=0; i<LAYER_LIMIT; i++){
      emptyTopology.push(emptyLayer);
      let layer = emptyLayer;
      if(this.mapCanvas.topology[i] && typeof(this.mapCanvas.topology[i]) != "string"){
        layer = this.mapCanvas.topology[i];
      }
      this.groups.push(this.esmap.addNetLayer(i, layer));
    }
  }

  renderMap() {
    if (!this.mapCanvas.options || !this.mapCanvas.topology) {
      return;
    }

    this.renderMapLayers();

    return this.map;
  }
}