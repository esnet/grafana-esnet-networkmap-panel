import NetworkMap from  "./NetworkMap.js";
import { leafletCss } from "./css/leaflet.css.js";
import { esmapCss } from "./css/esmap.css.js";
import "./EditingInterface.component.js"
import "./SideBar.component.js"
import * as maplayers from './lib/maplayers.js';
import * as pubsub from './lib/pubsub.js';
import { testJsonSchema } from './lib/utils.js';
import { types, BindableHTMLElement } from './lib/rubbercement.js';
import * as utils from './lib/utils.js';
import testIds from '../constants.js';
import * as L from "./lib/leaflet-src.esm.js";
import { signals } from '../signals.js';

const PubSub = pubsub.PubSub;
const PrivateMessageBus = pubsub.PrivateMessageBus;

const EDGE_DELIMITER = "--";

// plus-one-pixel for each map tile. this makes the tiles
// overlap slightly to avoid fractional zoom artefacts
// in webkit-based browser. Deep discussion on the topic:
// https://github.com/Leaflet/Leaflet/issues/3575
// this is copypasta from:
// https://github.com/Leaflet/Leaflet/issues/3575#issuecomment-150544739
(function(){
    var originalInitTile = L.GridLayer.prototype._initTile
    L.GridLayer.include({
        _initTile: function (tile) {
            originalInitTile.call(this, tile);

            var tileSize = this.getTileSize();

            tile.style.width = tileSize.x + 0.5 + 'px';
            tile.style.height = tileSize.y + 0.5 + 'px';
        }
    });
})()

const ATTRIBUTES = {
    "height": types.number,
    "width": types.number,
    "startlat": types.number,
    "startlng": types.number,
}


// web component
export class MapCanvas extends BindableHTMLElement {

/*
// internal/imperative
map.clearSelection
"clearSelection"
map.setEditSelection
"setEditSelection"
map.setSelection
"setSelection"

*/


  constructor() {
    super();
    this.instanceId = Math.random().toString(16).substr(2, 8);
    this._topology = null;
    this._options = null;
    this._selection = false;
    this._remoteLoaded = false;
    this._data = null;
    this.map = null;
    this.leafletMap = null;
    this.jsonResults = [false, false, false];
    this.legendMinimized = false;
    this.userChangedMapFrame = false;
    this.optionsCache = {};
    this.pubsub = new PrivateMessageBus(this);
    this._trafficFormat = utils.formatBits;
    this._optionsToWatch = [
      'background',
      'tileset.geographic',
      'tileset.boundaries',
      'tileset.labels',
      'showSidebar',
      'showViewControls',
      'showLegend',
      'customLegend',
      'customLegendValue',
      'legendColumnLength',
      'legendPosition',
      'thresholds',
      'enableScrolling',
      'enableEditing',
      'enableNodeAnimation',
      'enableEdgeAnimation',
      'enableCustomNodeTooltip',
      'enableCustomEdgeTooltip',
      'customNodeTooltip',
      'customEdgeTooltip',
      'topologySource',
      'configurationUrl',
      'resolvedLat',
      'resolvedLng',
      'multiLayerNodeSnap',
    ];
    for(let i=0; i<utils.LAYER_LIMIT; i++){
      this._optionsToWatch = this._optionsToWatch.concat([
        `layers[${i}].visible`,
        `layers[${i}].color`,
        `layers[${i}].endpointId`,
        `layers[${i}].nodeHighlight`,
        `layers[${i}].nodeWidth`,
        `layers[${i}].mapjson`,
        `layers[${i}].edgeWidth`,
        `layers[${i}].pathOffset`,
        `layers[${i}].name`,
        `layers[${i}].legend`,
        `layers[${i}].dstFieldLabel`,
        `layers[${i}].srcFieldLabel`,
        `layers[${i}].dataFieldLabel`,
        `layers[${i}].nodeThresholds`,
        `layers[${i}].autodetect.dstNameColumn`,
        `layers[${i}].autodetect.dstLatitudeColumn`,
        `layers[${i}].autodetect.dstLongitudeColumn`,
        `layers[${i}].autodetect.srcNameColumn`,
        `layers[${i}].autodetect.srcLatitudeColumn`,
        `layers[${i}].autodetect.srcLongitudeColumn`,
      ]);
    }
  }


