import * as pubsub from './pubsub.js';
const PubSub = pubsub.PubSub;
import * as d3_import from './d3.min.js';
// populate either with import or ES6 root-scope version
const d3 = window['d3'] || d3_import;
import { render as renderTemplate } from "./rubbercement.js"
import { defaultEdgeTooltip, defaultNodeTooltip, defaultDisplayNameTooltip } from "../../options.js";
import * as L from "./leaflet-src.esm.js";
import { signals } from '../../signals.js';

// functions to calculate bearings between two points
// Converts from degrees to radians.
export function toRadians(degrees) {
  return degrees * Math.PI / 180;
};

// Converts from radians to degrees.
export function toDegrees(radians) {
  return radians * 180 / Math.PI;
}

export function bearingAngle(src, dest){
  const deltaX = dest[0] - src[0];
  const deltaY = dest[1] - src[1];

  const slope = deltaY / deltaX;
  const angleInRads = Math.atan(slope);
  return toDegrees(angleInRads);
}

function pathCrawl(path, klass, color, edgeWidth){
    if(!path) return;
    var svgns = "http://www.w3.org/2000/svg";

    var totalDashWidth = 12;
    for(var i=0; i<Math.floor(path.getTotalLength() / totalDashWidth); i++){
      var value = path.getAttribute("d");
      var dashWidth = edgeWidth * 1.2; // this will vary with the stroke width for the line
      var g = document.createElementNS(svgns, 'g');
      g.setAttributeNS(null, "class", klass);
      var rect = document.createElementNS(svgns, "polygon");
      rect.setAttributeNS(null, "points", `
        ${(totalDashWidth / 5 * 3)-(dashWidth/3)*2},${dashWidth}
        -${(dashWidth/3) * 2},${dashWidth}
        0,0
        -${(dashWidth/3) * 2},-${dashWidth}
        ${(totalDashWidth / 5 * 3)-(dashWidth/3)*2},-${dashWidth}
        ${(totalDashWidth / 5 * 3)},0`)
      rect.setAttributeNS(null, "fill", color);
      var pointOnPath = i * totalDashWidth;
      var nextPointOnPath = ((i+1) * totalDashWidth) > path.getTotalLength() ? path.getTotalLength() : ((i+1) * totalDashWidth);
      var point = path.getPointAtLength(pointOnPath);
      var nextPoint = path.getPointAtLength(nextPointOnPath);
      var vector = { dx: nextPoint.x - point.x, dy: nextPoint.y - point.y}
      var rotationInRads = Math.atan2(vector.dy, vector.dx);
      var rotationInDegs = rotationInRads * (180 / Math.PI);
      g.setAttributeNS(null, "transform", `translate(${point.x} ${point.y}) rotate(${rotationInDegs})`);
      g.appendChild(rect);
      path.parentElement.insertBefore(g, path);
    }
}

function sanitizeName(name){
  const separator = "S_S_E_E_P_P_A_A_R_R_A_A_T_T_O_O_R_R"
  var sanitized = name.replaceAll("--", separator) // deal with the edge name separator first
  sanitized = sanitized.replaceAll(/[ \-\/\\]+/g, "-"); // replace series of spaces, hyphens, / and \ characters with -
  sanitized = sanitized.replaceAll(/[^\w-]/g, ''); // replace anything other than alphanum and hyphen with empty string
  sanitized = sanitized.replaceAll(separator, "--") // deal with the edge name separator first
  return sanitized;
}

