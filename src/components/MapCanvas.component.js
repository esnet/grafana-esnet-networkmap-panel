import NetworkMap from  "./NetworkMap.js";
import { leafletCss } from "./css/leaflet.css.js";
import { esmapCss } from "./css/esmap.css.js";
import "./EditingInterface.component.js"
import "./SideBar.component.js"
import * as maplayers from './lib/maplayers.js';
import * as pubsub from './lib/pubsub.js';
import { testJsonSchema } from './lib/utils.js';

const PubSub = pubsub.PubSub;
const PrivateMessageBus = pubsub.PrivateMessageBus;

var L = window['L'];
if(typeof require !== "undefined"){
  var L = require('./lib/leaflet.js');
}


// web component
export class MapCanvas extends HTMLElement {

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
  updateMapOptions(changedOptions){
    var {options, changed} = changedOptions;
    var keys = Object.keys(options);
    keys.forEach((k)=>{
      this._options[k] = options[k];
    })

    if(changed.indexOf('showSidebar') >= 0){
      var edgeEditMode = this.editingInterface.edgeEditMode;
      var nodeEditMode = this.editingInterface.nodeEditMode;
      this.shadow.remove();
      this.shadow = null;
      this.render();
      this.newMap();
      if(edgeEditMode){
        PubSub.publish("toggleEdgeEdit", edgeEditMode, this);
      }
      if(nodeEditMode){
        PubSub.publish("toggleNodeEdit", nodeEditMode, this);
      }
    }
    if (
      changed.indexOf('tileSetLayer')>=0 ||
      changed.indexOf('boundaryLayer')>=0 ||
      changed.indexOf('labelLayer')>=0
    ) {
      this.newMap();
    } else {
      this.map && this.map.renderMap();
    }
    if(changed.indexOf('background')>=0){
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
      this.jsonResults = { 
        "layer1": testJsonSchema(this.topology.layer1),
        "layer2": testJsonSchema(this.topology.layer2),
        "layer3": testJsonSchema(this.topology.layer3),
      }
      this.sideBar && this.sideBar.render();
      // destroys the in-RAM map, and unsubscribes all signals
      this.destroyMap && this.destroyMap();
      this.map = new NetworkMap(this);
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
        <esnet-map-editing-interface></esnet-map-editing-interface>
      </div>
      ${ this.options.showSidebar ? "<esnet-map-side-bar></esnet-map-side-bar>" : "" }`;
      this.mapContainer = this.shadow.querySelector("#map");

      this.editingInterface = this.shadow.querySelector("esnet-map-editing-interface");
      this.editingInterface.mapCanvas = this;
      this.editingInterface.topology = this.topology;
      this.editingInterface.updateTopology = this.updateTopology;

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
customElements.get('esnet-map-canvas') || customElements.define( 'esnet-map-canvas', MapCanvas );