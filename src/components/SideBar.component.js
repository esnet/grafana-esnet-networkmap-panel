import * as pubsub from './lib/pubsub.js';
import * as utils from "./lib/utils.js";
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
    var layer = element.id.split("-")[1];
    var value = element.checked;
    PubSub.publish("toggleLayer", {"layer": layer, "visible": value}, this);
  }

  showTooltip(data){
    var tooltip = data.text;
    var tooltipTarget = this.shadow.querySelector("#sidebar-tooltip");
    if(tooltipTarget){
      tooltipTarget.style.opacity = 1; // this gets set incorrectly at times.
      tooltipTarget.innerHTML = tooltip;
    }
  }
  hideTooltip(){
    var tooltipTarget = this.shadow.querySelector("#sidebar-tooltip");
    if(tooltipTarget){
      tooltipTarget.innerHTML = "";
    }
  }

  render(){
      if(!this.shadow){
          this.shadow = document.createElement("div");
          this.shadow.setAttribute("class", "tight-form-func");
          this.shadow.id = "tooltip-"+this.instanceId;
          this.append(this.shadow);        
      }

      let sidebarContent = '';

      for(let i=0; i<utils.LAYER_LIMIT; i++){
        if(!this.mapCanvas.options.layers || !this.mapCanvas.jsonResults){
          continue;
        }
        sidebarContent += `<div class='toggle container' ${ !this.mapCanvas.options.layers[i].legend && "style='display: none;'" }>
          <label class="switch">
            <input type="checkbox" ${ this.mapCanvas.options.layers[i].visible && "checked"} id='sidebar-layer${i}'>
            <span class="slider round"></span>
          </label>
          <text class="legend-text">${ this.mapCanvas.options.layers[i].name || "Layer " + (i+1) }</text>
          <div class="legend-text small" style="${this.mapCanvas.editingInterface && !this.mapCanvas.editingInterface.editMode ? 'display: none' : "" }">
            JSON Schema: ${ (this.mapCanvas.jsonResults && this.mapCanvas.jsonResults[i] && this.mapCanvas.jsonResults[i]["valid"] ) ? "valid" : "invalid" }
          </div>
        </div>`

      }

      this.shadow.innerHTML = `
        <style>
          #tooltip-${this.instanceId} {
            font-family: sans-serif;
            padding: 0 1em;
            vertical-align: top;
            display: inline-block;
            ${this.mapCanvas.height && "height: "+this.mapCanvas.height + "px;" }
            ${(this.mapCanvas && this.mapCanvas.width) ? `width: ${this.mapCanvas.width * 0.20}px;` : `width: 19%;`}
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

        ${sidebarContent}

        <h2>Tooltip</h2>
        <div class='sidebar tooltip' id='sidebar-tooltip'>
        </div>`

        var bindings = {}
        for(let i=0; i<utils.LAYER_LIMIT; i++){
          if(!this.mapCanvas.options.layers){
            continue;
          }
          let selector = `#sidebar-layer${i}@onchange`;
          bindings[selector] = this.toggleLayer;
        }
        this.bindEvents(bindings);

  }
  // connect component
  connectedCallback() {
    this.render();
  }
}

// register component
customElements.get('esnet-map-side-bar') || customElements.define( 'esnet-map-side-bar', SideBar );