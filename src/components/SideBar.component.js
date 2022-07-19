import * as pubsub from './lib/pubsub.js';
const PubSub = pubsub.PubSub;
import { BindableHTMLElement } from './lib/rubbercement.js'

class SideBar extends BindableHTMLElement {

  constructor() {
    super();
    this.instanceId = Math.random().toString(16).substr(2, 8);
    this._mapCanvas = {
        "options": {},
        "editingInterface": {}
    }
    PubSub.subscribe("updateEditMode", this.render, this);
    PubSub.subscribe("showTooltip", this.showTooltip, this);
    PubSub.subscribe("hideTooltip", this.hideTooltip, this);
  }

  set mapCanvas(newValue){
    this._mapCanvas = newValue;
    this.render();
  }
  get mapCanvas(){
    return this._mapCanvas;
  }

  toggleLayer(event){
    var element = event.target;
    var layer = element.id;
    var value = element.checked;
    PubSub.publish("toggleLayer", {"layer": layer, "visible": value}, this);
  }

  showTooltip(tooltip){
    var tooltipTarget = this.shadow.querySelector("#sidebar-tooltip");
    tooltipTarget.style.opacity = 1; // this gets set incorrectly at times.
    tooltipTarget.innerHTML = tooltip;
  }
  hideTooltip(){
    var tooltipTarget = this.shadow.querySelector("#sidebar-tooltip");
    tooltipTarget.innerHTML = "";
  }

  render(){
      if(!this.shadow){
          this.shadow = document.createElement("div");
          this.shadow.id = "tooltip-"+this.instanceId;
          this.append(this.shadow);        
      }
      this.shadow.innerHTML = `
        <style>
          #tooltip-${this.instanceId} {
            font-family: sans-serif;
            padding: 0 1em;
            vertical-align: top;
            ${this.mapCanvas.height && "height: "+this.mapCanvas.height + "px;" }
            ${this.mapCanvas.width && ("width: "+ (this.mapCanvas.width * 0.20) + "px;") }
            border:1px solid #F0F0F0;
            background:#FCFCFC;
            display: inline-block;
          }
          .toggle.container {
            display: block;
            margin-bottom: 8px;
            margin-top:8px;
            padding: 0 5px;
          }
          #tooltip-${this.instanceId} .legend-text {
            vertical-align: bottom;
            margin-bottom:3px;
            line-height: 27px;
            font-size: 14px;
          }
          #tooltip-${this.instanceId} .legend-text.small {
            vertical-align: bottom;
            color: #888;
            line-height: 12px;
            font-size: 12px;
            margin-top:3px;
          }
          #tooltip-${this.instanceId} h2 {
            margin-bottom: 5px;
            margin-top: 10px;
            font-size:20px;
          }
          #sidebar-tooltip p {
            margin: 0;
          }
        </style>
        <h2>Map Layers</h2>
        <div class='toggle container' ${ !this.mapCanvas.options.legendL1 && "style='display: none;'" }>
          <label class="switch">
            <input type="checkbox" ${ this.mapCanvas.options.layer1 && "checked"} id='layer1'>
            <span class="slider round"></span>
          </label>
          <text class="legend-text">${ this.mapCanvas.options.layerName1 || "Layer 1" }</text>
          <div class="legend-text small" style="${!this.mapCanvas.editingInterface.editMode ? 'display: none' : "" }">
            JSON Schema: ${ (this.mapCanvas.jsonResults && this.mapCanvas.jsonResults.layer1[0]) ? "valid" : "invalid" }
          </div>
        </div>

        <div class='toggle container' ${ !this.mapCanvas.options.legendL2 && "style='display: none;'" }>
          <label class="switch">
            <input type="checkbox" ${ this.mapCanvas.options.layer2 && "checked"} id='layer2'>
            <span class="slider round"></span>
          </label>
          <text class="legend-text">${ this.mapCanvas.options.layerName2 || "Layer 2" }</text>
          <div class="legend-text small" style="${!this.mapCanvas.editingInterface.editMode ? 'display: none' : "" }">
            JSON Schema: ${ (this.mapCanvas.jsonResults && this.mapCanvas.jsonResults.layer2[0]) ? "valid" : "invalid" }
          </div>
        </div>

        <div class='toggle container' ${ !this.mapCanvas.options.legendL3 && "style='display: none;'" }>
          <label class="switch">
            <input type="checkbox" ${ this.mapCanvas.options.layer3 && "checked"} id='layer3'>
            <span class="slider round"></span>
          </label>
          <text class="legend-text">${ this.mapCanvas.options.layerName3 || "Layer 3" }</text>
          <div class="legend-text small" style="${!this.mapCanvas.editingInterface.editMode ? 'display: none' : "" }">
            JSON Schema: ${ (this.mapCanvas.jsonResults && this.mapCanvas.jsonResults.layer3[0]) ? "valid" : "invalid" }
          </div>
        </div>
        <h2>Tooltip</h2>
        <div class='sidebar tooltip' id='sidebar-tooltip'>
        </div>`
        this.bindEvents({
            "#layer1@onchange": this.toggleLayer,
            "#layer2@onchange": this.toggleLayer,
            "#layer3@onchange": this.toggleLayer,
        })

  }
  // connect component
  connectedCallback() {
    this.render();
  }
}

// register component
customElements.get('side-bar') || customElements.define( 'side-bar', SideBar );