function renderEdges(g, data, ref, layerId) {
  var div = ref.div;
  const edgeWidth = ref.mapCanvas.options.layers[layerId].edgeWidth;
  const endpointId = ref.mapCanvas.options.layers[layerId].endpointId;
  const defaultEdgeColor = ref.mapCanvas.options.layers[layerId].color;
  var azLines = g.selectAll('path.edge-az').data(data.edges);

  const doEdgeMouseOver = (event, d) => {
    var start = new Date();
    var thisEdge = d3.select(event.target)
    const isAZ = thisEdge.classed("edge-az");
    var color = d.azColor ? d.azColor : defaultEdgeColor;
    if(!isAZ){
      color = d.zaColor ? d.zaColor : defaultEdgeColor;
    }

    if(!thisEdge.classed('animated-edge')){
      pathCrawl(event.target, "dash-over", color, edgeWidth);
      thisEdge.classed("animated-edge", true);
    }

    ref.mapCanvas.hideTooltip();

    var template = ref.mapCanvas.options.enableCustomEdgeTooltip ? ref.mapCanvas.options.customEdgeTooltip : defaultEdgeTooltip;

    // Use the given "displayName" if one is provided only when the default tooltip is selected
    // This assumes that nothing else is to be displayed besides what is given
    // I.e. not displaying the in or out values
    if ("displayName" in d?.meta && !ref.mapCanvas.options.enableCustomEdgeTooltip) {
      template = defaultDisplayNameTooltip;
    }

    // Try to sanitize any unique ID from the node/edge names
    d.nodeA = d.nodeA.split("--")[0];
    d.nodeZ = d.nodeZ.split("--")[0];

    const forward = { from: d.nodeA, to: d.nodeZ, dataPoint: d.azDisplayValue };
    const reverse = { from: d.nodeZ, to: d.nodeA, dataPoint: d.zaDisplayValue };

    let renderData = {
      forward: isAZ ? forward : reverse,
      reverse: isAZ ? reverse : forward,
    };
    var text = renderTemplate(template, { ...renderData, ...d});

    ref.mapCanvas.showTooltip(event, text);
  }

  const doEdgeMouseOut = (event, d) => {
    var start = new Date();
    ref.mapCanvas.hideTooltip();

    const thisEdge = d3.select(event.target);
    var color = d.azColor ? d.azColor : defaultEdgeColor // assume it's an A-Z edge by default, and get the a-z color
    if(thisEdge.classed("edge-za")){
      color = d.zaColor ? d.zaColor : defaultEdgeColor // but if it's really a Z-A edge, get that color
    }
    thisEdge.attr('stroke', color);
    var dashes = document.querySelectorAll(".dash-over");
    for(var i=0; i<dashes.length; i++){
        dashes[i].remove();
    }
    if(thisEdge.classed("selected")){ return }
    thisEdge.classed("animated-edge", false);
  }

  azLines
    .enter()
    //-- A to Z path
    .append('path')
    .merge(azLines)
    .attr('d', function (d) {
      if(d.azPath.indexOf("NaN") > -1){
        return null
      }
      return d.azPath;
    })
    .attr('stroke', function (d) {
      return d.azColor ? d.azColor : defaultEdgeColor;
    })
    .attr('stroke-width', edgeWidth)
    .attr('class', function (d) {
      var name = sanitizeName(d.name);
      var connections = " cnxn-"+name.split("--").join(" cnxn-");
      var layerClass = ' l'+layerId;
      return 'edge edge-az edge-az-' + name + connections + layerClass;
    })
    .attr('text', function (d) {
      return d.AZname;
    })
    .attr('pointer-events', 'stroke')
    .on('mousedown', function(event, d){
      event.stopPropagation();
      ref.mapCanvas.clearSelection();
      const selectionData = {
        selection: d,
        event: event,
        layer: layerId,
        type: "edge",
        instance: ref.mapCanvas.id,
      }
      ref.mapCanvas.emit(signals.VARIABLES_SET, d);
      ref.mapCanvas.setSelection(selectionData);
      PubSub.global.publish(signals.SELECTION_SET, selectionData); // send signal globally
    })
    .on('mouseover', doEdgeMouseOver)
    .on('mouseout', doEdgeMouseOut);
  azLines.exit().remove();


  var zaLines = g.selectAll('path.edge-za').data(data.edges);
  zaLines
    .enter()
    //-- Z to A path
    .append('path')
    .merge(zaLines)
    .attr('d', function (d) {
      if(d.zaPath.indexOf("NaN") > -1){
        return null
      }
      return d.zaPath;
    })
    .attr('stroke', function (d) {
      return d.zaColor ? d.zaColor : defaultEdgeColor;
    })
    /*.attr('marker-mid', function (d, i) {
      return 'url(#arrow)';
    })*/
    .attr('stroke-width', edgeWidth)
    .attr('class', function (d) {
      var name = sanitizeName(d.name);
      var connections = " cnxn-"+name.split("--").join(" cnxn-");
      if(d.meta?.endpoint_identifiers?.[endpointId] && d.meta.endpoint_identifiers[endpointId]?.length){
        connections += " cnxn-"+d.meta.endpoint_identifiers[endpointId].join(" cnxn-");
      }
      var layerClass = ' l'+layerId;
      return 'edge edge-za edge-za-' + name + connections + layerClass;
    })
    .attr('text', function (d) {
      return d.ZAname;
    })
    .attr('pointer-events', 'stroke')
    .on('mousedown', function(event, d){
      event.stopPropagation();
      ref.mapCanvas.clearSelection();
      const selectionData = {
        selection: d,
        event: event,
        layer: layerId,
        type: "edge",
      }
      ref.mapCanvas.emit(signals.VARIABLES_SET, d);
      ref.mapCanvas.setSelection(selectionData);
      PubSub.global.publish(signals.SELECTION_SET, selectionData); // send signal globally
    })
    .on('mouseover', doEdgeMouseOver)
    .on('mouseout', doEdgeMouseOut);
  zaLines.exit().remove();

  function selectEdge(stale){
    return (selectionData) => {
      // if no selectiondata, selectiondata isn't an edge, or this is the wrong layer, return.
      if(!selectionData || selectionData.type!='edge' || selectionData['layer'] != layerId) return;

      var dashes = document.querySelectorAll(".dash-selected, .dash-over");
      for(var i=0; i<dashes.length; i++){
          dashes[i].remove();
      }
      // deselect old edges
      d3.selectAll(".selected")
        .classed('selected', false)
        .classed('animated-edge', false);
      // sanitize name from the edge
      var name = sanitizeName(selectionData.selection.name);
      var mapId = "map-" + ref.mapCanvas.instanceId;
      // assemble edge names to select
      var edgeDirectionToColor = {
        "az": { "selector": `#${mapId} .l${selectionData.layer}.edge-az-${name}`, "color": selectionData.selection.azColor },
        "za": { "selector": `#${mapId} .l${selectionData.layer}.edge-za-${name}`, "color": selectionData.selection.zaColor }
      }
      // do steps for path crawl and selection
      Object.keys(edgeDirectionToColor).forEach((direction)=>{
          var edgeColor = defaultEdgeColor;
          var color = edgeDirectionToColor[direction]["color"];
          var selector = edgeDirectionToColor[direction]["selector"];
          if(color){ // this can be nully
            edgeColor = color;
          }
          // select edge
          var edge = d3.select(selector);
          // crawl edge
          pathCrawl(edge.node(),
            "dash-selected",
            edgeColor,
            edgeWidth);
          // hide "real" edge in favor of the crawling edge
          edge
            .classed('selected', true)
            .classed('animated-edge', true);
      })
    }
  }

  ref.mapCanvas.listen(signals.SELECTION_SET, selectEdge(false));

  var selection = ref.mapCanvas.lastValue(signals.SELECTION_SET);
  selectEdge(true)(selection);
}

function deleteControlPoint(evt, d, edgeData, ref, layerId){
  for(var i=0; i<edgeData.coordinates.length; i++){
    if(edgeData.coordinates[i] == d){
      var oldEdgeData = JSON.parse(JSON.stringify(edgeData));
      edgeData.coordinates.splice(i, 1);
      ref.mapCanvas.emit(signals.EDGE_UPDATED, {"layer": layerId, "edge": edgeData, "oldEdge": oldEdgeData });
      ref.mapCanvas.setTopology(ref.data);
      ref.mapCanvas.render();
      break;
    }
  }
}

