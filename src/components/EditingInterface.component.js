import * as pubsub from './pubsub.js';
const PubSub = pubsub.PubSub;

class EditingInterface extends HTMLElement {
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
        PubSub.subscribe("setSelection", (d)=>{ 
            this.selection = true;
        });
        PubSub.subscribe("clearSelection", ()=>{ 
            this.selection = false;
        })
        PubSub.subscribe("toggleNodeEdit", ()=>{
            this._edgeEditMode = false;
            this.nodeEditMode = !this.nodeEditMode;
        })
        PubSub.subscribe("toggleEdgeEdit", ()=>{
            this._nodeEditMode = false;
            this.edgeEditMode = !this.edgeEditMode;
        })
    }
    
    //////////////////////////////////////
    // setters and getters
    set editMode(newValue){
        this._editMode = newValue;
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
        PubSub.publish('setVariables', null);
        PubSub.publish('clearSelection', null);
    }
    toggleNodeEdit(){
        PubSub.publish("toggleNodeEdit");
    }
    toggleEdgeEdit(){
        PubSub.publish("toggleEdgeEdit");
    }
    recalcPaths(){
        PubSub.publish('recalcPaths', null);
    }
    homeMap(){
        // old style:
        PubSub.publish('destroyMap', null);
        PubSub.publish('repaint', null);        
        //PubSub.publish("homeMap");
    }
    // the outer closures here bind 'this' properly...
    // maybe this can be generalized in our bind
    showAddNodeDialog(){
        this.selectedLayer = "layer1";
        this.dialog = "node";
    }
    showAddEdgeDialog(){
        this.selectedLayer = "layer1";
        this.dialog = "edge";
    }
    hideDialogs(){
        this.dialog = false;
    }
    showSrcDst(){
        this.selectedLayer = event.target.value;
    }
    createMapNode(){
        var node_layer = this.shadow.getElementById('node_layer').value;
        var node_name = this.shadow.getElementById('node_name').value;
        var node_lat = this.shadow.getElementById('node_lat').value;
        var node_lng = this.shadow.getElementById('node_lng').value;
        var optionsJson = {};
        var accessors = ['layer1', 'layer2', 'layer3'];
        for (var i = 0; i < accessors.length; i++) {
          try {
            optionsJson[accessors[i]] = this._topology[accessors[i]];
          } catch (e) {
            optionsJson[accessors[i]] = { nodes: [], edges: [] };
          }
        }
        var lavender = "rgb(202, 149, 229)";
        this._topology[node_layer].nodes.push({
          name: node_name,
          color: lavender,
          meta: {},
          latLng: [Math.floor(node_lat), Math.floor(node_lng)],
          children: [],
        });
        const mapJson = {
            "layer1": optionsJson.layer1,
            "layer2": optionsJson.layer2,
            "layer3": optionsJson.layer3
        }
        PubSub.publish("updateTopology", mapJson);

        this.updateTopology && this.updateTopology(mapJson);
        this.dialog = false;

        setTimeout(function () {
          PubSub.publish(
            'repaint', // the renderMap signal triggers a re-render of json layers
            mapJson
          );
          PubSub.publish('setNodeEdit', null);
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
        console.log(optionsJson[edge_layer]);
        var mapJson = {
            "layer1": optionsJson.layer1,
            "layer2": optionsJson.layer2,
            "layer3": optionsJson.layer3
        }
        PubSub.publish("updateTopology", mapJson);

        this.updateTopology && this.updateTopology(mapJson);
        this.dialog = false;
        setTimeout(function () {
          PubSub.publish(
            'repaint', // the renderMap signal triggers a re-render of json layers
            mapJson
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
          console.error(e);
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
                    <h2>Add a Node</h2>
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
                          <input class='text-input' id='node_name' type='text'></input>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <label>Latitude:</label>
                        </td>
                        <td>
                          <input class='text-input' id='node_lat' type='text'></input>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <label>Longitude:</label>
                        </td>
                        <td>
                          <input class='text-input' id='node_lng' type='text'></input>
                        </td>
                      </tr>
                      <tr>
                        <td colSpan={2}>
                          <input class='button' type='button' id='create_node' value='Create Node' />
                          <input class='button' type='button' id='create_node_cancel' value='Cancel' />
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
                        <td colSpan='2'>
                          <input class="buttony" type="button" id="create_edge" value="Create Edge" />
                          <input class="button" type="button" id="create_edge_cancel" value="Cancel" />
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
            "#create_node@onclick": this.createMapNode,
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

/*


  options.layerValid1 = props.jsonSchemaL1[1];
  options.layerValid2 = props.jsonSchemaL2[1];
  options.layerValid3 = props.jsonSchemaL3[1];
  const mapContainer = 'Map_' + panelId + options.editMode.toString();

  const [, setState] = useState('');
  const [showDialog, setDialog] = useState('');
  const [srcDstOptions, setSrcDstOptions] = useState(['']);

  const setButtonScope = (value) => {
    setState('');
  };

  const renderDialog = (toRender) => {
    if (toRender === 'addNodeDialog') {
      return (

      );
    }
    if (toRender === 'addEdgeDialog') {
      return (

      );
    }
    return null;
  };
  const createNode = function (event) {
  };
  const createEdge = function (event) {

  };
  const renderDialogs = () => {
    return (
      <div className="dialog" hidden={!showDialog}>
        {renderDialog(showDialog)}
      </div>
    );
  };
  const showAddNodeDialog = () => {
    setDialog('addNodeDialog');
  };
  const showAddEdgeDialog = () => {
    showSrcDest({ target: { value: 'L1' } });
    setDialog('addEdgeDialog');
  };
  const hideDialogs = () => {
    setDialog('');
  };

  const renderButtons = () => {
    return (

    );
  };
  const renderTools = () => {
    return (
    );
  };

  // setup our pubsub callback to allow interoperation with d3
  PubSub.subscribe('setVariables', setButtonScope);

  const drawMap = () => {
    // destroys the in-RAM map, and unsubscribes all signals
    destroyCurrentLeafletMap();
    const map = new NetworkMap(mapContainer, options, mapData, updateMapJson, updateCenter);
    map.renderMap();
    console.log('resubscribing to recalcPaths');
    // resubscribe to the callback for home and "straighten edges" buttons
    PubSub.subscribe('recalcPaths', props.recalcEdges);
    PubSub.subscribe('repaint', drawMap);

    return destroyCurrentLeafletMap;
  };
  PubSub.subscribe('repaint', drawMap);

  useEffect(drawMap, [
    width,
    height,
    panelId,
    editMode,
    layer2,
    layer1,
    layer3,
    options.tileSetLayer,
    options.boundaryLayer,
    options.labelLayer,
  ]); // adding options var here breaks it
  // above return statement throws a warning that we're not using all the variables, but that's ok.

  const renderLayers = () => {
    if (!params.editPanel) {
      PubSub.publish(
        'renderMap', // the renderMap signal triggers a re-render of json layers
        mapData
      );
    }
  };
  useEffect(renderLayers, [mapData]);

  const updateMapWithOptions = () => {
    if (!!params.editPanel) {
      PubSub.publish('updateOptions', options);
      PubSub.publish(
        'renderMap', // the renderMap signal triggers a re-render of json layers
        mapData
      );
    }
  };
  const optionsToWatchInEditMode = [
    options.layer1,
    options.color1,
    options.endpointIdL1,
    options.nodeHighlightL1,
    options.nodeWidthL1,
    options.edgeWidthL1,
    options.pathOffsetL1,
    options.nodeWidthL1,
    options.edgeWidthL1,
    options.pathOffsetL1,
    options.layer2,
    options.color2,
    options.endpointIdL2,
    options.nodeHighlightL2,
    options.nodeWidthL2,
    options.edgeWidthL2,
    options.pathOffsetL2,
    options.nodeWidthL2,
    options.edgeWidthL2,
    options.pathOffsetL2,
    options.layer3,
    options.color3,
    options.endpointIdL3,
    options.nodeHighlightL3,
    options.nodeWidthL3,
    options.edgeWidthL3,
    options.pathOffsetL3,
  ];
  useEffect(updateMapWithOptions, optionsToWatchInEditMode);

  return (
    <div className="map-panel">
      {renderDialogs()}
      <div id={mapContainer} style={{ height: mapHeight, width: mapWidth, float: 'left' }}></div>
      {renderButtons()}
      {renderTools()}
      
    </div>
  );*/