  setSelection(data) {
    this.selection = true;
    this.emit(signals.SELECTION_SET, data);
  }
  showTooltip(event, text) {
    this.emit(signals.TOOLTIP_VISIBLE, {event: event, text: text});
  }
  hideTooltip(){
    this.emit(signals.TOOLTIP_HIDDEN);
  }
  showEditNodeDialog(node, nodeIdx, layer){
    this.emit(signals.private.EDIT_NODE_DIALOG_VISIBLE, {object: node, index: nodeIdx, layer: layer, type: "nodes"});
  }
  // connect component
  connectedCallback() {
    this.pubsub.setID(this.id, this);

    PubSub.global.subscribe(signals.REQUEST_MAP_CENTER_AND_ZOOM, (() => {
      var self = this;
      return () => {
        PubSub.global.publish(signals.RETURN_MAP_CENTER_AND_ZOOM, {
          center: self.map.leafletMap.getCenter(),
          zoom: self.map.leafletMap.getZoom()
        })
      }
    })());
    PubSub.global.subscribe(signals.REQUEST_VIEWPORT, (() => {
      var self = this;
      return () => {
        PubSub.publish(signals.RETURN_VIEWPORT, {
          coordinates: self.map.leafletMap.getBounds()
        })
      }
    })());
    window.addEventListener("resize", ()=>{
      this.recalculateMapZoom();
    })

    if(!this.topology && this.getAttribute("topology")){
      this.topology = JSON.parse(this.getAttribute("topology"));
    }
    if(!this.options && this.getAttribute("options")){
      this.options = JSON.parse(this.getAttribute("options"));
    }
    if(this.options && this.options.legendDefaultBehavior){
      this.legendMinimized = this.options.legendDefaultBehavior === "minimized";
    }
    this.maybeFetchOptions();

    this.setEditModeFromUrl();
    this.render();
  }

  get topology() {
    return this._topology;
  }
  setTopology(newValue){
    // if we already have a topology set, we should re-render.
    const render = this._topology;
    this._topology = newValue;
    this.emit(signals.TOPOLOGY_UPDATED, newValue);
    render && this.render();
    return newValue;
  }

  get options() {
    if(!!this._options){ return this._options; }
    return {};
  }
  setOptions(newValue){
    let changes = this.calculateOptionsChanges(newValue);
    this._options = newValue;
    if(!changes.length) return;
    this.updateMapOptions({ options: newValue, changed: changes });
    this.matchTraffic();
    this.setEditModeFromUrl();
    this.emit(signals.OPTIONS_UPDATED, JSON.parse(JSON.stringify(this._options)));
    return newValue;
  }
  setEditModeFromUrl(){
    const params = utils.getUrlSearchParams();
    if (
      params.editPanel === null ||
      params.editPanel === undefined ||
      !this.options.enableEditing
    ) {
      this.setEditMode(null);
    } else {
      this.setEditMode(this.lastValue(signals.EDITING_SET) || "edge");
    }
  }
  calculateOptionsChanges(newOptions){
    let changed = [];
    this._optionsToWatch.forEach((option) => {
      let lastValue = utils.resolvePath(this._options, option);
      let currentValue = utils.resolvePath(newOptions, option);
      if (lastValue !== currentValue) {
        changed.push(option);
      }
    });
    return changed;
  };

  get jsonResults(){
    return this._jsonResults;
  }
  set jsonResults(newResults){
    this._jsonResults = newResults;
  }

  get updateOptions(){
    return this._updateOptions;
  }
  set updateOptions(newValue){
    this._updateOptions = newValue;
    return newValue;
  }

  // "propattribute" setters/getters
  get height(){
    return this._height;
  }
  set height(newValue){
    this._height = newValue;
    return newValue;
  }

  get width(){
    return this._width;
  }
  set width(newValue){
    this._width = newValue;
    return newValue;
  }

  get startlat(){
    return this._startlat;
  }
  set startlat(newValue){
    this._startlat = newValue;
    this.refresh();
    return newValue;
  }
  get startlng(){
    return this._startlng;
  }
  set startlng(newValue){
    this._startlng = newValue;
    this.refresh();
    return newValue;
  }
  set selection(newValue){
    this._selection = newValue;
    this.renderStyle();
  }
  get selection(){
    return this._selection;
  }

  get traffic(){
    return this._traffic;
  }
  setTraffic(newData){
    this._traffic = newData;
    if(this._options?.topologySource == "autodetect"){
      for(let i=0; i<utils.LAYER_LIMIT; i++){
        if(this._topology?.[i]?.autodetected){
          delete this._topology[i].autodetected;
        }
      }
      this.render();
    }
    this.matchTraffic();
    this.render();
    this.emit(signals.TRAFFIC_UPDATED, JSON.parse(JSON.stringify(this._traffic)));
    return this._traffic;
  }

