import * as pubsub from './lib/pubsub.js';
const PubSub = pubsub.PubSub;
import { BindableHTMLElement } from './lib/rubbercement.js'

class EditingInterface extends BindableHTMLElement {
    constructor(topology) {
        super();
        this._topology = {};
        this.srcDstOptions = [];
        this._editMode = null;
        this._edgeEditMode = true; // edge edit turned on when we enter edit mode.
        this._nodeEditMode = false;
        this._selection = false;
        this._dialog = false;
        this._selectedLayer = "layer1";
        this._spliceNodeIndex = null;
        PubSub.subscribe("setSelection", (d)=>{ 
            this.selection = true;
        }, this);
        PubSub.subscribe("clearSelection", ()=>{ 
            this.selection = false;
        }, this)
        PubSub.subscribe("toggleNodeEdit", ()=>{
            this._edgeEditMode = false;
            this.nodeEditMode = !this.nodeEditMode;
        }, this)
        PubSub.subscribe("toggleEdgeEdit", ()=>{
            this._nodeEditMode = false;
            this.edgeEditMode = !this.edgeEditMode;
        }, this)
        PubSub.subscribe("showEditNodeDialog", (evtData)=>{
            this._selectedNode = evtData['object'];
            this._spliceNodeIndex = evtData['index'];
            this.selectedLayer = this._selectedNode.layer;
            this.dialog = "node";
        }, this)
    }
    
    //////////////////////////////////////
    // setters and getters
    set editMode(newValue){
        this._editMode = newValue;
        PubSub.publish("updateEditMode", null, this);
        this.render();
    }
    get editMode(){
        return this._editMode;
    }
    set edgeEditMode(newValue){
        this._edgeEditMode = newValue;
        this.render();
    }
    get edgeEditMode(){
        return this._edgeEditMode;
    }
    set nodeEditMode(newValue){
        this._nodeEditMode = newValue;
        this.render();
    }
    get nodeEditMode(){
        return this._nodeEditMode;
    }
    set selection(newValue){
        this._selection = newValue;
        this.render()
    }
    get selection(){
        return this._selection;
    }
    set dialog(newValue){
        this._dialog = newValue;
        this.render();
    }
    get dialog(){
        return this._dialog;
    }
    set topology(newValue){
        this._topology = newValue;
        this.render();
    }
    get topology(){
        return this._topology;
    }
    set selectedLayer(newValue){
        this._selectedLayer = newValue;
        this.setSrcDstOptions();
    }
    get selectedLayer(){
        return this._selectedLayer;
    }
    set updateTopology(newValue){
        this._updateTopology = newValue;
        this.setSrcDstOptions();
    }
    get updateTopology(){
        return this._updateTopology;
    }
    // end setters and getters
    //////////////////////////////////

    ///////////////////////////
    // event bindings
    clearSelection(){
        PubSub.publish('setVariables', null, this);
        PubSub.publish('clearSelection', null, this);
    }
    toggleNodeEdit(){
        PubSub.publish("toggleNodeEdit", null, this);
    }
    toggleEdgeEdit(){
        PubSub.publish("toggleEdgeEdit", null, this);
    }
    recalcPaths(){
        PubSub.publish('recalcPaths', null, this);
    }
    homeMap(){
        PubSub.publish('newMap', null, this);
    }
    showAddNodeDialog(){
        this.selectedLayer = "layer1";
        this._selectedNode = null;
        this._spliceNodeIndex = null;
        this.dialog = "node";
    }
    showAddEdgeDialog(){
        this.selectedLayer = "layer1";
        this._selectedNode = null;
        this._spliceNodeIndex = null;
        this.dialog = "edge";
    }
    hideDialogs(){
        this.dialog = false;
    }
    showSrcDst(){
        this.selectedLayer = event.target.value;
    }

