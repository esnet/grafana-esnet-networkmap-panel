import NetworkMap from  "./NetworkMap.js";
import { leafletCss } from "./css/leaflet.css.js";
import { esmapCss } from "./css/esmap.css.js";
import "./EditingInterface.component.js"
import "./SideBar.component.js"
import * as maplayers from './lib/maplayers.js';
import * as pubsub from './lib/pubsub.js';
import { testJsonSchema } from './lib/utils.js';
import { types, BindableHTMLElement } from './lib/rubbercement.js'

const PubSub = pubsub.PubSub;
const PrivateMessageBus = pubsub.PrivateMessageBus;

var L = window['L'];
if(typeof require !== "undefined"){
  var L = require('./lib/leaflet.js');
}

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
    this._topology = null;
    this._options = null;
    this._selection = false;
    this.map = null;
    this.leafletMap = null;
    this.jsonResults = { layer1: false, layer2: false, layer3: false };
    this.legendMinimized = false;

    new PrivateMessageBus(this);

    PubSub.subscribe('destroyMap', this.destroyMap, this);
    PubSub.subscribe('newMap', this.newMap, this);
    PubSub.subscribe('renderMap', ()=>{ this.map && this.map.renderMap() }, this)
    PubSub.subscribe('toggleLayer', this.toggleLayer, this);
    PubSub.subscribe('updateMapOptions', this.updateMapOptions, this);
    PubSub.subscribe('updateMapTopology', this.updateMapTopology, this);
    PubSub.subscribe('updateMapDimensions', this.updateMapDimensions, this);
    PubSub.subscribe('updateTopology', () => { this.updateTopology(this.topology) }, this);
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
          center: self.map.leafletMap.getBounds().getCenter(),
          zoom: self.map.leafletMap.getZoom()
        })
      } 
    })());
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
    if(
        wasChanged('showSidebar', changed) ||
        wasChanged('showViewControls', changed) ||
        wasChanged('enableEditing', changed) ||
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
      wasChanged('enableAnimations', changed)
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
    this.leafletMap && this.leafletMap.invalidateSize();
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
      this.leafletMap = L.map(this.mapContainer, {
          zoomAnimation: false,
          fadeAnimation: false,
          zoomSnap: 0.25,
          zoomDelta: 0.25,
          scrollWheelZoom: false,
          doubleClickZoom: false,
          keyboard: false,
          dragging: this._options.enableScrolling,
          zoomControl: this._options.showViewControls,
        }).setView(centerCoords, this._options.startZoom);
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
        L.svg({ clickable: true }).addTo(this.leafletMap); // we have to make the svg layer clickable
    }
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

  newMap(){
      var edgeEditMode = false;
      var nodeEditMode = false;
      if(this.editingInterface){
        edgeEditMode = this.editingInterface.edgeEditMode;
        nodeEditMode = this.editingInterface.nodeEditMode;
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
        return;
      }
      this.sideBar && this.sideBar.render();
      // destroys the in-RAM map, and unsubscribes all signals
      this.destroyMap && this.destroyMap();
      this.map = new NetworkMap(this);
      if(edgeEditMode){
        PubSub.publish("toggleEdgeEdit", edgeEditMode, this);
      }
      if(nodeEditMode){
        PubSub.publish("toggleNodeEdit", nodeEditMode, this);
      }
      this.map.renderMap();
  }

  renderStyle(){
    let mapstyle = this.shadow.querySelector("#mapstyle");
    let selectedOnlyButtonDisplay = this._selection && "inline-block" || "none";

    mapstyle.innerHTML = `
      <style>
          #map { 
            font-family: sans-serif;
            background: ${this.options.background};
            position: relative;
            display: inline-block;
          }
          .home-overlay > .button.selected-only {
              display: ${ selectedOnlyButtonDisplay }
          }
          ${ this.options.enableAnimations ? `
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


      <div id='map'>
        <div class='home-overlay'>
            <div class="button" id="home_map" ${ !this.options.showViewControls ? "style='display:none;'" : "" }>
              🏠
            </div>
            <div class='button selected-only' id='clear_selection'">
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
      this.mapContainer = this.shadow.querySelector("#map");

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
    }
    if(!this.map && this.options && this.topology){
      this.newMap();
    }

    this.map && this.map.renderMap();
    this.bindEvents({
      "#home_map@onclick": this.newMap,
      "#clear_selection@onclick": this.clearSelection,
    })
  }

  // connect component
  connectedCallback() {
    if(!this.topology && this.getAttribute("topology")){
      this.topology = JSON.parse(this.getAttribute("topology"));
    }
    if(!this.options && this.getAttribute("options")){
      this.options = JSON.parse(this.getAttribute("options"));
    }
    if(this.options && this.options.legendDefaultBehavior){
      this.legendMinimized = this.options.legendDefaultBehavior === "minimized";
    }
    this.render();
  }
  
}

// register component
customElements.get('esnet-map-canvas') || customElements.define( 'esnet-map-canvas', MapCanvas );