function addControlPoint(evt, obj, ref, layerId) {

  var mapDiv = ref.leafletMap.getContainer();
  var ll = ref.leafletMap.containerPointToLatLng(L.point(d3.pointer(evt, mapDiv)));
  var oldEdgeData = JSON.parse(JSON.stringify(obj.__data__))

  // we know the mouse is on one of the segmets
  // figure out difference in able between each pair of points and the click point
  // if the delta is nearly 0 we have a match
  // https://stackoverflow.com/questions/21608853/add-a-vertex-in-the-middle-of-a-path-with-d3js
  var coordinates = obj.__data__.coordinates;
  var target = [ll.lat, ll.lng];

  var idx = 0;
  var splicePoint = 0;
  var found = 0;
  var minDelta = 1000;
  for (idx = 0; idx < coordinates.length - 1; idx++) {
    var angleA = Math.abs(Math.atan((coordinates[idx][1] - target[1]) / (coordinates[idx][0] - target[0])));
    var angleB = Math.abs(Math.atan((coordinates[idx][1] - coordinates[idx + 1][1]) / (coordinates[idx][0] - coordinates[idx + 1][0])));

    var delta = Math.abs(angleA - angleB);
    if (delta < 0.1 && delta < minDelta) {
      // with slop click point lays on the line between current and next point
      minDelta = delta;
      splicePoint = idx + 1;
      found = 1;
    }
  }

  if (found == 1) {
    // insert target into the array at idx
    var tmp = coordinates.slice(0, splicePoint);
    tmp.push(target);
    coordinates = tmp.concat(coordinates.slice(splicePoint));
    obj.__data__.coordinates = coordinates;
    ref.update();
    ref.mapCanvas.emit(signals.EDGE_UPDATED, {"layer": layerId, "edge": obj.__data__, "oldEdge": oldEdgeData });
    ref.mapCanvas.emit(signals.TOPOLOGY_UPDATED, JSON.parse(JSON.stringify(ref.mapCanvas.topology)));
  }
}

function doChildSnap(nodeData, layerId, mapCanvas, sendSignal){
    let mapId = "map-" + mapCanvas.instanceId;
    let layerSelector = !mapCanvas.options.multiLayerNodeSnap ? `.l${layerId}` : ``;

    let prevState = mapCanvas.lastValue(signals.private.DRAG_STARTED);

    let ll = {};
    ll.lat = nodeData['coordinate'][0];
    ll.lng = nodeData['coordinate'][1];

    let childrenSelector = ".node-child-of-" + sanitizeName(nodeData.name);
    let selector = `#${mapId} ${childrenSelector}`;

    // calculate the delta since last drag event
    let delta = [
      nodeData.coordinate[0] - prevState?.node?.coordinate[0],
      nodeData.coordinate[1] - prevState?.node?.coordinate[1]
    ];
    // procedure for updating the children:
    // get all the children that have "nodeData.name" as a parent
    d3.selectAll(selector)
        .attr('d', function(d){
            let oldNodeData = null;
            if(!!sendSignal){
              oldNodeData = JSON.parse(JSON.stringify(d));
            }
            if(prevState){
              d.coordinate[0] += delta[0];
              d.coordinate[1] += delta[1];
              doEdgeSnap(d, layerId, mapCanvas, sendSignal);
            }
            if(!!sendSignal){
              mapCanvas.emit(signals.NODE_UPDATED, {"layer": layerId, "node": d, "oldNode": oldNodeData });
            }
        })
}

function doEdgeSnap(nodeData, layerId, mapCanvas, sendSignal){
    var mapId = "map-" + mapCanvas.instanceId;
    var layerSelector = !mapCanvas.options.multiLayerNodeSnap ? `.l${layerId}` : ``;
    var ll = {};
    ll.lat = nodeData['coordinate'][0];
    ll.lng = nodeData['coordinate'][1];

    // procedure for updating the edge:
    // get all edges that have "nodeData.name" as a node
    var selector = `#${mapId} ${layerSelector}.cnxn-${sanitizeName(nodeData.name)}`;
    d3.selectAll(selector)
        // for each edge that we select:
        .attr('d', function (d) {
          var oldEdgeData = null;
          if(!!sendSignal){
            oldEdgeData = JSON.parse(JSON.stringify(d));
          }
          // if we are manipulating the "A" end
          // the index of the point we want is 0
          var idx = 0;
          var step = 1;
          var end = d.coordinates.length - 1;
          if(d.nodeZ == nodeData.name){
            // if we are manipulating the "Z" end
            // the index of the point we want is the last one
            idx = d.coordinates.length - 1;
            step = -1;
            end = 0;
          }
          // manipulate the point
          d.coordinates[idx][0] = ll.lat;
          d.coordinates[idx][1] = ll.lng;
          // and each of the other points (but not the endpoint);
          var totalCtrlPnts = d.coordinates.length - 1;
          var latDelta = (ll.lat - d.coordinates[end][0]) / (totalCtrlPnts);
          var lngDelta = (ll.lng - d.coordinates[end][1]) / (totalCtrlPnts);
          for(var i=(idx + step); i != end; i += step){
            if(end > 0){
              d.coordinates[i][0] = ll.lat - latDelta * i;
              d.coordinates[i][1] = ll.lng - lngDelta * i;
            } else {
              d.coordinates[i][0] = d.coordinates[end][0] + latDelta * i;
              d.coordinates[i][1] = d.coordinates[end][1] + lngDelta * i;
            }
          }
          if(!!sendSignal){
            mapCanvas.emit(signals.EDGE_UPDATED, {"layer": layerId, "edge": d, "oldEdge": oldEdgeData });
          }
        })
}


