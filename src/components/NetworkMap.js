import * as es from './lib/esmap.js';
import * as pubsub from './lib/pubsub.js';
const PubSub = pubsub.PubSub;
import * as utils from './lib/utils.js';

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
var locationService = { "partial": function(){ } }
// require is only defined in the webpack context, not ES6
var L = window['L'];
if(typeof require !== "undefined"){
  var L = require('./lib/leaflet.js');
  const m = require('@grafana/runtime');
  locationService = m.locationService;
}

export default class NetworkMap {
  /**
   * Renders the Network Map in the panel.
   *
   * @param mapCanvas - the parent MapCanvas object.
   */
  constructor(mapCanvas) {
    this.mapCanvas = mapCanvas;
    this.g1 = null;
    this.g2 = null;
    this.g3 = null;

    //--- grab copy or instantiate the current leaflet map singleton
    this.leafletMap = this.mapCanvas.getCurrentLeafletMap();

    //--- Initialize the SVG layer
    const overlay = d3.select(this.leafletMap.getPanes().overlayPane);
    this.svgLayer = overlay.select('svg').attr('pointer-events', 'all');
    this.sideBar = d3.selectAll('#sidebar-tooltip');

    this.esmap = new es.EsMap(
      this.mapCanvas,
      this.svgLayer,
      this.sideBar,
      d3.curveNatural);

    PubSub.subscribe("setVariables", this.setDashboardVariables, this)
    PubSub.subscribe("toggleEdgeEdit", this.toggleEdgeEdit, this);
    PubSub.subscribe("toggleNodeEdit", this.toggleNodeEdit, this);
    PubSub.subscribe("renderMap", this.renderMapLayers, this);
  }

  dispatchEvent(event){
    return this.mapCanvas.dispatchEvent(event);
  }

  setDashboardVariables(event){
    const l1var = "var-"+this.mapCanvas.options["dashboardVarL1"];
    const l2var = "var-"+this.mapCanvas.options["dashboardVarL2"];
    const l3var = "var-"+this.mapCanvas.options["dashboardVarL3"];
    var setLocation = { }
    setLocation[l1var] = null;
    setLocation[l2var] = null;
    setLocation[l3var] = null;
    if(event && event.nodeA && event.nodeZ){
      const dashboardVariable = "var-"+this.mapCanvas.options["dashboardVarL" + event.layer];
      const srcVariable = this.mapCanvas.options["srcVarL" + event.layer];
      const dstVariable = this.mapCanvas.options["dstVarL" + event.layer];
      setLocation[dashboardVariable] = [
          srcVariable + "|=|" + event.nodeA,
          dstVariable + "|=|" + event.nodeZ
      ]        
    }

    locationService.partial(setLocation, false)
  }

  toggleEdgeEdit() {
    if (!!this.esmap.editEdges) {
      this.esmap.editNodeMode(false);
      this.esmap.editEdgeMode(false);
    } else {
      this.esmap.editNodeMode(false);
      this.esmap.editEdgeMode(true);
    }
  }

  toggleNodeEdit() {
    if (!!this.esmap.editNodes) {
      this.esmap.editEdgeMode(false);
      this.esmap.editNodeMode(false);
    } else {
      this.esmap.editEdgeMode(false);
      this.esmap.editNodeMode(true);
    }
  }

  renderMapLayers() {
    if(this.mapCanvas.topology){
        let layers = Object.keys(this.mapCanvas.topology);
        function getDisplayName(nodeName, nodes){
          var displayName = nodeName;
          nodes.forEach((node)=>{
            if(node.name == nodeName && node.meta.display_name){
              displayName = node.meta.display_name;
            }
          });
          return displayName;
        }
        layers.forEach((name)=>{
          for(var i=0; i<this.mapCanvas.topology[name].edges.length; i++){
            var endpointId = `endpointIdL${name.charAt(name.length-1)}`;
            var edge = this.mapCanvas.topology[name].edges[i];
            edge.nodeA = getDisplayName(edge.meta.endpoint_identifiers[this.mapCanvas.options[endpointId]][0], this.mapCanvas.topology[name].nodes);
            edge.nodeZ = getDisplayName(edge.meta.endpoint_identifiers[this.mapCanvas.options[endpointId]][1], this.mapCanvas.topology[name].nodes);
          }
        });
    }

    if(this.g1) this.g1.remove();
    if(this.g2) this.g2.remove();
    if(this.g3) this.g3.remove();
    try {
      // Draw the map json topology data!!! Currently supports up to 3 layers
      if (this.mapCanvas.options.layer1 && this.mapCanvas.topology.layer1) {
        this.g1 = this.esmap.addNetLayer('layer1', this.mapCanvas.topology.layer1);
      }
      if (this.mapCanvas.options.layer2 && this.mapCanvas.topology.layer2) {
        this.g2 = this.esmap.addNetLayer('layer2', this.mapCanvas.topology.layer2);
      }
      if (this.mapCanvas.options.layer3 && this.mapCanvas.topology.layer3) {
        this.g3 = this.esmap.addNetLayer('layer3', this.mapCanvas.topology.layer3);
      }
    } catch(e) {
      console.error("had an issue rendering map layers...")
    }
  }

  renderMap() {
    if (!this.mapCanvas.options || !this.mapCanvas.topology) {
      return;
    }

    const params = utils.getUrlSearchParams();
    // don't bother resetting edit mode if it's already
    if(!this.esmap.editEdges && !this.esmap.editNodes){
      if (params.editPanel != null) {
        this.esmap.editEdgeMode(true);
        this.mapCanvas.editingInterface.editMode = true;
      } else {
        this.esmap.editEdgeMode(false);
        this.esmap.editNodeMode(false);
        this.mapCanvas.editingInterface.editMode = false;
      }
    }

    d3.selectAll('#edge_edit_mode').on('click', this.toggleEdgeEdit);
    d3.selectAll('#node_edit_mode').on('click', this.toggleNodeEdit);

    this.renderMapLayers();

    return this.map;
  }
}