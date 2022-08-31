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
    this.map = null;
    this.leafletMap = null;
    this.jsonResults = { layer1: false, layer2: false, layer3: false };

    new PrivateMessageBus(this);

    PubSub.subscribe('destroyMap', this.destroyMap, this);
    PubSub.subscribe('newMap', this.newMap, this);
    PubSub.subscribe('renderMap', ()=>{ this.map && this.map.renderMap() }, this)
    PubSub.subscribe('toggleLayer', this.toggleLayer, this);
    PubSub.subscribe('updateMapOptions', this.updateMapOptions, this);
    PubSub.subscribe('updateMapTopology', this.updateMapTopology, this);
    PubSub.subscribe('updateMapDimensions', this.updateMapDimensions, this);
    PubSub.subscribe('updateTopology', () => { this.updateTopology(this.topology) }, this);
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

  // "propattribute" helper functions
  static get observedAttributes() {
      return Object.keys(ATTRIBUTES);
  }
  attributeChangedCallback(attribute, oldValue, newValue) {
    if(oldValue != newValue && newValue != this[attribute]){
      this[attribute] = ATTRIBUTES[attribute](newValue);
    }
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
    if(wasChanged('background', changed)){
      this.renderStyle();
    }
    this.sideBar && this.sideBar.render();
  }
  updateMapTopology(newTopology){
    this._topology = newTopology;
    if(this.editingInterface){
      this.editingInterface._topology = newTopology;
    }
    this.jsonResults = { 
      "layer1": testJsonSchema(this.topology.layer1),
      "layer2": testJsonSchema(this.topology.layer2),
      "layer3": testJsonSchema(this.topology.layer3),
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
      console.log('centerCoords', centerCoords);
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
      this.jsonResults = { 
        "layer1": testJsonSchema(this.topology.layer1),
        "layer2": testJsonSchema(this.topology.layer2),
        "layer3": testJsonSchema(this.topology.layer3),
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
    mapstyle.innerHTML = `
      <style>
          #map { 
            font-family: sans-serif;
            background: ${this.options.background};
            position: relative;
            display: inline-block;
          }
      </style>
    `;
  }

  render(){
    if(!this.shadow){
      this.shadow = document.createElement("div");
      this.append(this.shadow);
      this.shadow.innerHTML = `
      <div id='mapstyle'>
      </div>
      <style>
        ${esmapCss}
      </style>
      <style>
        ${leafletCss}
      </style>


      <div id='map'>
        <div class='home-overlay'>
            <div class="button" id="home_map" ${ !this.options.showViewControls ? "style='display:none;'" : "" }>
              🏠
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
    this.render();
  }
  
}

// register component
customElements.get('esnet-map-canvas') || customElements.define( 'esnet-map-canvas', MapCanvas );