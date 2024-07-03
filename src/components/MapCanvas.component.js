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

const PubSub = pubsub.PubSub;
const PrivateMessageBus = pubsub.PrivateMessageBus;

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
map.setEditMode
"setEditMode"
map.setEditSelection
"setEditSelection"
map.setSelection
"setSelection"
map.setEditMode
"updateEditMode"

*/


  constructor() {
    super();
    this.instanceId = Math.random().toString(16).substr(2, 8);
    this._topology = null;
    this._options = null;
    this._selection = false;
    this._remoteLoaded = false;
    this.map = null;
    this.leafletMap = null;
    this.jsonResults = [false, false, false];
    this.legendMinimized = false;
    this.userChangedMapFrame = false;
    this.optionsCache = {};
  }


  setSelection(data) {
    this.selection = true;
    this.emit(signals.SELECTION_SET, data);
  }
  showTooltip(data) {
    this.emit(signals.TOOLTIP_VISIBLE, data);
  }
  hideTooltip(){
    this.emit(signals.TOOLTIP_HIDDEN);
  }
  showEditNodeDialog(data){
    this.emit(signals.private.EDIT_NODE_DIALOG_VISIBLE, data);
  }
  // connect component
  connectedCallback() {
    this.pubsub = new PrivateMessageBus(this);
    this.pubsub.setID(this.id, this);

    PubSub.subscribe('toggleLayer', this.toggleLayer, this);
    PubSub.subscribe('updateMapOptions', this.updateMapOptions, this);
    PubSub.subscribe('updateMapTopology', this.updateMapTopology, this);
    PubSub.subscribe('updateMapDimensions', this.updateMapDimensions, this);
    PubSub.subscribe('updateTopology', () => { this.updateTopology && this.updateTopology(this.topology) }, this);
    PubSub.subscribe('getMapCenterAndZoom', (() => {
      var self = this;
      return () => {
        PubSub.publish("returnMapCenterAndZoom", {
          center: self.map.leafletMap.getCenter(),
          zoom: self.map.leafletMap.getZoom()
        })
      }
    })());
    PubSub.subscribe("getMapViewport", (() => {
      var self = this;
      return () => {
        PubSub.publish("returnMapViewport", {
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

    const params = utils.getUrlSearchParams();
    if (
      params.editPanel === null ||
      params.editPanel === undefined ||
      !this.options.enableEditing
    ) {
      this.disableEditing();
    } else {
        this.enableEditing();
    }
    this.render();
  }

  get topology() {
    return this._topology;
  }
  setTopology(newValue){
    this._topology = newValue;
    this.emit(signals.TOPOLOGY_UPDATED, newValue);
    return newValue;
  }

  get options() {
    if(!!this._options){ return this._options; }
    return {};
  }
  setOptions(newValue){
    this._options = newValue;
    return newValue;
  }


  get jsonResults(){
    return this._jsonResults;
  }
  set jsonResults(newResults){
    this._jsonResults = newResults;
  }

  get updateTopology(){
    return this._updateTopology;
  }
  set updateTopology(newValue){
    this._updateTopology = newValue;
    if(this.editingInterface) this.editingInterface.updateTopology = newValue;
    return newValue;
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

  listen(signal, callback){
    this.pubsub.subscribe(signal, callback, this);
  }
  emit(signal, data){
    this.pubsub.publish(signal, data, this);
  }
  lastValue(signal){
    this.pubsub.last(signal, this);
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
    this.pubsub.clearLast(signals.SELECTION_SET);
    this.emit(signals.VARIABLES_SET, null);
    this.emit(signals.SELECTION_CLEARED, null);
  }

  disableEditing(){
    PubSub.publish("updateEditMode", false, this);
    if(!!PubSub.last("setEditMode", this)){
      PubSub.publish("setEditMode", null, this);
    }
    if(!!PubSub.last("setEditSelection", this)){
      PubSub.publish("setEditSelection", null, this);
    }
  }

  enableEditing(){
    PubSub.publish("updateEditMode", true, this);
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
    if(this.options?.useConfigurationUrl){
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
        self.disableEditing();
        let topo = [];
        for(var i=0; i<newOptions.layers.length; i++){
          topo.push(JSON.parse(newOptions.layers[i].mapjson));
        }
        self._topology = topo;
        self.topology = topo;
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

    if(wasChanged('useConfigurationUrl', changed)){
      this._options['useConfigurationUrl'] = options['useConfigurationUrl'];
      this.maybeFetchOptions();
      return
    }
    if(wasChanged('configurationUrl', changed)){
      this._options['configurationUrl'] = options['configurationUrl'];
      // show loading curtain
      this._remoteLoaded = false;
      this.shadow.remove();
      this.shadow = null;
      this.render();
      // fetch remote data
      this.maybeFetchOptions();
      return;
    }

    // options is sparse -- it includes only updated options.
    // here we merge the options into the in-memory copy
    changed.forEach((k)=>{
      utils.setPath(this._options, k, utils.resolvePath(options, k)) ;
    })

    function wasChanged(option, changes){
      return changes.indexOf(option) >= 0;
    }
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
        this.disableEditing();
      } else {
        this.enableEditing();
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
    // needs research
    PubSub.clearTopicCallbacks('');
    this.emit(signals.MAP_DESTROYED);
  }

  homeMap(){
    window[this.id + "mapPosition"] = null;
    this.refresh();
  }

  refresh(){
      var edgeEditMode = false;
      var nodeEditMode = false;
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
      var lastEditMode = PubSub.last('setEditMode', this);
      PubSub.publish('setEditMode', lastEditMode, this);
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

        /* this is to bring grafana panel header on top leaflet layers */
        .panel-header:hover { z-index: ${zIndexLayers[9]}; }
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
    if(!this.shadow){
      this._selection = !!PubSub.last("setSelection", this);
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
        <div class="loading-overlay" style="display: ${ !this.options["useConfigurationUrl"] || !!this._remoteLoaded ? "none" : "flex"}">
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
        ${ this.options.enableEditing ? "<esnet-map-editing-interface></esnet-map-editing-interface>" : "" }
      </div>
      ${ this.options.showSidebar ? "<esnet-map-side-bar></esnet-map-side-bar>" : "" }`;
      this.mapContainer = this.shadow.querySelector(`#map-${this.instanceId}`);

      this.editingInterface = this.shadow.querySelector("esnet-map-editing-interface");
      if(this.editingInterface){
        this.editingInterface.mapCanvas = this;
        this.editingInterface.topology = this.topology;
        this.editingInterface.updateTopology = this.updateTopology;
      }

      this.sideBar = this.shadow.querySelector("esnet-map-side-bar");
      if(this.sideBar){
        this.sideBar.mapCanvas = this;
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
    if(!this.map && this.options && this.topology){
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