  matchTraffic(){
    this._options?.layers?.forEach((layerOptions, layerIdx)=>{
      // get a reference to the topology for this layer
      let layerTopology = this._topology?.[layerIdx];

      // if this topology doesn't have a layer... 
      // or if we don't have any traffic data...
      // the rest of this algorithm doesn't make sense.
      if(!layerTopology || !this._traffic || !this._traffic.length){ return }

      // build a hash to avoid n*m*o complexity
      // make a hash of "name": "index"
      // where the index gets us the element of the original array
      let edgeHash = {}
      layerTopology?.edges?.forEach((edge, edgeIdx)=>{
        let endpointIds = edge.meta.endpoint_identifiers[layerOptions.endpointId];
        if(endpointIds?.length > 1){
          // Find A and Z node
          edge.nodeA = endpointIds[0];
          edge.nodeZ = endpointIds[1];
          // create names
          edge._matchname = `${edge.nodeA}${EDGE_DELIMITER}${edge.nodeZ}`;
        } else {
          edge._matchname = `${endpointIds?.[0]}`
        }
        edgeHash[edge._matchname] = edgeIdx;
      })
      
      // initialize all nodes with default color and 0 the traffic
      let nodeHash = {}
      layerTopology?.nodes?.forEach((node, nodeIdx) => {
        if(!node.hasOwnProperty("inTraffic")) { node.inTraffic = 0; }
        if(!node.hasOwnProperty("outTraffic")) { node.outTraffic = 0; }
        node.color = layerOptions.color;
        nodeHash[node.name] = nodeIdx
      });
      // if we don't have a src or dst field for this layer, don't bother working through O(n) for each row.
      if(!layerOptions.srcField && !layerOptions.dstField){ return; }
      this._traffic?.forEach((row)=>{
        // match for the case where we have A--Z in order
        let forwardEdgeSelector = `${row[layerOptions.srcField]}${EDGE_DELIMITER}${row[layerOptions.dstField]}`;
        // match for the case where we have Z--A, reversed
        let reverseEdgeSelector = `${row[layerOptions.dstField]}${EDGE_DELIMITER}${row[layerOptions.srcField]}`;
        // match for the case where we have a row with a single metadata point such as a specific edge identifier
        let singleIdSelector = `${row[layerOptions.srcField]}`;
        // set the traffic sample by forward match
        let targetEdge = layerTopology.edges[edgeHash[forwardEdgeSelector]];
        let values = { in: layerOptions.inboundValueField, out: layerOptions.outboundValueField };
        // set the traffic sample by reverse match if no match yet
        if(!targetEdge){
          targetEdge = layerTopology.edges[edgeHash[reverseEdgeSelector]];
          // be sure to reverse directionality of match
          values = { out: layerOptions.inboundValueField, in: layerOptions.outboundValueField };
        }
        // set the traffic sample by single-point match if no match yet. Use forward directionality
        if(!targetEdge){ targetEdge = layerTopology.edges[edgeHash[singleIdSelector]] }
        // if no match at all, don't mark up this edge with match data.

        if(!targetEdge){ return }
        targetEdge.azValue = row[values.in];
        targetEdge.azDisplayValue = this._trafficFormat(row[values.in]);
        targetEdge.azColor = this._trafficColor(row[values.in], this._options.thresholds, layerOptions.color);
        targetEdge.zaValue = row[values.out];
        targetEdge.zaDisplayValue = this._trafficFormat(row[values.out]);
        targetEdge.zaColor = this._trafficColor(row[values.out], this._options.thresholds, layerOptions.color);

        // set up a hash of node ids
        let nodeIds = {
          out: `${row[layerOptions.srcField]}`,
          in: `${row[layerOptions.dstField]}`,
        }

        // sum the traffic onto the node for each matching edge
        const directions = ["in", "out"]
        directions.forEach((direction)=>{
          let targetNode = layerTopology.nodes[nodeHash[nodeIds[direction]]];
          if(targetNode){
            targetNode[`${direction}Traffic`] += row[values[direction]];
          }
        })
      })
      // as a final step for nodes, convert the traffic sums to formatted labels
      // and color the node based on the max traffic (in vs out)
      layerTopology?.nodes?.forEach((node, nodeIdx)=>{
        let maxTraffic = Math.max.apply(Math, [node.inTraffic, node.outTraffic]);
        node.inValue = this._trafficFormat(node.inTraffic);
        node.outValue = this._trafficFormat(node.outTraffic);
        node.color = this._trafficColor(maxTraffic, layerOptions.nodeThresholds, layerOptions.color);
      })
    })

  }

  setTrafficFormat(fn){
    this._trafficFormat = fn;
    this.matchTraffic();
  }
  get trafficFormat(){
    return this._trafficFormat;
  }

  _trafficColor(value, thresholds, defaultValue){
    let output = defaultValue;
    if(thresholds?.steps){
      thresholds = thresholds.steps;
    }
    thresholds?.forEach((threshold)=>{
      if(value >= threshold.value){
        output = threshold.color;
      }
    })
    return output
  }
  setTrafficColor(fn){
    this._trafficColor = fn;
  }
  get trafficColor(){
    return this._trafficColor;
  }

  listen(signal, callback){
    this.pubsub.subscribe(signal, callback, this);
  }
  emit(signal, data){
    this.pubsub.publish(signal, data, this);
  }
  lastValue(signal){
    return this.pubsub.last(signal, this);
  }
  clearLast(signal){
    return this.pubsub.clearLast(signal, this);
  }


  // "propattribute" helper functions
  static get observedAttributes() {
      return Object.keys(ATTRIBUTES);
  }
  attributeChangedCallback(attribute, oldValue, newValue) {
    if(oldValue != newValue && newValue != this[attribute]){
      this[attribute] = ATTRIBUTES[attribute](newValue);
    }
  }

  clearSelection(){
    this.selection = false;
    this.clearLast(signals.SELECTION_SET);
    this.emit(signals.VARIABLES_SET, null);
    this.emit(signals.SELECTION_CLEARED, null);
    PubSub.global.clearLast(signals.SELECTION_SET);
  }