function renderNodeControl(g, data, ref, layerId){
  var feature = g.selectAll('circle').data(data.nodes);

  const setNodeEditSelection = (evtData)=>{
    if(evtData && evtData['type'] == "nodes"){
      d3.selectAll(".control-selected")
        .classed("control-selected", false);
      var selector = `.controlPoint.control-point-layer${evtData["layer"]}.control-point-for-node-${sanitizeName(evtData["object"].name)}`;
      d3.select(selector)
        .classed("control-selected", true);
    }
  }

  function dragged(evt, nodeData) {
    var mapDiv = ref.leafletMap.getContainer();
    ref.mapCanvas.emit(signals.private.DRAG_STARTED, { event: evt, node: JSON.parse(JSON.stringify(nodeData)) });
    //--- set the control points to the new Lat lng
    var ll = ref.leafletMap.containerPointToLatLng(L.point(d3.pointer(evt, mapDiv)));
    nodeData['coordinate'][0] = ll.lat;
    nodeData['coordinate'][1] = ll.lng;
    doEdgeSnap(nodeData, layerId, ref.mapCanvas, false);
    doChildSnap(nodeData, layerId, ref.mapCanvas, false);
    //--- rerender stuff
    ref.update();
    setNodeEditSelection(ref.mapCanvas.lastValue(signals.private.EDIT_SELECTION_SET))
  }

  function endDrag(evt, d) {
    if(!ref.mapCanvas.lastValue(signals.private.DRAG_STARTED)){
      // if the drag start event never fired,
      // we have a no-op, and should return early
      // to allow other downstream event handlers
      // to run.
      return
    }
    var dragStart = ref.mapCanvas.lastValue(signals.private.DRAG_STARTED);
    doEdgeSnap(d, layerId, ref.mapCanvas, true);
    doChildSnap(d, layerId, ref.mapCanvas, true);
    ref.update();
    ref.mapCanvas.emit(signals.NODE_UPDATED, {"layer": layerId, "node": d, "oldNode": dragStart.node });
    ref.mapCanvas.clearLast(signals.private.DRAG_STARTED);
    ref.mapCanvas.setTopology([...ref.data]);
    d3.select(`.control-point-layer${layerId}.control-point-for-node-${sanitizeName(d.name)}`)
      .classed("control-selected", true);
  }

  feature
    .enter()
    .append('circle')
    .attr('r', 6)
    .attr('class', function(d){
      return `control controlPoint control-point-layer${layerId} control-point-for-node-${sanitizeName(d.name)}`; })
    .attr("data-layer", layerId)
    .attr("data-index", function(d, idx){ return idx; })
    .merge(feature)
    .on('dblclick', function(evt, pointData){
      pointData.layer = layerId;
      var i=0;
      var spliceIndex = null;
      evt.currentTarget.parentElement.childNodes.forEach(function(item){
        if(item == evt.currentTarget){
          spliceIndex = i;
        }
        i++;
      })
      ref.mapCanvas.showEditNodeDialog(pointData, spliceIndex, pointData.layer);
    })
    .on('mouseover', function (event, d) {
      let text;
      const template = ref.mapCanvas.options.enableCustomNodeTooltip ? ref.mapCanvas.options.customNodeTooltip : defaultNodeTooltip;

      text = renderTemplate(template, {...d, "self": d });
      ref.mapCanvas.showTooltip(event, text);
    })
    .on('mouseleave', function(){
      ref.mapCanvas.hideTooltip();
    })
    .on('mouseenter', function () {
      ref.mapCanvas.options.enableScrolling && ref.leafletMap.dragging.disable();
    })
    .on('mouseout', function () {
      ref.mapCanvas.options.enableScrolling && ref.leafletMap.dragging.enable();
    })
    .on('mousedown', function(evt, pointData){
      evt.stopPropagation();
      ref.mapCanvas.emit(signals.private.EDIT_SELECTION_SET, {
        "object": pointData,
        "index": Number(evt.target.getAttribute("data-index")),
        "layer": Number(evt.target.getAttribute("data-layer")),
        "type": "nodes"
      });
    })
    .call(d3.drag().on('drag', dragged).on('end', endDrag));

  setNodeEditSelection(ref.mapCanvas.lastValue(signals.private.EDIT_SELECTION_SET))
  ref.mapCanvas.listen(signals.private.EDIT_SELECTION_SET, setNodeEditSelection);

  g.selectAll('circle').attr('transform', function (d) {
    var ll = L.latLng(d.coordinate);
    var pt = ref.leafletMap.latLngToLayerPoint(ll);
    return 'translate(' + pt.x + ',' + pt.y + ')';
  });
 feature.exit().remove();
}



