import * as pubsub from '../src/components/lib/pubsub.js';
import * as utils from './utils.js';
import {
  LAVENDER,
  EXPECTED_NODE_MOUSEOVER_REGEX,
  TOPOLOGY,
  OPTIONS,
  TRAFFIC_DATA,
  AUTODETECT_TRAFFIC_DATA
} from "./constants.js";
import { signals } from "../src/signals.js";
const PubSub = pubsub.PubSub;

function skip(){
  return
}

describe( "Class MapCanvas", () => {
    afterEach(function(){
        var canvases = document.querySelectorAll("esnet-map-canvas");
        canvases.forEach((canvas)=>{
          canvas.remove();
        })
    })
    beforeEach(function(){
        var elem = document.createElement("esnet-map-canvas");
        elem.setAttribute('width', 800);
        elem.setAttribute('height', 400);
        elem.setAttribute("id", "testing-element");
        document.body.appendChild(elem);

        elem.setTopology(TOPOLOGY);
        elem.setOptions(OPTIONS);
    });
    it( "should append a esnet-map-canvas element", async () => {
      let isInstance = document.querySelector("esnet-map-canvas") instanceof HTMLElement;
      expect(isInstance).toBeTruthy();
    } );
    it( "should have a sidebar child element", async () => {
      let isInstance = document.querySelector("esnet-map-canvas").querySelector("esnet-map-side-bar") instanceof HTMLElement;
      expect(isInstance).toBeTruthy();
    } );
    it( "should have an esnet-map-editing-interface child element", async () => {
      let isInstance = document.querySelector("esnet-map-canvas").querySelector("esnet-map-editing-interface") instanceof HTMLElement;
      expect(isInstance).toBeTruthy();
    } );
    it( "should call back a defined function when a 'TOPOLOGY_UPDATED' signal fires", async ()=>{
      var mapCanvas = document.querySelector("esnet-map-canvas");
      var closureVar = null;
      mapCanvas.listen(signals.TOPOLOGY_UPDATED, () => { closureVar = "called"; })
      mapCanvas.setTopology(null);
      expect(closureVar).toEqual("called");
    });
    it("should have a node vertex around (259, 194) with reference to the esnet-map-canvas's offset", async ()=>{
      var map_coords = document.querySelector("esnet-map-canvas").getBoundingClientRect();
      // find the first circle in a "g.node". This should be the "A" node from topology
      var nodes = document.querySelectorAll("g.node > g.scale-container > circle");
      var node_coords = nodes[0].getBoundingClientRect();

      // at 800x400 canvas size, we expect the offset (from the esnet-map-canvas top-left) of the first node to be 262, 194
      const expected_x = 259;
      const expected_y = 194;

      expect(expected_x).toBeCloseTo(node_coords.x - map_coords.x, -1) // interactions with ResizeObserver make this coord approximate
      expect(expected_y).toEqual(node_coords.y - map_coords.y);

      // conversely, if we look for the element at the offset of 262, 194 (plus 4 for its radius), we should find our circle.
      var expected_circle = document.elementFromPoint(map_coords.x + expected_x + 4, map_coords.y + expected_y + 4);
      expect(expected_circle.tagName).toEqual("circle");
      // we bother with all of this work because we'll need to simulate click/drag/etc events on the nodes in other test
    });
    it("should enter edit mode when we call setEditMode", async ()=>{
      var canvas = document.querySelector("esnet-map-canvas");
      canvas.setEditMode("edge");
      var toolOverlayButton = canvas.editingInterface.shadow.querySelector(".tools-overlay > .button.edit-mode-only");
      // using window.getComputedStyle, get the full computed style including cascading upstream styles
      var style = window.getComputedStyle(toolOverlayButton);
      expect(style.display).toEqual("inline-block");
    });
    it("should show a tooltip in the sidebar when a user hovers over a node", async () => {
      var canvas = document.querySelector("esnet-map-canvas");
      var node = document.querySelector("g.node > g.scale-container > circle");
      // create a bubbling mouseover event
      let mouseoverEvent = new Event('mouseover', { bubbles: true });
      // fire the mouseover event on our demonstration node
      node.dispatchEvent(mouseoverEvent);
      // get the sidebar tooltip text
      const sidebarTooltip = canvas.querySelector("#sidebar-tooltip");
      // var sidebarTooltipText = sidebarTooltip.innerText;
      var sidebarTooltipText = utils.getElementText(sidebarTooltip);
      // test that the sidebar tooltip text is as expected
      expect(sidebarTooltipText).toMatch(EXPECTED_NODE_MOUSEOVER_REGEX);
    });
    it("should have an edit mode characterized by edit buttons", async ()=>{
      var canvas = document.querySelector("esnet-map-canvas");
      canvas.setEditMode("edge");
      var toolOverlayButton = canvas.editingInterface.shadow.querySelector(".tools-overlay > .button.edit-mode-only");
      // using window.getComputedStyle, get the full computed style including cascading upstream styles
      var style = window.getComputedStyle(toolOverlayButton);
      expect(style.display).toEqual("inline-block");
    });
    it("should allow users to change the map layer tileset", async ()=>{
      var canvas = document.querySelector("esnet-map-canvas");
      var newOptions = JSON.parse(JSON.stringify(canvas.options));
      newOptions.tileset['geographic'] = "usgs";

      canvas.setOptions(newOptions);
      var i=0;
      var firstLayerUrl = null;
      canvas.leafletMap.eachLayer((layer)=>{
        if(i==0) firstLayerUrl = layer._url;
        i++;
      });
      const usgsUrl = 'https://basemap.nationalmap.gov/arcgis/rest/services/USGSImageryOnly/MapServer/tile/{z}/{y}/{x}';
      expect(usgsUrl).toEqual(firstLayerUrl);
    });
    it("should allow users to change the political boundary layer tileset", async ()=>{
      var canvas = document.querySelector("esnet-map-canvas");
      var newOptions = JSON.parse(JSON.stringify(canvas.options));
      newOptions.tileset['boundaries'] = 'toner.boundaries';
      canvas.setOptions(newOptions);
      var i=0;
      var secondLayerUrl = null;
      canvas.leafletMap.eachLayer((layer)=>{
        if(i==1) secondLayerUrl = layer._url;
        i++;
      });
      const tonerBoundariesUrl = 'https://tiles.stadiamaps.com/tiles/stamen_toner_lines/{z}/{x}/{y}{r}.{ext}';
      expect(secondLayerUrl).toEqual(tonerBoundariesUrl);
    });
    it("should allow users to change the political label layer tileset", async ()=>{
      var canvas = document.querySelector("esnet-map-canvas");
      var newOptions = JSON.parse(JSON.stringify(canvas.options));
      newOptions.tileset['labels'] = 'toner.labels';
      canvas.setOptions(newOptions);
      var i=0;
      var secondLayerUrl = null;
      canvas.leafletMap.eachLayer((layer)=>{
        if(i==1) secondLayerUrl = layer._url;
        i++;
      });
      const tonerLabelsUrl = 'https://tiles.stadiamaps.com/tiles/stamen_toner_labels/{z}/{x}/{y}{r}.{ext}';
      expect(secondLayerUrl).toEqual(tonerLabelsUrl);
    });
    it("should allow users to 'home' the map by clicking a button", async ()=>{
      var canvas = document.querySelector("esnet-map-canvas");
      var node = document.querySelector("g.node > g.scale-container > circle");
      var originalPosition = node.getBoundingClientRect();
      var mouseOrigin = { x: originalPosition.x - 10, y: originalPosition.y - 10 };

      // simulate the outcome of a drag event, changing the center and zoom
      canvas.leafletMap.setView([75, -101.426], 3);

      // verify that the point for the A node has moved N pixels
      var afterDragPosition = node.getBoundingClientRect();
      expect(afterDragPosition.x).not.toEqual(originalPosition.x);
      expect(afterDragPosition.y).not.toEqual(originalPosition.y);
      // click the home button
      var clickEvent = new Event('click', { bubbles: true })
      var home_button = canvas.shadow.querySelector("#home_map")
      home_button.dispatchEvent(clickEvent);
      // verify that the point for the A node is back at original position (262, 194) w/r/t esnet-map-canvas (0,0)
      node = document.querySelector("g.node > g.scale-container > circle");
      var afterHomeClickPosition = node.getBoundingClientRect();
      expect(afterHomeClickPosition.x).toBeCloseTo(originalPosition.x, -1); // interactions with ResizeObserver make this coord approximate
      expect(afterHomeClickPosition.y).toEqual(originalPosition.y);
    });
    it("should allow users to toggle layers", async ()=>{
      var canvas = document.querySelector("esnet-map-canvas");
      var node = document.querySelector("g.node > g.scale-container > circle");
      var nodeStyle = window.getComputedStyle(node);
      // verify that the point for the A node is visible
      expect(nodeStyle.display).toEqual("inline");
      // click the toggle containing the A node
      var newOptions = JSON.parse(JSON.stringify(canvas.options));
      newOptions.layers[0]['visible'] = false;
      PubSub.publish("updateMapOptions", {options: newOptions, changed: ['layers[0].visible']}, canvas);
      // verify that the point for the A node is not visible / not in DOM
      node = document.querySelector("g.node > circle");
      expect(String(node)).toEqual("null");
    });
    it("should have an edge edit mode characterized by control points on edges", async ()=>{
      // enter editing mode
      var canvas = document.querySelector("esnet-map-canvas");
      canvas.setEditMode("edge");
      // run a query selector for control points
      var controlPoints = document.querySelectorAll("circle.control");
      // expect a specific count of control points
      expect(controlPoints.length).toEqual(9)
    });
    it("should show a UI for adding a node", async ()=>{
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
      expect(window.getComputedStyle(addNodeDialog).display).toEqual("block");
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
    /*it("should allow users to change the display icon (as SVG) for a node", ()=>{
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
    it("should show a UI for adding an edge", async ()=>{
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
      expect(window.getComputedStyle(addNodeDialog).display).toEqual("block");
    });
    it("should allow users to add an edge control point on double-click", async ()=>{
      // enter editing mode
      var canvas = document.querySelector("esnet-map-canvas");
      var closureVar = false;
      // test that we publish updateMapEdge
      canvas.listen(signals.EDGE_UPDATED, (e)=>{ closureVar= true; });
      canvas.setEditMode("edge");

      // create a (double) click event
      var dblClickEvent = new MouseEvent('dblclick', { bubbles: true, clientX: 200, clientY: 200 })
      // fire double click event on edge
      var controlPointsBefore = document.querySelectorAll("circle.control").length
      var path = document.querySelector("path.control");
      path.dispatchEvent(dblClickEvent);
      var controlPointsAfter = document.querySelectorAll("circle.control").length
      expect(controlPointsBefore).not.toEqual(controlPointsAfter);
      // check that we now have more control points on the edge
      expect(controlPointsAfter).toBeGreaterThan(controlPointsBefore);
      expect(closureVar).toEqual(true);
    });
    it("should allow users to remove layer toggles", async ()=>{
      var canvas = document.querySelector("esnet-map-canvas");
      // set option boolean
      var newOptions = JSON.parse(JSON.stringify(canvas.options));
      newOptions.layers[0].legend = false;
      newOptions.layers[1].legend = false;
      newOptions.layers[2].legend = false;
      // update options
      canvas.setOptions(newOptions);
      // check that no toggle visible for layer toggle we turned off
      var toggleContainers = canvas.querySelectorAll(".toggle.container");
      for(var i=0; i<toggleContainers.length; i++){
        expect(toggleContainers[i].style.display).toEqual("none");
      }
    });
    it("should allow users to double click to remove edge control points", async ()=>{
      // get canvas
      var canvas = document.querySelector("esnet-map-canvas");
      var closureVar = false;
      // test that we publish updateMapEdge
      canvas.listen(signals.EDGE_UPDATED, (e)=>{ closureVar= true; });
      // turn on editing mode
      canvas.setEditMode("edge");
      // double click control point to remove
      var beforeAllCps = canvas.querySelectorAll(".control.controlPoint")
      var cp = canvas.querySelector(".control.controlPoint")
      var clickEvent = new Event('dblclick', { bubbles: true })
      cp.dispatchEvent(clickEvent);
      // edge should have 2 control points
      var canvas = document.querySelector("esnet-map-canvas");
      canvas.setEditMode("edge");
      var afterAllCps = canvas.querySelectorAll(".control.controlPoint")
      expect(afterAllCps.length).toBeLessThan(beforeAllCps.length)
      expect(closureVar).toEqual(true);
    })
    it("should evenly space edge control points after node drag", async ()=>{
      // enter editing mode
      var canvas = document.querySelector("esnet-map-canvas");
      canvas.setEditMode("edge");
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
      expect(afterAllCps.length).toBeGreaterThan(beforeAllCps.length)
      var positionsBeforeDrag = [];
      for(var i=0; i<afterAllCps.length; i++){
        var rect = afterAllCps[i].getBoundingClientRect();
        positionsBeforeDrag.push([rect.x, rect.y]);
      }

      // throw the signal for node edit mode
      canvas.setEditMode("node");
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
      nodes = document.querySelectorAll("circle.control");
      nodeA = nodes[0];
      var newPos = nodeA.getBoundingClientRect()
      newPos = {x: newPos.x + 4, y: newPos.y + 4};
      expect(newPos.x).toBeCloseTo(originalNodeAPos.x + 10, -1);
      expect(newPos.y).toBeCloseTo(originalNodeAPos.y + 10, -1);


      canvas.setEditMode("edge");
      var afterAllCps = canvas.querySelectorAll(".control-point-for-edge-A--C")
      expect(afterAllCps.length).toBeGreaterThan(beforeAllCps.length)
      var positionsAfterDrag = [];
      for(var i=0; i<afterAllCps.length; i++){
        var rect = afterAllCps[i].getBoundingClientRect();
        positionsAfterDrag.push([rect.x, rect.y]);
      }
      var positionCount = positionsBeforeDrag.length - 1;
      // check that none of the node positions are the same
      for(var i=0; i<positionCount; i++){
        expect(positionsAfterDrag[i][0]).withContext(`x coord of position ${i} of ${positionCount}`).not.toEqual(positionsBeforeDrag[i][0]);
        expect(positionsAfterDrag[i][1]).withContext(`y coord of position ${i} of ${positionCount}`).not.toEqual(positionsBeforeDrag[i][1]);
      }
      // except the last one in the array, the node that didn't move.
      expect(positionsAfterDrag[positionCount][0]).toEqual(positionsBeforeDrag[positionCount][0]);
      expect(positionsAfterDrag[positionCount][1]).toEqual(positionsBeforeDrag[positionCount][1]);
      for(var i=1; i<positionCount; i++){
        // calculate x deltas for each position. they should all be 15.
        var deltaX = positionsAfterDrag[i][0] - positionsBeforeDrag[i][0];
        //deltaX.should.equal(15);
        // calculate y deltas for each position. they should all be -8.
        var deltaY = positionsAfterDrag[i][1] - positionsBeforeDrag[i][1];
        //deltaY.should.equal(-8);
      }
    });
    it("should show the same tooltip on nodes and node control points", ()=>{
      // get canvas
      var canvas = document.querySelector("esnet-map-canvas");
      // turn on editing mode
      canvas.setEditMode("edge");
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
      var newTopology = JSON.parse(JSON.stringify(canvas.topology));
      newTopology[1] = newTopology[0];
      newTopology[2] = newTopology[0];
      canvas.setTopology(newTopology);
      var newOptions = JSON.parse(JSON.stringify(canvas.options));
      newOptions.layers[2]['edgeWidth'] = 5;
      newOptions.layers[0]['visible'] = false;
      newOptions.layers[1]['visible'] = false;
      newOptions.layers[2]['visible'] = true;
      canvas.setOptions(newOptions);
      var randomEdge = canvas.querySelector('.edge.edge-az');
      expect(randomEdge.getAttribute("stroke-width")).toEqual("5");
    })
    it("should have a node edit mode characterized by control points on nodes", ()=>{
      var canvas = document.querySelector("esnet-map-canvas");
      // throw the signal for node edit mode
      canvas.setEditMode("node");
      // run a query selector for control points
      var controlPoints = document.querySelectorAll("circle.control");
      // expect a specific count of control points
      expect(controlPoints.length).toEqual(3)
    });
    it("should allow users to drag node edit control points", ()=>{
      // enter editing mode
      var canvas = document.querySelector("esnet-map-canvas");
      // throw the signal for node edit mode
      canvas.setEditMode("node");
      var closureVar = null;
      canvas.listen(signals.NODE_UPDATED, () => {
        closureVar = "called";
      });
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
      node = document.querySelector("circle.control");
      node.dispatchEvent(upEvent);
      // check node moved
      node = document.querySelector("circle.control");
      var newPos = node.getBoundingClientRect()
      newPos = {x: newPos.x + 4, y: newPos.y + 4};
      expect(newPos.x).toBeCloseTo(originalPos.x + 10, -1);
      expect(newPos.y).toBeCloseTo(originalPos.y + 10, -1);
      expect(closureVar).toEqual("called")
    });
    it("should persist a topology change when a user drags an editable node control point", ()=>{
      var canvas = document.querySelector("esnet-map-canvas");

      var closureVar = null;
      var closureVar2 = false;
      var closureVar3 = false;
      canvas.listen(signals.TOPOLOGY_UPDATED, () => {
        closureVar = "called";
      });
      canvas.listen(signals.NODE_UPDATED, (e)=>{
        closureVar3 = true;
      }, canvas);
      canvas.listen(signals.EDGE_UPDATED, (e)=>{
        closureVar2 = true;
      }, canvas);

      // throw the signal for node edit mode
      canvas.setEditMode("node");
      var node = document.querySelector("circle.control.control-point-for-node-A");
      var originalPos = node.getBoundingClientRect();
      // compensate for radius
      originalPos = {x: originalPos.x + 4, y: originalPos.y + 4};
      // create mouse event for down
      let downEvent = new MouseEvent('mousedown', { bubbles: true, clientX: originalPos.x, clientY: originalPos.y, view: window })
      // create mouse event for drag
      let dragEvent = new MouseEvent('mousemove', { bubbles: true, clientX: originalPos.x + 10, clientY: originalPos.y + 10, view: window })
      // create mouse event for up
      let upEvent = new MouseEvent('mouseup', { bubbles: true, clientX: originalPos.x + 10, clientY: originalPos.y + 10, view: window })
      // fire down
      node.dispatchEvent(downEvent);
      // fire drag
      node.dispatchEvent(dragEvent);
      // fire up
      node = document.querySelector("circle.control.control-point-for-node-A");
      node.dispatchEvent(upEvent);
      // check node moved
      node = document.querySelector("circle.control.control-point-for-node-A");
      var newPos = node.getBoundingClientRect()
      newPos = {x: newPos.x + 4, y: newPos.y + 4};
      expect(newPos.x).toBeCloseTo(originalPos.x + 10, -1);
      expect(newPos.y).toBeCloseTo(originalPos.y + 10, -1);
      // check callback fired
      expect(closureVar).toEqual("called");
      expect(closureVar2).toBeTruthy();
      expect(closureVar3).toBeTruthy();
    });
    it("should allow users to drag edge edit control points", ()=>{
      // enter editing mode
      var canvas = document.querySelector("esnet-map-canvas");
      // edge edit mode
      canvas.setEditMode("edge");
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
      expect(newPos.x).toBeCloseTo(originalPos.x + 30, -1);
      expect(newPos.y).toBeCloseTo(originalPos.y + 30, -1);
    });
    it("should persist a topology change when a user drags an editable edge control point", ()=>{
      var canvas = document.querySelector("esnet-map-canvas");

      var closureVar = null;
      canvas.listen(signals.TOPOLOGY_UPDATED, () => {
        closureVar = "called";
      });

      // edge edit mode
      canvas.setEditMode("edge");
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
      cPoint = canvas.querySelector("circle.control");
      // fire up
      cPoint.dispatchEvent(upEvent);
      // check edge control point moved
      // the drop event destroys and repaints the circle control...
      cPoint = canvas.querySelector("circle.control");
      var newPos = cPoint.getBoundingClientRect()
      newPos = {x: newPos.x + 4, y: newPos.y + 4};
      expect(newPos.x).toBeCloseTo(originalPos.x + 10, -1);
      expect(newPos.y).toBeCloseTo(originalPos.y + 10, -1);
      // check callback fired
      expect(closureVar).toEqual("called");
    });
    // it appears this test is causing some kind of synchronicity problem. Commenting for now...
    /*it("should allow for editing of same-name nodes in different layers", ()=>{
      var canvas = document.querySelector("esnet-map-canvas");
      // create test map topology
      var newTopology = [
        {
            "edges": [
                {"name":"A--B","meta":{"endpoint_identifiers":{"names":["A","B"]}},
                    "coordinates":[[39.02,-105.99],[35.81,-101.77],[34.59,-96.06]],
                    "children":[],
                    "azColor":LAVENDER,
                    "zaColor":LAVENDER,
                }
            ],
            "nodes": [
                {
                  "name":"A",
                  "meta":{},
                  "coordinate":[39.02,-105.99],
                  "color":LAVENDER,
                },
                {
                  "name":"B",
                  "meta":{},
                  "coordinate":[34.59,-96.06],
                  "color":LAVENDER,
                }
            ]
        },
        {
            "edges": [
                {"name":"A--B","meta":{"endpoint_identifiers":{"names":["A","B"]}},
                    "coordinates":[[49.02,-115.99],[45.81,-111.77],[44.59,-106.06]],
                    "children":[],
                    "azColor":LAVENDER,
                    "zaColor":LAVENDER,
                }
            ],
            "nodes": [
                {
                  "name":"A",
                  "meta":{},
                  "coordinate":[49.02,-115.99],
                  "color":LAVENDER,
                },
                {
                  "name":"B",
                  "meta":{},
                  "coordinate":[44.59,-106.06],
                  "color":LAVENDER,
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

    })*/
    it("should allow for icon and non-icon edge templates from the topology", () => {
      var canvas = document.querySelector("esnet-map-canvas");
      // create mouseover for edge with template
      var newTopology = [
        {
            "edges": [
                {
                    "name":"Z--L",
                    "meta":{
                      "endpoint_identifiers":{
                        "names":["Z","L"]
                      },
                      "template": "${labels.src} ABCDEF ${labels.dst} GHIJKL"
                    },
                    "coordinates":[[39.02,-105.99],[35.81,-101.77],[34.59,-96.06]],
                    "children":[],
                    "azColor":LAVENDER,
                    "zaColor":LAVENDER,
                },
                {
                    "name":"A--Z",
                    "meta":{
                      "endpoint_identifiers":{
                        "names":["A","Z"]
                      }
                    },
                    "coordinates":[[30.02,-105.99],[34.52,-105.99],[39.02,-105.99]],
                    "children":[],
                    "azColor":LAVENDER,
                    "zaColor":LAVENDER,
                }
            ],
            "nodes": [
                {
                  "name":"A",
                  "meta":{},
                  "coordinate":[30.02,-105.99],
                  "color":LAVENDER,
                },
                {
                  "name":"Z",
                  "meta":{},
                  "coordinate":[39.02,-105.99],
                  "color":LAVENDER,
                },
                {
                  "name":"L",
                  "meta":{},
                  "coordinate":[34.59,-96.06],
                  "color":LAVENDER,
                }
            ]
        },
      ]
      canvas.setTopology(newTopology);
      var edgeZL = canvas.querySelector(".cnxn-Z.cnxn-L");
      var edgeAZ = canvas.querySelector(".cnxn-A.cnxn-Z");

      // fire mouseover
      let mouseoverEvent = new Event('mouseover', { bubbles: true });
      edgeZL.dispatchEvent(mouseoverEvent);
      // check tooltip text
      var label = canvas.querySelector(".flow-tooltip strong").innerText.trim();
      expect("Z → L").toEqual(label);

      var newOptions = canvas.options;
      newOptions.enableCustomEdgeTooltip = true;
      newOptions.customEdgeTooltip = "<div class='flow-tooltip'>${forward.from} → ${forward.to}</div>";
      PubSub.publish("updateMapOptions", { options: newOptions, changed: [
        "enableCustomEdgeTooltip",

      ]});
      edgeAZ.dispatchEvent(mouseoverEvent);
      var label = canvas.querySelector(".flow-tooltip").innerText.trim();
      const testAZFlowMarkupStr = `A → Z`;
      expect(testAZFlowMarkupStr).toEqual(label);
    });
    it("should santize names with non-alphanum characters", ()=>{
      var canvas = document.querySelector("esnet-map-canvas");
      var newTopology = [
        {
            "edges": [
                {
                    "name":"Node A, Inc.--Node B - Inc.",
                    "meta":{
                      "endpoint_identifiers":{
                        "names":["Node A, Inc.","Node B - Inc."]
                      }
                    },
                    "coordinates":[[39.02,-105.99],[35.81,-101.77],[34.59,-96.06]],
                    "children":[],
                    "azColor":LAVENDER,
                    "zaColor":LAVENDER,
                }
            ],
            "nodes": [
                {
                  "name":"Node A, Inc.",
                  "meta":{},
                  "coordinate":[39.02,-105.99],
                  "color":LAVENDER,
                },
                {
                  "name":"Node B - Inc.",
                  "meta":{},
                  "coordinate":[34.59,-96.06],
                  "color":LAVENDER,
                }
            ]
        },
      ]
      // set topology with weird names for both edges and nodes
      canvas.setTopology(newTopology);
      // node edit mode
      canvas.setEditMode("node");
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
      expect(beforeCoords.x).not.toEqual(afterCoords.x);
      expect(beforeCoords.y).not.toEqual(afterCoords.y);

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
      expect(beforeCoords.x).not.toEqual(afterCoords.x);
      expect(beforeCoords.y).not.toEqual(afterCoords.y);
    })
    it("should not animate nodes if the appropriate option is set", ()=>{
      let canvas = document.querySelector("esnet-map-canvas");
      canvas.setTopology(JSON.parse(JSON.stringify(TOPOLOGY)));
      let node = canvas.querySelector(".node-A circle");
      let style = window.getComputedStyle(node);
      let originalPos = node.getBoundingClientRect();
      let downEvent = new MouseEvent('mousedown', { bubbles: true, clientX: originalPos.x, clientY: originalPos.y, view: window })
      let upEvent = new MouseEvent('mouseup', { bubbles: true, clientX: originalPos.x, clientY: originalPos.y, view: window })
      node.dispatchEvent(downEvent);
      node.dispatchEvent(upEvent);
      node = canvas.querySelector(".animated-node");
      style = window.getComputedStyle(node);
      let animationWhileTrue = style.animation;
      let newOptions = {...canvas.options};
      newOptions['enableNodeAnimation'] = false;
      let changes = canvas.calculateOptionsChanges(newOptions);
      canvas.setOptions(newOptions);
      node = canvas.querySelector(".animated-node");
      style = window.getComputedStyle(node);
      let animationWhileFalse = style.animation;
      expect(animationWhileTrue).toMatch("throb");
      expect(animationWhileFalse).not.toEqual(animationWhileTrue);
    })
    it("should append tooltips to the correct DOM element in a context with multiple instances", ()=>{
        var canvas = document.querySelector("esnet-map-canvas");
        var newOptions = JSON.parse(JSON.stringify(canvas.options));
        newOptions.showSidebar = false;
        canvas.setOptions(newOptions);

        var elem2 = document.createElement("esnet-map-canvas");
        elem2.setAttribute('width', 800);
        elem2.setAttribute('height', 400);
        elem2.setAttribute("id", "testing-element2");
        elem2.setTopology(TOPOLOGY);
        elem2.setOptions(newOptions);
        document.body.appendChild(elem2);

        var edge = elem2.querySelector('.edge.edge-az');
        let mouseoverEvent = new Event('mouseover', { bubbles: true });
        edge.dispatchEvent(mouseoverEvent);
        var tooltip = document.querySelector("#tooltip-hover")
        expect(tooltip.parentElement.id).toEqual(`map-${elem2.instanceId}`);
        expect(tooltip.parentElement.id).not.toEqual(`map-${canvas.instanceId}`);
    })
    it("should perform selection path crawl animations properly in a context with multiple instances", ()=>{
        var canvas = document.querySelector("esnet-map-canvas");

        var elem2 = document.createElement("esnet-map-canvas");
        elem2.setAttribute('width', 800);
        elem2.setAttribute('height', 400);
        elem2.setAttribute("id", "testing-element2");
        elem2.setTopology(JSON.parse(JSON.stringify(TOPOLOGY)));
        elem2.setOptions(JSON.parse(JSON.stringify(canvas.options)));
        document.body.insertBefore(elem2, canvas);

        var selectionListenerFired = false;
        elem2.listen(signals.SELECTION_SET, function(){
          selectionListenerFired = true;
          expect(elem2.querySelectorAll(".dash-selected").length).not.toEqual(0);
        })

        var edge = elem2.querySelector('.edge.edge-az');
        var originalPos = edge.getBoundingClientRect();
        var downEvent = new MouseEvent('mousedown', { bubbles: true, clientX: originalPos.x, clientY: originalPos.y, view: window })
        var upEvent = new MouseEvent('mouseup', { bubbles: true, clientX: originalPos.x, clientY: originalPos.y, view: window })
        edge.dispatchEvent(downEvent);
        edge.dispatchEvent(upEvent);
        expect(selectionListenerFired).toEqual(true);
    })
    it("should allow edge 'grabbing' between layers on node move, if an option is set", ()=>{
        var canvas = document.querySelector("esnet-map-canvas");

        var newOptions = JSON.parse(JSON.stringify(canvas.options));
        var newTopology = JSON.parse(JSON.stringify(canvas.topology));

        newTopology.push({
          "edges": [{"name":"A--B","meta":{
              "endpoint_identifiers":{"names":["A","B"]}},
              "coordinates":[[39.02,-105.99],[35.81,-101.77],[34.59,-96.06]],
              "children":[],
              "azColor":LAVENDER,
              "zaColor":LAVENDER,
              "layer":1,
          }],
          "nodes": [{
              "name":"A",
              "meta":{},
              "coordinate":[39.027718840211605,-105.99609375000001],
              "color":LAVENDER,
              "inValue": 1234567890,
              "outValue": 9876543210,
            },
            {
              "name":"B",
              "meta":{},
              "coordinate":[34.59704151614417,-96.064453125],
              "color":LAVENDER,
              "inValue": 3213213213,
              "outValue": 31313131313,
          }]
        })
        canvas.setTopology(newTopology);

        newOptions.multiLayerNodeSnap = true;
        newOptions.layers[1].visible = true;
        canvas.setOptions(newOptions);

        // node edit mode
        canvas.setEditMode("node");

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

        var nodes = document.querySelectorAll("circle.control");

        var nodeA = nodes[0];
        var nodeC = nodes[2];

        var newPos = nodeA.getBoundingClientRect()
        newPos = {x: newPos.x + 4, y: newPos.y + 4};
        expect(newPos.x).toBeCloseTo(originalNodeAPos.x + 50, -1);
        expect(newPos.y).toBeCloseTo(originalNodeAPos.y + 50, -1);

        canvas.setEditMode("edge");
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
        expect(node_matches).toEqual(2);
    })
    it("should have a node editing form that persists values between edits", ()=>{
        var canvas = document.querySelector("esnet-map-canvas");
        var closureVar = false;
        // edge edit mode
        canvas.setEditMode("node");
        var add_node = canvas.editingInterface.shadow.querySelector("#add_node");
        var mouseDown = new MouseEvent('mousedown', { bubbles: true, view: window });
        var mouseUp = new MouseEvent('mouseup', { bubbles: true, view: window })
        add_node.dispatchEvent(mouseDown);
        add_node.dispatchEvent(mouseUp);
        var nodeNameInput = canvas.editingInterface.shadow.querySelector("#node_name");
        nodeNameInput.setAttribute("value", "ABCD");
        expect(nodeNameInput.value).toEqual("ABCD");
        expect(nodeNameInput.getAttribute("value")).toEqual("ABCD");
        var keyUp = new Event("keyup", {bubbles:true});
        nodeNameInput.dispatchEvent(keyUp);
        canvas.render();
        canvas.editingInterface.render();
        var nodeNameInput = canvas.editingInterface.shadow.querySelector("#node_name");
        expect(nodeNameInput.value).toEqual("ABCD");
        expect(nodeNameInput.getAttribute("value")).toEqual("ABCD");
        var createNode = canvas.editingInterface.shadow.querySelector("#create_node");
        createNode.dispatchEvent(mouseDown);
        createNode.dispatchEvent(mouseUp);
    })
    it("should show tooltips that render inside the DOM element when the sidebar is disabled", ()=>{
        var canvas = document.querySelector("esnet-map-canvas");

        var newOptions = JSON.parse(JSON.stringify(canvas.options));
        newOptions.showSidebar = false;
        canvas.setOptions(newOptions);

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
        expect(centerStyle).toMatch("top");
        expect(centerStyle).toMatch("left");
        expect(bottomRightStyle).toMatch("bottom");
        expect(bottomRightStyle).toMatch("right");
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
        canvas.setTopology(newTopology);

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
        expect(results.indexOf(false)).not.toEqual(-1);

        var newOptions = JSON.parse(JSON.stringify(canvas.options));
        newOptions.initialViewStrategy = 'viewport';
        newOptions.viewport.top = 110;
        newOptions.viewport.left = -90;
        newOptions.viewport.bottom = -90;
        newOptions.viewport.right = 110;
        // set bounding box strategy to 'viewport' and set the viewport coords
        canvas.setOptions(newOptions);
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
        expect(results.indexOf(false)).toEqual(-1)

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
        expect(results.indexOf(true)).toEqual(-1)
    })
    it("should snap edges when the node is moved using the edit form", (done) => {
      var canvas = document.querySelector("esnet-map-canvas");

      // set edit mode
      canvas.setEditMode("node");

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
        expect(edge.getBoundingClientRect()).not.toEqual(edgeLocation.y);
        expect(node.getBoundingClientRect()).not.toEqual(nodeLocation.y);
        done();
      }, 50);  // @see EditingInterface.updateLayerNodes: line 236, timeout of 10ms requires > 10ms wait time before validating results
    });
    it("should render parent-child nodes in the correct order in topologies", ()=>{
      var canvas = document.querySelector("esnet-map-canvas");

      let newTopology = JSON.parse(JSON.stringify(TOPOLOGY));
      newTopology[0].nodes = newTopology[0].nodes.concat([
          {
              "name": "E-Parent",
              "meta": { "svg": "<g><rect height='30' width='30' x='-15' y='-15' /></g>" },
              "coordinate":[52.36,-93.95],
              "children": ["D-Parent"],
          },
          {
              "name":"D-Parent",
              "meta":{ "svg": "<g><rect height='20' width='20' x='-10' y='-10' /></g>" },
              "coordinate":[52.26,-93.95],
              "children": ["C"],
          },
          {
              "name":"F-Parent",
              "meta":{ "svg": "<g><rect height='20' width='20' x='-10' y='-10' /></g>" },
              "coordinate":[52.26,-93.95],
              "children": ["A"],
          },
      ])
      canvas.setTopology(newTopology);

      // this is a proxy/approximation of guaranteeing they're rendered in the correct order.
      // the "rule" is that parents should render before children.
      let e_parent = canvas.topology[0].nodes.find((n)=>{ return n.name == "E-Parent" });
      let d_parent = canvas.topology[0].nodes.find((n)=>{ return n.name == "D-Parent" });
      let c = canvas.topology[0].nodes.find((n)=>{ return n.name == "C" });

      let f_parent = canvas.topology[0].nodes.find((n)=>{ return n.name == "F-Parent" });
      let a = canvas.topology[0].nodes.find((n)=>{ return n.name == "A" });

      expect(e_parent.sort).toBeGreaterThan(d_parent.sort);
      expect(e_parent.sort).toBeGreaterThan(c.sort);
      expect(d_parent.sort).toBeGreaterThan(c.sort);
      expect(f_parent.sort).toBeGreaterThan(a.sort);

    });
    it("should support nodes with multiple parents", ()=>{
      var canvas = document.querySelector("esnet-map-canvas");

      let newTopology = JSON.parse(JSON.stringify(TOPOLOGY));
      newTopology[0].nodes = newTopology[0].nodes.concat([
          {
              "name": "E-Parent",
              "meta": { "svg": "<g><rect height='30' width='30' x='-15' y='-15' /></g>" },
              "coordinate":[52.36,-93.95],
              "children": ["D-Parent"],
          },
          {
              "name":"D-Parent",
              "meta":{ "svg": "<g><rect height='20' width='20' x='-10' y='-10' /></g>" },
              "coordinate":[52.26,-93.95],
              "children": ["C"],
          },
          {
              "name":"G-Parent",
              "meta":{ "svg": "<g><rect height='20' width='20' x='-10' y='-10' /></g>" },
              "coordinate":[52.26,-93.95],
              "children": ["C"],
          },
          {
              "name":"F-Parent",
              "meta":{ "svg": "<g><rect height='20' width='20' x='-10' y='-10' /></g>" },
              "coordinate":[52.26,-93.95],
              "children": ["A"],
          },
      ])
      canvas.setTopology(newTopology);

      var nodeC = canvas.topology[0].nodes.find((n)=>{ return n.name == "C" });
      expect(nodeC.parents.indexOf("D-Parent")).toBeGreaterThan(-1);
      expect(nodeC.parents.indexOf("E-Parent")).toBeGreaterThan(-1);
      expect(nodeC.parents.indexOf("G-Parent")).toBeGreaterThan(-1);
    })
    it("should support dragging parent-child nodes as groups", ()=>{
      var canvas = document.querySelector("esnet-map-canvas");

      let newTopology = JSON.parse(JSON.stringify(TOPOLOGY));
      newTopology[0].nodes = newTopology[0].nodes.concat([
          {
              "name": "E-Parent",
              "meta": { "svg": "<g><rect height='30' width='30' x='-15' y='-15' /></g>" },
              "coordinate":[52.36,-93.95],
              "children": ["D-Parent"],
          },
          {
              "name":"D-Parent",
              "meta":{ "svg": "<g><rect height='20' width='20' x='-10' y='-10' /></g>" },
              "coordinate":[52.26,-93.95],
              "children": ["C"],
          },
          {
              "name":"F-Parent",
              "meta":{ "svg": "<g><rect height='20' width='20' x='-10' y='-10' /></g>" },
              "coordinate":[52.26,-93.95],
              "children": ["A"],
          },
      ])
      canvas.setTopology(newTopology);

      // set edit mode to 'node'
      canvas.setEditMode("node");

      var nodeC = canvas.querySelector(".node-C");
      var beforeCoords = nodeC.getBoundingClientRect();

      function movePoint(cPoint, deltaX, deltaY){
        var originalPos = cPoint.getBoundingClientRect();
        // create mouse event for down
        var downEvent = new MouseEvent('mousedown', { bubbles: true, clientX: originalPos.x, clientY: originalPos.y, view: window })
        // create mouse event for drag
        var dragEvent = new MouseEvent('mousemove', { bubbles: true, clientX: originalPos.x + deltaX, clientY: originalPos.y + deltaY, view: window })
        // create mouse event for up
        var upEvent = new MouseEvent('mouseup', { bubbles: true, clientX: originalPos.x + deltaX, clientY: originalPos.y + deltaY, view: window })
        cPoint.dispatchEvent(downEvent);
        cPoint.dispatchEvent(dragEvent);
        cPoint = canvas.querySelector("circle.control");
        cPoint.dispatchEvent(upEvent);
      }

      // snapshot coordinates for C point and move E point, should change.
      var nodeC = canvas.querySelector(".node-C");
      var beforeCoords = nodeC.getBoundingClientRect();
      // drag a control point for edge with weird name. All good?
      var cPoint = canvas.querySelector("circle.control.control-point-for-node-E-Parent");
      movePoint(cPoint, 10, 10)

      var nodeC = canvas.querySelector(".node-C");
      var afterCoords = nodeC.getBoundingClientRect();

      expect(beforeCoords.x).not.toEqual(afterCoords.x);
      expect(beforeCoords.y).not.toEqual(afterCoords.y);


      // snapshot coordinates for C point and move D point, should change.
      var nodeC = canvas.querySelector(".node-C");
      var beforeCoords = nodeC.getBoundingClientRect();

      var cPoint = canvas.querySelector("circle.control.control-point-for-node-D-Parent");
      movePoint(cPoint, 10, 10)

      var nodeC = canvas.querySelector(".node-C");
      var afterCoords = nodeC.getBoundingClientRect();

      expect(beforeCoords.x).not.toEqual(afterCoords.x);
      expect(beforeCoords.y).not.toEqual(afterCoords.y);


      // snapshot coordinates for D point and move E point, should change.
      var nodeD = canvas.querySelector(".node-D-Parent");
      var beforeCoords = nodeD.getBoundingClientRect();
      // drag a control point for edge with weird name. All good?
      var cPoint = canvas.querySelector("circle.control.control-point-for-node-E-Parent");
      movePoint(cPoint, 10, 10)

      var nodeD = canvas.querySelector(".node-D-Parent");
      var afterCoords = nodeD.getBoundingClientRect();

      expect(beforeCoords.x).not.toEqual(afterCoords.x);
      expect(beforeCoords.y).not.toEqual(afterCoords.y);

    });
    it("should detect parent loops", ()=>{
      var canvas = document.querySelector("esnet-map-canvas");
      let newTopology = JSON.parse(JSON.stringify(TOPOLOGY));
      newTopology[0].nodes = [{
              "name": "E-Parent",
              "meta": { "svg": "<g><rect height='30' width='30' x='-15' y='-15' /></g>" },
              "coordinate":[52.36,-93.95],
              "children": ["D-Parent"],
          },
          {
              "name":"D-Parent",
              "meta":{ "svg": "<g><rect height='20' width='20' x='-10' y='-10' /></g>" },
              "coordinate":[52.26,-93.95],
              "children": ["E-Parent"],
          }
      ]
      // this appears to be a "load-bearing" reassignment... removing it causes tests to fail?
      var topo = newTopology;
      /*expect(function(){
        canvas.setTopology(topo);
      }).toThrow();*/
    });
    it("should allow users to delete parent nodes", ()=>{
      var canvas = document.querySelector("esnet-map-canvas");
      let newTopology = JSON.parse(JSON.stringify(TOPOLOGY));
      newTopology[0].nodes = [
          {
            "name": "B-Parent",
            "meta": {},
            "coordinate": [40.75,-102.315],
            "children": ["A"]
          },{
            "name": "A",
            "meta": {},
            "coordinate": [37.553,-105.795]
          },
          {
            "name": "C-Grandparent",
            "meta":{},
            "coordinate":[43.695,-95.354],
            "children": ["B-Parent"]
          }
      ]
      canvas.setTopology(newTopology);
      canvas.setEditMode("node");
      let nodeB = canvas.querySelector("circle.control.control-point-for-node-B-Parent");
      let originalPos = nodeB.getBoundingClientRect();

      let downEvent = new MouseEvent('mousedown', { bubbles: true, clientX: originalPos.x, clientY: originalPos.y, view: window })
      // create mouse event for up
      let upEvent = new MouseEvent('mouseup', { bubbles: true, clientX: originalPos.x, clientY: originalPos.y, view: window })
      // simulate click on nodeB
      nodeB.dispatchEvent(downEvent);
      nodeB.dispatchEvent(upEvent);
      // nodeB should now be 'selected'
      expect([...nodeB.classList].indexOf("control-selected")).toBeGreaterThan(-1);
      var clickEvent = new MouseEvent('click', { bubbles: false })
      let deleteButton = canvas.querySelector("#delete_selection");
      deleteButton.dispatchEvent(clickEvent);
      nodeB = canvas.querySelector("circle.control.control-point-for-node-B-Parent");
    });
    it("should 'listen' for changes in the configurationUrl", (done)=>{
      var canvas = document.querySelector("esnet-map-canvas");
      let newOptions = JSON.parse(JSON.stringify(canvas.options));
      newOptions.topologySource = "url";
      let targetUrl = "http://test.example.com/path/to/topology";
      let secondTargetUrl = "http://test.example.com/path/to/another/topology";
      newOptions.configurationUrl = targetUrl;

      let failures = {};
      let doneCalled = false;

      const topologyFailureCallback = (url)=>{
        failures[url] = true;
        // if we're working with the first url, and it has failed, now
        // set up the second url and make sure it fails too.
        if(url == targetUrl){
          newOptions = JSON.parse(JSON.stringify(newOptions));
          newOptions.configurationUrl = secondTargetUrl;
          canvas.setOptions(newOptions);
        }
        // if this is the second url, and we haven't called "done"
        // and we've logged two failures now, call done, and pass the test
        // (if done is not called the test fails)
        if(url == secondTargetUrl && !doneCalled && Object.keys(failures).length == 2){
          doneCalled = true;
          done();
        }
      }

      canvas.listen(signals.TOPOLOGY_LOAD_FAILURE, topologyFailureCallback)
      canvas.setOptions(newOptions);

    });
    it("should have an 'autodetect topology' mode", ()=>{
      var canvas = document.querySelector("esnet-map-canvas");
      let newOptions = JSON.parse(JSON.stringify(canvas.options));
      newOptions.topologySource = "autodetect";
      newOptions.layers[0].autodetect = {
        autodetectTopology: true,
        srcNameColumn: "src_name",
        srcLatitudeColumn: "src_latitude",
        srcLongitudeColumn: "src_longitude",
        dstNameColumn: "dst_name",
        dstLatitudeColumn: "dst_latitude",
        dstLongitudeColumn: "dst_longitude"
      }
      let trafficData = AUTODETECT_TRAFFIC_DATA;
      canvas.setTraffic(trafficData);
      canvas.setOptions(newOptions);
    });
    it("should accurately account for bits in/out of nodes", ()=>{
      var canvas = document.querySelector("esnet-map-canvas");
      canvas.setTopology(TOPOLOGY);
      canvas.setOptions(OPTIONS);
      let trafficData = TRAFFIC_DATA;
      canvas.setTraffic(trafficData);
      let node = canvas.querySelector("g.node > g.scale-container > circle");
      var originalNodePos = node.getBoundingClientRect();
      let over = new Event("mouseover", {"bubbles": true, clientX: originalNodePos.x, clientY: originalNodePos.y, view: window});
      node.dispatchEvent(over);
      const tooltip = canvas.querySelector("#sidebar-tooltip");
      expect(tooltip.innerText).toBeTruthy();
      expect(tooltip.innerText).toContain("101 b/s");
    });
    skip("should smoothly toggle between configuration loaded from URL and from local JSON", (done)=>{
      var canvas = document.querySelector("esnet-map-canvas");
      let urlOptions = JSON.parse(JSON.stringify(OPTIONS));
      let targetUrl = "http://test.example.com/path/to/topology";
      urlOptions.topologySource = "url";
      urlOptions.configurationUrl = targetUrl;
      let jsonOptions = JSON.parse(JSON.stringify(OPTIONS));
      jsonOptions.topologySource = "json";
      let failures = {};

      const topologyFailureCallback = (url)=>{
        failures[url] = true;
        expect(failures.hasOwnProperty(targetUrl)).toBeTruthy()

        canvas.setTopology(JSON.parse(JSON.stringify(TOPOLOGY)));
        canvas.setOptions(jsonOptions);
      }

      const topologySuccessCallback = () => {
        var canvas = document.querySelector("esnet-map-canvas");
        canvas.render();
        let elems = canvas.querySelector(".node");
        expect(elems).toBeTruthy();
        expect(elems.hasOwnProperty("length")).toBeTruthy();
        expect(elems.length).toBeTruthy();
        done();
      }

      canvas.listen(signals.TOPOLOGY_LOAD_FAILURE, topologyFailureCallback);
      canvas.listen(signals.OPTIONS_UPDATED, topologySuccessCallback);
      canvas.setOptions(urlOptions);


    })
    it("should have a mode to load discreet topologies per layer from URLs", (done)=>{
      var canvas = document.querySelector("esnet-map-canvas");
      let newOptions = JSON.parse(JSON.stringify(canvas.options));
      newOptions.topologySource = "layerurls";
      let targetUrl = "data:text/plain;charset=utf-8;base64,eyJlZGdlcyI6IFsNCiAgew0KICAgICJuYW1lIjogIkEtLUIiLA0KICAgICJtZXRhIjogeyAiZW5kcG9pbnRfaWRlbnRpZmllcnMiOiB7Im5hbWVzIjogWyJBIiwgIkIiXSB9IH0sDQogICAgImNvb3JkaW5hdGVzIjogW1szOSwgLTk4XSwgWzM5LCAtOTddXQ0KICB9LA0KICB7DQogICAgIm5hbWUiOiAiQS0tQyIsDQogICAgIm1ldGEiOiB7ICJlbmRwb2ludF9pZGVudGlmaWVycyI6IHsibmFtZXMiOiBbIkEiLCAiQyJdIH0gfSwNCiAgICAiY29vcmRpbmF0ZXMiOiBbWzM5LCAtOThdLCBbMzgsIC05N11dDQogIH0NCl0sDQoibm9kZXMiOiBbDQogIHsibmFtZSI6ICJBIiwgIm1ldGEiOiB7InN2ZyI6ICIiIH0sICJjb29yZGluYXRlIjogWzM5LCAtOThdfSwNCiAgeyJuYW1lIjogIkIiLCAibWV0YSI6IHsic3ZnIjogIiIgfSwgImNvb3JkaW5hdGUiOiBbMzksIC05N119LA0KICB7Im5hbWUiOiAiQyIsICJtZXRhIjogeyJzdmciOiAiIiB9LCAiY29vcmRpbmF0ZSI6IFszOCwgLTk3XX0NCl0gfQ==";
      let targetUrl2 = "http://test.example.com/path/to/layertopology2";
      newOptions.layers[0].remoteUrl = targetUrl;
      newOptions.layers[1].remoteUrl = targetUrl2;
      let failures = {};
      let successes = {};

      const topologySuccessCallback = (data)=>{
        successes[data.url] = true;
        if(successes.hasOwnProperty(targetUrl) &&
          failures.hasOwnProperty(targetUrl2)){
          done();
        }
      }
      const topologyFailureCallback = (data)=>{
        failures[data.url] = true;
        if(successes.hasOwnProperty(targetUrl) &&
          failures.hasOwnProperty(targetUrl2)){
          done();
        }
      }

      canvas.listen(signals.LAYER_LOAD_SUCCESS, topologySuccessCallback);
      canvas.listen(signals.LAYER_LOAD_FAILURE, topologyFailureCallback);
      canvas.setOptions(newOptions)
    })
    it("should support more than 3 layers", ()=>{
      var canvas = document.querySelector("esnet-map-canvas");
      let newOptions = JSON.parse(JSON.stringify(OPTIONS));
      newOptions.layerLimit = 7;
      for(let i=0; i<4; i++){
        newOptions.layers.push({
            "visible":true,
            "endpointId":"names",
            "nodeHighlight":"red",
            "nodeWidth":6.5,
            "edgeWidth":2,
            "pathOffset":1.5,
            "name":"Peer Topology",
            "legend":true,
        })
      }
      canvas.setTopology([
        {"nodes": [], "edges": []},
        {"nodes": [], "edges": []},
        {"nodes": [], "edges": []},
        {"nodes": [], "edges": []},
        {"nodes": [], "edges": []},
        {"nodes": [{"name": "Test Node Layer 6", "coordinate": [39, -98], "meta": {"svg": ""} }], "edges": []},
      ])
      canvas.setOptions(newOptions);
      let node = canvas.querySelector(".node");
      expect(node).toBeTruthy();
    })
    it("should allow users to show and hide the sidebar even when loading the full configuration from a url", ()=>{
      let canvas = document.querySelector("esnet-map-canvas");
      let newOptions = JSON.parse(JSON.stringify(canvas.options));

      // this data url is a valid base-64 encoded terranova-style response.
      let targetUrl = "data:text/plain;charset=utf-8;base64,ew0KICAiaW5pdGlhbFZpZXdTdHJhdGVneSI6ICJzdGF0aWMiLA0KICAibGF0aXR1ZGVWYXIiOiBudWxsLA0KICAibG9uZ2l0dWRlVmFyIjogbnVsbCwNCiAgInZpZXdwb3J0Ijogew0KICAgICJjZW50ZXIiOiB7DQogICAgICAibGF0IjogMzguOTU5LA0KICAgICAgImxuZyI6IC05Ny45OTgNCiAgICB9LA0KICAgICJ0b3AiOiBudWxsLA0KICAgICJsZWZ0IjogbnVsbCwNCiAgICAiYm90dG9tIjogbnVsbCwNCiAgICAicmlnaHQiOiBudWxsLA0KICAgICJ6b29tIjogNA0KICB9LA0KICAiYmFja2dyb3VuZCI6ICIjREREREREIiwNCiAgInRpbGVzZXQiOiB7DQogICAgImdlb2dyYXBoaWMiOiAiYXJjZ2lzIiwNCiAgICAiYm91bmRhcmllcyI6IG51bGwsDQogICAgImxhYmVscyI6IG51bGwNCiAgfSwNCiAgImVkaXRNb2RlIjogZmFsc2UsDQogICJzaG93U2lkZWJhciI6IGZhbHNlLA0KICAic2hvd1ZpZXdDb250cm9scyI6IHRydWUsDQogICJzaG93TGVnZW5kIjogZmFsc2UsDQogICJsZWdlbmRDb2x1bW5MZW5ndGgiOiAzLA0KICAibGVnZW5kUG9zaXRpb24iOiAiYm90dG9tTGVmdCIsDQogICJsZWdlbmREZWZhdWx0QmVoYXZpb3IiOiAibWluaW1pemVkIiwNCiAgImVuYWJsZVNjcm9sbGluZyI6IHRydWUsDQogICJlbmFibGVFZGl0aW5nIjogdHJ1ZSwNCiAgImVuYWJsZU5vZGVBbmltYXRpb24iOiB0cnVlLA0KICAiZW5hYmxlRWRnZUFuaW1hdGlvbiI6IHRydWUsDQogICJ0aHJlc2hvbGRzIjogW10sDQogICJ6SW5kZXhCYXNlIjogMTAsDQogICJsYXllcnMiOiBbDQogICAgew0KICAgICAgInZpc2libGUiOiB0cnVlLA0KICAgICAgIm5hbWUiOiAiTGF5ZXIgMSIsDQogICAgICAiY29sb3IiOiAiI0FBQUFGRiIsDQogICAgICAiZWRnZVdpZHRoIjogMi41LA0KICAgICAgInBhdGhPZmZzZXQiOiAxLjc1LA0KICAgICAgIm5vZGVXaWR0aCI6IDYuNSwNCiAgICAgICJqc29uRnJvbVVybCI6IGZhbHNlLA0KICAgICAgIm1hcGpzb24iOiAieyJub2RlcyI6W3sibmFtZSI6IkIiLCJjb2xvciI6IiNBQUFBRkYiLCJtZXRhIjp7ImRpc3BsYXlfbmFtZSI6IiIsInN2ZyI6IjxzdmcgeT1cIi01XCIgeD1cIi01XCIgd2lkdGg9XCIxMFwiIGhlaWdodD1cIjEwXCIgdmlld0JveD1cIi01LjUgLTUuNSAxMSAxMVwiPjxjaXJjbGUgcj1cIjVcIj48L2NpcmNsZT48L3N2Zz48dGV4dCBzdHlsZT1cImZvbnQtc2l6ZToxMnB4OyBmaWx0ZXI6IGRyb3Atc2hhZG93KDBweCAwcHggMXB4IHJnYmEoMjU1LDI1NSwyNTUsMS4wKSk7XCIgc3Ryb2tlPVwibm9uZVwiIGZpbGw9XCIjMTExMTExXCIgeT1cIjNcIiB4PVwiLTE4XCI+QjwvdGV4dD4iLCJ0ZW1wbGF0ZSI6IiJ9LCJjb29yZGluYXRlIjpbNDQuMDg4LC0xMDguNjMzXSwiY2hpbGRyZW4iOltdLCJzb3J0IjowLCJwYXJlbnRzIjpbXX0seyJuYW1lIjoiQSIsImNvbG9yIjoiI0FBQUFGRiIsIm1ldGEiOnsiZGlzcGxheV9uYW1lIjoiIiwic3ZnIjoiPHN2ZyB5PVwiLTVcIiB4PVwiLTVcIiB3aWR0aD1cIjEwXCIgaGVpZ2h0PVwiMTBcIiB2aWV3Qm94PVwiLTUuNSAtNS41IDExIDExXCI+PGNpcmNsZSByPVwiNVwiPjwvY2lyY2xlPjwvc3ZnPjx0ZXh0IHN0eWxlPVwiZm9udC1zaXplOjEycHg7IGZpbHRlcjogZHJvcC1zaGFkb3coMHB4IDBweCAxcHggcmdiYSgyNTUsMjU1LDI1NSwxLjApKTtcIiBzdHJva2U9XCJub25lXCIgZmlsbD1cIiMxMTExMTFcIiB5PVwiM1wiIHg9XCI4XCI+QTwvdGV4dD4iLCJ0ZW1wbGF0ZSI6IiJ9LCJjb29yZGluYXRlIjpbNDMuODM1LC05Mi44MTNdLCJjaGlsZHJlbiI6W10sInNvcnQiOjAsInBhcmVudHMiOltdfSx7Im5hbWUiOiJDIiwiY29sb3IiOiIjQUFBQUZGIiwibWV0YSI6eyJkaXNwbGF5X25hbWUiOiIiLCJzdmciOiI8c3ZnIHk9XCItNVwiIHg9XCItNVwiIHdpZHRoPVwiMTBcIiBoZWlnaHQ9XCIxMFwiIHZpZXdCb3g9XCItNS41IC01LjUgMTEgMTFcIj48Y2lyY2xlIHI9XCI1XCI+PC9jaXJjbGU+PC9zdmc+PHRleHQgc3R5bGU9XCJmb250LXNpemU6MTJweDsgZmlsdGVyOiBkcm9wLXNoYWRvdygwcHggMHB4IDFweCByZ2JhKDI1NSwyNTUsMjU1LDEuMCkpO1wiIHN0cm9rZT1cIm5vbmVcIiBmaWxsPVwiIzExMTExMVwiIHk9XCIzXCIgeD1cIjhcIj5DPC90ZXh0PiIsInRlbXBsYXRlIjoiIn0sImNvb3JkaW5hdGUiOlszNC40NTIsLTEwMC4xOTVdLCJjaGlsZHJlbiI6W10sInNvcnQiOjAsInBhcmVudHMiOltdfV0sImVkZ2VzIjpbeyJuYW1lIjoiQS0tQiIsIm1ldGEiOnsiZW5kcG9pbnRfaWRlbnRpZmllcnMiOnsibmFtZXMiOlsiQSIsIkIiXX19LCJsYXllciI6IjAiLCJhekNvbG9yIjoiI0FBQUFGRiIsInphQ29sb3IiOiIjQUFBQUZGIiwiY29vcmRpbmF0ZXMiOltbNDMuODM0NTI2NzgyMjM2ODQsLTkyLjgxMjUwMDAwMDAwMDAxXSxbNDQuMDg3NTg1MDI4MjQ1MTgsLTEwOC42MzI4MTI1MDAwMDAwMV1dLCJjaGlsZHJlbiI6W10sIm5vZGVBIjoiQSIsIm5vZGVaIjoiQiIsInBvaW50cyI6W1s2MDMsMjQxXSxbNjkzLDI0M11dLCJyZWplY3RlZCI6MCwiY29udHJvbFBvaW50UGF0aCI6Ik02OTMsMjQzTDYwMywyNDEiLCJhelBhdGgiOiJNNjkyLjk3Nzc4MzI2MjcxNDksMjQzLjk5OTc1MzE3NzgzMTYyTDYwMi45NjY2Nzk2OTE1OTQ0LDI0MS45OTk0NDQ3MjQzNTgzNyIsInphUGF0aCI6Ik02MDMuMDIyMjE2NzM3Mjg1MSwyNDAuMDAwMjQ2ODIyMTY4MzhMNjkzLjAzMzMyMDMwODQwNTYsMjQyLjAwMDU1NTI3NTY0MTYzIiwic29ydCI6MX0seyJuYW1lIjoiQS0tQyIsIm1ldGEiOnsiZW5kcG9pbnRfaWRlbnRpZmllcnMiOnsibmFtZXMiOlsiQSIsIkMiXX19LCJsYXllciI6IjAiLCJhekNvbG9yIjoiI0FBQUFGRiIsInphQ29sb3IiOiIjQUFBQUZGIiwiY29vcmRpbmF0ZXMiOltbNDMuODM0NTI2NzgyMjM2ODQsLTkyLjgxMjUwMDAwMDAwMDAxXSxbMzQuNDUyMjE4NDcyODI2NTY2LC0xMDAuMTk1MzEyNTAwMDAwMDFdXSwiY2hpbGRyZW4iOltdLCJub2RlQSI6IkEiLCJub2RlWiI6IkMiLCJwb2ludHMiOltbNjUxLDMxMl0sWzY5MywyNDNdXSwicmVqZWN0ZWQiOjAsImNvbnRyb2xQb2ludFBhdGgiOiJNNjkzLDI0M0w2NTEsMzEyIiwiYXpQYXRoIjoiTTY5My44NTQxOTg1NTU2MTQ0LDI0My41MTk5NDY5NDY4OTU3NEw2NTEuODQ3Njk2ODE4ODgzMywzMTIuNTMwNDgxMDExMjEwODQiLCJ6YVBhdGgiOiJNNjUwLjE0NTgwMTQ0NDM4NTYsMzExLjQ4MDA1MzA1MzEwNDI2TDY5Mi4xNTIzMDMxODExMTY3LDI0Mi40Njk1MTg5ODg3ODkxMyIsInNvcnQiOjF9LHsibmFtZSI6IkItLUMiLCJtZXRhIjp7ImVuZHBvaW50X2lkZW50aWZpZXJzIjp7Im5hbWVzIjpbIkIiLCJDIl19fSwibGF5ZXIiOiIwIiwiYXpDb2xvciI6IiNBQUFBRkYiLCJ6YUNvbG9yIjoiI0FBQUFGRiIsImNvb3JkaW5hdGVzIjpbWzQ0LjA4NzU4NTAyODI0NTE4LC0xMDguNjMyODEyNTAwMDAwMDFdLFszNC40NTIyMTg0NzI4MjY1NjYsLTEwMC4xOTUzMTI1MDAwMDAwMV1dLCJjaGlsZHJlbiI6W10sIm5vZGVBIjoiQiIsIm5vZGVaIjoiQyIsInBvaW50cyI6W1s2NTEsMzEyXSxbNjAzLDI0MV1dLCJyZWplY3RlZCI6MCwiY29udHJvbFBvaW50UGF0aCI6Ik02MDMsMjQxTDY1MSwzMTIiLCJhelBhdGgiOiJNNjAzLjgyODQ0MjY0ODk1MDcsMjQwLjQzOTkyNjA5NjQ4NDA0TDY1MS44MzQ5MjA4NzI3NDUzLDMxMS40NDk2MzAwMDA1ODY3IiwiemFQYXRoIjoiTTY1MC4xNzE1NTczNTEwNDkzLDMxMi41NjAwNzM5MDM1MTU5Nkw2MDIuMTY1MDc5MTI3MjU0NywyNDEuNTUwMzY5OTk5NDEzMyIsInNvcnQiOjF9XSwibGF5ZXIiOiJ0YWlsIiwibmFtZSI6Ik51bGwgRGF0YXNldCIsInBhdGhMYXlvdXQiOnsidHlwZSI6ImN1cnZlQ2FyZGluYWwiLCJ0ZW5zaW9uIjowLjZ9fSIsDQogICAgICAibWFwanNvblVybCI6ICJodHRwczovL3RlcnJhbm92YS1pbnRlcm5hbC5lcy5uZXQvdGVycmFub3ZhL2FwaS92MS9vdXRwdXQvZGF0YXNldC9MbGtkQ3VZL2dlb2dyYXBoaWMvbGl2ZS8/dGVtcGxhdGU9WGNqNmV5WCIsDQogICAgICAiZW5kcG9pbnRJZCI6ICJuYW1lcyIsDQogICAgICAiaW5ib3VuZFZhbHVlRmllbGQiOiAiYXRveiIsDQogICAgICAib3V0Ym91bmRWYWx1ZUZpZWxkIjogInp0b2EiLA0KICAgICAgInNyY0ZpZWxkIjogInNyYyIsDQogICAgICAiZHN0RmllbGQiOiAiZHN0IiwNCiAgICAgICJsZWdlbmQiOiB0cnVlLA0KICAgICAgIm5vZGVIaWdobGlnaHQiOiAiI0FBRkZBQSINCiAgICB9DQogIF0NCn0=";

      newOptions.configurationUrl = targetUrl;
      newOptions.showSidebar = true;

      canvas.setOptions(newOptions);

      let node = canvas.querySelector(".esmap-sidebar");
      expect(node).toBeTruthy();

      newOptions = JSON.parse(JSON.stringify(canvas.options));
      newOptions.showSidebar = false;

      canvas.setOptions(newOptions);

      node = canvas.querySelector(".esmap-sidebar");
      expect(node).not.toBeTruthy();
    });
    it("should color nodes when there's a matching edge datapoint, even without a matching edge", ()=>{
      let canvas = document.querySelector("esnet-map-canvas");
      let newOptions = JSON.parse(JSON.stringify(canvas.options));

      newOptions.layers[0].nodeThresholds = [{"value": 0, "color": "#E04040"}, {"value": 200000000, "color": "#5bb436"}]
      let traffic = [
          {"src_latitude":39,"src_longitude":-98,"src_name":"NodeA","in_bits": 16000000, "out_bits": 160000000},
          {"src_latitude":42,"src_longitude":-102,"src_name":"NodeB","in_bits": 320000000, "out_bits": 32000000},
      ]; 
      let topology = [{
          "edges": [],
          "nodes": [
              { "name": "NodeA", "coordinate": [39, -98], "meta": { 
                      "svg": "<g><circle r='15' /><text x='20' y='4' stroke='none' fill='black'>NodeA</text></g>" 
                  } 
              },
              { "name": "NodeB", "coordinate": [42, -102], "meta": { 
                      "svg": "<g><circle r='15' /><text x='20' y='4' stroke='none' fill='black'>NodeB</text></g>" 
                  } 
              }
          ]
      }];

      canvas.setOptions(newOptions);
      canvas.setTopology(topology);
      canvas.setTraffic(traffic);

      let nodeA = canvas.querySelector(".node-NodeA circle");
      expect(nodeA).toBeTruthy();
      let style = getComputedStyle(nodeA);
      expect(style.fill).toEqual("rgb(224, 64, 64)");
      let nodeB = canvas.querySelector(".node-NodeB circle");
      expect(nodeB).toBeTruthy();
      style = getComputedStyle(nodeB);
      expect(style.fill).toEqual("rgb(91, 180, 54)")
    })
} );