  setEditMode(mode){
    if(["node", "edge", "off", null].indexOf(mode) < 0){
      throw new Error("Edit mode must be 'edge', 'node', 'off' or null");
    }
    this.emit(signals.EDITING_SET, mode);
  }

  enableScrolling(){
    this.leafletMap && this.leafletMap.dragging.enable();
    this.emit(signals.SCROLLING_TOGGLED, true);
  }

  disableScrolling(){
    this.leafletMap && this.leafletMap.dragging.disable();
    this.emit(signals.SCROLLING_TOGGLED, false);
  }

  maybeFetchOptions(){
    if(this.options?.topologySource == "url"){
      let self = this;
      let maskedKeys = {
        "showLegend": "masked",
        "legendColumnLength": "masked",
        "legendPosition": "masked",
        "legendDefaultBehavior": "masked",
        "customEdgeTooltip": "masked",
        "customNodeTooltip": "masked",
        "enableCustomEdgeTooltip": "masked",
        "enableCustomNodeTooltip": "masked",
        "enableEdgeAnimation": "masked",
        "enableNodeAnimation": "masked",
        "enableScrolling": "masked",
        "showViewControls": "masked",
        "thresholds": "masked",
        "multiLayerNodeSnap": "masked",
      }
      let maskedLayerKeys = {
        "nodeThresholds": "masked",
        "nodeNameMatchField": "masked",
        "nodeValueField": "masked",
        "srcField": "masked",
        "dstField": "masked",
        "inboundValueField": "masked",
        "outboundValueField": "masked",
        "dashboardNodeVar": "masked",
        "dashboardEdgeSrcVar": "masked",
        "dashboardEdgeDstVar": "masked",
      }

      function populateOptionsAndTopology(){
        let newOptions = {...self._options, ...self.optionsCache[self.options["configurationUrl"]]}

        Object.keys(newOptions).forEach((key)=>{
          // deal with per-layer options in a more nuanced way
          if(key == "layers"){
            for(let i=0; i<utils.LAYER_LIMIT; i++){
              if(!newOptions.layers[i]) continue;
              Object.keys(newOptions.layers[i]).forEach((layerKey)=>{
                // if this layer option is not masked, set it on the in-memory options object.
                if(!maskedLayerKeys[layerKey]){
                  self._options.layers[i][layerKey] = newOptions.layers[i][layerKey];
                }
              })
            }
            // stop processing the key "layers" here, moving on to the next key in the loop.
            return
          }
          // if our option is not masked, set it on the in-memory options object.
          if(!maskedKeys[key]){
            self._options[key] = newOptions[key];
          }
        })
        // never allow editing on a configuration populated from a URL
        self._options.enableEditing = false;
        self.setEditMode("edge");
        let topo = [];
        for(var i=0; i<newOptions.layers.length; i++){
          topo.push(JSON.parse(newOptions.layers[i].mapjson));
        }
        self._topology = topo;
        self._remoteLoaded = true;
        self.shadow.remove();
        self.shadow = null;
        self.render();
        self.refresh();
        self.sideBar && self.sideBar.render();
      }
      // if we have a hit in cache, create a merged options object from cache
      if(self.optionsCache[self.options["configurationUrl"]]){
        populateOptionsAndTopology();
        return
      }
      // otherwise, no hit in cache, let's grab them from the URL
      fetch(this.options["configurationUrl"]).then((response)=>{
        response.json().then((config)=>{
          self.optionsCache[self.options["configurationUrl"]] = config;
          populateOptionsAndTopology();
        })
      }).catch((err)=>{
        self._remoteLoaded = true;
        self._remoteLoadError = true;
        self._remoteLoadErrorMessage = `Remote URL:\n${this.options['configurationUrl']}\n\nError Message:\n${err}`;
        self.shadow.remove();
        self.shadow = null;
        self.render();
      })
    }
  }

