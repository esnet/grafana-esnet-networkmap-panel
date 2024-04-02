import * as pubsub from './lib/pubsub.js';
import * as utils from './lib/utils.js';
const PubSub = pubsub.PubSub;
import { BindableHTMLElement } from './lib/rubbercement.js'
import testIds from '../constants.js'

const LAVENDER = "rgb(202, 149, 229)";

class EditingInterface extends BindableHTMLElement {
    constructor(topology) {
        super();
        this._topology = {};
        this.srcDstOptions = [];
        this._editMode = null;
        this._edgeEditMode = false; // edge edit turned on when we enter edit mode.
        this._nodeEditMode = false;
        this._selection = false;
        this._dialog = false;
        this._selectedLayer = 0;
        this._spliceIndex = null;
        this._formTouched = false;
    }

    // connect component
    connectedCallback() {
      this.setEditMode(PubSub.last("setEditMode", this));
      PubSub.subscribe("setEditMode", (evtData)=>{ 
        this.setEditMode(evtData);
        this.render();
      }, this)

      this.setEditNodeData(PubSub.last("showEditNodeDialog", this));
      PubSub.subscribe("showEditNodeDialog", (evtData)=>{ 
        this.setEditNodeData(evtData);
        this.render();
      }, this);

      this.setEditSelection(PubSub.last('setEditSelection', this));
      PubSub.subscribe('setEditSelection', (evtData)=>{
          this.setEditSelection(evtData);
          this.render();
      }, this);

      this.setEditing(PubSub.last("updateEditMode", this));
      PubSub.subscribe('updateEditMode', (newMode)=>{
        this.setEditing(newMode);
        this.render();
      }, this);

      this.render();
    }


    setEditMode(evtData){
        if(evtData === null || evtData === undefined){
            this._edgeEditMode = false;
            this._nodeEditMode = false;
        }
        if(evtData && evtData['mode'] === "edge"){
            this._nodeEditMode = false;
            this._edgeEditMode = evtData['value'];
        } 
        if(evtData && evtData['mode'] === "node"){
            this._edgeEditMode = false;
            this._nodeEditMode = evtData['value'];
        }
        this.mapCanvas && this.mapCanvas.map && this.mapCanvas.map.esmap.editEdgeMode(this._edgeEditMode);
        this.mapCanvas && this.mapCanvas.map && this.mapCanvas.map.esmap.editNodeMode(this._nodeEditMode);
    }

    setEditing(newMode){
        this._editMode = PubSub.last("updateEditMode", this);
        if(newMode && !this._edgeEditMode && !this._nodeEditMode){
            PubSub.publish("setEditMode", { "mode": "edge", "value": true }, this);
        }
    }      

    setEditNodeData(evtData){
        if(evtData){
            this._selectedObject = evtData['object'];
            this._spliceIndex = evtData['index'];
            this.selectedLayer = evtData['layer'];
            this._dialog = "node";            
        } else {
            this._dialog = false;
        }
    }

    setEditSelection(evtData){
        if(!evtData){
            this._formTouched = false;
            this._selectedObject = null;
            this._spliceIndex = null;
            this._selectedLayer = null;
            this._selectedType = null;
            return
        }
        this._formTouched = false;
        this._selectedObject = evtData['object'];
        this._spliceIndex = evtData['index'];
        this._selectedLayer = evtData['layer'];
        this._selectedType = evtData['type'];
    }