function renderEdgeControl(g, data, ref, layerId) {
  var lines = g.selectAll('path').data(data.edges);

  lines
    .enter()
    .append('path')
    .merge(lines)
    .attr('d', function (d) {
      return d.controlPointPath;
    })
    .attr('data-layer', layerId)
    .attr('data-index', function(d, idx){
      return idx;
    })
    .attr('class', function (d) {
      var name = sanitizeName(d.name);
      var connections = " control-for-"+name.split("--").join(" control-for-");
      var layerClass = ' l'+layerId;
      return 'control controlEdge edge-az-' + name + connections + layerClass;
    })
    // still need to figure out how to not zoom when doubleclicking here
    .on('dblclick', function (d) {
      addControlPoint(d, this, ref, layerId);
    })
    .on('mousedown', function(evt, edgeData){
      evt.stopPropagation();
      var idx = Number(evt.target.getAttribute("data-index"));
      var layer = Number(evt.target.getAttribute("data-layer"));
      let editSelection = {"object": edgeData, "type": "edges", "index": idx, "layer": layer};
      ref.mapCanvas.emit(signals.private.EDIT_SELECTION_SET, editSelection);
    })
    //--- when mouse is on the dot, make sure d3 gets the event and dont let map pan
    .on('mouseenter', function () {
      ref.mapCanvas.options.enableScrolling && ref.leafletMap.dragging.disable();
    })
    .on('mouseout', function () {
      ref.mapCanvas.options.enableScrolling && ref.leafletMap.dragging.enable();
    });

  const setEditSelection = (evtData) => {
    if(evtData && evtData['type'] == "edges"){
      d3.selectAll(".control-selected")
        .classed("control-selected", false);
      d3.select(`.controlEdge.l${evtData["layer"]}.edge-az-${sanitizeName(evtData["object"].name)}`)
          .classed("control-selected", true);
    }
  }

  setEditSelection(ref.mapCanvas.lastValue(signals.private.EDIT_SELECTION_SET));
  ref.mapCanvas.listen(signals.private.EDIT_SELECTION_SET, setEditSelection);

  lines.exit().remove();

  g.selectAll('g').remove();

  function dragged(evt, d, edgeData, idx, layerId) {
    ref.mapCanvas.emit(signals.private.DRAG_STARTED, { event: evt, edge: { ...edgeData } });
    ref.mapCanvas.emit(signals.private.EDIT_SELECTION_SET, {"object": edgeData, "type": "edges", "index": idx, "layer": layerId});
    var mapDiv = ref.leafletMap.getContainer();
    //--- set the control points to the new Lat lng
    var ll = ref.leafletMap.containerPointToLatLng(L.point(d3.pointer(evt, mapDiv)));
    d[0] = ll.lat;
    d[1] = ll.lng;
    //--- rerender stuff
    ref.update();
    //--- ensure that this edge plays selection animation
    d3.select(`.controlEdge.l${layerId}.edge-az-${sanitizeName(edgeData.name)}`)
      .classed("control-selected", true);
  }

  function endDrag(evt, edgeData) {
    if(!ref.mapCanvas.lastValue(signals.private.DRAG_STARTED)){
      // if the drag start event never fired,
      // we have a no-op, and should return early
      // to allow other downstream event handlers
      // to run.
      return
    }
    var dragStart = ref.mapCanvas.lastValue(signals.private.DRAG_STARTED);
    ref.mapCanvas.clearLast(signals.private.DRAG_STARTED);
    var zoom = ref.leafletMap.getZoom();
    var center = L.latLng(ref.leafletMap.getCenter());
    ref.mapCanvas.emit(signals.EDGE_UPDATED, {"layer": layerId, "edge": edgeData, "oldEdge": dragStart.edge });
    ref.mapCanvas.setTopology([...ref.data]);
    d3.select(`.controlEdge.l${layerId}.edge-az-${sanitizeName(edgeData.name)}`)
      .classed("control-selected", true);
  }

  data.edges.forEach(function (edgeData, idx) {
    var my_g = g.append('g');
    var feature = my_g.selectAll('circle').data(edgeData.coordinates);

    feature
      .enter()
      .append('circle')
      .attr('r', 4)
      .attr('class', function(d){
        return 'control controlPoint control-point-for-edge-' + sanitizeName(edgeData.name);
      })
      .merge(feature)
      .on('mousedown', function(evt, d){
        evt.stopPropagation();
        let editSelection = {
          "object": edgeData,
          "index": idx,
          "layer": layerId,
          "type": "edges"
        }
        ref.mapCanvas.emit(signals.private.EDIT_SELECTION_SET, editSelection);
      })
      .call(d3.drag()
        .on('drag', function(evt, d){ dragged(evt, d, edgeData, idx, layerId); })
        .on('end', function(evt, d){ endDrag(evt, edgeData); }));

    my_g
      .selectAll('circle')
      .attr('transform', function (d) {
        var ll = L.latLng(d);
        var pt = ref.leafletMap.latLngToLayerPoint(ll);
        return 'translate(' + pt.x + ',' + pt.y + ')';
      })
      //--- when mouse is on the dot, make sure d3 gets the event and dont let map pan
      .on('mouseenter', function () {
        ref.mapCanvas.options.enableScrolling && ref.leafletMap.dragging.disable();
      })
      .on('mouseout', function () {
        ref.mapCanvas.options.enableScrolling && ref.leafletMap.dragging.enable();
      })
      .on('dblclick', function (evt, d) {
        deleteControlPoint(evt, d, edgeData, ref, layerId);
      });

    feature.exit().remove();
  });
}