  updateMapOptions(changedOptions){
    var {options, changed} = changedOptions;
    function wasChanged(option, changes){
      return changes.indexOf(option) >= 0;
    }

    if(wasChanged('topologySource', changed)){
      this._options['topologySource'] = options['topologySource'];
      this.maybeFetchOptions();
    }
    if(wasChanged('configurationUrl', changed)){
      this._options['configurationUrl'] = options['configurationUrl'];
      // show loading curtain
      this._remoteLoaded = false;
      this.shadow?.remove();
      this.shadow = null;
      this.render();
      // fetch remote data
      this.maybeFetchOptions();
    }

    // options is sparse -- it includes only updated options.
    // here we merge the options into the in-memory copy
    changed.forEach((k)=>{
      utils.setPath(this._options, k, utils.resolvePath(options, k)) ;
    })

    if( wasChanged('showLegend', changed) ||
        wasChanged('customLegend', changed) ||
        wasChanged('customLegendValue', changed) ||
        wasChanged('thresholds', changed) ||
        wasChanged('legendColumnLength', changed) ||
        wasChanged('legendPosition', changed)
      ){
      this.renderLegend();
    }
    if(wasChanged('enableEditing', changed)){
      if(!options.enableEditing){
        this.setEditMode(null);
      } else {
        this.setEditMode(this.lastValue(signals.EDITING_SET) || "edge");
      }
      this.shadow.remove();
      this.shadow = null;
      this.render();
      this.refresh();
    }
    if(
        wasChanged('showSidebar', changed) ||
        wasChanged('showViewControls', changed) ||
        wasChanged('enableScrolling', changed) ||
        wasChanged('resolveLat', changed) ||
        wasChanged('resolveLng', changed)
      ){
      this.shadow.remove();
      this.shadow = null;
      this.render();
      this.refresh();
    }
    if (
      wasChanged('tileset.geographic', changed) ||
      wasChanged('tileset.boundaries', changed) ||
      wasChanged('tileset.labels', changed)
    ) {
      this.refresh();
    } else {
      this.map && this.map.renderMap();
    }
    if(
      wasChanged('background', changed) ||
      wasChanged('enableNodeAnimation', changed) ||
      wasChanged('enableEdgeAnimation', changed)
    ){
      this.renderStyle();
    }
    this.sideBar && this.sideBar.render();
  }
  updateMapTopology(newTopology){
    this._topology = newTopology;
    if(this.editingInterface){
      this.editingInterface._topology = newTopology;
    }
    if(this.topology){
      this.jsonResults = this.topology.map((layer)=>{
        return testJsonSchema(layer);
      })
    } else {
      this.jsonResults = [];
      for(let i=0; i<utils.LAYER_LIMIT; i++){
        this.jsonResults.push([false, "No Topology data available."]);
      }
    }
    this.sideBar && this.sideBar.render();
    this.map && this.map.renderMap();
  }

  updateMapDimensions(newDimensions){
    this.width = newDimensions.width;
    this.height = newDimensions.height;
    this.recalculateMapZoom();
  }

  recalculateMapZoom(){
    this.leafletMap && this.leafletMap.invalidateSize();
    if(this.leafletMap && !this.userChangedMapFrame && this._options.initialViewStrategy === 'viewport'){
      var bounds = L.latLngBounds(L.latLng(
        this._options.viewport.top,
        this._options.viewport.left),
      L.latLng(
        this._options.viewport.bottom,
        this._options.viewport.right)
      )
      this.leafletMap.fitBounds(bounds)
    }
    this.render();
    this.sideBar && this.sideBar.render();
  }

  updateCenter(centerData){
    var newValue = this._options;
    newValue.viewport = {
      ...newValue.viewport,
      "zoom": centerData.zoom,
      "center": {
        "lat": centerData.center.lat.toFixed(2),
        "lng": centerData.center.lng.toFixed(2),
      }
    }
    this._updateOptions && this._updateOptions(newValue);
  }

  toggleLayer(layerData){
    var newValue = this._options;
    if(newValue.layers && newValue.layers[layerData.layer]){
      newValue.layers[layerData.layer].visible = layerData.visible;
    } else {
      newValue.layers[layerData.layer] = { visible: layerData.visible };
    }
    this.map.renderMap();
    this._updateOptions && this._updateOptions(newValue);
  }

  autodetectTopology(){
    if(!this._traffic) return;
    if(this._options.topologySource == "autodetect"){
      this.options.enableEditing = false;
      for(let i=0; i<this._options?.layers.length; i++){
        if(this._topology?.[i]?.autodetected){ continue }
        let layerTopology = { "nodes": [], "edges": [], "nodeHash": {}, "pathLayout": { "type": "curveBasis" }, "autodetected": true }

        this._traffic.forEach((edge)=>{
          this._options.layers[i].endpointId = "names";

          let autodetectOptions = this._options?.layers[i].autodetect;
          if(!autodetectOptions) return;
          let srcNameKey = autodetectOptions.srcNameColumn;
          let srcLatKey = autodetectOptions.srcLatitudeColumn;
          let srcLngKey = autodetectOptions.srcLongitudeColumn;
          let dstNameKey = autodetectOptions.dstNameColumn;
          let dstLatKey = autodetectOptions.dstLatitudeColumn;
          let dstLngKey = autodetectOptions.dstLongitudeColumn;

          let source = {
            "name": srcNameKey && edge[srcNameKey] ? edge[srcNameKey] : `${edge[srcLatKey]}:${edge[srcLngKey]}`,
            "coordinate": [parseFloat(edge[srcLatKey]), parseFloat(edge[srcLngKey])],
            "meta": {},
          };
          let dest = {
            "name": dstNameKey && edge[dstNameKey] ? edge[dstNameKey] : `${edge[dstLatKey]}:${edge[dstLngKey]}`,
            "coordinate": [parseFloat(edge[dstLatKey]), parseFloat(edge[dstLngKey])],
            "meta": {},
          };

          layerTopology["nodeHash"][source.name] = source;
          layerTopology["nodeHash"][dest.name] = dest;
          let y_dist = source.coordinate[0] - dest.coordinate[0];
          let x_dist = source.coordinate[1] - dest.coordinate[1];
          let distance = Math.sqrt((x_dist**2) + (y_dist**2));
          let midpoint = [dest.coordinate[0] + (y_dist/2 + (0.12 * distance)),  dest.coordinate[1] + (x_dist/2)];
          let edgeObj = {
            "name": `${source.name}--${dest.name}`,
            "coordinates": [source.coordinate, midpoint, dest.coordinate],
            "meta": { "endpoint_identifiers": { "names": [source.name, dest.name] } }
          }
          layerTopology["edges"].push(edgeObj);
        })
        layerTopology["nodes"] = Object.values(layerTopology["nodeHash"]);
        if(!this._topology){
          this._topology = []
        }
        this._topology[i] = layerTopology;
      }
    }
  }

