import * as pubsub from './pubsub.js';
const PubSub = pubsub.PubSub;

class SideBar extends HTMLElement {

  constructor() {
    super();
    this._mapCanvas = {
        "options": {},
        "editingInterface": {}
    }
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
    PubSub.publish("toggleLayer", {"layer": layer, "visible": value});
  }
  // syntactical sugar for event bindings to IDs
  bindEvents(bindings){
      let keys = Object.keys(bindings);
      let self = this;
      keys.forEach((key)=>{
          if(!bindings[key]){
              throw new Error(`Bad binding supplied for ${key}`)
          }
          let [elem_id, event] = key.split("@");
          // use JS built-in 'apply' to set "this" keyword properly for callbacks.
          this.shadow.querySelector(elem_id)[event] = function(){ 
              bindings[key].apply(self, arguments) 
          };
      })
  }

  render(){
      if(!this.shadow){
          this.shadow = document.createElement("div");
          this.shadow.id = "tooltip"
          this.append(this.shadow);        
      }
      this.shadow.innerHTML = `
        <style>
          #tooltip {
            font-family: sans-serif;
            padding: 0 1em;
            vertical-align: top;
            ${this.mapCanvas.height && "height: "+this.mapCanvas.height +"px;" }
            ${this.mapCanvas.width && "width: "+(this.mapCanvas.width * 0.25) - 5+"px;" }
            border:1px solid black;
            background:#FAFAFA;
            display: inline-block;
          }
          #tooltip .legend-text { 
            vertical-align: bottom;
            margin-bottom:3px;
            line-height: 27px;
            font-size: 14px;
          }
          #tooltip h2 { 
            margin-bottom: 5px;
            font-size:20px;
          }
        </style>
        <h2>Map Layers</h2>
        <div class='toggle container'>
          <label class="switch">
            <input type="checkbox" ${ this.mapCanvas.options.layer1 && "checked"} id='layer1'>
            <span class="slider round"></span>
          </label>
          <text class="legend-text">${ this.mapCanvas.options.layerName1 || "Layer 1" }</text>
          <div class="legend-text" style="font-size: 12px; color: #888; ${!this.mapCanvas.editingInterface.editMode && 'display: none' }">
            JSON Schema: ${this.mapCanvas.options.layerValid1}
          </div>
        </div>

        <div class='toggle container'>
          <label class="switch">
            <input type="checkbox" ${ this.mapCanvas.options.layer2 && "checked"} id='layer2'>
            <span class="slider round"></span>
          </label>
          <text class="legend-text">${ this.mapCanvas.options.layerName2 || "Layer 2" }</text>
          <div class="legend-text" style="font-size: 12px; color: #888; ${!this.mapCanvas.editingInterface.editMode && 'display: none' }">
            JSON Schema: ${this.mapCanvas.options.layerValid2}
          </div>
        </div>

        <div class='toggle container'>
          <label class="switch">
            <input type="checkbox" ${ this.mapCanvas.options.layer3 && "checked"} id='layer3'>
            <span class="slider round"></span>
          </label>
          <text class="legend-text">${ this.mapCanvas.options.layerName3 || "Layer 3" }</text>
          <div class="legend-text" style="font-size: 12px; color: #888; ${!this.mapCanvas.editingInterface.editMode && 'display: none' }">
            JSON Schema: ${this.mapCanvas.options.layerValid3}
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
customElements.define( 'side-bar', SideBar );