    updateMapNodes(){
        var nodeLayer = this.shadow.getElementById('node_layer').value;
        var nodeName = this.shadow.getElementById('node_name').value;
        var nodeDisplayName = this.shadow.getElementById('node_display_name').value;
        var nodeSvg = this.shadow.getElementById('node_svg').value;
        var nodeLat = this.shadow.getElementById('node_lat').value;
        var nodeLng = this.shadow.getElementById('node_lng').value;
        var lavender = "rgb(202, 149, 229)";

        var newNode = {
          name: nodeName,
          color: lavender,
          meta: {
            display_name: nodeDisplayName,
            svg: nodeSvg
          },
          latLng: [parseFloat(nodeLat), parseFloat(nodeLng)],
          children: [],
        }

        this.updateLayerNodes(nodeLayer, newNode, this._spliceNodeIndex);
    }
    updateLayerNodes(layer, node, spliceIndex){
        if(spliceIndex === null){
            this._topology[layer].nodes.push(node);
        } else {
            this._topology[layer].nodes.splice(spliceIndex, 1, node); // 'splice' arguments: index, numOfEntriesToReplace, newEntry, [newEntry...]
        }
        var defaultLayer = {"nodes":[], "edges": []};
        const mapJson = {
            "layer1": this._topology.layer1 || defaultLayer,
            "layer2": this._topology.layer2 || defaultLayer,
            "layer3": this._topology.layer3 || defaultLayer,
        }
        PubSub.publish("updateTopology", mapJson, this);

        console.log('in updateLayerNodes. this.updateTopology:', this.updateTopology)
        this.updateTopology && this.updateTopology(mapJson);
        this.dialog = false;

        setTimeout(()=>{
          PubSub.publish('renderMap', mapJson, this); // repaint re-renders the topology layers
        }, 100);
    }
    createMapEdge(){
        var edge_layer = this.shadow.getElementById('edge_layer').value;
        var node_source = this.shadow.getElementById('node_source').value;
        var node_destination = this.shadow.getElementById('node_destination').value;

        var optionsJson = {};

        var accessors = ['layer1', 'layer2', 'layer3'];
        for (var i = 0; i < accessors.length; i++) {
          try {
            optionsJson[accessors[i]] = this._topology[accessors[i]];
          } catch (e) {
            optionsJson[accessors[i]] = { nodes: [], edges: [] };
          }
        }

        var latLngs = [null, null];
        for (let i = 0; i < optionsJson[edge_layer].nodes.length; i++) {
          if (optionsJson[edge_layer].nodes[i].name === node_source) {
            latLngs[0] = optionsJson[edge_layer].nodes[i].latLng;
          }
          if (optionsJson[edge_layer].nodes[i].name === node_destination) {
            latLngs[1] = optionsJson[edge_layer].nodes[i].latLng;
          }
        }
        var lavender = "rgb(202, 149, 229)";
        optionsJson[edge_layer].edges.push({
          name: node_source + '--' + node_destination,
          meta: {
            endpoint_identifiers: {
              pops: [node_source, node_destination],
            },
          },
          layer: edge_layer.charAt(edge_layer.length - 1) * 1,
          azColor:lavender,
          zaColor:lavender,
          latLngs: latLngs,
          children: [],
        });

        var mapJson = {
            "layer1": optionsJson.layer1,
            "layer2": optionsJson.layer2,
            "layer3": optionsJson.layer3
        }
        PubSub.publish("updateTopology", mapJson, this);

        this.updateTopology && this.updateTopology(mapJson);
        this.dialog = false;
        setTimeout(function () {
          PubSub.publish(
            'renderMap', // the renderMap signal triggers a re-render of json layers
            mapJson,
            this
          );
        }, 100);
    }

    // end eventbindings
    /////////////////////////////

    setSrcDstOptions(){
        let json = { nodes: [] };
        try {
          json = this._topology[this.selectedLayer];
        } catch (e) {
          console.debug(e);
        }
        this.srcDstOptions = [];
        if(!json || !json.nodes) { this.render(); return; }
        for (let i = 0; i < json.nodes.length; i++) {
          let node = { name: null };
          node = json.nodes[i];
          if (node.name) {
            this.srcDstOptions.push(node.name);
          }
        }
        this.render()
    }

    renderSrcDstOptions(name){
        if (this.srcDstOptions.length === 0) {
          return `<div class="no-node-message">
              The Layer You&apos;ve Selected has no Nodes.
              <div class="add-node-link">
                Add Node
              </div>
            </div>`;
        }
        var optionsList = this.srcDstOptions.map((value, i) => {
            return `<option key=${i} value=${value}>${value}</option>`
        });
        return `<select id="${name}">${optionsList}</select>`;
    };

