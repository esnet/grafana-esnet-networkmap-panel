import NetworkMap from  "./NetworkMap.js";
import { leafletCss } from "./css/leaflet.css.js";
import { esmapCss } from "./css/esmap.css.js";
import "./EditingInterface.component.js"
import "./SideBar.component.js"
import * as maplayers from './lib/maplayers.js';
import * as pubsub from './lib/pubsub.js';
import { testJsonSchema } from './lib/utils.js';
import { types, BindableHTMLElement } from './lib/rubbercement.js'
import * as utils from './lib/utils.js';

const PubSub = pubsub.PubSub;
const PrivateMessageBus = pubsub.PrivateMessageBus;

var L = window['L'];
if(typeof require !== "undefined"){
  var L = require('./lib/leaflet.js');
}

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

  constructor() {
    super();
    this.instanceId = Math.random().toString(16).substr(2, 8);
    this._topology = null;
    this._options = null;
    this._selection = false;
    this.map = null;
    this.leafletMap = null;
    this.jsonResults = { layer1: false, layer2: false, layer3: false };
    this.legendMinimized = false;
  }

  // connect component
  connectedCallback() {
    var bus = new PrivateMessageBus(this);
    bus.setID(this.id, this);

    PubSub.subscribe('destroyMap', this.destroyMap, this);
    PubSub.subscribe('newMap', this.newMap, this);
    PubSub.subscribe('renderMap', ()=>{ this.map && this.map.renderMap() }, this)
    PubSub.subscribe('toggleLayer', this.toggleLayer, this);
    PubSub.subscribe('updateMapOptions', this.updateMapOptions, this);
    PubSub.subscribe('updateMapTopology', this.updateMapTopology, this);
    PubSub.subscribe('updateMapDimensions', this.updateMapDimensions, this);
    PubSub.subscribe('updateTopology', () => { this.updateTopology && this.updateTopology(this.topology) }, this);
    PubSub.subscribe('disableScrolling', ()=>{ this.disableScrolling() }, this);
    PubSub.subscribe('enableScrolling', ()=>{ this.enableScrolling() }, this);
    PubSub.subscribe("setSelection", function(d){
        this.selection = true;
    }, this);
    PubSub.subscribe("clearSelection", function(){
        this.selection = false;
    }, this);
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
  set topology(newValue){
    this._topology = newValue;
    return newValue;
  }

  get options() {
    return this._options;
  }
  set options(newValue){
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
    this.newMap();
    return newValue;
  }
  get startlng(){
    return this._startlng;
  }
  set startlng(newValue){
    this._startlng = newValue;
    this.newMap();
    return newValue;
  }
  set selection(newValue){
      this._selection = newValue;
      this.renderStyle();
  }
  get selection(){
      return this._selection;
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
      PubSub.publish('setVariables', null, this);
      PubSub.publish('clearSelection', null, this);
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
  }

  disableScrolling(){
    this.leafletMap && this.leafletMap.dragging.disable();
  }

  updateMapOptions(changedOptions){
    var {options, changed} = changedOptions;
    var keys = Object.keys(options);
    keys.forEach((k)=>{
      this._options[k] = options[k];
    })

    function wasChanged(option, changes){
      return changes.indexOf(option) >= 0;
    }
    if( wasChanged('showLegend', changed) || 
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
      this.newMap();
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
      this.newMap();
    }
    if (
      wasChanged('tileSetLayer', changed) ||
      wasChanged('boundaryLayer', changed) ||
      wasChanged('labelLayer', changed)
    ) {
      this.newMap();
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
      this.jsonResults = { 
        "layer1": testJsonSchema(this.topology.layer1),
        "layer2": testJsonSchema(this.topology.layer2),
        "layer3": testJsonSchema(this.topology.layer3),
      }
    } else {
      this.jsonResults = {
        "layer1": {"valid": false, "errorDetails": "No Topology data available."},
        "layer2": {"valid": false, "errorDetails": "No Topology data available."},
        "layer3": {"valid": false, "errorDetails": "No Topology data available."}
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
    if(this.leafletMap && this._options.initialViewStrategy === 'viewport'){
      this.leafletMap && this.leafletMap.invalidateSize();
      var bounds = L.latLngBounds(L.latLng(
        this._options.viewportTopLeftLat,
        this._options.viewportTopLeftLng),
      L.latLng(
        this._options.viewportBottomRightLat,
        this._options.viewportBottomRightLng)
      )
      this.leafletMap.fitBounds(bounds)
    }
    this.render();
    this.sideBar && this.sideBar.render();
  }

  updateCenter(centerData){
    var newValue = this._options;
    newValue.startZoom = centerData.zoom;
    newValue.startLat = centerData.center.lat.toFixed(2);
    newValue.startLng = centerData.center.lng.toFixed(2);
    this._updateOptions && this._updateOptions(newValue);
  }

  toggleLayer(layerData){
    var newValue = this._options;
    newValue[layerData.layer] = layerData.visible;
    this.map.renderMapLayers();
    this._updateOptions && this._updateOptions(newValue);
  }
  getCurrentLeafletMap(){
    if(!this.leafletMap){
      var centerCoords = [this.startlat || this._options.startLat, this.startlng || this._options.startLng];
      var startZoom = this._options.startZoom;
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
          dragging: this._options.enableScrolling,
          zoomControl: this._options.showViewControls,
        }).setView(centerCoords, startZoom);
        if(this._options.tileSetLayer){
          L.tileLayer(
            maplayers.TILESETS[this._options.tileSetLayer].url,
            maplayers.TILESETS[this._options.tileSetLayer].attributes).addTo(this.leafletMap);
        }
        if(this._options.boundaryLayer){
          L.tileLayer(
            maplayers.BOUNDARIES[this._options.boundaryLayer].url,
            maplayers.BOUNDARIES[this._options.boundaryLayer].attributes).addTo(this.leafletMap);
        }
        if(this._options.labelLayer){
          L.tileLayer(
            maplayers.LABELS[this._options.labelLayer].url, 
            maplayers.LABELS[this._options.labelLayer].attributes).addTo(this.leafletMap);
        }
        if(!window[this.id + "mapPosition"] && this._options.initialViewStrategy === 'viewport'){
          this.leafletMap.fitBounds(L.latLngBounds(L.latLng(
            this._options.viewportTopLeftLat,
            this._options.viewportTopLeftLng),
          L.latLng(
            this._options.viewportBottomRightLat,
            this._options.viewportBottomRightLng)
          ))
        }
        L.svg({ clickable: true }).addTo(this.leafletMap); // we have to make the svg layer clickable
    }
    this.leafletMap.on("zoomend", ()=>{
        if(!window[this.id + "mapPosition"]) window[this.id + "mapPosition"] = {};
        window[this.id + "mapPosition"].zoom = this.leafletMap.getZoom();
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
  }

  homeMap(){
    window[this.id + "mapPosition"] = null;
    this.newMap();
  }

  newMap(){
      var edgeEditMode = false;
      var nodeEditMode = false;
      if(this.topology){
        this.jsonResults = { 
          "layer1": testJsonSchema(this.topology.layer1),
          "layer2": testJsonSchema(this.topology.layer2),
          "layer3": testJsonSchema(this.topology.layer3),
        }
      } else {
        this.jsonResults = {
          "layer1": {"valid": false, "errorDetails": "No Topology data available."},
          "layer2": {"valid": false, "errorDetails": "No Topology data available."},
          "layer3": {"valid": false, "errorDetails": "No Topology data available."}
        }
        return;
      }
      this.sideBar && this.sideBar.render();
      // destroys the in-RAM map, and unsubscribes all signals
      this.destroyMap && this.destroyMap();
      this.map = new NetworkMap(this); // implicitly calls getCurrentLeafletMap()
      this.map.renderMap();
      var lastEditMode = PubSub.last('setEditMode', this);
      PubSub.publish('setEditMode', lastEditMode, this);
  }

  renderStyle(){
    let mapstyle = this.shadow.querySelector("#mapstyle");
    let selectedOnlyButtonDisplay = this._selection && "inline-block" || "none";

    let zIndexBase = this.options.zIndexBase ? this.options.zIndexBase : 50;
    let zIndexLayers = [];
    for(var i=0; i<=10; i++){
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
    for(var i=0; i<thresholds.length; i++){
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
      this.newMap();
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