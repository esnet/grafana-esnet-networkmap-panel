import NetworkMap from  "./RenderMap.js";
import { leafletCss } from "./leaflet.css.js";
import { esmapCss } from "./esmap.css.js";
import "./EditingInterface.component.js"
import * as maplayers from './maplayers.js';
import * as pubsub from './pubsub.js';
const PubSub = pubsub.PubSub;

var L = window['L'];
if(typeof require !== "undefined"){
  var L = require('./leaflet.js');
}


// web component
class MapCanvas extends HTMLElement {

  constructor() {
    super();
    this._topology = null;
    this._options = null;
    this.map = null;
    this.leafletMap = null;

    console.log('this.destroyMap', this.destroyMap);
    PubSub.subscribe('destroyMap', this.destroyMap, this);
    PubSub.subscribe('repaint', this.newMap, this);
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
  
  get updateMapJson(){
    return this._updateMapJson;
  }
  set updateMapJson(newValue){
    this._updateMapJson = newValue;
    this.map && this.map.setUpdateMapJson(this._updateMapJson);
    if(this.editingInterface) this.editingInterface.updateMapJson = newValue;
    return newValue;
  }

  get updateCenter(){
    return this._updateCenter;
  }
  set updateCenter(newValue){
    this._updateCenter = newValue;
    return newValue;
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
        L.tileLayer(
          maplayers.TILESETS[this._options.tileSetLayer].url,
          maplayers.TILESETS[this._options.tileSetLayer].attributes).addTo(this.leafletMap);
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
            ${this.height && "height: "+this.height+"px;" }
            ${this.width && "width: "+this.width+"px;" }
            border:1px solid black; 
            background: #CCC; 
            position: relative;
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
      </div>`;
      this.mapContainer = this.shadow.querySelector("#map");
      this.editingInterface = this.shadow.querySelector("editing-interface");
      this.editingInterface.topology = this.topology;
      this.editingInterface.updateMapJson = this.updateMapJson;
    }
    if(!this.map && this._options && this._topology){
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
      this.height = JSON.parse(this.getAttribute("height"));
    }
    if(!this.width && this.getAttribute("width")){
      this.width = JSON.parse(this.getAttribute("width"));
    }
    this.render();
  }
  
}

// register component
customElements.define( 'map-canvas', MapCanvas );