function renderNodes(g, data, ref, layerId) {
  const defaultNodeColor = ref.mapCanvas.options.layers[layerId]["color"];
  var feature = g.selectAll('g.node').data(data.nodes);
  var div = ref.div;
  feature
    .enter()
    .append('g')
    .attr('class', function(d){
      var parentClasses = d.parents?.map((p)=>{
          return "node-child-of-" + sanitizeName(p);
      }).join(" ")
      // sanitize name from the node
      var name = sanitizeName(d.name);
      var layerClass = ` l${layerId}`;
      return `node node-${name} ${layerClass} ${parentClasses}`;
    })
    .attr('stroke-width', 0.25)
    .attr('stroke', "black")
    .append('g')
    .attr('class', 'scale-container')
    .attr('transform', "scale(1.0, 1.0)")
    .html(function(d){
      var circle = `<circle r='${ref.mapCanvas.options.layers[layerId]["nodeWidth"]}' />`
      return d.meta.svg || circle;
    })
    .attr('text', function (d) {
      return d.name;
    })
    .attr('fill', function (d) {
      return d.color ? d.color : defaultNodeColor;
    })
    .on('mouseover', function (event, d) {
      d3.select(event.target.parentElement).attr("transform", "scale(1.5, 1.5)");
      const template = ref.mapCanvas.options.enableCustomNodeTooltip ? ref.mapCanvas.options.customNodeTooltip : defaultNodeTooltip;

      if ("displayName" in d?.meta && !ref.mapCanvas.options.enableCustomEdgeTooltip) {
        template = defaultDisplayNameTooltip;
      }

      // Sanitize any unique ID from the node name
      d.name = d.name.split("--")[0];

      let text = renderTemplate(template, {...d, "self": d });

      ref.mapCanvas.showTooltip(event, text);
    })
    .on('mouseout', function (event, d) {
      d3.select(event.target.parentElement).attr("transform", "scale(1.0, 1.0)")
      ref.mapCanvas.hideTooltip();
    })
    .on('mousedown', function(event, d){
      ref.mapCanvas.clearSelection();
      const selectionData = {
        selection: d,
        event: event,
        layer: layerId,
        type: "node",
      }
      ref.mapCanvas.setSelection(selectionData);
      ref.mapCanvas.emit(signals.VARIABLES_SET, selectionData);
    })
    .select(function(d){
      return this.childNodes[0];
    })
    .attr("height", function(d){
      return ref.mapCanvas.options.layers[layerId]["nodeWidth"] * 2;
    })
    .attr("width", function(d){
      return ref.mapCanvas.options.layers[layerId]["nodeWidth"] * 2;
    })
    .attr("x", function(d){
      return ref.mapCanvas.options.layers[layerId]["nodeWidth"] * -1;
    })
    .attr("y", function(d){
      return ref.mapCanvas.options.layers[layerId]["nodeWidth"] * -1;
    })


  function selectNode(selectionData){
    if(selectionData && selectionData.type=='node'){
      d3.selectAll(".selected")
        .classed('selected', false)
        .classed('animated-node', false)

      d3.select(`.l${selectionData.layer}.node-${sanitizeName(selectionData.selection.name)} .scale-container`)
        .classed('selected', true)
        .classed('animated-node', true);
    }
  }


  ref.mapCanvas.listen(signals.SELECTION_SET, selectNode);
  var selection = ref.mapCanvas.lastValue(signals.SELECTION_SET, ref.svg.node());
  selectNode(selection);

  g.selectAll('g.node').attr('transform', function (d) {
    var ll = L.latLng(d.coordinate);
    var pt = ref.leafletMap.latLngToLayerPoint(ll);
    return 'translate(' + pt.x + ',' + pt.y + ')';
  });

  feature.exit().remove();
}

const MAX_DEPTH = 10;
function traceParents(child, parents, depth){
    if(depth > MAX_DEPTH){
      throw new Error("Maximum depth exceeeded");
    }
    parent = parents[child]
    if(!parent) return [];
    let output = parent;
    depth++;
    output = traceParents(parent[0], parents, depth).concat(output)
    return output
}
function countGenerations(nodes, nodeName, generations){
    let children = nodes[nodeName]?.children
    if(children && children.length > 0){
      let childrensGenerations = children.map((child)=>{
        return countGenerations(nodes, child, generations + 1)
      })
      let retval = Math.max.apply(Math, childrensGenerations);
      return retval;
    }
    return generations
}
// determine sort order for node rendering
function sortNodes(nodes){
    // hash of parent name to child list
    let parents = {};
    // hash of node name to node value
    let nodeMap = {};
    nodes.forEach((node)=>{
        if(node.children){
            node.children.forEach((child)=>{
                if(parents[child]){
                  parents[child] = parents[child].concat([node.name]);
                } else {
                  parents[child] = [node.name];
                }
            })
        }
        node.sort = 0;
        nodeMap[node.name] = node;
    });
    // now we have a list of all of the parents. We need to do grandparents, then great-grandparents...
    nodes.forEach((node)=>{
        try {
          node["parents"] = traceParents(node.name, parents);
        } catch(e) {
          throw new Error(`Error while tracing Parents for Node ${node.name}. A Node can't be its own parent or its parent's parent. Children were: [${node.children}]. Please check them for loops.`)
        }
        // score 2 points for each generation below this node
        node["sort"] = countGenerations(nodeMap, node["name"], 0) * 2;
    });
    nodes.sort((a, b)=>{
      if(a.sort <  b.sort) return 1;
      if(a.sort == b.sort) return 0;
      if(a.sort >  b.sort) return -1;
    })
    return nodes;
}

function sortEdges(edges, sortedNodes, endpointId){
  // a map of node name to node
  let nodeMap = {};
  // populate the map
  sortedNodes.forEach((node)=>{
    nodeMap[node.name] = node
  })
  // find the max sort of the set of pops for this edge, adding one.
  edges.forEach((edge)=>{
    let nodeSortValues = [500]; // very large default, edges rendered at the back.
    // in the case that we have endpoint identifier data, look up each and find a correct sort
    if(edge?.meta?.endpoint_identifiers?.[endpointId]){
      nodeSortValues = edge?.meta?.endpoint_identifiers?.[endpointId]?.map((nodeName)=>{ return nodeMap[nodeName]?.sort || 0 });
    }
    let maxNodeSortValue = Math.max.apply(Math, nodeSortValues);
    edge.sort = maxNodeSortValue + 1;
  })
  edges.sort((a, b)=>{
      if(a.sort <  b.sort) return 1;
      if(a.sort == b.sort) return 0;
      if(a.sort >  b.sort) return -1;
  })
  return edges
}

function annotateSortOrder(data, endpointId){
  let sortedNodes = sortNodes(data.nodes)
  let sortedEdges = sortEdges(data.edges, sortedNodes, endpointId);
}

function calcTranslation(distance, targetPoint, pointA, pointB) {
  var segmentAngle = Math.atan2(pointB[1] - pointA[1], pointB[0] - pointA[0]);
  return [targetPoint[0] + Math.sin(segmentAngle) * distance, targetPoint[1] + -Math.cos(segmentAngle) * distance];
}

export function angle(cx, cy, ex, ey) {
  var dy = ey - cy;
  var dx = ex - cx;
  var theta = Math.atan2(dy, dx); // range (-PI, PI]
  theta *= 180 / Math.PI; // rads to degs, range (-180, 180]
  //if (theta < 0) theta = 360 + theta; // range [0, 360)
  return theta;
}