    render(){
        if(!this.shadow){
            this.shadow = this.attachShadow({"mode": "open"})
        }
        let editModeOnlyButtonDisplay = this._editMode && "inline-block" || "none";
        let editModeOnlyToolsDisplay = this._editMode && "block" || "none";
        let selectedOnlyButtonDisplay = this._selection && "inline-block" || "none";
        this.shadow.innerHTML = `
            <style>
                .button-overlay { 
                    position: absolute;
                    z-index: 600;
                    margin-top: 12px;
                    margin-left: 57px;
                }
                .button-overlay > .button {
                   background: white;
                   border-radius: 4px;
                   padding: 5px 10px;
                   margin-right: 5px;
                   box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.5);
                   border: 1px solid #b3b3b3;
                   display: inline-block;
                   cursor: pointer;
                }
                .button-overlay > .button:hover {
                    background: #EEE;
                }
                .tools-overlay { 
                    position: absolute;
                    z-index: 600;
                    margin-top: 84px;
                    margin-left: 10px;
                }
                .tools-overlay > .button {
                    background: white;
                    border-radius: 4px;
                    padding: 5px 10px;
                    margin-bottom: 10px;
                    box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.5);
                    border: 1px solid #b3b3b3;
                    display: block;
                    cursor: pointer;
                }
                .tools-overlay > .button:hover {
                    background: #EEE;
                }
                .button-overlay > .button.edit-mode-only {
                    display: ${ editModeOnlyButtonDisplay }
                }
                .tools-overlay > .button.edit-mode-only {
                    display: ${ editModeOnlyToolsDisplay }
                }
                .button-overlay > .button.selected-only {
                    display: ${ selectedOnlyButtonDisplay }
                }
                .dialog {
                  position: absolute;
                  z-index: 10000;
                  width: 100%;
                  background: rgba(0,0,0,0.2);
                  height:100%;
                  display: ${ this._dialog ? "block" : "none" }
                }

                .dialog .dialog-form {
                  background: white;
                  border-radius: 5px;
                  padding:20px;
                  margin: 20px 20%;
                  box-shadow: 3px 3px 13px black;
                  display: none;
                }

                #add_edge_dialog { 
                    display: ${ this._dialog == "edge" ? "block" : "none" }
                }

                #add_node_dialog { 
                    display: ${ this._dialog == "node" ? "block" : "none" }
                }

                .dialog .dialog-form div {
                  margin: 0.5em 0;
                }

                .dialog .dialog-form .no-node-message {
                  padding-left:10px;
                }
                .dialog .dialog-form .add-node-link {
                  color: blue;
                  text-decoration: underline;
                }
                .dialog .dialog-form input {
                  border:1px solid #b5b5b5;
                }
                .dialog .dialog-form select {
                  margin-left:10px;
                }
                .dialog .dialog-form .text-input {
                  margin-left:10px;
                }

                .dialog .dialog-form input.button {
                  background: #ccc;
                  margin: 1em 0.5em 0 0;
                }

                .dialog .dialog-form table td {
                  padding-bottom:10px;
                }
            </style>
            <div class="dialog">
                <!-- add node dialog -->
                <div class="dialog-form" id="add_node_dialog">
                  <form id='add_node_form'>
                    <h2>${this._selectedNode ? "Edit Node" : "Add a Node" }</h2>
                    <table>
                      <tr>
                        <td>
                          <label>Layer:</label>
                        </td>
                        <td>
                          <select id="node_layer">
                            <option value='layer1' ${ this.selectedLayer == "layer1" && "selected"}>Layer 1</option>
                            <option value='layer2' ${ this.selectedLayer == "layer2" && "selected"}>Layer 2</option>
                            <option value='layer3' ${ this.selectedLayer == "layer3" && "selected"}>Layer 3</option>
                          </select>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <label>Name:</label>
                        </td>
                        <td>
                          <input class='text-input' id='node_name' type='text' ${ this._selectedNode ? "value='"+this._selectedNode.name+"'" : "" }></input>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <label>Display Name:</label>
                        </td>
                        <td>
                          <input class='text-input' id='node_display_name' type='text' ${ this._selectedNode ? "value='"+ (this._selectedNode.meta.display_name || "") +"'" : "" }></input>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <label>Latitude:</label>
                        </td>
                        <td>
                          <input class='text-input' id='node_lat' type='text' ${ this._selectedNode ? "value='"+this._selectedNode.latLng[0].toFixed(3)+"'" : "" }></input>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <label>Longitude:</label>
                        </td>
                        <td>
                          <input class='text-input' id='node_lng' type='text' ${ this._selectedNode ? "value='"+this._selectedNode.latLng[1].toFixed(3)+"'" : "" }></input>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <label>SVG Icon:</label>
                        </td>
                        <td>
                          <textarea class='text-input' id='node_svg'>${ this._selectedNode && this._selectedNode.meta.svg || "" }</textarea>
                        </td>
                      </tr>
                      <tr>
                        <td colspan="2">
                          <input class='button' type='button' id='create_node_cancel' value='Cancel' />
                          <input class='button' type='button' id='create_node' value='${this._selectedNode ? "Update Node" : "Add Node" }' />
                        </td>
                      </tr>
                    </table>
                  </form>
                </div>
                <!-- add edge dialog -->
                <div class='dialog-form' id="add_edge_dialog">
                  <form>
                    <h2>Add an Edge</h2>
                    <table>
                      <tr>
                        <td>
                          <label>Layer:</label>
                        </td>
                        <td>
                          <select id="edge_layer">
                            <option value="layer1" ${ this.selectedLayer == "layer1" && "selected"}>Layer 1</option>
                            <option value="layer2" ${ this.selectedLayer == "layer2" && "selected"}>Layer 2</option>
                            <option value="layer3" ${ this.selectedLayer == "layer3" && "selected"}>Layer 3</option>
                          </select>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <label>Source:</label>
                        </td>
                        <td>${ this.renderSrcDstOptions('node_source') }</td>
                      </tr>
                      <tr>
                        <td>
                          <label>Destination:</label>
                        </td>
                        <td>${ this.renderSrcDstOptions('node_destination') }</td>
                      </tr>
                      <tr>
                        <td colspan='2'>
                          <input class="button" type="button" id="create_edge_cancel" value="Cancel" />
                          <input class="button" type="button" id="create_edge" value="Create Edge" />
                        </td>
                      </tr>
                    </table>
                  </form>
                </div>
            </div>
            <div class="button-overlay">
              <div class="button" id="home_map">
                🏠
              </div>
              <div class='button selected-only' id='clear_selection'">
                &times; Clear Selection
              </div>
              <div class='button edit-mode-only' id='edge_edit_mode'>
                Edit Edges: ${ this._edgeEditMode ? "On" : "Off" }
              </div>
              <div class='button edit-mode-only' id='node_edit_mode'>
                Edit Nodes: ${ this._nodeEditMode ? "On" : "Off" }
              </div>
            </div>
            <div class="tools-overlay">
              <div class='button edit-mode-only' id='add_node'>
                + Node
              </div>
              <div class='button edit-mode-only' id='add_edge'>
                + Edge
              </div>
            </div>
            `;
          this.bindEvents({
            "#home_map@onclick": this.homeMap,
            "#clear_selection@onclick": this.clearSelection,
            "#edge_edit_mode@onclick": this.toggleEdgeEdit,
            "#node_edit_mode@onclick": this.toggleNodeEdit,
            //".add_node_link@onclick": this.showAddNodeDialog(), // sometimes null... TODO
            "#add_node@onclick": this.showAddNodeDialog,
            "#create_node@onclick": this.updateMapNodes,
            "#create_node_cancel@onclick": this.hideDialogs,
            "#node_layer@onchange": this.showSrcDst,

            "#add_edge@onclick": this.showAddEdgeDialog,
            "#create_edge@onclick": this.createMapEdge,
            "#create_edge_cancel@onclick": this.hideDialogs,
            "#edge_layer@onchange": this.showSrcDst,
          });
    }
  // connect component
  connectedCallback() {
    this.render();
  }

}

// register component
customElements.define( 'editing-interface', EditingInterface );
