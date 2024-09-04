import * as pubsub from './lib/pubsub.js';
import * as utils from "./lib/utils.js";
const PubSub = pubsub.PubSub;
import { BindableHTMLElement } from './lib/rubbercement.js';
import { signals } from "../signals.js";

class SideBar extends BindableHTMLElement {

  constructor() {
    super();
    this.instanceId = Math.random().toString(16).substr(2, 8);
    this._mapCanvas = {
        "options": {},
        "editingInterface": {}
    }
  }

  setMapCanvas(newValue) {
    this._mapCanvas = newValue;
    this._mapCanvas.listen(signals.TOOLTIP_VISIBLE, this.showTooltip);
    this._mapCanvas.listen(signals.TOOLTIP_HIDDEN, this.hideTooltip);
    this._mapCanvas.listen(signals.EDITING_SET, ()=>{ this.render() });
    this.render();
  }

  get mapCanvas(){
    return this._mapCanvas;
  }

  toggleLayer(event) {
    var element = event.target;
    var layer = element.id.split("-")[2];
    var value = element.checked;

    const evtData = {"layer": layer, "visible": value};
    this.mapCanvas.emit(signals.LAYER_TOGGLED, evtData);
    this.mapCanvas.toggleLayer(layer, value);
  }

  showTooltip(data) {
    var tooltip = data.text;
    var tooltipTarget = this.shadow.querySelector("#sidebar-tooltip");
    if(tooltipTarget){
      tooltipTarget.style.opacity = 1; // this gets set incorrectly at times.
      tooltipTarget.innerHTML = tooltip;
    }
  }

  hideTooltip() {
    var tooltipTarget = this.shadow.querySelector("#sidebar-tooltip");
    if(tooltipTarget){
      tooltipTarget.innerHTML = "";
    }
  }

  render() {
    if (!this.shadow) {
        this.shadow = document.createElement("div");
        this.shadow.setAttribute("class", "tight-form-func");
        this.shadow.id = "sidebar-"+this.instanceId;
        this.append(this.shadow);
    }

    let sidebarLayerContent = "";

    for (let i = 0; i < utils.LAYER_LIMIT; i++) {
      if (!this.mapCanvas.options.layers || !this.mapCanvas.options.layers[i] || !this.mapCanvas.jsonResults) {
        continue;
      }
      sidebarLayerContent += `<div class='toggle container' ${ !this.mapCanvas.options.layers[i].legend && "style='display: none;'" }>
        <label class="switch">
          <input type="checkbox" ${ this.mapCanvas.options.layers[i].visible && "checked"} id="sidebar-layer-${i}">
          <span class="slider round"></span>
        </label>
        <text class="legend-text">${ this.mapCanvas.options.layers[i].name || "Layer " + (i+1) }</text>
        <div class="legend-text small" style="${this.mapCanvas.editingInterface && !this.mapCanvas.editingInterface.editMode ? 'display: none' : "" }">
          JSON Schema: ${ (this.mapCanvas.jsonResults && this.mapCanvas.jsonResults[i] && this.mapCanvas.jsonResults[i][0] ) ? "valid" : `invalid${this.mapCanvas.jsonResults?.[i]?.[1] ? ": " + this.mapCanvas.jsonResults[i][1] : "" }` }
        </div>
      </div>`
    }

    this.shadow.innerHTML = `
      <style>
        #sidebar-${this.instanceId} .flow-tooltip {
          display: flex;
          align-items: center;
          grid-gap: 8px;
        }
        #sidebar-${this.instanceId} .flow-tooltip strong {
          font-weight: bold;
        }
        #sidebar-${this.instanceId} .flow-tooltip svg {
          height: 12px;
          width: 12px;
          stroke-width: 2px;
        }

        #sidebar-${this.instanceId} div.sidebar-tooltip {
            position: absolute;
            text-align: left;
            height: auto;
            font: sans-serif;
            pointer-events: none;
        }

         /* The switch - the box around the slider */
        #sidebar-${this.instanceId} .switch {
          position: relative;
          display: inline-block;
          width: 45px;
          height: 26px;
        }

        /* Hide default HTML checkbox */
        #sidebar-${this.instanceId} .switch input {
          opacity: 0;
          width: 0;
          height: 0;
          margin-top: 5px;
        }

        /* The slider */
        #sidebar-${this.instanceId} .slider {
          position: absolute;
          cursor: pointer;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: #ccc;
          -webkit-transition: .4s;
          transition: .4s;
          border-radius: 25px;
        }

        #sidebar-${this.instanceId} .slider:before {
          position: absolute;
          content: "";
          height: 20px;
          width: 20px;
          left: 4px;
          bottom: 3px;
          background-color: white;
          -webkit-transition: .4s;
          transition: .4s;
          border-radius: 50%;
        }

        #sidebar-${this.instanceId} input:checked + .slider {
          background-color: #4EC1E0;
        }

        #sidebar-${this.instanceId} input:focus + .slider {
          box-shadow: 0 0 1px #4EC1E0;
        }

        #sidebar-${this.instanceId} input:checked + .slider:before {
          -webkit-transform: translateX(18px);
          -ms-transform: translateX(18px);
          transform: translateX(18px);
        }

        #sidebar-${this.instanceId} {
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
        #sidebar-${this.instanceId} .legend-text {
          vertical-align: bottom;
          margin-bottom:3px;
          line-height: 27px;
          font-size: 14px;
        }
        #sidebar-${this.instanceId} .legend-text.small {
          vertical-align: bottom;
          color: #888;
          line-height: 12px;
          font-size: 12px;
          margin-top:3px;
        }
        #sidebar-${this.instanceId} h2 {
          margin-bottom: 5px;
          margin-top: 10px;
          font-size:20px;
        }
        #sidebar-tooltip p {
          margin: 0;
        }
      </style>
      <h2>Map Layers</h2>

      ${sidebarLayerContent}

      <h2>Tooltip</h2>
      <div class="sidebar-tooltip" id="sidebar-tooltip">
      </div>
    `;

    // attach event handlers and element events via bindings
    var bindings = {}
    for(let i=0; i<utils.LAYER_LIMIT; i++){
      if(!this.mapCanvas.options.layers || !this.mapCanvas.options.layers[i]){
        continue;
      }
      let selector = `#sidebar-layer-${i}@onchange`;
      bindings[selector] = this.toggleLayer;
    }
    this.bindEvents(bindings);
  }

  /**
   * connect component
   */
  connectedCallback() {
    this.render();
  }
}

// register component
customElements.get('esnet-map-side-bar') || customElements.define( 'esnet-map-side-bar', SideBar );