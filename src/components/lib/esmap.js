import * as pubsub from './pubsub.js';
const PubSub = pubsub.PubSub;
import * as d3_import from './d3.min.js';
// populate either with import or ES6 root-scope version
const d3 = window['d3'] || d3_import;
import { render as renderTemplate } from "./rubbercement.js"
import { defaultCustomEdgeTooltip, defaultEdgeTooltip } from '../../options.js';

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

function renderEdges(g, data, ref, layerId, options) {
  var div = ref.div;
  const edgeWidth = ref.options.layers[layerId].edgeWidth;
  const defaultEdgeColor = ref.options.layers[layerId].color;
  var azLines = g.selectAll('path.edge-az').data(data.edges);

  const doEdgeMouseOver = (event, d) => {
    var start = new Date();
    var thisEdge = d3.select(event.target)
    var thisEdgeClassName = [...event.target.classList].find(classListItem => /edge-(az|za)-(.*)/.test(classListItem));
    var reverseEdgeClassName;
    if (/edge-az-/.test(thisEdgeClassName)) {
      reverseEdgeClassName = thisEdgeClassName.replace('edge-az', 'edge-za');
    } else if (/edge-za-/.test(thisEdgeClassName)) {
      reverseEdgeClassName = thisEdgeClassName.replace('edge-za', 'edge-az');
    } else {
      console.warn(`lib.esmap.doEdgeMouseOver: Could not resolve reverse edge from ${thisEdgeClassName}`);
    }
    var reverseEdge = d3.select(`.${reverseEdgeClassName}`);
    const isAZ = thisEdge.classed("edge-az");
    var color = d.azColor ? d.azColor : defaultEdgeColor;
    if(!isAZ){
      color = d.zaColor ? d.zaColor : defaultEdgeColor;
    }

    if(!thisEdge.classed('animated-edge')){
      pathCrawl(event.target, "dash-over", color, edgeWidth);
      thisEdge.classed("animated-edge", true);
    }

    PubSub.publish("hideTooltip", null, ref.svg.node());

    var template = ref.options.enableCustomEdgeTooltip ? ref.options.customEdgeTooltip : defaultEdgeTooltip;

    const forward = { from: d.nodeA, to: d.nodeZ, dataPoint: d.azDisplayValue };
    const reverse = { from: d.nodeZ, to: d.nodeA, dataPoint: d.zaDisplayValue };

    let renderData = {
      forward: isAZ ? forward : reverse,
      reverse: isAZ ? reverse : forward,
    };

    var text = renderTemplate(template, renderData)
      .replaceAll(/\s+/g, " ")
      .replaceAll("><", "> <")
      .trim();

    PubSub.publish("showTooltip", { "event": event, "text": text }, ref.svg.node());
  }

  const doEdgeMouseOut = (event, d) => {
    var start = new Date();
    PubSub.publish("hideTooltip", null, ref.svg.node());

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
      PubSub.publish("clearSelection", null, ref.svg.node())
      const selectionData = {
        selection: d,
        event: event,
        layer: layerId,
        type: "edge",
        instance: ref.mapCanvas.id,
      }
      PubSub.publish("setVariables", d, ref.svg.node());
      PubSub.publish("setSelection", selectionData, ref.svg.node());
      PubSub.global.publish("setSelection", selectionData); // send signal globally
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
      if(d.meta?.endpoint_identifiers?.pops && d.meta.endpoint_identifiers.pops?.length){
        connections += " cnxn-"+d.meta.endpoint_identifiers.pops.join(" cnxn-");
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
      PubSub.publish("clearSelection", null, ref.svg.node())
      const selectionData = {
        selection: d,
        event: event,
        layer: layerId,
        type: "edge",
      }
      PubSub.publish("setVariables", d, ref.svg.node());
      PubSub.publish("setSelection", selectionData, ref.svg.node()); // send signal locally
      PubSub.global.publish("setSelection", selectionData); // send signal globally
    })
    .on('mouseover', doEdgeMouseOver)
    .on('mouseout', doEdgeMouseOut);
  zaLines.exit().remove();

  function selectEdge(selectionData){
      var dashes = document.querySelectorAll(".dash-selected, .dash-over");
      for(var i=0; i<dashes.length; i++){
          dashes[i].remove();
      }
      // deselect old edges
      d3.selectAll(".selected")
        .classed('selected', false)
        .classed('animated-edge', false)
        .classed('edge', true);
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

  PubSub.subscribe("setSelection", selectEdge, ref.svg.node());
  PubSub.subscribe("clearSelection", function(){
    PubSub.clearLast("setSelection", ref.svg.node());
    PubSub.global.clearLast("setSelection");
  }, ref.svg.node())
  var selection = PubSub.last("setSelection", ref.svg.node());
  if(selection && selection.type=="edge"){
    selectEdge(selection);
  }

}

function deleteControlPoint(evt, d, edgeData, ref, layerId){
  for(var i=0; i<edgeData.coordinates.length; i++){
    if(edgeData.coordinates[i] == d){
      var oldEdgeData = JSON.parse(JSON.stringify(edgeData));
      edgeData.coordinates.splice(i, 1);
      PubSub.publish("updateMapEdge", {"layer": layerId, "edge": edgeData, "oldEdge": oldEdgeData }, ref.svg.node());
      PubSub.publish("updateMapTopology", ref.data, ref.svg.node());
      PubSub.publish("refresh", null, ref.svg.node());
      PubSub.publish("updateTopologyData", null, ref.svg.node());
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
    PubSub.publish("updateMapEdge", {"layer": layerId, "edge": obj.__data__, "oldEdge": oldEdgeData }, ref.svg.node());
  }
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
            PubSub.publish("updateMapEdge", {"layer": layerId, "edge": d, "oldEdge": oldEdgeData }, mapCanvas);
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
    PubSub.publish("dragStarted", { event: evt, node: {...nodeData} }, ref.svg.node());
    //--- set the control points to the new Lat lng
    var ll = ref.leafletMap.containerPointToLatLng(L.point(d3.pointer(evt, mapDiv)));
    nodeData['coordinate'][0] = ll.lat;
    nodeData['coordinate'][1] = ll.lng;
    doEdgeSnap(nodeData, layerId, ref.mapCanvas, false);
    //--- rerender stuff
    ref.update();
    setNodeEditSelection(PubSub.last("setEditSelection", ref.svg.node()))
  }

  function endDrag(evt, d) {
    if(!PubSub.last("dragStarted", ref.svg.node())){
      // if the drag start event never fired,
      // we have a no-op, and should return early
      // to allow other downstream event handlers
      // to run.
      return
    }
    var dragStart = PubSub.last("dragStarted", ref.svg.node());
    PubSub.publish("updateMapNode", {"layer": layerId, "node": d, "oldNode": dragStart.node }, ref.svg.node());
    PubSub.clearLast("dragStarted", ref.svg.node());
    doEdgeSnap(d, layerId, ref.mapCanvas, true);
    ref.update();
    if(ref.mapCanvas.updateTopology){
      ref.mapCanvas.updateTopology([
        ref.data[0],
        ref.data[1],
        ref.data[2],
      ])
    } else {
      PubSub.publish("updateTopology", [
        ref.data[0],
        ref.data[1],
        ref.data[2],
      ], ref.svg.node());
    }
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
      pointData.layer = "layer" + layerId;
      var i=0;
      var spliceIndex = null;
      evt.currentTarget.parentElement.childNodes.forEach(function(item){
        if(item == evt.currentTarget){
          spliceIndex = i;
        }
        i++;
      })
      PubSub.publish("showEditNodeDialog", { "object": pointData, "index": spliceIndex, "layer": pointData.layer }, ref.svg.node());
    })
    .on('mouseover', function (event, d) {
      if(d.meta.template){
        var text = renderTemplate(d.meta.template, {"d": d, "self": d });
      } else {
        var text = `<p><b>${ d.meta.displayName || d.name}</b></p>
        <p><b>In Volume: </b> ${d.inValue}</p>
        <p><b>Out Volume: </b> ${d.outValue}</p>`;
      }
      PubSub.publish("showTooltip", { "event": event, "text": text }, ref.svg.node());
    })
    .on('mouseleave', function(){
      PubSub.publish("hideTooltip", null, ref.svg.node());
    })
    .on('mouseenter', function () {
      ref.mapCanvas.options.enableScrolling && ref.leafletMap.dragging.disable();
    })
    .on('mouseout', function () {
      ref.mapCanvas.options.enableScrolling && ref.leafletMap.dragging.enable();
    })
    .on('mousedown', function(evt, pointData){
      evt.stopPropagation();
      PubSub.publish("setEditSelection", {
        "object": pointData,
        "index": Number(evt.target.getAttribute("data-index")),
        "layer": Number(evt.target.getAttribute("data-layer")),
        "type": "nodes"
      }, ref.svg.node());
    })
    .call(d3.drag().on('drag', dragged).on('end', endDrag));

  setNodeEditSelection(PubSub.last("setEditSelection", ref.svg.node()))
  PubSub.subscribe("setEditSelection", setNodeEditSelection, ref.svg.node());

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
      PubSub.publish("setEditSelection", editSelection, ref.svg.node());
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
  setEditSelection(PubSub.last("setEditSelection", ref.svg.node()))
  PubSub.subscribe("setEditSelection", setEditSelection, ref.svg.node());

  lines.exit().remove();

  g.selectAll('g').remove();

  function dragged(evt, d, edgeData, idx, layerId) {
    PubSub.publish("dragStarted", {event: evt, edge: { ...edgeData } }, ref.svg.node());
    PubSub.publish("setEditSelection", {"object": edgeData, "type": "edges", "index": idx, "layer": layerId}, ref.svg.node());
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
    if(!PubSub.last("dragStarted", ref.svg.node())){
      // if the drag start event never fired,
      // we have a no-op, and should return early
      // to allow other downstream event handlers
      // to run.
      return
    }
    var dragStart = PubSub.last("dragStarted", ref.svg.node());
    PubSub.clearLast("dragStarted", ref.svg.node());
    var zoom = ref.leafletMap.getZoom();
    var center = L.latLng(ref.leafletMap.getCenter());
    PubSub.publish("updateMapEdge", {"layer": layerId, "edge": edgeData, "oldEdge": dragStart.edge }, ref.svg.node());
    if(ref.mapCanvas.updateTopology){
      ref.mapCanvas.updateTopology([
        ref.data[0],
        ref.data[1],
        ref.data[2],
      ])
    } else {
      PubSub.publish("updateTopology", [
        ref.data[0],
        ref.data[1],
        ref.data[2],
      ], ref.svg.node());
    }
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
        PubSub.publish("setEditSelection", editSelection, ref.svg.node());
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
  const defaultNodeColor = ref.options.layers[layerId]["color"];
  var feature = g.selectAll('g.node').data(data.nodes);
  var div = ref.div;
  feature
    .enter()
    .append('g')
    .attr('class', function(d){
      // sanitize name from the node
      var name = sanitizeName(d.name);
      var layerClass = ` l${layerId}`;
      return 'node node-' + name + layerClass;
    })
    .attr('stroke-width', 0.25)
    .attr('stroke', "black")
    .append('g')
    .attr('class', 'scale-container')
    .attr('transform', "scale(1.0, 1.0)")
    .html(function(d){
      var circle = `<circle r='${ref.options.layers[layerId]["nodeWidth"]}' />`
      return d.meta.svg || circle;
    })
    .attr('text', function (d) {
      return d.name;
    })
    .attr('fill', function (d) {
      return d.color ? d.color : defaultNodeColor;
    })
    .on('mouseover', function (event, d) {
      d3.select(event.target.parentElement).attr("transform", "scale(1.5, 1.5)")
      if(d.meta.template){
        var text = renderTemplate(d.meta.template, {"d": d, "self": d });
      } else {
        var text = `<p><b>${ d.meta.displayName || d.name}</b></p>
        <p><b>In Volume: </b> ${d.inValue}</p>
        <p><b>Out Volume: </b> ${d.outValue}</p>`;
      }

      PubSub.publish("showTooltip", { "event": event, "text": text }, ref.svg.node());
    })
    .on('mouseout', function (event, d) {
      d3.select(event.target.parentElement).attr("transform", "scale(1.0, 1.0)")
      PubSub.publish("hideTooltip", null, ref.svg.node());
    })
    .on('mousedown', function(event, d){
      PubSub.publish("clearSelection", null, ref.svg.node())
      const selectionData = {
        selection: d,
        event: event,
        layer: layerId,
        type: "node",
      }
      PubSub.publish("setSelection", selectionData, ref.svg.node()); // send signal locally
    })
    .select(function(d){
      return this.childNodes[0];
    })
    .attr("height", function(d){
      return ref.options.layers[layerId]["nodeWidth"] * 2;
    })
    .attr("width", function(d){
      return ref.options.layers[layerId]["nodeWidth"] * 2;
    })
    .attr("x", function(d){
      return ref.options.layers[layerId]["nodeWidth"] * -1;
    })
    .attr("y", function(d){
      return ref.options.layers[layerId]["nodeWidth"] * -1;
    })


  function selectNode(selectionData){
      d3.selectAll(".selected")
        .classed('selected', false)
        .classed('animated-node', false)
        .classed('node', true)

      d3.select(`.l${selectionData.layer}.node-${sanitizeName(selectionData.selection.name)} .scale-container`)
        .classed('selected', true)
        .classed('node', false)
        .classed('animated-node', true);

      if(selectionData && selectionData.type=='node'){
        PubSub.publish("setVariables", selectionData, ref.svg.node());
      }
  }

  PubSub.subscribe("setSelection", selectNode, ref.svg.node());
  var selection = PubSub.last("setSelection", ref.svg.node());
  if(selection && selection.type=="node"){
    selectNode(selection);
  }


  g.selectAll('g.node').attr('transform', function (d) {
    var ll = L.latLng(d.coordinate);
    var pt = ref.leafletMap.latLngToLayerPoint(ll);
    return 'translate(' + pt.x + ',' + pt.y + ')';
  });

  feature.exit().remove();
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
    this.editEdges = this.mapCanvas.editingInterface && this.mapCanvas.editingInterface.editEdgeMode;
    this.editNodes = this.mapCanvas.editingInterface && this.mapCanvas.editingInterface.editNodeMode;
    this.div = div;
    this.options = this.mapCanvas.options;
    this.lastInteractedObject = null; // the last object that the user interacted with
                                      // used for nudging and deletion via keyboard
    this.lastInteractedType = null; // "nodes" or "edges"

    PubSub.subscribe("snapEdges", (data)=>{
      doEdgeSnap(data.node, data.layer, this.mapCanvas, false)
    }, this.mapCanvas)

    if(!this.mapCanvas.options.showSidebar){
      PubSub.subscribe("showTooltip",function(data){
        var elemId = "#map-" + mapCanvas.instanceId;

        var mapBounds = mapCanvas.getBoundingClientRect();
        var offsetY = data.event.clientY - mapBounds.top;
        var offsetX = data.event.clientX - mapBounds.left;

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

      },
      this.svg.node())
      PubSub.subscribe("hideTooltip",function(){
        var elems = document.querySelectorAll("#tooltip-hover");
        elems.forEach((elem)=>{
          elem.remove();
        })
      },
      this.mapCanvas)
    }
    //
    let self = this;

    this.leafletMap.on('moveend', function () {
      self.update();
    });
    this.leafletMap.on('viewreset', function () {
      self.update();
    });

    function updateOptions(options){
      self.options = options;
    }
    PubSub.subscribe("updateOptions", updateOptions, this.svg.node());

    function clearSelection(){
      var dashes = document.querySelectorAll(".dash-selected, .dash-over");
      for(var i=0; i<dashes.length; i++){
          dashes[i].remove();
      }
      d3.selectAll(".selected")
        .classed('selected', false)
      d3.selectAll(".animated-edge")
        .classed('animated-edge', false)
        .classed('edge', true)
      d3.selectAll(".animated-node")
        .classed('animated-node', false)
        .classed('node', true)
    }
    PubSub.subscribe("clearSelection", clearSelection, this.svg.node());

    function updateLastInteractedObject(event){
      if(event){
        self.lastInteractedObject = event.object;
        self.lastInteractedType = event.type;
      } else {
        self.lastInteractedObject = null;
        self.lastInteractedType = null;
      }
    }
    PubSub.subscribe("updateLastInteractedObject", updateLastInteractedObject, this.svg.node());

    function nudge(latOrLng, amount){
      if (self.lastInteractedType === null || self.lastInteractedObject === null) return;
      if (self.lastInteractedType == "nodes"){
        var idx = 0;
        if(latOrLng == "longitude"){
          idx = 1;
        }
        self.lastInteractedObject.coordinate[idx] += amount;
        var ll = self.lastInteractedObject.coordinate;
        d3.selectAll(".cnxn-"+sanitizeName(self.lastInteractedObject.name))
            // for each edge that we select:
            .attr('d', function (d) {
              // if we are manipulating the "A" end
              // the index of the point we want is 0
              var idx = 0;
              if(d.nodeZ == self.lastInteractedObject.name){
                // if we are manipulating the "Z" end
                // the index of the point we want is the last one
                idx = d.coordinates.length - 1;
              }
              // manipulate the point
              d.coordinates[idx] = ll;
            })
        self.update();
      }
    }

    d3.select("body").on("keydown", function(event, d){
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
    var layerId = 0;
    this.data.forEach((data)=>{
      this.updateCoordinates(data, layerId);
      layerId++;
    })
    var layerId = 0;
    this.mapLayers.forEach((g)=>{
      if(!this?.options?.layers?.[layerId]?.['visible']){
        layerId++;
        return;
      }
      var edge_g = g.select('g.edge');
      var node_g = g.select('g.node');
      var controlpoint_g = g.select('g.cp');
      var data = this.data[layerId];

      if (this.editNodes == 1) {
        renderNodeControl(controlpoint_g, data, this, layerId);
        var zoom = this.leafletMap.getZoom();
        var center = L.latLng(this.leafletMap.getCenter());
      } else {
        controlpoint_g.selectAll('.controlPoint').remove();
      }
      if (this.editEdges == 1) {
        renderEdgeControl(controlpoint_g, data, this, layerId);
        var zoom = this.leafletMap.getZoom();
        var center = L.latLng(this.leafletMap.getCenter());
      } else {
        controlpoint_g.selectAll('.controlEdge').remove();
      }
      if (!this.editEdges && !this.editNodes) {
        //  delete all the control point g children
        controlpoint_g.selectAll('*').remove();
      }
      renderNodes(node_g, data, this, layerId);
      renderEdges(edge_g, data, this, layerId, this.mapCanvas.options);
      layerId++;
    })
  }

  addNetLayer(idx, data) {
    var ref = this;
    ref.data[idx] = data;
    let lineGen = ref.lineGen;
    if (data?.pathLayout?.type && d3.hasOwnProperty(data?.pathLayout?.type)){
      let linefunc = d3[data.pathLayout.type];
      lineGen = d3.line().curve(linefunc);
    }
    ref.curves[idx] = lineGen;
    var map_g = this.svg.append('g').attr('class', 'esmap');
    ref.mapLayers[idx] = map_g;

    var edge_g = map_g.append('g').attr('class', 'edge');
    var node_g = map_g.append('g').attr('class', 'node');
    var cp_g = map_g.append('g').attr('class', 'cp');

    //--- render layer and ensure events are hooked up to map
    this.update();

    return map_g;
  }
}
