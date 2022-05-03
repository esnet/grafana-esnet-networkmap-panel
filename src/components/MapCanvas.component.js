import NetworkMap, { destroyCurrentLeafletMap } from  "./RenderMap.js";


// web component
class MapCanvas extends HTMLElement {


  constructor() {
    super();
    this._topology = null;
    this._options = null;
    this.map = null;
  }

  get topology() {
    return this._topology;
  }
  set topology(newValue){
    this._topology = newValue;
    this.map && this.map.updateTopology(this._topology);
    return newValue;
  }

  get options() {
    return this._options;
  }
  set options(newValue){
    this._options = newValue;
    this.map && this.map.updateOptions(this._options);
    return newValue;
  }
  

  render(){
    if(!this.shadow){
      this.shadow = this.attachShadow({ mode: 'closed' });
      this.shadow.innerHTML = `
      <style>
          #map { height:350px; width:600px; border:1px solid black; background: #CCC; }
      </style>
      <link rel="stylesheet" href="src/css/esmap.css">
      <link rel="stylesheet" href="src/css/leaflet.css">

      <div id='map'></div>`;
    }
    if(!this.map && this._options && this._topology){
      const mapContainer = this.shadow.getElementById("map");
      const updateMapJson = function(){ console.log("called updateMapJson")}
      const updateCenter = function(){ console.log("called updateCenter")}
      this.map = new NetworkMap(
        mapContainer, 
        this._options, 
        this.topology,
        updateMapJson,
        updateCenter);
    }

    this.map && this.map.renderMap();
  }

  // connect component
  connectedCallback() {
    this.render();
  }
  
}

// register component
customElements.define( 'map-canvas', MapCanvas );