  getCurrentLeafletMap(){
    if(!this.leafletMap){
      var centerCoords = [this.startlat || this._options?.viewport?.center?.lat, this.startlng || this._options?.viewport?.center?.lng];
      var startZoom = this._options?.viewport?.zoom || 3;
      if(window[this.id + "mapPosition"] && window[this.id + "mapPosition"].center){
        centerCoords = window[this.id + "mapPosition"].center;
      }
      if(window[this.id + "mapPosition"] && window[this.id + "mapPosition"].zoom){
        startZoom = window[this.id + "mapPosition"].zoom;
      }
      this.leafletMap = L.map(this.mapContainer, {
          zoomAnimation: false,
          fadeAnimation: false,
          zoomSnap: 0.125,
          zoomDelta: 0.125,
          scrollWheelZoom: false,
          doubleClickZoom: false,
          keyboard: false,
          dragging: this._options?.enableScrolling,
          zoomControl: this._options?.showViewControls,
        }).setView(centerCoords, startZoom);
        if(this._options.tileset.geographic){
          L.tileLayer(
            maplayers.TILESETS[this._options.tileset.geographic].url,
            maplayers.TILESETS[this._options.tileset.geographic].attributes).addTo(this.leafletMap);
        }
        if(this._options.tileset.boundaries){
          L.tileLayer(
            maplayers.BOUNDARIES[this._options.tileset.boundaries].url,
            maplayers.BOUNDARIES[this._options.tileset.boundaries].attributes).addTo(this.leafletMap);
        }
        if(this._options.tileset.labels){
          L.tileLayer(
            maplayers.LABELS[this._options.tileset.labels].url,
            maplayers.LABELS[this._options.tileset.labels].attributes).addTo(this.leafletMap);
        }
        if(!window[this.id + "mapPosition"] && this._options.initialViewStrategy === 'viewport'){
          this.leafletMap.fitBounds(L.latLngBounds(L.latLng(
            this._options.viewport.top,
            this._options.viewport.left),
          L.latLng(
            this._options.viewport.bottom,
            this._options.viewport.right)
          ))
        }
        L.svg({ clickable: true }).addTo(this.leafletMap); // we have to make the svg layer clickable
    }
    let zoomIn = this.querySelector(".leaflet-control-zoom-in");
    zoomIn?.classList.add("tight-form-func");
    zoomIn?.setAttribute("data-testid", testIds.zoomInBtn);
    zoomIn?.addEventListener("click", ()=>{ this.userChangedMapFrame = true; })
    let zoomOut = this.querySelector(".leaflet-control-zoom-out")
    zoomOut?.classList.add("tight-form-func");
    zoomOut?.setAttribute("data-testid", testIds.zoomOutBtn);
    zoomOut?.addEventListener("click", ()=>{ this.userChangedMapFrame = true; })
    this.leafletMap.on("zoomend", (event)=>{
        if(!window[this.id + "mapPosition"]) window[this.id + "mapPosition"] = {};
        window[this.id + "mapPosition"].zoom = this.leafletMap.getZoom();
    })
    this.leafletMap.on("move", (event)=>{
      if(event.originalEvent){
        this.userChangedMapFrame = true;
      }
    })
    this.leafletMap.on("moveend", ()=>{
        if(!window[this.id + "mapPosition"]) window[this.id + "mapPosition"] = {};
        window[this.id + "mapPosition"].center = this.leafletMap.getCenter();
    })
    return this.leafletMap;
  }

  destroyMap() {
    if(this.leafletMap){
      this.leafletMap.off();
      this.leafletMap.remove();
      this.leafletMap = null;
    }
    if(this.map){
      this.map.destroy();
      this.map = null;
    }
    // needs research
    PubSub.clearTopicCallbacks('');
    this.emit(signals.MAP_DESTROYED);
  }

  homeMap(){
    window[this.id + "mapPosition"] = null;
    this.refresh();
  }

  refresh(){
      if(this.topology){
        this.jsonResults = this.topology.map((layer)=>{
          return testJsonSchema(layer);
        })
      } else {
        this.jsonResults = [];
        for(let i=0; i<utils.LAYER_LIMIT; i++){
          this.jsonResults[i] = [false, "No Topology data available."];
        }
        return;
      }
      this.sideBar && this.sideBar.render();
      // destroys the in-RAM map, and unsubscribes all signals
      this.destroyMap && this.destroyMap();
      this.map = new NetworkMap(this); // implicitly calls getCurrentLeafletMap()
      this.emit(signals.MAP_CREATED);
      this.map.renderMap();
      var lastEditMode = this.lastValue(signals.private.EDIT_MODE_SET);
      this.emit(signals.private.EDIT_MODE_SET, lastEditMode);
  }

