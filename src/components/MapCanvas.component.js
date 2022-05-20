import NetworkMap from  "./NetworkMap.js";
import { leafletCss } from "./css/leaflet.css.js";
import { esmapCss } from "./css/esmap.css.js";
import "./EditingInterface.component.js"
import "./SideBar.component.js"
import * as maplayers from './lib/maplayers.js';
import * as pubsub from './lib/pubsub.js';
const PubSub = pubsub.PubSub;

var L = window['L'];
if(typeof require !== "undefined"){
  var L = require('./lib/leaflet.js');
}


// web component
class MapCanvas extends HTMLElement {

  constructor() {
    super();
    this._topology = null;
    this._options = null;
    this.map = null;
    this.leafletMap = null;

    PubSub.subscribe('destroyMap', this.destroyMap, this);
    PubSub.subscribe('repaint', this.newMap, this);
    PubSub.subscribe('renderMap', ()=>{ this.map && this.map.renderMap() }, this)
    PubSub.subscribe('toggleLayer', this.toggleLayer, this);
    PubSub.subscribe('updateMapOptions', this.updateMapOptions, this);
    PubSub.subscribe('updateMapTopology', this.updateMapTopology, this);
    PubSub.subscribe('updateMapDimensions', this.updateMapDimensions, this);
    PubSub.subscribe('updateJsonValidation', this.updateJsonResults, this);
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
    this.map && this.map.setUpdateMapJson(this._updateTopology);
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
  updateMapOptions(changedOptions){
    var {options, changed} = changedOptions;
    console.log('updateMapOptions', changed);
    var keys = Object.keys(options);
    keys.forEach((k)=>{
      this._options[k] = options[k];
    })

    if (
      changed.indexOf('tileSetLayer')>=0 ||
      changed.indexOf('boundaryLayer')>=0 ||
      changed.indexOf('labelLayer')>=0
    ) {
      this.newMap();
    } else {
      this.map && this.map.renderMap();
    }

    this.sideBar && this.sideBar.render();
  }
  updateJsonResults(newResults){
    this.jsonResults = newResults;
    this.sideBar.render();
  }
  updateMapTopology(newTopology){
    this._topology = newTopology;
    this.map && this.map.renderMap();    
  }

  updateMapDimensions(newDimensions){
    this.width = newDimensions.width;
    this.height = newDimensions.height;
    this.render();
    this.sideBar.render();
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
      this.leafletMap = L.map(this.mapContainer, {
          zoomAnimation: false,
          fadeAnimation: false,
          zoomSnap: 0.25,
          zoomDelta: 0.25,
          scrollWheelZoom: false,
          doubleClickZoom: false,
          keyboard: false,
        }).setView([this._options.startLat, this._options.startLng], this._options.startZoom);
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
      console.log("newMap called. This: ", this);
      // destroys the in-RAM map, and unsubscribes all signals
      this.destroyMap && this.destroyMap();
      this.map = new NetworkMap(this);
      this.map.renderMap();
  }

  render(){
    if(!this.shadow){
      this.shadow = document.createElement("div");
      this.append(this.shadow);
      this.shadow.innerHTML = `
      <style>
          #map { 
            font-family: sans-serif;
            background: #CCC; 
            position: relative;
            display: inline-block;
          }
      </style>
      <style>
        ${esmapCss}
      </style>
      <style>
        ${leafletCss}
      </style>

      <div id='map'>
        <editing-interface></editing-interface>
      </div>
      <side-bar></side-bar>`;
      this.mapContainer = this.shadow.querySelector("#map");

      this.editingInterface = this.shadow.querySelector("editing-interface");
      this.editingInterface.topology = this.topology;
      this.editingInterface.updateTopology = this.updateTopology;

      this.sideBar = this.shadow.querySelector("side-bar");
      this.sideBar.mapCanvas = this;
    }
    if(this.height){
      this.mapContainer.style.height = this.height + 'px';
    }
    if(this.width){
      this.mapContainer.style.width = (this.width * 0.80) - 5 + 'px';
    }
    if(!this.map && this.options && this.topology){
      this.newMap();
    }

    this.map && this.map.renderMap();
  }

  // connect component
  connectedCallback() {
    if(!this.topology && this.getAttribute("topology")){
      this.topology = JSON.parse(this.getAttribute("topology"));
    }
    if(!this.options && this.getAttribute("options")){
      this.options = JSON.parse(this.getAttribute("options"));
    }
    if(!this.height && this.getAttribute("height")){
      this.height = this.getAttribute("height");
    }
    if(!this.width && this.getAttribute("width")){
      this.width = this.getAttribute("width");
    }
    this.render();
  }
  
}

// register component
customElements.define( 'map-canvas', MapCanvas );