export function getBisectAngle(pointA, pointB, pointC) {
  var angle1 = angle(...pointB, ...pointA);
  var angle2 = angle(...pointB, ...pointC);
  var relativeAngle = angle1 - angle2;
  let bisectAngle = angle1 - relativeAngle * 0.5;


  if (angle1 > angle2) {
    bisectAngle += 180;
  }
  return bisectAngle;
}

/*
 CX @ Origin X
 CY @ Origin Y
 X  @ Point X to be rotated
 Y  @ Point Y to be rotated
 anticlock_wise @ to rotate point in clockwise direction or anticlockwise , default clockwise
 return @ {x,y}
*/
export function rotate(cx, cy, x, y, angle, anticlock_wise = false) {
  if (angle == 0) {
    return [parseFloat(x), parseFloat(y)];
  }
  if (anticlock_wise) {
    var radians = (Math.PI / 180) * angle;
  } else {
    var radians = (Math.PI / -180) * angle;
  }
  var cos = Math.cos(radians);
  var sin = Math.sin(radians);
  var nx = cos * (x - cx) + sin * (y - cy) + cx;
  var ny = cos * (y - cy) - sin * (x - cx) + cy;
  return [nx, ny];
}

//---- Takes a set of points representing the points between endpoint A and endpoint Z
//---- it then cacluates the point positions for an offset path parallel to the original
//---- useful when laying out circuits that look like divided highways

function offsetPoints(origPoints, offset) {
  var points = origPoints.slice();
  let x = 0;

  //--- for the first and last point, offset 90 degrees from the line
  points[0] = calcTranslation(offset, points[0], points[0], points[1]);
  x = points.length - 1;
  points[x] = calcTranslation(-offset, points[x], points[x], points[x - 1]);
  for (x = 1; x < points.length - 1; x++) {
    //--- for these, split the difference to basically miter cut
    var bisAngle = getBisectAngle(points[x - 1], points[x], points[x + 1]);
    points[x] = rotate(...points[x], points[x][0] + offset, points[x][1], bisAngle);
  }

  return points;
}

export class EsMap {
  constructor(mapCanvas, svg, div, curve) {
    this.mapCanvas = mapCanvas;
    this.leafletMap = this.mapCanvas.getCurrentLeafletMap();
    this.svg = svg;
    this.data = [];
    this.mapLayers = [];
    this.curves = []; // specific edge curves for each layer
    this.lineGen = d3.line().curve(curve); // the default curve we'll use to render edges
    this.editEdges = this.mapCanvas?.editingInterface?.editEdgeMode;
    this.editNodes = this.mapCanvas?.editingInterface?.editNodeMode;
    this.div = div;
    this.lastInteractedObject = null; // the last object that the user interacted with
                                      // used for nudging and deletion via keyboard
    this.lastInteractedType = null; // "nodes" or "edges"
    this.showTooltipSubscription = null;

    this.update = this.update.bind(this);

    this.mapCanvas.listen(signals.EDGE_SNAP, (data)=>{
      doEdgeSnap(data.node, data.layer, this.mapCanvas, false)
    })

    if (!this.mapCanvas.options.showSidebar) {
      this.mapCanvas.listen(signals.TOOLTIP_VISIBLE, (data)=>{
        if (this.mapCanvas.options.showSidebar) {
          return;
        }
        var elemId = "#map-" + mapCanvas.instanceId;

        var mapBounds = mapCanvas.getBoundingClientRect();
        var offsetY = data.event.clientY - mapBounds.top;
        var offsetX = data.event.clientX - mapBounds.left;

        document.querySelectorAll(".tooltip-hover").forEach((elem)=>{
          elem.remove();
        })

        var elem = document.createElement("div");
        elem.setAttribute("id", "tooltip-hover");
        elem.setAttribute("class", "tight-form-func tooltip-hover");
        elem.innerHTML = data.text;

        mapCanvas.querySelector(elemId).appendChild(elem);

        var tooltipBounds = elem.getBoundingClientRect()
        var leftOrRight = "left";
        if(offsetX + tooltipBounds.right > mapBounds.right){
          leftOrRight = "right";
          offsetX = (mapBounds.right - data.event.clientX);
        }
        var topOrBottom = "top";
        if(offsetY + tooltipBounds.bottom > mapBounds.bottom){
          topOrBottom = "bottom";
          offsetY = (mapBounds.bottom - data.event.clientY);
        }
        var evaluatedStyle = `${topOrBottom}:${offsetY}px; ${leftOrRight}:${offsetX}px;`;
        elem.setAttribute("style", evaluatedStyle);

      })
      this.mapCanvas.listen(signals.TOOLTIP_HIDDEN,function(){
        var elems = document.querySelectorAll("#tooltip-hover");
        elems.forEach((elem)=>{
          elem.remove();
        })
      });
    }
    let self = this;

    this.leafletMap.on('moveend', () => {
      this.update();
    });
    this.leafletMap.on('viewreset', () => {
      this.update();
    });

    function clearSelection(){
      var dashes = document.querySelectorAll(".dash-selected, .dash-over");
      for(var i=0; i<dashes.length; i++){
          dashes[i].remove();
      }
      d3.selectAll(".selected")
        .classed('selected', false)
      d3.selectAll(".animated-edge")
        .classed('animated-edge', false)
      d3.selectAll(".animated-node")
        .classed('animated-node', false)
    }
    this.mapCanvas.listen(signals.SELECTION_CLEARED, clearSelection);

    // function nudge(latOrLng, amount){
    const nudge = (latOrLng, amount) => {
      if (this.lastInteractedType === null || this.lastInteractedObject === null) return;
      if (this.lastInteractedType === "nodes") {
        var idx = 0;
        if(latOrLng == "longitude"){
          idx = 1;
        }
        this.lastInteractedObject.coordinate[idx] += amount;
        let ll = this.lastInteractedObject.coordinate;
        d3.selectAll(".cnxn-"+sanitizeName(this.lastInteractedObject.name))
            // for each edge that we select:
            .attr('d', function (d) {
              // if we are manipulating the "A" end
              // the index of the point we want is 0
              var idx = 0;
              if (d.nodeZ === this.lastInteractedObject.name){
                // if we are manipulating the "Z" end
                // the index of the point we want is the last one
                idx = d.coordinates.length - 1;
              }
              // manipulate the point
              d.coordinates[idx] = ll;
            })
        this.update();
      }
    }

    d3.select("body").on("keydown", (event, d) => {
      switch(event.key){
        case 'ArrowLeft':
          nudge("longitude", -0.05)
          break;
        case 'ArrowRight':
          nudge("longitude", 0.05)
          break;
        case 'ArrowUp':
          nudge("latitude", 0.05)
          break;
        case 'ArrowDown':
          nudge("latitude", -0.05)
          break;
        default:
          break;
      }
    })
  }