  renderStyle(){
    let mapstyle = this.shadow.querySelector("#mapstyle");
    let selectedOnlyButtonDisplay = this._selection && "inline-block" || "none";

    let zIndexBase = this.options.zIndexBase ? this.options.zIndexBase : 50;
    let zIndexLayers = [];
    for(let i=0; i<=10; i++){
      zIndexLayers.push(zIndexBase + (i * 10));
    }

    mapstyle.innerHTML = `
      <style>

        div.tooltip-hover { z-index: 1000; position:absolute; }
        .home-overlay { z-index: ${zIndexLayers[8]}; }
        .legend {  z-index: ${zIndexLayers[8]}; }
        .leaflet-zoom-box { z-index: ${zIndexLayers[8]}; }
        .leaflet-pane         { z-index: ${zIndexLayers[4]}; }

        .leaflet-tile-pane    { z-index: ${zIndexLayers[1]}; }
        .leaflet-overlay-pane { z-index: ${zIndexLayers[3]}; }
        .leaflet-shadow-pane  { z-index: ${zIndexLayers[4]}; }
        .leaflet-marker-pane  { z-index: ${zIndexLayers[5]}; }
        .leaflet-tooltip-pane   { z-index: ${zIndexLayers[6]}; }
        .leaflet-popup-pane   { z-index: ${zIndexLayers[7]}; }

        .leaflet-map-pane canvas { z-index: ${zIndexLayers[0]}; }
        .leaflet-map-pane svg    { z-index: ${zIndexLayers[1]}; }
        .leaflet-control { z-index: ${zIndexLayers[8]}; }
        .leaflet-bottom { z-index: ${zIndexLayers[9]}; }

          #map-${this.instanceId} {
            font-family: sans-serif;
            position:relative;
            background: ${this.options.background};
            display: inline-block;
          }
          #map-${this.instanceId} > .home-overlay > .button.selected-only {
              display: ${ selectedOnlyButtonDisplay }
          }
          ${ this.options.enableNodeAnimation ? `
          .animated-node {
            animation-name: throb;
            animation-duration: 1.5s;
            animation-iteration-count: infinite;
            animation-timing-function: linear;
          }

          @keyframes throb {
            0% {transform:scale(1.5, 1.5);}
            50% {transform:scale(1.0, 1.0); }
            100% {transform:scale(1.5, 1.5); }
          }
          ` : `` }
          ${ this.options.enableEdgeAnimation ? `
          g.dash-over polygon {
            animation-name: crawl;
            animation-duration: 0.5s;
            animation-iteration-count: infinite;
            animation-timing-function: linear;
          }

          g.dash-selected polygon {
            animation-name: crawl;
            animation-duration: 0.5s;
            animation-iteration-count: infinite;
            animation-timing-function: linear;
          }

          @keyframes crawl {
            0% {transform:translate(0,0);}
            100% {transform:translate(12px,0); }
          }` : '' }
      </style>
    `;
  }

  valueFormat(bytes, unit){
    if(unit === null || unit === undefined){ unit = 'b' }
    bytes = parseInt(bytes, 10)
    if(bytes === 0){ return "0" }
    // calculate the 1024-based log of the bytes value
    let log1024 = Math.floor(Math.log(bytes) / Math.log(1024));
    const unit_prefixes = ['', 'K', 'M', 'G', 'T', 'P', 'E', 'Z', 'Y'];
    let unit_prefix = unit_prefixes[log1024];
    return {"text": (bytes/Math.pow(1024, log1024)).toFixed(2), "suffix": unit_prefix + unit}
  }

  legendFormatter(thisValue, nextValue){
    if(thisValue === -Infinity){
      thisValue = null;
    }
    var value = this.valueFormat(!!thisValue ? thisValue : nextValue)
    if(!thisValue){
      return `${ value.text } ${ value.suffix } or below`
    }
    return `≥ ${ value.text } ${ value.suffix }`
  }

  toggleMinimizeLegend(){
    this.legendMinimized = !this.legendMinimized;
    this.renderLegend()
  }

