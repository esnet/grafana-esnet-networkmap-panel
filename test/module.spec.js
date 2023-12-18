import * as should from "../node_modules/should/should.js"
import * as pubsub from '../src/components/lib/pubsub.js';
const PubSub = pubsub.PubSub;

const EXPECTED_MOUSEOVER_TEXT = `A

In Volume: undefined

Out Volume: undefined`;

const lavender = "rgb(202, 149, 229)";

var TOPOLOGY = [
            {
                "edges":[
                    {"name":"A--B","meta":{"endpoint_identifiers":{"pops":["A","B"]}},
                        "coordinates":[[39.02,-105.99],[35.81,-101.77],[34.59,-96.06]],
                        "children":[],
                        "azColor":lavender,
                        "zaColor":lavender,
                        "layer":1,
                    },
                    {"name":"B--C","meta":{
                        "endpoint_identifiers":{"pops":["B","C"]}},
                        "coordinates":[[34.59,-96.06],[37.99,-93.86],[42.16,-93.95]],
                        "children":[],
                        "azColor":lavender,
                        "zaColor":lavender,
                        "layer":1
                    },
                    {"name":"A--C","meta":{
                        "endpoint_identifiers":{"pops":["A","C"]}},
                        "coordinates":[[39.02,-105.99],[41.90,-100.72],[42.16,-93.95]],
                        "children":[],
                        "azColor":lavender,
                        "zaColor":lavender,
                        "layer":1
                    }
                ],
                "nodes":[
                        {
                            "name":"A",
                            "meta":{},
                            "coordinate":[39.027718840211605,-105.99609375000001],
                            "color":lavender,
                        },
                        {
                            "name":"B",
                            "meta":{},
                            "coordinate":[34.59704151614417,-96.064453125],
                            "color":lavender,
                        },
                        {
                            "name":"C",
                            "meta":{},
                            "coordinate":[42.16340342422403,-93.95507812500001],
                            "color":lavender,
                        }
                ],"aTest":0}
        ]