  destroy(){
    this.mapLayers.forEach((g) => {
      let topology_g = g.select('g.topology');
      topology_g.remove();
    });
  }

  editEdgeMode(setting) {
    if (setting === null || setting === undefined) {
      return this.editEdges;
    }

    if (setting > 0) {
      this.editEdges = 1;
      this.editNodes = 0; // mutually exclusive
    } else {
      this.editEdges = 0;
    }

    this.update();
    return this.editEdges;
  }

  editNodeMode(setting){
    if (setting === null || setting === undefined) {
      return this.editNodes;
    }

    if (setting > 0) {
      this.editNodes = 1;
      this.editEdges = 0; // mutually exclusive
    } else {
      this.editNodes = 0;
    }

    this.update();
    return this.editNodes;
  }

  updateCoordinates(data, layerId) {
    var ref = this;

    var idx = 0;
    var newEdges = [];
    data.edges.forEach(function (d) {
      var reject = 0;
      d.points = [];
      d.rejected = 0;
      if (typeof d.coordinates === 'undefined' || d.coordinates === null) {
        d.rejected = 1;
        return;
      }

      //--- setup control points
      d.coordinates.forEach(function (coord) {
        if (!Array.isArray(coord)) {
          reject = 1;
          return;
        }
        var ll = L.latLng(coord);
        var pt = ref.leafletMap.latLngToLayerPoint(ll);
        //--- setup the control points
        d.points.push([pt.x, pt.y]);
      });

      if (d.points.length < 2) {
        reject = 1;
        //--- skip if not at least 2 coordinates in the array
      }

      if (reject) {
        //--- issue found we should remove this from the list
        idx = data.edges.indexOf(d);
        d.rejected = 1;
        return;
      }
      newEdges.push(d);

      //--- setup the controlPoint path
      d.controlPointPath = d3.line()(d.points);

      //--- setup the azPath
      d.azPath = ref.curves[layerId](offsetPoints(d.points, ref.mapCanvas.options.layers[layerId].pathOffset));

      //--- setup the zaPath
      d.zaPath = ref.curves[layerId](offsetPoints(d.points.reverse(), ref.mapCanvas.options.layers[layerId].pathOffset));
    });

    //---swap out edge list with the filtered list
    data.edges = newEdges;
  }



  //--- loop through data and map objects and refresh them
  update() {
    this.mapCanvas.options.enableScrolling && this.leafletMap.dragging.enable();
    this.editEdges = this.mapCanvas?.editingInterface?.edgeEditMode;
    this.editNodes = this.mapCanvas?.editingInterface?.nodeEditMode;
    var layerId = 0;
    this.data.forEach((data)=>{
      this.updateCoordinates(data, layerId);
      layerId++;
    })
    var layerId = 0;
    this.mapLayers.forEach((g) => {
      if(!this?.mapCanvas.options?.layers?.[layerId]?.visible){
        layerId++;
        return;
      }
      let topology_g = g.select('g.topology');
      var controlpoint_g = g.select('g.cp');
      var data = this.data[layerId];

      //  delete all the control point g children
      controlpoint_g.selectAll('*').remove();
      if (!!this.editNodes) {
        renderNodeControl(controlpoint_g, data, this, layerId);
      } else {
        controlpoint_g.selectAll('.controlPoint').remove();
      }
      if (!!this.editEdges) {
        renderEdgeControl(controlpoint_g, data, this, layerId);
      } else {
        controlpoint_g.selectAll('.controlEdge').remove();
      }
      if (!this.editEdges && !this.editNodes) {
        //  delete all the control point g children
        controlpoint_g.selectAll('*').remove();
      }
      // annotate data with the proper "z-index" order, respecting parent-child relationships.
      annotateSortOrder(data, this?.mapCanvas.options?.layers?.[layerId]?.endpointId);
      // render nodes and edges
      renderNodes(topology_g, data, this, layerId);
      renderEdges(topology_g, data, this, layerId);
      // select all nodes and edges,
      let nodesAndEdges = topology_g.selectAll('g.node, path.edge');
      // then sort them into the proper z-index order
      nodesAndEdges.sort((a, b)=>{ return b.sort - a.sort });
      layerId++;
    })
  }

  addNetLayer(idx, data) {
    var ref = this;
    ref.data[idx] = data;
    let lineGen = ref.lineGen;
    if (data?.pathLayout?.type && d3.hasOwnProperty(data?.pathLayout?.type)){
      let linefunc = d3[data.pathLayout.type];
      lineGen = d3.line().curve(d3.curveBundle.beta(0.6));
    }
    ref.curves[idx] = lineGen;
    var map_g = this.svg.append('g').attr('class', 'esmap');
    ref.mapLayers[idx] = map_g;

    var topology_g = map_g.append('g').attr('class', 'topology');
    var cp_g = map_g.append('g').attr('class', 'cp');

    //--- render layer and ensure events are hooked up to map
    this.update();

    return map_g;
  }
}