  renderLegend(){
    let legendContainer = this.shadow.querySelector("#legend-container");
    let output = "";
    if(!this.options.showLegend){
      legendContainer.innerHTML = output;
      return;
    }
    let columns = [];
    let columnLength = this.options.legendColumnLength ? this.options.legendColumnLength : 3;
    let thresholds = this.options.thresholds;
    output = `<div class='tight-form-func legend ${this.options.legendPosition}'>
      <div class='heading'>
        <h4>Legend</h4>
        <svg class='minimize' version="1.1" xmlns="http://www.w3.org/2000/svg" height="16" width="16">
          <g transform='scale(1.4) translate(0 0.5)'>
          <circle class='circle-background' cx="5" cy="5" r="5" />
          <polyline points="${ this.legendMinimized ? "3,6.5 5,3.5 7,6.5" : "3,3.5 5,6.5 7,3.5" }" fill="#FFFFFF" stroke="#FFFFFF" />
          </g>
        </svg>
      </div>`;
    if(this.legendMinimized){
      output += `</div>`;
      legendContainer.innerHTML = output;
      this.bindEvents({
        ".minimize@onclick": this.toggleMinimizeLegend,
      })
      return;
    }
    if(this.options.customLegend){
      output += this.options.customLegendValue;
    } else {
      for(let i=0; i<thresholds.length; i++){
        if(i % columnLength == 0){
          columns.push([]);
        }
        var lastColumn = columns.length - 1;
        var thisValue = thresholds[i].value;
        var nextValue = thresholds[i+1] ? thresholds[i+1].value : null;
        columns[lastColumn].push(`<div class='legend-entry'>
          <p>
            <span class='color-sample' style='background-color: ${thresholds[i].color}'></span>
            ${this.legendFormatter(thisValue, nextValue)}
          </p>
        </div>`)
      }
      columns.forEach((column)=>{
        output += `<div class='legend-column'>`;
        column.forEach((row)=>{
          output += row;
        });
        output += `</div>`
      })
    }
    output += `</div>`
    legendContainer.innerHTML = output;
    this.bindEvents({
      ".minimize@onclick": this.toggleMinimizeLegend,
    })
    return;
  }

  render(){
    // if any of our layer are auto-detected, detect and create a topology from them
    this.autodetectTopology();
    if(!this.shadow){
      this._selection = !!this.lastValue(signals.SELECTION_SET);
      this.shadow = document.createElement("div");
      this.append(this.shadow);
      this.shadow.innerHTML = `
      <style>
        ${esmapCss}
      </style>
      <style>
        ${leafletCss}
      </style>
      <div id='mapstyle'>
      </div>


      <div id='map-${this.instanceId}'>
        <div class="loading-overlay" style="display: ${ this.options["topologySource"] != "url" || !!this._remoteLoaded ? "none" : "flex"}">
          Loading Topology Data...
        </div>
        <div class="error-overlay" style="display: ${ !this._remoteLoadError ? "none" : "flex"}">
          <div style='width:50%; margin:auto; padding-top:10px;'>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="red" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style='margin: 0 3px -7px 0'>
          <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3"/><path d="M12 9v4"/><path d="M12 17h.01"/>
          </svg>
          An error occured while loading Topology Data<br /><br />
          Check your network connection.<br /><br />

          Error details:<br />
          <pre>${ this._remoteLoadErrorMessage }</pre>
          </div>
        </div>
        <div class='home-overlay'>
            <div class="button tight-form-func" id="home_map" ${ !this.options.showViewControls ? "style='display:none;'" : "" }>
              🏠
            </div>
            <div class='button selected-only tight-form-func' id='clear_selection'">
              &times; Clear Selection
            </div>
        </div>
        <div class='legend-overlay'>
          <div id='legend-container'>
          </div>
        </div>
        ${ this.options.enableEditing && this.options.topologySource == "json" ? "<esnet-map-editing-interface></esnet-map-editing-interface>" : "" }
      </div>
      ${ this.options.showSidebar ? "<esnet-map-side-bar></esnet-map-side-bar>" : "" }`;
      this.mapContainer = this.shadow.querySelector(`#map-${this.instanceId}`);

      this.editingInterface = this.shadow.querySelector("esnet-map-editing-interface");
      if(this.editingInterface){
        this.editingInterface.setMapCanvas(this);
        this.editingInterface.topology = this.topology;
      }

      this.sideBar = this.shadow.querySelector("esnet-map-side-bar");
      if(this.sideBar){
        this.sideBar.setMapCanvas(this);
      }
      // if we have ResizeObserver in our context, do some extra watching
      if(typeof(ResizeObserver) != 'undefined'){
        const resizeObserver = new ResizeObserver(()=>{ this.recalculateMapZoom(); });
        resizeObserver.observe(this.shadow);
      }
    }
    this.renderStyle();
    this.renderLegend();
    if(this.height){
      this.mapContainer.style.height = this.height + 'px';
    }
    if(this.width){
      if(this.options.showSidebar){
        this.mapContainer.style.width = (this.width * 0.80) - 5 + 'px';
      } else {
        this.mapContainer.style.width = this.width + "px";
      }
    } else {
      if(this.options.showSidebar){
        this.mapContainer.style.width = "77%";
      } else {
        this.mapContainer.style.width = "100%";
      }
    }

    if(!this.map && this._options && this.topology){
      this.refresh();
    }
    this.map && this.map.renderMap();
    this.bindEvents({
      "#home_map@onclick": this.homeMap,
      "#clear_selection@onclick": this.clearSelection,
    })
  }

}

// register component
customElements.get('esnet-map-canvas') || customElements.define( 'esnet-map-canvas', MapCanvas );