    //////////////////////////////////////
    // setters and getters
    set editMode(newValue){
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
    toggleNodeEdit(e){
        e.stopPropagation(); // avoid bug in leaflet
        PubSub.publish("setEditSelection", null, this);
        PubSub.publish("setEditMode", { "mode": "node", "value": !this._nodeEditMode }, this);
    }
    toggleEdgeEdit(e){
        e.stopPropagation(); // avoid bug in leaflet
        PubSub.publish("setEditSelection", null, this);
        PubSub.publish("setEditMode", { "mode": "edge", "value": !this._edgeEditMode }, this);
    }
    recalcPaths(){
        PubSub.publish('recalcPaths', null, this);
    }
    showAddNodeDialog(e){
        e.stopPropagation(); // avoid bug in leaflet
        this._selectedLayer = 0;
        this._selectedObject = null;
        this._spliceIndex = null;
        this.dialog = "node";
    }
    showAddEdgeDialog(e){
        e.stopPropagation(); // avoid bug in leaflet
        this._selectedLayer = 0;
        this._selectedObject = null;
        this._spliceIndex = null;
        this.setSrcDstOptions();
        this.dialog = "edge";
    }
    hideDialogs(e){
        e.stopPropagation(); // avoid bug in leaflet
        PubSub.publish("showEditNodeDialog", null, this)
    }
    showSrcDst(event){
        this.selectedLayer = event.target.value;
    }

    updateMapNodes(event){
        event.preventDefault(); // this is triggered on form submit. Prevent normal form submission.

        var nodeLayer = this.shadow.querySelector('#node_layer').value;
        var nodeName = this.shadow.querySelector('#node_name').value;
        var nodeDisplayName = this.shadow.querySelector('#node_display_name').value;
        var nodeSvg = this.shadow.querySelector('#node_svg').value;
        var nodeTooltip = this.shadow.querySelector('#node_tooltip').value;
        var nodeLat = this.shadow.querySelector('#node_lat').value;
        var nodeLng = this.shadow.querySelector('#node_lng').value;

        const selectedChildren = document.querySelectorAll('#node_children option:checked');
        const nodeChildren = Array.from(selectedChildren).map((el) => el.value);

        var newNode = {
          name: nodeName,
          color: this.mapCanvas.options?.layers?.[nodeLayer]?.color || LAVENDER,
          meta: {
            display_name: nodeDisplayName,
            svg: nodeSvg,
            template: nodeTooltip,
          },
          coordinate: [parseFloat(nodeLat), parseFloat(nodeLng)],
          children: nodeChildren,
        }

        this.updateLayerNodes(nodeLayer, newNode, this._spliceIndex);
        this._formTouched = false;
    }
    updateLayerNodes(layer, node, spliceIndex){
        if(spliceIndex === null){
            this._topology[layer].nodes.push(node);
            PubSub.publish("createMapNode", {"layer": layer, "node": node }, this);
        } else {
            let oldNode = this._topology[layer].nodes.splice(spliceIndex, 1, node); // 'splice' arguments: index, numOfEntriesToReplace, newEntry, [newEntry...]
            PubSub.publish("updateMapNode", {"layer": layer, "node": node, "oldNode": oldNode }, this);
        }
        var defaultLayer = {"nodes":[], "edges": []};
        const mapJson = [];
        for(let i=0; i<utils.LAYER_LIMIT; i++){
            mapJson.push(this._topology[i] || defaultLayer);
        }
        PubSub.publish("updateTopology", mapJson, this);

        this.updateTopology && this.updateTopology(mapJson);
        PubSub.publish("showEditNodeDialog", null, this)

        setTimeout(()=>{
            PubSub.publish("snapEdges", {"node": node, "layer": layer.replace("layer", "") }, this);
            PubSub.publish('renderMap', mapJson, this); // repaint re-renders the topology layers
        }, 10);
    }
    createMapEdge(e){
        e.stopPropagation();
        var edge_layer = this.shadow.querySelector('#edge_layer').value;
        var node_source = this.shadow.querySelector('#node_source').value;
        var node_destination = this.shadow.querySelector('#node_destination').value;

        var mapJson = [];

        for (var i = 0; i < utils.LAYER_LIMIT; i++) {
          try {
            mapJson[i] = this._topology[i];
          } catch (e) {
            mapJson[i] = { nodes: [], edges: [] };
          }
        }

        var coordinates = [null, null];
        for (let i = 0; i < mapJson[edge_layer].nodes.length; i++) {
          if (mapJson[edge_layer].nodes[i].name === node_source) {
            coordinates[0] = mapJson[edge_layer].nodes[i].coordinate;
          }
          if (mapJson[edge_layer].nodes[i].name === node_destination) {
            coordinates[1] = mapJson[edge_layer].nodes[i].coordinate;
          }
        }
        let newEdge = {
          name: node_source + '--' + node_destination,
          meta: {
            endpoint_identifiers: {
              pops: [node_source, node_destination],
            },
          },
          layer: edge_layer,
          azColor: this.mapCanvas.options?.layers?.[edge_layer]?.color || LAVENDER,
          zaColor: this.mapCanvas.options?.layers?.[edge_layer]?.color || LAVENDER,
          coordinates: coordinates,
          children: [],
        };

        mapJson[edge_layer].edges.push(newEdge);

        PubSub.publish("createMapEdge", {
            "layer": edge_layer,
            "source": node_source,
            "destination": node_destination,
            "edge": newEdge
        }, this);

        PubSub.publish("updateTopology", mapJson, this);
        PubSub.publish('updateMapTopology', mapJson, this);

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

    deleteSelection(e){
        e.stopPropagation(); // avoid bug in leaflet
        var topology = this.mapCanvas.topology;
        var deleted = topology[this._selectedLayer][this._selectedType].splice(this._spliceIndex, 1);
        if(this._selectedType == "edges"){
            PubSub.publish("deleteMapEdge", {"edge": deleted[0], "layer":this._selectedLayer}, this)
        }
        if(this._selectedType == "nodes"){
            PubSub.publish("deleteMapNode", {"node": deleted[0], "layer":this._selectedLayer}, this)
        }
        PubSub.publish("updateTopology", topology, this);
        PubSub.publish("updateMapTopology", topology, this);
        PubSub.publish("refresh", null, this);
        PubSub.publish("updateTopologyData", null, this);
        this._selectedLayer = null;
        this._selectedType = null;
        this._spliceIndex = null;
        this._selectedObject = null;
        this.render();
    }

    disableScrolling(evt){
        evt.stopPropagation();
        PubSub.publish("disableScrolling", null, this);
    }

    enableScrolling(evt){
        evt.stopPropagation();
        PubSub.publish("enableScrolling", null, this);
    }
    // end eventbindings
    /////////////////////////////

    setSrcDstOptions(){
        let json = { nodes: [] };
        try {
          json = this._topology[this._selectedLayer];
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

    toString(value){
        if(typeof(value) === "number" && !Number.isInteger(value)){
            return value.toFixed(3);
        }
        if(value){
            return value;
        }
        return "";
    }
    getFieldValue(objType, fieldName){
        var target = null;
        if(this._selectedType == objType && !!this._selectedObject){
            target = this._selectedObject
        }
        var fields = fieldName.split(".");
        for (var field of fields){
            if(!target) return this.toString(target);
            target = target[field]
        }
        return this.toString(target);
    }
    markFormTouched(){
        this._formTouched = true;
    }

    renderChildNodeOptions(selectedNodeName, children){
        let childNodeOptions = "";

        let nodeList = this?.mapCanvas?.topology?.[this._selectedLayer]?.nodes || [];
        for(let i=0; i<nodeList.length; i++){
            if(nodeList[i].name != selectedNodeName){
                let isSelected = "";
                if(children.indexOf(nodeList[i].name) >= 0){
                    isSelected = "selected"
                }
                childNodeOptions += `<option value=${nodeList[i].name} ${isSelected}>${nodeList[i].name}</option>`
            }
        }
        return childNodeOptions
    }

    render(){
        if(!this.shadow){
            this.shadow = document.createElement("div");
            this.append(this.shadow);
        }
        let editModeOnlyButtonDisplay = this._editMode && "inline-block" || "none";
        let editModeOnlyToolsDisplay = this._editMode && "inline-block" || "none";
        if(this._formTouched){
            var dirtyForm = this.shadow.querySelector("#add_node_form");
        }

        let selectedLayerOptions = "";

        for(let i=0; i<utils.LAYER_LIMIT; i++){
            selectedLayerOptions += `<option value='${i}' ${ parseInt(this._selectedLayer) === i && "selected" || ""}>Layer ${i+1}</option>`;
        }


        this.shadow.innerHTML = `
            <style>
                .button-overlay { 
                    position: absolute;
                    z-index: 600;
                    margin-top: 12px;
                    margin-right: 12px;
                    right: 0;
                }
                .button-overlay > .button {
                   border-radius: 4px;
                   padding: 5px 10px;
                   margin-right: 5px;
                   box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.5);
                   display: inline-block;
                   cursor: pointer;
                }
                .tools-overlay { 
                    position: absolute;
                    z-index: 600;
                    margin-top: 84px;
                    margin-left: 10px;
                    max-width:120px;
                }
                .tools-overlay > .button {
                    border-radius: 4px;
                    padding: 5px 10px;
                    margin-bottom: 10px;
                    box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.5);
                    display: inline-block;
                    cursor: pointer;
                    width: max-content;
                }
                .button-overlay > .button.edit-mode-only {
                    display: ${ editModeOnlyButtonDisplay }
                }
                .tools-overlay > .button.edit-mode-only {
                    display: ${ editModeOnlyToolsDisplay }
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
                  border-radius: 5px;
                  padding:20px;
                  margin: 20px auto;
                  max-width:560px;
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
                .dialog .dialog-form input,
                .dialog .dialog-form select {
                  height:30px;
                  border:1px solid #b5b5b5;
                }
                .dialog .dialog-form textarea {
                  border:1px solid #b5b5b5;
                }
                .dialog .dialog-form #edge_layer,
                .dialog .dialog-form #node_layer {
                    width: 100px;
                    margin-right:0.5em;
                }
                .dialog .dialog-form #node_source,
                .dialog .dialog-form #node_destination,
                .dialog .dialog-form #node_name,
                .dialog .dialog-form #node_display_name {
                    width:125px;
                    margin-right:0.5em;
                }
                .dialog .dialog-form #node_lat,
                .dialog .dialog-form #node_lng {
                    width:70px;
                    margin-right:0.5em;
                }
                .dialog .dialog-form table {
                    margin-bottom:10px;
                    width:100%;
                }
                .dialog .dialog-form #node_children {
                    width:150px;
                    height:80px;
                    margin-right:0.5em;
                }
                .dialog .dialog-form #node_svg {
                    width:175px;
                    min-height:80px;
                    margin-right:0.5em;
                    font-family: monospace;
                    font-size:11px;
                }
                .dialog .dialog-form #node_tooltip {
                    width:175px;
                    min-height:80px;
                    margin-right:0.5em;
                    font-family: monospace;
                    font-size:11px;
                }
                .dialog .dialog-form .text-input {
                }

                .dialog .dialog-form input.button {
                  background: rgba(200, 200, 200, 0.5);
                  margin: 0 0.5em 0 0;
                }
                .dialog .dialog-form input.button#create_edge, 
                .dialog .dialog-form input.button#create_node {
                  background: rgb(56, 113, 220);
                  font-weight: bold;
                  color: white;
                  border: 1px solid rgb(26, 73, 120)
                }

                .dialog .dialog-form table td {
                  padding-bottom:0px;
                }

                .dialog .dialog-form .heading-container {
                    width: 300px;
                }
                .dialog .dialog-form .right-aligned {
                    text-align:right;
                }
            </style>
            <div id="dialog" class="dialog">
                <!-- add node dialog -->
                <div class="dialog-form tight-form-func" id="add_node_dialog" data-testid="${testIds.map}">
                  <form id='add_node_form'>
                    <table>
                      <tr>
                        <td class="heading-container" colspan="4">
                        <h2>${this._selectedType == 'nodes' && this._selectedObject ? "Edit Node" : "Add a Node" }</h2>
                        </td>
                        <td class="right-aligned">
                          <input class='button' type='button' id='create_node_cancel' value='Cancel' />
                          <input class='button' type='submit' id='create_node' value='${this._selectedType == 'nodes' && this._selectedObject ? "Update Node" : "Add Node" }' />
                        </td>
                      </tr>
                    </table>
                    <table>
                      <tr>
                        <td>
                          <label for='node_layer'>Layer</label>
                        </td>
                        <td>
                          <label for='node_name'>Name / ID</label>
                        </td>
                        <td>
                          <label for='node_display_name'>Display Name</label>
                        </td>
                        <td>
                          <label for="node_lat">Latitude</label>
                        </td>
                        <td>
                          <label for="node_lng">Longitude</label>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <select id="node_layer">
                            ${selectedLayerOptions}
                          </select>
                        </td>
                        <td>
                          <input class='text-input' id='node_name' type='text' required='required' value='${this.getFieldValue("nodes", "name")}'></input>
                        </td>
                        <td>
                          <input class='text-input' id='node_display_name' type='text' value='${ this.getFieldValue("nodes", "display_name") }'></input>
                        </td>
                        <td>
                          <input class='text-input' id='node_lat' type='number' step='0.001' required='required' value='${ this.getFieldValue("nodes", "coordinate.0") }'></input>
                        </td>
                        <td>
                          <input class='text-input' id='node_lng' type='number' step='0.001' required='required' value='${ this.getFieldValue("nodes", "coordinate.1") }'></input>
                        </td>
                      </tr>
                    </table>
                    <table>
                      <tr>
                        <td>
                          <label for="node_children">Child Nodes</label>
                        </td>
                        <td>
                          <label for="node_svg">SVG Icon</label>
                        </td>
                        <td>
                          <label for="node_tooltip">Custom Tooltip</label>
                        </td>
                      </tr>
                      <tr>
                        <td><select id='node_children' multiple>${this.renderChildNodeOptions(this.getFieldValue("nodes", "name"), this.getFieldValue("nodes", "children"))}</select></td>
                        <td>
                          <textarea class='text-input' id='node_svg'>${ this.getFieldValue("nodes", "meta.svg") }</textarea>
                        </td>
                        <td>
                          <textarea class='text-input' id='node_tooltip'>${ this.getFieldValue("nodes", "meta.template") }</textarea>
                        </td>
                      </tr>
                    </table>
                  </form>
                </div>
                <!-- add edge dialog -->
                <div class='dialog-form tight-form-func' id="add_edge_dialog">
                  <form>
                    <table>
                        <tr>
                            <td class='heading-container'>
                            <h2>Add an Edge</h2>
                            </td>
                            <td class="right-aligned">
                              <input class="button" type="button" id="create_edge_cancel" value="Cancel" />
                              <input class="button" type="button" id="create_edge" value="Create Edge" />
                            </td>
                        </tr>
                    </table>
                    <table>
                      <tr>
                        <td>
                          <label for="edge_layer">Layer:</label>
                        </td>
                        <td>
                          <label for="node_source">Source:</label>
                        </td>
                        <td>
                          <label for="node_destination">Destination:</label>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <select id="edge_layer">
                            ${selectedLayerOptions}
                          </select>
                        </td>
                        <td>${ this.renderSrcDstOptions('node_source') }</td>
                        <td>${ this.renderSrcDstOptions('node_destination') }</td>
                      </tr>
                    </table>
                  </form>
                </div>
            </div>
            <div class="button-overlay">
              <div class='button edit-mode-only tight-form-func' id='edge_edit_mode' data-testid='${testIds.editEdgeToggleBtn}'>
                Edit Edges: ${ this._edgeEditMode ? "On" : "Off" }
              </div>
              <div class='button edit-mode-only tight-form-func' id='node_edit_mode' data-testid='${testIds.editNodeToggleBtn}'>
                Edit Nodes: ${ this._nodeEditMode ? "On" : "Off" }
              </div>
            </div>
            <div class="tools-overlay">
              <div class='button edit-mode-only tight-form-func' id='add_node' data-testid='${testIds.addNodeBtn}'>
                +&nbsp;Node
              </div>
              <div class='button edit-mode-only tight-form-func' id='add_edge' data-testid='${testIds.addEdgeBtn}'>
                +&nbsp;Edge
              </div>
              <div class='button edit-mode-only tight-form-func' id='delete_selection' style='${ (this._selectedObject && this._selectedLayer !== null && this._selectedType) ? "display: block" : "display: none" }'>
                Delete<br>
                ${this._selectedObject && this._selectedObject.name}
              </div>
            </div>
            `;
          if(this._formTouched){
              this.shadow.querySelector("#add_node_form").replaceWith(dirtyForm);
          }
          this.bindEvents({
            "#dialog@onmousedown": this.disableScrolling,
            "#dialog@onmouseup": this.enableScrolling,
            "#edge_edit_mode@onclick": this.toggleEdgeEdit,
            "#node_edit_mode@onclick": this.toggleNodeEdit,
            //".add_node_link@onclick": this.showAddNodeDialog(), // sometimes null... TODO
            "#add_node@onclick": this.showAddNodeDialog,
            "#add_node_form@onsubmit": this.updateMapNodes,
            "#create_node_cancel@onclick": this.hideDialogs,
            "#node_layer@onchange": this.showSrcDst,

            "#add_edge@onclick": this.showAddEdgeDialog,
            "#create_edge@onclick": this.createMapEdge,
            "#create_edge_cancel@onclick": this.hideDialogs,
            "#edge_layer@onchange": this.showSrcDst,

            "#delete_selection@onclick": this.deleteSelection,

            "input.text-input@onkeyup": this.markFormTouched,
          });
    }

}

// register component
customElements.get('esnet-map-editing-interface') || customElements.define( 'esnet-map-editing-interface', EditingInterface );