describe( "Class MapCanvas", () => {
    afterEach(async function(){
        var canvas = document.querySelector("esnet-map-canvas");
        canvas.remove();
    })
    beforeEach(async function(){  
        var elem = document.createElement("esnet-map-canvas");
        elem.setAttribute('width', 800);
        elem.setAttribute('height', 400);
        elem.setAttribute("id", "testing-element");


        elem.topology = TOPOLOGY;

        elem.options = {
            "viewport": {
              "zoom":3,
              "center": {
                "lat":38.68,
                "lng":-96.96,
              }
            },
            "showSidebar": true,
            "showViewControls": true,
            "enableScrolling": true,
            "enableEditing": true,
            "enableNodeAnimation": true,
            "enableEdgeAnimation": true,
            "tileset":{
              "geographic": "esri.shaded",
              "boundaries": null,
              "labels": null,
            },
            "edgeWidth":3,
            "editMode":true,
            "nodeWidth":5,
            "pathOffset":3,
            "layers": [
                {
                    "visible":true,
                    "endpointId":"pops",
                    "nodeWidth":4,
                    "edgeWidth":1.5,
                    "pathOffset":1.5,
                    "name":"Core Topology",
                    "legend":true,                 
                },
                {
                    "visible":false,
                    "endpointId":"pops",
                    "nodeWidth":5,
                    "edgeWidth":3,
                    "pathOffset":3,
                    "name":"Site Topology",
                    "legend":true,
                },
                {
                    "visible":false,
                    "endpointId":"pops",
                    "nodeHighlight":"red",
                    "nodeWidth":6.5,
                    "edgeWidth":2,
                    "pathOffset":1.5,
                    "name":"Peer Topology",
                    "legend":true,                  
                }
            ]
        };
        elem.updateTopology = function(){ return }
        document.body.appendChild(elem);
    }); 
    it( "should append a esnet-map-canvas element", () => {
      document.querySelector("esnet-map-canvas").should.be.an.instanceOf(HTMLElement);
    } );
    it( "should have a sidebar child element", () => {
      document.querySelector("esnet-map-canvas").querySelector("esnet-map-side-bar").should.be.an.instanceOf(HTMLElement);
    } );
    it( "should have an esnet-map-editing-interface child element", () => {
      document.querySelector("esnet-map-canvas").querySelector("esnet-map-editing-interface").should.be.an.instanceOf(HTMLElement);
    } );
    it( "should properly respect values for the radius of points in each layer", ()=>{
      var canvas = document.querySelector("esnet-map-canvas");
      var newOptions = canvas.options;
      newOptions['boundaryLayer'] = 'toner.boundaries';
      PubSub.publish("updateMapOptions", {options: newOptions, changed: ['boundaryLayer']}, canvas);
    })
    it( "should call back a defined function when an 'updateTopology' signal fires", ()=>{
      var mapCanvas = document.querySelector("esnet-map-canvas");
      var closureVar = null;
      mapCanvas.updateTopology = () => { closureVar = "called"; }
      PubSub.publish("updateTopology", null, mapCanvas);
      "called".should.equal(closureVar);
    });
    it("should have a node vertex around (259, 194) with reference to the esnet-map-canvas's offset", ()=>{
      var map_coords = document.querySelector("esnet-map-canvas").getBoundingClientRect();
      // find the first circle in a "g.node". This should be the "A" node from topology
      var nodes = document.querySelectorAll("g.node > g.scale-container > circle");
      var node_coords = nodes[0].getBoundingClientRect();

      // at 800x400 canvas size, we expect the offset (from the esnet-map-canvas top-left) of the first node to be 262, 194
      const expected_x = 259;
      const expected_y = 194;

      (expected_x).should.be.approximately(node_coords.x - map_coords.x, 5); // interactions with ResizeObserver make this coord approximate
      (expected_y).should.equal(node_coords.y - map_coords.y);

      // conversely, if we look for the element at the offset of 262, 194 (plus 4 for its radius), we should find our circle.
      var expected_circle = document.elementFromPoint(map_coords.x + expected_x + 4, map_coords.y + expected_y + 4);
      expected_circle.tagName.should.equal("circle");
      // we bother with all of this work because we'll need to simulate click/drag/etc events on the nodes in other test
    });
    it("should enter edit mode when we publish a signal", ()=>{
      var canvas = document.querySelector("esnet-map-canvas");
      PubSub.publish("updateEditMode", true, canvas);
      var toolOverlayButton = canvas.editingInterface.shadow.querySelector(".tools-overlay > .button.edit-mode-only");
      // using window.getComputedStyle, get the full computed style including cascading upstream styles
      var style = window.getComputedStyle(toolOverlayButton);
      style.display.should.equal("inline-block");
    });
    it("should show a tooltip in the sidebar when a user hovers over a node", ()=>{
      var canvas = document.querySelector("esnet-map-canvas");
      var node = document.querySelector("g.node > g.scale-container > circle");
      // create a bubbling mouseover event
      let mouseoverEvent = new Event('mouseover', { bubbles: true });
      // fire the mouseover event on our demonstration node
      node.dispatchEvent(mouseoverEvent);
      // get the sidebar tooltip text
      var sidebarText = canvas.querySelector("#sidebar-tooltip").innerText;
      // test that the sidebar tooltip text is as expected
      sidebarText.should.equal(EXPECTED_MOUSEOVER_TEXT);
    });
    it("should have an edit mode characterized by edit buttons", ()=>{
      var canvas = document.querySelector("esnet-map-canvas");
      PubSub.publish("updateEditMode", true, canvas);
      var toolOverlayButton = canvas.editingInterface.shadow.querySelector(".tools-overlay > .button.edit-mode-only");
      // using window.getComputedStyle, get the full computed style including cascading upstream styles
      var style = window.getComputedStyle(toolOverlayButton);
      style.display.should.equal("inline-block");
    });
    it("should allow users to change the map layer tileset", ()=>{
      var canvas = document.querySelector("esnet-map-canvas");
      var newOptions = canvas.options;
      newOptions.tileset['geographic'] = "usgs";
      PubSub.publish("updateMapOptions", {options: newOptions, changed: ['tileset.geographic']}, canvas);
      var i=0;
      var firstLayerUrl = null;
      canvas.leafletMap.eachLayer((layer)=>{
        if(i==0) firstLayerUrl = layer._url;
        i++;
      });
      const usgsUrl = 'https://basemap.nationalmap.gov/arcgis/rest/services/USGSImageryOnly/MapServer/tile/{z}/{y}/{x}';
      usgsUrl.should.equal(firstLayerUrl);
    });
    it("should allow users to change the political boundary layer tileset", ()=>{
      var canvas = document.querySelector("esnet-map-canvas");
      var newOptions = canvas.options;
      newOptions.tileset['boundaries'] = 'toner.boundaries';
      PubSub.publish("updateMapOptions", {options: newOptions, changed: ['tileset.boundaries']}, canvas);
      var i=0;
      var secondLayerUrl = null;
      canvas.leafletMap.eachLayer((layer)=>{
        if(i==1) secondLayerUrl = layer._url;
        i++;
      });
      const tonerBoundariesUrl = 'https://tiles.stadiamaps.com/tiles/stamen_toner_lines/{z}/{x}/{y}{r}.{ext}';
      secondLayerUrl.should.equal(tonerBoundariesUrl);
    });
    it("should allow users to change the political label layer tileset", ()=>{
      var canvas = document.querySelector("esnet-map-canvas");
      var newOptions = canvas.options;
      newOptions.tileset['labels'] = 'toner.labels';
      PubSub.publish("updateMapOptions", {options: newOptions, changed: ['tileset.labels']}, canvas);
      var i=0;
      var secondLayerUrl = null;
      canvas.leafletMap.eachLayer((layer)=>{
        if(i==1) secondLayerUrl = layer._url;
        i++;
      });
      const tonerLabelsUrl = 'https://tiles.stadiamaps.com/tiles/stamen_toner_labels/{z}/{x}/{y}{r}.{ext}';
      secondLayerUrl.should.equal(tonerLabelsUrl);
    });
    it("should allow users to 'home' the map by clicking a button", ()=>{
      var canvas = document.querySelector("esnet-map-canvas");
      var node = document.querySelector("g.node > g.scale-container > circle");
      var originalPosition = node.getBoundingClientRect();
      var mouseOrigin = { x: originalPosition.x - 10, y: originalPosition.y - 10 };

      // simulate the outcome of a drag event, changing the center and zoom
      canvas.leafletMap.setView([75, -101.426], 3);

      // verify that the point for the A node has moved N pixels
      var afterDragPosition = node.getBoundingClientRect();
      afterDragPosition.x.should.not.equal(originalPosition.x);
      afterDragPosition.y.should.not.equal(originalPosition.y);
      // click the home button
      var clickEvent = new Event('click', { bubbles: true })
      var home_button = canvas.shadow.querySelector("#home_map")
      home_button.dispatchEvent(clickEvent);
      // verify that the point for the A node is back at original position (262, 194) w/r/t esnet-map-canvas (0,0)
      node = document.querySelector("g.node > g.scale-container > circle");
      var afterHomeClickPosition = node.getBoundingClientRect();
      afterHomeClickPosition.x.should.be.approximately(originalPosition.x, 5); // interactions with ResizeObserver make this coord approximate
      afterHomeClickPosition.y.should.equal(originalPosition.y);
    });
    it("should allow users to toggle layers", ()=>{
      var canvas = document.querySelector("esnet-map-canvas");
      var node = document.querySelector("g.node > g.scale-container > circle");
      var nodeStyle = window.getComputedStyle(node);
      // verify that the point for the A node is visible
      nodeStyle.display.should.equal("inline");
      // click the toggle containing the A node
      var newOptions = canvas.options;
      newOptions.layers[0]['visible'] = false;
      PubSub.publish("updateMapOptions", {options: newOptions, changed: ['layers[0].visible']}, canvas);
      // verify that the point for the A node is not visible / not in DOM
      node = document.querySelector("g.node > circle");
      (String(node)).should.equal("null");
    });
    it("should have an edge edit mode characterized by control points on edges", ()=>{
      // enter editing mode
      var canvas = document.querySelector("esnet-map-canvas");
      PubSub.publish("updateEditMode", true, canvas);
      // run a query selector for control points
      var controlPoints = document.querySelectorAll("circle.control");
      // expect a specific count of control points
      controlPoints.length.should.equal(9)
    });
    it("should show a UI for adding a node", ()=>{
      // enter editing mode
      var canvas = document.querySelector("esnet-map-canvas");
      PubSub.publish("updateEditMode", true, canvas);
      // create a click event
      var clickEvent = new MouseEvent('click', { bubbles: false })
      // fire click event on add node button
      var addNodeButton = canvas.editingInterface.shadow.querySelector(".tools-overlay > #add_node");
      addNodeButton.dispatchEvent(clickEvent)
      // run a query selector for UI elements
      var addNodeDialog = canvas.editingInterface.shadow.querySelector("#add_node_dialog");
      window.getComputedStyle(addNodeDialog).display.should.equal("block");
    });
    /*it("should allow users to change the display text for a node", async function(){
      // enter editing mode
      var canvas = document.querySelector("esnet-map-canvas");
      canvas.editingInterface.editMode = true;
      // throw the signal for node edit mode
      PubSub.publish("toggleNodeEdit", null, canvas);
      // create a click event
      var clickEvent = new Event('dblclick', { bubbles: true })
      // fire double click event on node
      var node = document.querySelector("circle.control");

      node.dispatchEvent(clickEvent);
      // change display text
      var addNodeDialog = canvas.editingInterface.shadow.querySelector("#add_node_dialog");
      window.getComputedStyle(addNodeDialog).display.should.equal("block");
      // set display name value
      var display_name = canvas.editingInterface.shadow.querySelector("#node_display_name");
      display_name.setAttribute("value", "An Unexpected Value");
      // click 'Update Node' button
      clickEvent = new Event('click', { bubbles: true });
      var button = canvas.editingInterface.shadow.querySelector("#create_node");
      button.dispatchEvent(clickEvent);
      var addNodeDialog = canvas.editingInterface.shadow.querySelector("#add_node_dialog");
      window.getComputedStyle(addNodeDialog).display.should.not.equal("block");
      // fire mouseover event for edge
      canvas.topology.layer1.nodes[0].meta.display_name.should.equal("An Unexpected Value");
    });
    it("should allow users to change the display icon (as SVG) for a node", ()=>{
      // enter editing mode
      var canvas = document.querySelector("esnet-map-canvas");
      canvas.editingInterface.editMode = true;
      // throw the signal for node edit mode
      PubSub.publish("toggleNodeEdit", null, canvas);
      // create a click event
      var clickEvent = new Event('dblclick', { bubbles: true })
      // fire double click event on node
      var node = document.querySelector("circle.control");
      node.dispatchEvent(clickEvent);
      // change display text
      var addNodeDialog = canvas.editingInterface.shadow.querySelector("#add_node_dialog");
      window.getComputedStyle(addNodeDialog).display.should.equal("block");
      // set display name value
      var svg = canvas.editingInterface.shadow.querySelector("#node_svg");
      svg.value = "<rect />";
      // click 'Update Node' button
      clickEvent = new Event('click', { bubbles: true });
      var button = canvas.editingInterface.shadow.querySelector("#create_node");
      button.dispatchEvent(clickEvent);
      var addNodeDialog = canvas.editingInterface.shadow.querySelector("#add_node_dialog");
      window.getComputedStyle(addNodeDialog).display.should.not.equal("block");
      // fire mouseover event for edge
      canvas.topology.layer1.nodes[0].meta.svg.should.equal("<rect />");
    });*/
    it("should show a UI for adding an edge", ()=>{
      // enter editing mode
      var canvas = document.querySelector("esnet-map-canvas");
      PubSub.publish("updateEditMode", true, canvas);
      // create a click event
      var clickEvent = new Event('click', { bubbles: false })
      // fire click event on add edge button
      var addNodeButton = canvas.editingInterface.shadow.querySelector(".tools-overlay > #add_edge");
      addNodeButton.dispatchEvent(clickEvent)
      // run a query selector for UI elements
      var addNodeDialog = canvas.editingInterface.shadow.querySelector("#add_edge_dialog");
      window.getComputedStyle(addNodeDialog).display.should.equal("block");
    });
    it("should allow users to add an edge control point on double-click", ()=>{
      // enter editing mode
      var canvas = document.querySelector("esnet-map-canvas");
      var closureVar = false;
      // test that we publish updateMapEdge
      PubSub.subscribe("updateMapEdge", (e)=>{ closureVar= true; }, canvas)
      PubSub.publish("updateEditMode", true, canvas);
      // create a (double) click event
      var dblClickEvent = new MouseEvent('dblclick', { bubbles: true, clientX: 200, clientY: 200 })
      // fire double click event on edge
      var controlPointsBefore = document.querySelectorAll("circle.control").length
      var path = document.querySelector("path.control");
      path.dispatchEvent(dblClickEvent);
      var controlPointsAfter = document.querySelectorAll("circle.control").length
      controlPointsBefore.should.not.equal(controlPointsAfter);
      // check that we now have more control points on the edge
      controlPointsAfter.should.be.greaterThan(controlPointsBefore);
      closureVar.should.equal(true);
    });
    it("should allow users to remove layer toggles", ()=>{
      var canvas = document.querySelector("esnet-map-canvas");
      // set option boolean
      var newOptions = canvas.options;
      newOptions.layers[0]['legend'] = false;
      newOptions.layers[1]['legend'] = false;
      newOptions.layers[2]['legend'] = false;
      // update options
      PubSub.publish("updateMapOptions", {
          options: newOptions,
          changed: ['layers[0].legend', 'layers[1].legend', 'layers[2].legend']
        },
        canvas);
      // check that no toggle visible for layer toggle we turned off
      var toggleContainers = canvas.querySelectorAll(".toggle.container");
      for(var i=0; i<toggleContainers.length; i++){
        toggleContainers[i].style.display.should.equal("none");
      }
    });
    it("should allow users to double click to remove edge control points", ()=>{
      // get canvas
      var canvas = document.querySelector("esnet-map-canvas");
      var closureVar = false;
      // test that we publish updateMapEdge
      PubSub.subscribe("updateMapEdge", (e)=>{ closureVar= true; }, canvas)
      // turn on editing mode
      PubSub.publish("updateEditMode", true, canvas);
      // double click control point to remove
      var beforeAllCps = canvas.querySelectorAll(".control.controlPoint")
      var cp = canvas.querySelector(".control.controlPoint")
      var clickEvent = new Event('dblclick', { bubbles: true })
      cp.dispatchEvent(clickEvent);
      // edge should have 2 control points
      var canvas = document.querySelector("esnet-map-canvas");
      PubSub.publish("updateEditMode", true, canvas);
      var afterAllCps = canvas.querySelectorAll(".control.controlPoint")
      afterAllCps.length.should.be.lessThan(beforeAllCps.length)
      closureVar.should.equal(true);
    })
    it("should evenly space edge control points after node drag", ()=>{
      // enter editing mode
      var canvas = document.querySelector("esnet-map-canvas");
      PubSub.publish("updateEditMode", true, canvas);
      // edge edit mode. Do some work adding vertices to the edge.
      var edgeAC = document.querySelector(".control-for-A.control-for-C")
      var edgeACPos = edgeAC.getBoundingClientRect();
      var clickEvents = [
        new MouseEvent('dblclick', { bubbles: true, clientX: edgeACPos.x, clientY: edgeACPos.y, view: window }),
        new MouseEvent('dblclick', { bubbles: true, clientX: edgeACPos.x, clientY: edgeACPos.y, view: window })
      ]
      // add vertices and check our work
      var beforeAllCps = canvas.querySelectorAll(".control-point-for-edge-A--C")
      for(var i=0; i<clickEvents.length; i++){
          edgeAC = document.querySelector(".control-for-A.control-for-C");
          edgeAC.dispatchEvent(clickEvents[i]);
      }
      var afterAllCps = canvas.querySelectorAll(".control-point-for-edge-A--C")
      afterAllCps.length.should.be.greaterThan(beforeAllCps.length)
      var positionsBeforeDrag = [];
      for(var i=0; i<afterAllCps.length; i++){
        var rect = afterAllCps[i].getBoundingClientRect();
        positionsBeforeDrag.push([rect.x, rect.y]);
      }

      // throw the signal for node edit mode
      PubSub.publish("setEditMode", { "mode": "node", "value": true }, canvas);
      var nodes = document.querySelectorAll("circle.control");
      var nodeA = nodes[0];
      var nodeC = nodes[2];


      var originalNodeAPos = nodeA.getBoundingClientRect();
      // compensate for radius
      originalNodeAPos = {x: originalNodeAPos.x + 4, y: originalNodeAPos.y + 4};
      // create mouse event for down
      var downEvent = new MouseEvent('mousedown', { bubbles: true, clientX: originalNodeAPos.x, clientY: originalNodeAPos.y, view: window })
      // create mouse event for drag
      var dragEvent = new MouseEvent('mousemove', { bubbles: true, clientX: originalNodeAPos.x + 10, clientY: originalNodeAPos.y + 10, view: window })
      // create mouse event for up
      var upEvent = new MouseEvent('mouseup', { bubbles: true, clientX: originalNodeAPos.x + 10, clientY: originalNodeAPos.y + 10, view: window })
      // fire down
      nodeA.dispatchEvent(downEvent);
      // fire drag
      nodeA.dispatchEvent(dragEvent);
      // fire up
      nodeA.dispatchEvent(upEvent);
      // check node moved
      var newPos = nodeA.getBoundingClientRect()
      newPos = {x: newPos.x + 4, y: newPos.y + 4};
      (newPos.x).should.be.approximately(originalNodeAPos.x + 10, 4);
      (newPos.y).should.be.approximately(originalNodeAPos.y + 10, 4);


      PubSub.publish("setEditMode", { "mode": "edge", "value": true }, canvas);
      var afterAllCps = canvas.querySelectorAll(".control-point-for-edge-A--C")
      afterAllCps.length.should.be.greaterThan(beforeAllCps.length)
      var positionsAfterDrag = [];
      for(var i=0; i<afterAllCps.length; i++){
        var rect = afterAllCps[i].getBoundingClientRect();
        positionsAfterDrag.push([rect.x, rect.y]);
      }
      var positionCount = positionsBeforeDrag.length - 1;
      // check that none of the node positions are the same
      for(var i=0; i<positionCount; i++){
        positionsAfterDrag[i][0].should.not.equal(positionsBeforeDrag[i][0]);
        positionsAfterDrag[i][1].should.not.equal(positionsBeforeDrag[i][1]);
      }
      // except the last one in the array, the node that didn't move.
      positionsAfterDrag[positionCount][0].should.equal(positionsBeforeDrag[positionCount][0]);
      positionsAfterDrag[positionCount][1].should.equal(positionsBeforeDrag[positionCount][1]);
      for(var i=1; i<positionCount; i++){
        var deltaX = positionsAfterDrag[i][0] - positionsAfterDrag[i-1][0];
        deltaX.should.equal(15);
        var deltaY = positionsAfterDrag[i][1] - positionsAfterDrag[i-1][1];
        deltaY.should.equal(-8);
      }
      // calculate x deltas for each position. they should all be 15.
      // calculate y deltas for each position. they should all be xx.
    });
    it("should show the same tooltip on nodes and node control points", ()=>{
      // get canvas
      var canvas = document.querySelector("esnet-map-canvas");
      // turn on editing mode
      PubSub.publish("updateEditMode", true, canvas);
      // toggle node editing mode
      // create hover event
      // fire hover event on a control point
      // get the tooltip text
      // turn off editing mode
      // fire hover event on a node
      // get the tooltip text
      // tooltip text before and after should be equal
    })
    it("should allow users to set the background color", ()=>{
      // get canvas
      var canvas = document.querySelector("esnet-map-canvas");
      // set options to turn off background
      // set option for background color
      // check that background color is as expected
    })
    it("should allow users to toggle layer visibility", ()=>{
      var canvas = document.querySelector("esnet-map-canvas");
      // find a layer toggle
      // create click event
      // fire click event on layer toggle
      // layer should be invisible

    })
    it("should allow users to style edges in all layers, even when some are not visible", ()=>{
      // enter editing mode
      var canvas = document.querySelector("esnet-map-canvas");
      var newTopology = canvas.topology;
      newTopology[1] = newTopology[0];
      newTopology[2] = newTopology[0];
      var newOptions = canvas.options;
      newOptions.layers[2]['edgeWidth'] = 5;
      newOptions.layers[0]['visible'] = false;
      newOptions.layers[1]['visible'] = false;
      newOptions.layers[2]['visible'] = true;
      PubSub.publish("updateMapOptions", {
        options: newOptions,
        changed: ['layers[0].visible', 'layers[1].visible', 'layers[2].visible', 'layers[2].edgeWidth']
      }, canvas);
      var randomEdge = canvas.querySelector('.edge.edge-az');
      randomEdge.getAttribute("stroke-width").should.equal("5");
    })
    it("should have a node edit mode characterized by control points on nodes", ()=>{
      // enter editing mode
      var canvas = document.querySelector("esnet-map-canvas");
      PubSub.publish("updateEditMode", true, canvas);
      // throw the signal for node edit mode
      PubSub.publish("setEditMode", { "mode": "node", "value": true }, canvas);
      // run a query selector for control points
      var controlPoints = document.querySelectorAll("circle.control");
      // expect a specific count of control points
      controlPoints.length.should.equal(3)
    });
    it("should allow users to drag node edit control points", ()=>{
      // enter editing mode
      var canvas = document.querySelector("esnet-map-canvas");
      PubSub.publish("updateEditMode", true, canvas);
      // throw the signal for node edit mode
      PubSub.publish("setEditMode", { "mode": "node", "value": true }, canvas);
      var node = document.querySelector("circle.control");
      var originalPos = node.getBoundingClientRect();
      // compensate for radius
      originalPos = {x: originalPos.x + 4, y: originalPos.y + 4};
      // create mouse event for down
      var downEvent = new MouseEvent('mousedown', { bubbles: true, clientX: originalPos.x, clientY: originalPos.y, view: window })
      // create mouse event for drag
      var dragEvent = new MouseEvent('mousemove', { bubbles: true, clientX: originalPos.x + 10, clientY: originalPos.y + 10, view: window })
      // create mouse event for up
      var upEvent = new MouseEvent('mouseup', { bubbles: true, clientX: originalPos.x + 10, clientY: originalPos.y + 10, view: window })
      // fire down
      node.dispatchEvent(downEvent);
      // fire drag
      node.dispatchEvent(dragEvent);
      // fire up
      node.dispatchEvent(upEvent);
      // check node moved
      var newPos = node.getBoundingClientRect()
      newPos = {x: newPos.x + 4, y: newPos.y + 4};
      (newPos.x).should.be.approximately(originalPos.x + 10, 4);
      (newPos.y).should.be.approximately(originalPos.y + 10, 4);
    });
    it("should persist a topology change when a user drags an editable node control point", ()=>{
      var canvas = document.querySelector("esnet-map-canvas");

      var closureVar = null;
      var closureVar2 = false;
      var closureVar3 = false;
      canvas.updateTopology = () => { closureVar = "called"; }

      PubSub.subscribe("updateMapNode", (e)=>{ 
        closureVar3 = true;
      }, canvas);
      PubSub.subscribe("updateMapEdge", (e)=>{ 
        closureVar2 = true;
      }, canvas);

      // enter editing mode
      PubSub.publish("updateEditMode", true, canvas);
      // throw the signal for node edit mode
      PubSub.publish("setEditMode", { "mode": "node", "value": true }, canvas);
      var node = document.querySelector("circle.control");
      var originalPos = node.getBoundingClientRect();
      // compensate for radius
      originalPos = {x: originalPos.x + 4, y: originalPos.y + 4};
      // create mouse event for down
      var downEvent = new MouseEvent('mousedown', { bubbles: true, clientX: originalPos.x, clientY: originalPos.y, view: window })
      // create mouse event for drag
      var dragEvent = new MouseEvent('mousemove', { bubbles: true, clientX: originalPos.x + 10, clientY: originalPos.y + 10, view: window })
      // create mouse event for up
      var upEvent = new MouseEvent('mouseup', { bubbles: true, clientX: originalPos.x + 10, clientY: originalPos.y + 10, view: window })
      // fire down
      node.dispatchEvent(downEvent);
      // fire drag
      node.dispatchEvent(dragEvent);
      // fire up
      node.dispatchEvent(upEvent);
      // check node moved
      var newPos = node.getBoundingClientRect()
      newPos = {x: newPos.x + 4, y: newPos.y + 4};
      (newPos.x).should.be.approximately(originalPos.x + 10, 4);
      (newPos.y).should.be.approximately(originalPos.y + 10, 4);
      // check callback fired
      closureVar.should.equal("called");
      closureVar2.should.equal(true)
      closureVar3.should.equal(true)
    });
    it("should allow users to drag edge edit control points", ()=>{
      // enter editing mode
      var canvas = document.querySelector("esnet-map-canvas");
      // test that we publish updateMapEdge
      PubSub.publish("updateEditMode", true, canvas);
      var cPoint = canvas.querySelector("circle.control");

      var originalPos = cPoint.getBoundingClientRect();
      // compensate for radius
      originalPos = {x: originalPos.x + 4, y: originalPos.y + 4};
      // create mouse event for down
      var downEvent = new MouseEvent('mousedown', { bubbles: true, clientX: originalPos.x, clientY: originalPos.y, view: window })
      // create mouse event for drag
      var dragEvent = new MouseEvent('mousemove', { bubbles: true, clientX: originalPos.x + 30, clientY: originalPos.y + 30, view: window })
      // create mouse event for up
      var upEvent = new MouseEvent('mouseup', { bubbles: true, clientX: originalPos.x + 30, clientY: originalPos.y + 30, view: window })
      // fire down
      cPoint.dispatchEvent(downEvent);
      // fire drag
      cPoint.dispatchEvent(dragEvent);
      // fire up
      cPoint.dispatchEvent(upEvent);
      // check edge control point moved
      var cPoint = canvas.querySelector("circle.control");
      var newPos = cPoint.getBoundingClientRect()
      newPos = {x: newPos.x + 4, y: newPos.y + 4};
      (newPos.x).should.approximately(originalPos.x + 30, 4);
      (newPos.y).should.approximately(originalPos.y + 30, 4);
    });
    it("should persist a topology change when a user drags an editable edge control point", ()=>{
      var canvas = document.querySelector("esnet-map-canvas");
    
      var closureVar = null;
      canvas.updateTopology = () => { closureVar = "called"; }

      // enter editing mode
      PubSub.publish("updateEditMode", true, canvas);
      var cPoint = document.querySelector("circle.control");
      var originalPos = cPoint.getBoundingClientRect();
      // compensate for radius
      originalPos = {x: originalPos.x + 4, y: originalPos.y + 4};
      // create mouse event for down
      var downEvent = new MouseEvent('mousedown', { bubbles: true, clientX: originalPos.x, clientY: originalPos.y, view: window })
      // create mouse event for drag
      var dragEvent = new MouseEvent('mousemove', { bubbles: true, clientX: originalPos.x + 10, clientY: originalPos.y + 10, view: window })
      // create mouse event for up
      var upEvent = new MouseEvent('mouseup', { bubbles: true, clientX: originalPos.x + 10, clientY: originalPos.y + 10, view: window })
      // fire down
      cPoint.dispatchEvent(downEvent);
      // fire drag
      cPoint.dispatchEvent(dragEvent);
      // the drag event destroys and repaints the circle control...
      // this seems like a bug...
      cPoint = canvas.querySelector("circle.control");
      // fire up
      cPoint.dispatchEvent(upEvent);
      // check edge control point moved
      var newPos = cPoint.getBoundingClientRect()
      newPos = {x: newPos.x + 4, y: newPos.y + 4};
      (newPos.x).should.approximately(originalPos.x + 10, 4);
      (newPos.y).should.approximately(originalPos.y + 10, 4);
      // check callback fired
      closureVar.should.equal("called");
    });
    it("should allow for editing of same-name nodes in different layers", ()=>{
      var canvas = document.querySelector("esnet-map-canvas");
      // create test map topology
      var newTopology = [
        {
            "edges": [
                {"name":"A--B","meta":{"endpoint_identifiers":{"pops":["A","B"]}},
                    "coordinates":[[39.02,-105.99],[35.81,-101.77],[34.59,-96.06]],
                    "children":[],
                    "azColor":lavender,
                    "zaColor":lavender,
                }
            ],
            "nodes": [
                {
                  "name":"A",
                  "meta":{},
                  "coordinate":[39.02,-105.99],
                  "color":lavender,
                },
                {
                  "name":"B",
                  "meta":{},
                  "coordinate":[34.59,-96.06],
                  "color":lavender,
                }
            ]
        },
        {
            "edges": [
                {"name":"A--B","meta":{"endpoint_identifiers":{"pops":["A","B"]}},
                    "coordinates":[[49.02,-115.99],[45.81,-111.77],[44.59,-106.06]],
                    "children":[],
                    "azColor":lavender,
                    "zaColor":lavender,
                }
            ],
            "nodes": [
                {
                  "name":"A",
                  "meta":{},
                  "coordinate":[49.02,-115.99],
                  "color":lavender,
                },
                {
                  "name":"B",
                  "meta":{},
                  "coordinate":[44.59,-106.06],
                  "color":lavender,
                }
            ]

        },
      ]
      PubSub.publish("updateMapTopology", newTopology, canvas);
      var newOptions = canvas.options;
      newOptions.layers[1].visible = true;
      PubSub.publish("updateMapOptions", {options: newOptions, changed: [
        'layers[1].visible',
      ]}, canvas);
      // enter editing mode
      PubSub.publish("updateEditMode", true, canvas);
      // enter Node editing mode
      PubSub.publish("setEditMode", { "mode": "node", "value": true }, canvas);
      // select edges that attach to node with this name, record positions
      // toggle layers such that we have two layers with same-named nodes
      // select the control point we want to work on
      var cPoint = canvas.querySelector("circle.control.control-point-layer0");
      var edgeABlayer1 = canvas.querySelector(".edge-az.l0.cnxn-A");
      var beforeCoords1 = edgeABlayer1.getBoundingClientRect();
      var edgeABlayer2 = canvas.querySelector(".edge-az.l1.cnxn-A");
      var beforeCoords2 = edgeABlayer2.getBoundingClientRect();
      var originalPos = cPoint.getBoundingClientRect();
      // create mouse event for down
      var downEvent = new MouseEvent('mousedown', { bubbles: true, clientX: originalPos.x, clientY: originalPos.y, view: window })
      // create mouse event for drag
      var dragEvent = new MouseEvent('mousemove', { bubbles: true, clientX: originalPos.x + 10, clientY: originalPos.y + 10, view: window })
      // create mouse event for up
      var upEvent = new MouseEvent('mouseup', { bubbles: true, clientX: originalPos.x + 10, clientY: originalPos.y + 10, view: window })
      // fire down
      cPoint.dispatchEvent(downEvent);
      // fire drag
      cPoint.dispatchEvent(dragEvent);
      // fire up
      cPoint = canvas.querySelector("circle.control");
      cPoint.dispatchEvent(upEvent);
      // select attached edges after, record positions
      var edgeABlayer1 = canvas.querySelector(".edge-az.l0.cnxn-A");
      var afterCoords1 = edgeABlayer1.getBoundingClientRect();
      var edgeABlayer2 = canvas.querySelector(".edge-az.l1.cnxn-A");
      var afterCoords2 = edgeABlayer2.getBoundingClientRect();
      // positions for attached edges should have changed
      beforeCoords1.x.should.not.equal(afterCoords1.x);
      beforeCoords1.y.should.not.equal(afterCoords1.y);
      // positions for "other layer" non-attached edges should be the same
      beforeCoords2.x.should.equal(afterCoords2.x);
      beforeCoords2.y.should.equal(afterCoords2.y);
      // click layer 1 copy of "A"
      var nodeAlayer1 = canvas.querySelector("circle.control.control-point-layer0");
      var downEvent = new MouseEvent('mousedown', { bubbles: true, view: window })
      var upEvent = new MouseEvent('mousedown', { bubbles: true, view: window })
      nodeAlayer1.dispatchEvent(downEvent);
      nodeAlayer1.dispatchEvent(upEvent);
      // layer 1 "A" node should be selected
      var classValue = nodeAlayer1.getAttribute("class");
      classValue.should.contain("control-selected");
      // click layer 2 copy of "A"
      var nodeAlayer2 = canvas.querySelector("circle.control.control-point-layer1");
      var downEvent = new MouseEvent('mousedown', { bubbles: true, view: window })
      var upEvent = new MouseEvent('mousedown', { bubbles: true, view: window })
      nodeAlayer2.dispatchEvent(downEvent);
      nodeAlayer2.dispatchEvent(upEvent);
      // layer 1 "A" node should be selected
      var classValue = nodeAlayer2.getAttribute("class");
      classValue.should.contain("control-selected");
      // enter Edge editing mode
      PubSub.publish("setEditMode", { "mode": "edge", "value": true }, canvas);
      // click layer 1, edge A--B, ensure that it's selected
      var edgeABlayer1 = canvas.querySelector(".controlEdge.l0.edge-az-A--B");
      var downEvent = new MouseEvent('mousedown', { bubbles: true, view: window })
      var upEvent = new MouseEvent('mouseup', { bubbles: true, view: window })
      edgeABlayer1.dispatchEvent(downEvent);
      edgeABlayer1.dispatchEvent(upEvent);
      edgeABlayer1.getAttribute("class").should.contain("control-selected");
      PubSub.publish("setEditMode", { "mode": "edge", "value": true }, canvas);
      // click layer 2, edge A--B, ensure that it's selected
      var edgeABlayer2 = canvas.querySelector(".controlEdge.l1.edge-az-A--B");
      var downEvent = new MouseEvent('mousedown', { bubbles: true, view: window })
      var upEvent = new MouseEvent('mouseup', { bubbles: true, view: window })
      edgeABlayer2.dispatchEvent(downEvent);
      edgeABlayer2.dispatchEvent(upEvent);
      edgeABlayer2.getAttribute("class").should.contain("control-selected");
      edgeABlayer1.getAttribute("class").should.not.contain("control-selected");
      // turn off editing mode
      PubSub.publish("updateEditMode", false, canvas);
      var closureVar = null;
      PubSub.subscribe("setSelection", function(){ closureVar = "called" }, canvas);
      var edgeABlayer1 = canvas.querySelector(".edge.l0.edge-az.edge-az-A--B");
      var mouseDown = new MouseEvent('mousedown', { bubbles: true, view: window });
      var mouseUp = new MouseEvent('mouseup', { bubbles: true, view: window })
      edgeABlayer1.dispatchEvent(mouseDown);
      edgeABlayer1.dispatchEvent(mouseUp);
      closureVar.should.equal("called");
      // ensure we see chevrons
      canvas.querySelectorAll("polygon").length.should.be.greaterThan(0);
      // ensure selection class on our edge
      edgeABlayer1.getAttribute("class").should.contain("animated-edge");
      // click edge on other layer
      var closureVar = null;
      PubSub.subscribe("setSelection", function(){ closureVar = "called" }, canvas);
      var edgeABlayer2 = canvas.querySelector(".edge.l1.edge-az.edge-az-A--B");
      var mouseDown = new MouseEvent('mousedown', { bubbles: true, view: window });
      var mouseUp = new MouseEvent('mouseup', { bubbles: true, view: window })
      edgeABlayer2.dispatchEvent(mouseDown);
      edgeABlayer2.dispatchEvent(mouseUp);
      closureVar.should.equal("called");
      // ensure we see chevrons
      canvas.querySelectorAll("polygon").length.should.be.greaterThan(0);
      // ensure selection class on our edge
      edgeABlayer2.getAttribute("class").should.contain("animated-edge");
      edgeABlayer1.getAttribute("class").should.not.contain("animated-edge");

      var closureVar = null;
      PubSub.subscribe("setSelection", function(){ closureVar = "called" }, canvas);
      var nodeAlayer1 = canvas.querySelector(".node.l0.node-A circle");
      var nodeAlayer2 = canvas.querySelector(".node.l1.node-A circle");
      var mouseDown = new MouseEvent('mousedown', { bubbles: true, view: window });
      var mouseUp = new MouseEvent('mouseup', { bubbles: true, view: window })
      nodeAlayer1.dispatchEvent(mouseDown);
      nodeAlayer1.dispatchEvent(mouseUp);
      "called".should.equal(closureVar);
      // ensure selection class on our edge
      var nodeAlayer1 = canvas.querySelector(".node.l0.node-A .scale-container");
      var nodeAlayer2 = canvas.querySelector(".node.l1.node-A .scale-container");
      nodeAlayer1.getAttribute("class").should.contain("animated-node");
      nodeAlayer2.getAttribute("class").should.not.contain("animated-node");

      var closureVar = null;
      PubSub.subscribe("setSelection", function(){ closureVar = "called" }, canvas);
      var nodeAlayer1 = canvas.querySelector(".node.l0.node-A circle");
      var nodeAlayer2 = canvas.querySelector(".node.l1.node-A circle");
      var mouseDown = new MouseEvent('mousedown', { bubbles: true, view: window });
      var mouseUp = new MouseEvent('mouseup', { bubbles: true, view: window })
      nodeAlayer2.dispatchEvent(mouseDown);
      nodeAlayer2.dispatchEvent(mouseUp);
      "called".should.equal(closureVar);
      // ensure selection class on our edge
      var nodeAlayer1 = canvas.querySelector(".node.l0.node-A .scale-container");
      var nodeAlayer2 = canvas.querySelector(".node.l1.node-A .scale-container");
      nodeAlayer2.getAttribute("class").should.contain("animated-node");
      nodeAlayer1.getAttribute("class").should.not.contain("animated-node");

    })
    it("should allow for edge templates from the topology, as well as specific overrides for field labels", () => {
      var canvas = document.querySelector("esnet-map-canvas");
      // create mouseover for edge with template
      var newTopology = [
        {
            "edges": [
                {
                    "name":"Z--L",
                    "meta":{
                      "endpoint_identifiers":{
                        "pops":["Z","L"]
                      },
                      "template": "${labels.src} ABCDEF ${labels.dst} GHIJKL"
                    },
                    "coordinates":[[39.02,-105.99],[35.81,-101.77],[34.59,-96.06]],
                    "children":[],
                    "azColor":lavender,
                    "zaColor":lavender,
                },
                {
                    "name":"A--Z",
                    "meta":{
                      "endpoint_identifiers":{
                        "pops":["A","Z"]
                      }
                    },
                    "coordinates":[[30.02,-105.99],[34.52,-105.99],[39.02,-105.99]],
                    "children":[],
                    "azColor":lavender,
                    "zaColor":lavender,
                }
            ],
            "nodes": [
                {
                  "name":"A",
                  "meta":{},
                  "coordinate":[30.02,-105.99],
                  "color":lavender,                  
                },
                {
                  "name":"Z",
                  "meta":{},
                  "coordinate":[39.02,-105.99],
                  "color":lavender,
                },
                {
                  "name":"L",
                  "meta":{},
                  "coordinate":[34.59,-96.06],
                  "color":lavender,
                }
            ]
        },
      ]
      PubSub.publish("updateMapTopology", newTopology, canvas);
      var edgeLZ = canvas.querySelector(".cnxn-Z.cnxn-L")
      var edgeAZ = canvas.querySelector(".cnxn-Z.cnxn-A")

      var closureVar = "";
      var closureDiv = document.createElement('div');
      PubSub.subscribe("showTooltip", (value) => {
        const normalizedVal = value.text
          .replaceAll(/\s+/g, " ")
          .replaceAll("><", "> <");
        closureDiv.innerHTML = normalizedVal;
        closureVar = normalizedVal;
      }, canvas);
      // fire mouseover
      let mouseoverEvent = new Event('mouseover', { bubbles: true });
      edgeLZ.dispatchEvent(mouseoverEvent);
      // check tooltip text
      "From: ABCDEF To: GHIJKL".should.equal(closureVar);

      edgeAZ.dispatchEvent(mouseoverEvent);
      const testFlowSVGPlusMarkupString = `
        <div class="flow-direction-tooltip bold">
          <span>A</span>
          <span>
            <svg xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="lucide lucide-arrow-right"
            >
              <path d="M5 12h14"/>
              <path d="m12 5 7 7-7 7"/>
            </svg>
          </span>
          <span>Z</span>
        </div>
        <div class="flow-amount-element bold">
          <span>
            <svg xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="lucide lucide-gauge"
            >
              <path d="m12 14 4-4"/>
              <path d="M3.34 19a10 10 0 1 1 17.32 0"/>
            </svg>
          </span>
          <span>no data</span>
        </div>
        <div class="flow-direction-tooltip false">
          <span>A</span>
          <span>
            <svg xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="lucide lucide-arrow-left"
            >
              <path d="m12 19-7-7 7-7"/>
              <path d="M19 12H5"/>
            </svg>
          </span>
          <span>Z</span>
        </div>
        <div class="flow-amount-element false">
          <span>
            <svg xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="lucide lucide-gauge"
              >
                  <path d="m12 14 4-4"/>
                  <path d="M3.34 19a10 10 0 1 1 17.32 0"/>
              </svg>
            </span>
          <span>no data</span>
        </div>
      `.trim();
      let expectedString = testFlowSVGPlusMarkupString;
      let testDiv = document.createElement('div');
      testDiv.innerHTML = expectedString
        .replaceAll(/\s+/g, " ")
        .replaceAll("><", "> <");
      // check tooltip text for edge with no template
      console.log("test 2/4: tooltip text for edge with no template")
      testDiv.innerHTML.should.equal(closureDiv.innerHTML);
      // set options for field labels
      var newOptions = canvas.options;
      newOptions.layers[0]['srcFieldLabel'] = 'Source:';
      newOptions.layers[0]['dstFieldLabel'] = 'Dest:';
      newOptions.layers[0]['dataFieldLabel'] = 'Data:';
      PubSub.publish("updateMapOptions", {options: newOptions, changed: [
        'layers[0].srcFieldLabel',
        'layers[0].dstFieldLabel',
        'layers[0].dataFieldLabel',
      ]}, canvas);
      // fire mouseover for edge with no template
      edgeLZ.dispatchEvent(mouseoverEvent);
      // check tooltip text
      "Source: ABCDEF Dest: GHIJKL".should.equal(closureVar);
      // create mouseover for edge with a template
      // fire mouseover
      edgeAZ.dispatchEvent(mouseoverEvent);
      // check tooltip text
      expectedString = testFlowSVGPlusMarkupString;
      testDiv.innerHTML = expectedString
        .replaceAll(/\s+/g, " ")
        .replaceAll("><", "> <");
      // check tooltip text for edge with no template
      console.log("test 4/4: tooltip text for edge w/o template");
      testDiv.innerHTML.should.equal(closureDiv.innerHTML);
    })
    it("should santize names with non-alphanum characters", ()=>{
      var canvas = document.querySelector("esnet-map-canvas");
      var newTopology = [
        {
            "edges": [
                {
                    "name":"Node A, Inc.--Node B - Inc.",
                    "meta":{
                      "endpoint_identifiers":{
                        "pops":["Node A, Inc.","Node B - Inc."]
                      }
                    },
                    "coordinates":[[39.02,-105.99],[35.81,-101.77],[34.59,-96.06]],
                    "children":[],
                    "azColor":lavender,
                    "zaColor":lavender,
                }
            ],
            "nodes": [
                {
                  "name":"Node A, Inc.",
                  "meta":{},
                  "coordinate":[39.02,-105.99],
                  "color":lavender,
                },
                {
                  "name":"Node B - Inc.",
                  "meta":{},
                  "coordinate":[34.59,-96.06],
                  "color":lavender,
                }
            ]
        },
      ]
      // set topology with weird names for both edges and nodes
      PubSub.publish("updateMapTopology", newTopology, canvas);
      // enter editing mode
      PubSub.publish("updateEditMode", true, canvas);
      // enter Node editing mode
      PubSub.publish("setEditMode", { "mode": "node", "value": true }, canvas);
      // measure edge endpoints
      var edgeAB = canvas.querySelector(".edge-az");
      var beforeCoords = edgeAB.getBoundingClientRect();
      var cPoint = canvas.querySelector("circle.control.control-point-for-node-Node-A-Inc");
      var originalPos = cPoint.getBoundingClientRect();
      // create mouse event for down
      var downEvent = new MouseEvent('mousedown', { bubbles: true, clientX: originalPos.x, clientY: originalPos.y, view: window })
      // create mouse event for drag
      var dragEvent = new MouseEvent('mousemove', { bubbles: true, clientX: originalPos.x + 10, clientY: originalPos.y + 10, view: window })
      // create mouse event for up
      var upEvent = new MouseEvent('mouseup', { bubbles: true, clientX: originalPos.x + 10, clientY: originalPos.y + 10, view: window })
      cPoint.dispatchEvent(downEvent);
      cPoint.dispatchEvent(dragEvent);
      cPoint = canvas.querySelector("circle.control");
      // drag a node with weird name. 
      cPoint.dispatchEvent(upEvent);
      // do edges move?
      var edgeAB = canvas.querySelector(".edge-az");
      var afterCoords = edgeAB.getBoundingClientRect();
      beforeCoords.x.should.not.equal(afterCoords.x);
      beforeCoords.y.should.not.equal(afterCoords.y);

      // drag a control point for edge with weird name. All good?
      var cPoint = canvas.querySelector("circle.control.control-point-for-node-Node-B-Inc");
      var edgeAB = canvas.querySelector(".edge-az");
      var beforeCoords = edgeAB.getBoundingClientRect();
      // create mouse event for down
      var downEvent = new MouseEvent('mousedown', { bubbles: true, clientX: originalPos.x, clientY: originalPos.y, view: window })
      // create mouse event for drag
      var dragEvent = new MouseEvent('mousemove', { bubbles: true, clientX: originalPos.x + 10, clientY: originalPos.y + 10, view: window })
      // create mouse event for up
      var upEvent = new MouseEvent('mouseup', { bubbles: true, clientX: originalPos.x + 10, clientY: originalPos.y + 10, view: window })
      cPoint.dispatchEvent(downEvent);
      cPoint.dispatchEvent(dragEvent);
      cPoint = canvas.querySelector("circle.control");
      cPoint.dispatchEvent(upEvent);
      // drag a node with weird name. 
      var edgeAB = canvas.querySelector(".edge-az");
      var afterCoords = edgeAB.getBoundingClientRect();
      beforeCoords.x.should.not.equal(afterCoords.x);
      beforeCoords.y.should.not.equal(afterCoords.y);
    })
    it("should not animate nodes if the appropriate option is set", ()=>{
      var canvas = document.querySelector("esnet-map-canvas");
      var node = canvas.querySelector(".node-A circle");
      var style = window.getComputedStyle(node);
      var originalPos = node.getBoundingClientRect();
      var downEvent = new MouseEvent('mousedown', { bubbles: true, clientX: originalPos.x, clientY: originalPos.y, view: window })
      var upEvent = new MouseEvent('mouseup', { bubbles: true, clientX: originalPos.x, clientY: originalPos.y, view: window })
      node.dispatchEvent(downEvent);
      node.dispatchEvent(upEvent);
      var node = canvas.querySelector(".animated-node");
      var style = window.getComputedStyle(node);
      var animationWhileTrue = style.animation;
      var newOptions = canvas.options;
      newOptions['enableNodeAnimation'] = false;
      PubSub.publish("updateMapOptions", {options: newOptions, changed: ['enableNodeAnimation']}, canvas);
      var node = canvas.querySelector(".animated-node");
      var style = window.getComputedStyle(node);
      var animationWhileFalse = style.animation;
      animationWhileTrue.should.contain("throb");
      animationWhileFalse.should.not.equal(animationWhileTrue);
    })
    it("should append tooltips to the correct DOM element in a context with multiple instances", ()=>{
        var canvas = document.querySelector("esnet-map-canvas");
        var newOptions = JSON.parse(JSON.stringify(canvas.options));
        newOptions.showSidebar = false;

        PubSub.publish("updateMapOptions", {options: newOptions, changed: ['showSidebar']}, canvas);

        var elem2 = document.createElement("esnet-map-canvas");
        elem2.setAttribute('width', 800);
        elem2.setAttribute('height', 400);
        elem2.setAttribute("id", "testing-element2");
        elem2.topology = TOPOLOGY;
        elem2.options = newOptions;
        document.body.appendChild(elem2);
  
        var edge = elem2.querySelector('.edge.edge-az');
        let mouseoverEvent = new Event('mouseover', { bubbles: true });
        edge.dispatchEvent(mouseoverEvent);
        var tooltip = document.querySelector("#tooltip-hover")
        tooltip.parentElement.id.should.equal(`map-${elem2.instanceId}`);
        tooltip.parentElement.id.should.not.equal(`map-${canvas.instanceId}`);
    })
    it("should perform selection path crawl animations properly in a context with multiple instances", ()=>{
        var canvas = document.querySelector("esnet-map-canvas");

        var elem2 = document.createElement("esnet-map-canvas");
        elem2.setAttribute('width', 800);
        elem2.setAttribute('height', 400);
        elem2.setAttribute("id", "testing-element2");
        elem2.topology = JSON.parse(JSON.stringify(TOPOLOGY));
        elem2.options = JSON.parse(JSON.stringify(canvas.options));;
        document.body.insertBefore(elem2, canvas);

        var selectionListenerFired = false;
        PubSub.subscribe('setSelection', function(){ 
          selectionListenerFired = true;
          elem2.querySelectorAll(".dash-selected").length.should.not.equal(0);
        }, elem2)

        var edge = elem2.querySelector('.edge.edge-az');
        var originalPos = edge.getBoundingClientRect();
        var downEvent = new MouseEvent('mousedown', { bubbles: true, clientX: originalPos.x, clientY: originalPos.y, view: window })
        var upEvent = new MouseEvent('mouseup', { bubbles: true, clientX: originalPos.x, clientY: originalPos.y, view: window })
        edge.dispatchEvent(downEvent);
        edge.dispatchEvent(upEvent);
        selectionListenerFired.should.equal(true);
    })
    it("should allow edge 'grabbing' between layers on node move, if an option is set", ()=>{
        var canvas = document.querySelector("esnet-map-canvas");

        var newOptions = JSON.parse(JSON.stringify(canvas.options));
        newOptions.multiLayerNodeSnap = true;
        newOptions.layers[1].visible = true;
        PubSub.publish("updateMapOptions", {options: newOptions, changed: ['multiLayerNodeSnap', 'layers[1].visible']}, canvas);

        PubSub.publish("updateEditMode", true, canvas);
        PubSub.publish("setEditMode", { "mode": "node", "value": true }, canvas);

        var nodes = document.querySelectorAll("circle.control");

        var nodeA = nodes[0];
        var nodeC = nodes[2];

        var originalNodeAPos = nodeA.getBoundingClientRect();
        // compensate for radius
        originalNodeAPos = {x: originalNodeAPos.x + 4, y: originalNodeAPos.y + 4};
        // create mouse event for down
        var downEvent = new MouseEvent('mousedown', { bubbles: true, clientX: originalNodeAPos.x, clientY: originalNodeAPos.y, view: window })
        // create mouse event for drag
        var dragEvent = new MouseEvent('mousemove', { bubbles: true, clientX: originalNodeAPos.x + 50, clientY: originalNodeAPos.y + 50, view: window })
        // create mouse event for up
        var upEvent = new MouseEvent('mouseup', { bubbles: true, clientX: originalNodeAPos.x + 50, clientY: originalNodeAPos.y + 50, view: window })
        // fire down
        nodeA.dispatchEvent(downEvent);
        // fire drag
        nodeA.dispatchEvent(dragEvent);
        // fire up
        nodeA.dispatchEvent(upEvent);
        // check node moved
        var newPos = nodeA.getBoundingClientRect()
        newPos = {x: newPos.x + 4, y: newPos.y + 4};
        (newPos.x).should.be.approximately(originalNodeAPos.x + 50, 4);
        (newPos.y).should.be.approximately(originalNodeAPos.y + 50, 4);

        PubSub.publish("setEditMode", { "mode": "edge", "value": true }, canvas);
        // nodeA has moved, check that edgeAB in layer1 and edgeAB in layer2 have an endpoint that matches lat-lng.
        nodes = canvas.querySelectorAll("circle.control.control-point-for-edge-A--B")
        function within(num, a, b) {
            return num >= a && num <= b;
        };
        var node_matches = 0;
        for(var i=0; i<nodes.length; i++){
          var rect = nodes[i].getBoundingClientRect();
          if(within(rect.x, newPos.x - 10, newPos.x + 10) && 
             within(rect.y, newPos.y - 10, newPos.y + 10)){
            node_matches++;
          }
        }
        (node_matches).should.equal(2);
    })
    it("should have a node editing form that persists values between edits", ()=>{
        var canvas = document.querySelector("esnet-map-canvas");
        var closureVar = false;
        PubSub.publish("updateEditMode", true, canvas);
        var add_node = canvas.editingInterface.shadow.querySelector("#add_node");
        var mouseDown = new MouseEvent('mousedown', { bubbles: true, view: window });
        var mouseUp = new MouseEvent('mouseup', { bubbles: true, view: window })
        add_node.dispatchEvent(mouseDown);
        add_node.dispatchEvent(mouseUp);
        var nodeNameInput = canvas.editingInterface.shadow.querySelector("#node_name");
        nodeNameInput.setAttribute("value", "ABCD");
        nodeNameInput.value.should.equal("ABCD");
        nodeNameInput.getAttribute("value").should.equal("ABCD");
        var keyUp = new Event("keyup", {bubbles:true});
        nodeNameInput.dispatchEvent(keyUp);
        canvas.render();
        canvas.editingInterface.render();
        var nodeNameInput = canvas.editingInterface.shadow.querySelector("#node_name");
        nodeNameInput.value.should.equal("ABCD");
        nodeNameInput.getAttribute("value").should.equal("ABCD");
        var createNode = canvas.editingInterface.shadow.querySelector("#create_node");
        createNode.dispatchEvent(mouseDown);
        createNode.dispatchEvent(mouseUp);
    })
    it("should show tooltips that render inside the DOM element when the sidebar is disabled", ()=>{
        var canvas = document.querySelector("esnet-map-canvas");

        var newOptions = JSON.parse(JSON.stringify(canvas.options));
        newOptions.showSidebar = false;
        PubSub.publish("updateMapOptions", {options: newOptions, changed: ["showSidebar"]}, canvas);

        var node = document.querySelector("g.node > g.scale-container > circle");
        var originalNodePos = node.getBoundingClientRect();
        let mouseoverEvent = new MouseEvent('mouseover', { bubbles: true, clientX: originalNodePos.x, clientY: originalNodePos.y, view: window });
        // fire the mouseover event on our demonstration node
        node.dispatchEvent(mouseoverEvent);
        // get the sidebar tooltip text
        var centerStyle = canvas.querySelector(".tooltip-hover").getAttribute("style");
        let mouseoutEvent = new MouseEvent('mouseout', { bubbles: true })
        node.dispatchEvent(mouseoutEvent);

        var map = canvas.querySelector(".leaflet-tile-pane");
        var mapBox = canvas.getBoundingClientRect();
        var deltaX = (mapBox.right - originalNodePos.x) - 10;
        var deltaY = (mapBox.bottom - originalNodePos.y) - 10;
        // create mouse event for down
        var downEvent = new MouseEvent('mousedown', { bubbles: true, clientX: originalNodePos.x, clientY: originalNodePos.y, view: window })
        // create mouse event for drag
        var dragEvent = new MouseEvent('mousemove', { bubbles: true, clientX: originalNodePos.x + deltaX, clientY: originalNodePos.y + deltaY, view: window })
        // create mouse event for up
        var upEvent = new MouseEvent('mouseup', { bubbles: true, clientX: originalNodePos.x + deltaX, clientY: originalNodePos.y + deltaY, view: window })
        map.dispatchEvent(downEvent);
        map.dispatchEvent(dragEvent);
        map.dispatchEvent(upEvent);
        var afterNodePos = node.getBoundingClientRect();

        var node = document.querySelector("g.node > g.scale-container > circle");
        mouseoverEvent = new MouseEvent('mouseover', { bubbles: true, clientX: originalNodePos.x + deltaX, clientY: originalNodePos.y + deltaY, view: window });
        node.dispatchEvent(mouseoverEvent);
        // get the sidebar tooltip text
        var bottomRightStyle = canvas.querySelector(".tooltip-hover").getAttribute("style");
        centerStyle.should.contain("top");
        centerStyle.should.contain("left");
        bottomRightStyle.should.contain("bottom");
        bottomRightStyle.should.contain("right");
    })
    it("should have a 'viewport' mode that will zoom to a pre-deterimined lat-lng viewport", ()=>{
        var canvas = document.querySelector("esnet-map-canvas");

        var newTopology = [
          {
            "edges": [],
            "nodes": [
              {"name": "A", "coordinate": [ 80,  80], "meta": {} },
              {"name": "B", "coordinate": [ 80, -80], "meta": {} },
              {"name": "C", "coordinate": [-80, -80], "meta": {} },
              {"name": "D", "coordinate": [-80,  80], "meta": {} },
              {"name": "visible", "coordinate": [38.68, -96.96], "meta": {} },
            ]
          }
        ]
        PubSub.publish("updateMapTopology", newTopology, canvas);

        // helper function to see if rect named "child" is in rect named "parent"
        function inside(child, parent){
          if(child.left > parent.left &&
            child.right < parent.right &&
            child.top > parent.top &&
            child.bottom < parent.bottom){
              return true
          }
          return false;
        }
        // check the positions of each of the nodes. most should be outside of map bounding box.
        var nodes = canvas.querySelectorAll(".node.l0");
        var canvasBounds = canvas.getBoundingClientRect();
        var results = []
        for(var elem of nodes){
          var rect = elem.getBoundingClientRect();
          results.push(inside(rect, canvasBounds));
        }
        // we should find at least one "false" result (should be 4 actually)
        results.indexOf(false).should.not.equal(-1);

        var newOptions = JSON.parse(JSON.stringify(canvas.options));
        newOptions.initialViewStrategy = 'viewport';
        newOptions.viewport.top = 110;
        newOptions.viewport.left = -90;
        newOptions.viewport.bottom = -90;
        newOptions.viewport.right = 110;
        // set bounding box strategy to 'viewport' and set the viewport coords
        PubSub.publish("updateMapOptions", {options: newOptions, changed: ["initialViewStrategy", "viewportTopLeftLat", "viewportTopLeftLng", "viewportBottomRightLng", "viewportBottomRightLat"]}, canvas);
        // dispatch a resize event so the window thinks it has been resized. this should trigger viewport zoom logic.
        var resize = new Event('resize');
        window.dispatchEvent(resize);

        // check the positions of each of the nodes. All should be inside of map bounding box.        
        var nodes = canvas.querySelectorAll(".node.l0");
        var canvasBounds = canvas.getBoundingClientRect();
        var results = []
        for(var elem of nodes){
          results.push(inside(rect, canvasBounds));
        }
        // we should find at no "false" results
        results.indexOf(false).should.equal(-1)

        // HOWEVER! we don't want to resize the map in the case that the user has interacted with scroll/zoom
        // test that
        var rect = canvas.getBoundingClientRect();
        var map = canvas.leafletMap.getContainer()
        // create mouse event for down
        var downEvent = new MouseEvent('mousedown', { bubbles: true, clientX: rect.left + 100, clientY: rect.top + 100, view: window });
        // create mouse event for drag
        var dragEvent = new MouseEvent('mousemove', { bubbles: true, clientX: rect.left + 100 + 1200, clientY: rect.top + 100 + 100, view: window });
        // create mouse event for up
        var upEvent =   new MouseEvent('mouseup',   { bubbles: true, clientX: rect.left + 100 + 1200, clientY: rect.top + 100 + 100, view: window });
        map.dispatchEvent(downEvent);
        map.dispatchEvent(dragEvent);
        map.dispatchEvent(upEvent);
        window.dispatchEvent(resize);

        // check the positions of each of the nodes. All should be inside of map bounding box.        
        var nodes = canvas.querySelectorAll(".node.l0");
        var canvasBounds = canvas.getBoundingClientRect();
        var results = []
        for(var elem of nodes){
          results.push(inside(rect, canvasBounds));
        }
        // we should find at no "true" results (all 'false')
        results.indexOf(true).should.equal(-1)
    })
    it("should snap edges when the node is moved using the edit form", async () => {
      var canvas = document.querySelector("esnet-map-canvas");
      
      // set edit mode
      PubSub.publish("updateEditMode", true, canvas);
      PubSub.publish("setEditMode", { "mode": "node", "value": true }, canvas);
      
      // get a reference to a node
      var node = document.querySelector(".control-point-for-node-A");

      var nodeLocation = node.getBoundingClientRect();

      var mouseDownEvent = new MouseEvent('mousedown', { bubbles: true, clientX: 200, clientY: 200, view: window });
      var mouseUpEvent = new MouseEvent('mouseup', { bubbles: true, clientX: 200, clientY: 200, view: window });
      // get position of edges of that node

      var edgeClassName = `.cnxn-A`;
      var edge = document.querySelector(edgeClassName);
      var edgeLocation = edge.getBoundingClientRect();
      
      // get form to popup
      
      node.dispatchEvent(mouseDownEvent);
      node.dispatchEvent(mouseUpEvent);
      node.dispatchEvent(mouseDownEvent);
      node.dispatchEvent(mouseUpEvent);

      var nodeLatEl = document.querySelector('#node_lat');
      nodeLatEl.value = parseFloat(nodeLatEl.value) - 1;

      // update node location from form

      // var updateNowBtn = document.querySelector('#create_node');
      var nodeForm = document.querySelector('#add_node_form');
      
      var newVal = parseFloat(nodeLatEl.value) - 1;
      nodeLatEl.setAttribute('value', newVal);
      nodeLatEl.value = newVal;

      nodeForm.onsubmit(new Event('submit'));

      // compare before and after for edges and node

      setTimeout(() => {
        edge.getBoundingClientRect().y.should.not.equal(edgeLocation.y);
        node.getBoundingClientRect().y.should.not.equal(nodeLocation.y);
      }, 50);  // @see EditingInterface.updateLayerNodes: line 236, timeout of 10ms requires > 10ms wait time before validating results
    });
} );