import * as should from "../node_modules/should/should.js"
import * as pubsub from '../src/components/lib/pubsub.js';
const PubSub = pubsub.PubSub;

const EXPECTED_MOUSEOVER_TEXT = `A

In Volume: undefined

Out Volume: undefined`;


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

        const lavender = "rgb(202, 149, 229)";

        elem.topology = {
            "layer1":{
                "edges":[
                    {"name":"A--B","meta":{"endpoint_identifiers":{"pops":["A","B"]}},
                        "latLngs":[[39.02,-105.99],[35.81,-101.77],[34.59,-96.06]],
                        "children":[],
                        "azColor":lavender,
                        "zaColor":lavender,
                        "layer":1,
                    },
                    {"name":"B--C","meta":{
                        "endpoint_identifiers":{"pops":["B","C"]}},
                        "latLngs":[[34.59,-96.06],[37.99,-93.86],[42.16,-93.95]],
                        "children":[],
                        "azColor":lavender,
                        "zaColor":lavender,
                        "layer":1
                    },
                    {"name":"A--C","meta":{
                        "endpoint_identifiers":{"pops":["A","C"]}},
                        "latLngs":[[39.02,-105.99],[41.90,-100.72],[42.16,-93.95]],
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
                            "latLng":[39.027718840211605,-105.99609375000001],
                            "color":lavender,
                        },
                        {
                            "name":"B",
                            "meta":{},
                            "latLng":[34.59704151614417,-96.064453125],
                            "color":lavender,
                        },
                        {
                            "name":"C",
                            "meta":{},
                            "latLng":[42.16340342422403,-93.95507812500001],
                            "color":lavender,
                        }
                ],"aTest":0}
        };

        elem.options = {
            "startLat":38.68,
            "startLng":-96.96,
            "startZoom":3,
            "showSidebar": true,
            "showViewControls": true,
            "enableScrolling": true,
            "enableEditing": true,
            "tileSetLayer":"esri.shaded",
            "boundaryLayer":null,
            "labelLayer":null,
            "edgeWidth":3,
            "editMode":true,
            "nodeWidth":5,
            "pathOffset":3,
           // layer 1 rendering options
            "layer1":true,
            "endpointIdL1":"pops",
            "nodeWidthL1":4,
            "edgeWidthL1":1.5,
            "pathOffsetL1":1.5,
            "layerName1":"Core Topology",
            "legendL1":true,
            // layer 2 rendering options
            "layer2":false,
            "endpointIdL2":"pops",
            "nodeWidthL2":5,
            "edgeWidthL2":3,
            "pathOffsetL2":3,
            "layerName2":"Site Topology",
            "legendL2":true,
            // layer 3 rendering options
            "layer3":false,
            "endpointIdL3":"pops",
            "nodeHighlightL3":"red",
            "nodeWidthL3":6.5,
            "edgeWidthL3":2,
            "pathOffsetL3":1.5,
            "layerName3":"Peer Topology",
            "legendL3":true,
        };

        elem.updateTopology = function(){ console.log("updateTopology"); }
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
    it("should have a node vertex around (262, 194) with reference to the esnet-map-canvas's offset", ()=>{
      var map_coords = document.querySelector("esnet-map-canvas").getBoundingClientRect();
      // find the first circle in a "g.node". This should be the "A" node from topology
      var nodes = document.querySelectorAll("g.node > g.scale-container > circle");
      // console.log(nodes);
      var node_coords = nodes[0].getBoundingClientRect();

      // at 800x400 canvas size, we expect the offset (from the esnet-map-canvas top-left) of the first node to be 262, 194
      const expected_x = 262;
      const expected_y = 194;

      (expected_x).should.equal(node_coords.x - map_coords.x);
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
      newOptions['tileSetLayer'] = "usgs";
      PubSub.publish("updateMapOptions", {options: newOptions, changed: ['tileSetLayer']}, canvas);
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
      newOptions['boundaryLayer'] = 'toner.boundaries';
      PubSub.publish("updateMapOptions", {options: newOptions, changed: ['boundaryLayer']}, canvas);
      var i=0;
      var secondLayerUrl = null;
      canvas.leafletMap.eachLayer((layer)=>{
        if(i==1) secondLayerUrl = layer._url;
        i++;
      });
      const tonerBoundariesUrl = 'https://stamen-tiles-{s}.a.ssl.fastly.net/toner-lines/{z}/{x}/{y}{r}.{ext}';
      secondLayerUrl.should.equal(tonerBoundariesUrl);
    });
    it("should allow users to change the political label layer tileset", ()=>{
      var canvas = document.querySelector("esnet-map-canvas");
      var newOptions = canvas.options;
      newOptions['labelLayer'] = 'toner.labels';
      PubSub.publish("updateMapOptions", {options: newOptions, changed: ['labelLayer']}, canvas);
      var i=0;
      var secondLayerUrl = null;
      canvas.leafletMap.eachLayer((layer)=>{
        if(i==1) secondLayerUrl = layer._url;
        i++;
      });
      const tonerLabelsUrl = 'https://stamen-tiles-{s}.a.ssl.fastly.net/toner-labels/{z}/{x}/{y}{r}.{ext}';
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
      afterHomeClickPosition.x.should.equal(originalPosition.x);
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
      newOptions['layer1'] = false;
      PubSub.publish("updateMapOptions", {options: newOptions, changed: ['layer1']}, canvas);
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
      var clickEvent = new Event('click', { bubbles: true })
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
      var clickEvent = new Event('click', { bubbles: true })
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
    });
    it("should allow users to remove layer toggles", ()=>{
      var canvas = document.querySelector("esnet-map-canvas");
      // set option boolean
      var newOptions = canvas.options;
      newOptions['legendL1'] = false;
      newOptions['legendL2'] = false;
      newOptions['legendL3'] = false;
      // update options
      PubSub.publish("updateMapOptions", {
          options: newOptions,
          changed: ['legendL1', 'legendL2', 'legendL3']
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
    })
    it("should evenly space edge control points after node drag", ()=>{
      // enter editing mode
      var canvas = document.querySelector("esnet-map-canvas");
      PubSub.publish("updateEditMode", true, canvas);
      // edge edit mode. Do some work adding vertices to the edge.
      var edgeAC = document.querySelector(".control-for-A.control-for-C")
      // console.log("edgeAC is ", edgeAC);
      var edgeACPos = edgeAC.getBoundingClientRect();
      var clickEvents = [
        new MouseEvent('dblclick', { bubbles: true, clientX: edgeACPos.x, clientY: edgeACPos.y, view: window }),
        new MouseEvent('dblclick', { bubbles: true, clientX: edgeACPos.x, clientY: edgeACPos.y, view: window })
      ]
      // add vertices and check our work
      var beforeAllCps = canvas.querySelectorAll(".control-point-for-edge-A--C")
      for(var i=0; i<clickEvents.length; i++){
          edgeAC = document.querySelector(".control-for-A.control-for-C");
          // console.log(edgeAC);
          // console.log("dispatching ", clickEvents[0]);
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
      newTopology.layer2 = newTopology.layer1;
      newTopology.layer3 = newTopology.layer1;
      var newOptions = canvas.options;
      newOptions['edgeWidthL3'] = 5;
      newOptions['layer1'] = false;
      newOptions['layer2'] = false;
      newOptions['layer3'] = true;
      PubSub.publish("updateMapOptions", {
        options: newOptions,
        changed: ['layer1', 'layer2', 'layer3', 'edgeWidthL3']
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
      canvas.updateTopology = () => { closureVar = "called"; }

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
    });
    it("should allow users to drag edge edit control points", ()=>{
      // enter editing mode
      var canvas = document.querySelector("esnet-map-canvas");
      PubSub.publish("updateEditMode", true, canvas);
      var cPoint = canvas.querySelector("circle.control");

      var originalPos = cPoint.getBoundingClientRect();
      // compensate for radius
      originalPos = {x: originalPos.x + 4, y: originalPos.y + 4};
      //console.log(originalPos.x, originalPos.y);
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
      cPoint.dispatchEvent(upEvent);
      // check edge control point moved
      var cPoint = canvas.querySelector("circle.control");
      var newPos = cPoint.getBoundingClientRect()
      //console.log(newPos.x);
      newPos = {x: newPos.x + 4, y: newPos.y + 4};
      (newPos.x).should.approximately(originalPos.x + 10, 4);
      (newPos.y).should.approximately(originalPos.y + 10, 4);
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
} );