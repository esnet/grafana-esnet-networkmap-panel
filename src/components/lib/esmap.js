import * as pubsub from './pubsub.js';
const PubSub = pubsub.PubSub;
import * as d3_import from './d3.min.js';
// populate either with import or ES6 root-scope version
const d3 = window['d3'] || d3_import;
import * as React_import from "./react.js";
// populate either with import or ES6 root-scope version
const React = window['React'] || React_import;
import { render as renderTemplate } from "./rubbercement.js"

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
  const edgeWidth = ref.options["edgeWidthL"+layerId];
  const defaultEdgeColor = ref.options["color"+layerId];
  var azLines = g.selectAll('path.edge-az').data(data.edges);

  const doEdgeMouseOver = (event, d) => {
    var start = new Date();
    var thisEdge = d3.select(event.target)
    const isAZ = thisEdge.classed("edge-az");
    var color = d.azColor ? d.azColor : defaultEdgeColor;
    if(!isAZ){
      color = d.zaColor ? d.zaColor : defaultEdgeColor
    }

    if(!thisEdge.classed('animated-edge')){
      pathCrawl(event.target, "dash-over", color, edgeWidth);
      thisEdge.classed("animated-edge", true);
    }

    PubSub.publish("hideTooltip", null, ref.svg.node());

    var labels = {
      "src": options["srcFieldLabelL"+layerId] ? options["srcFieldLabelL"+layerId] : "From:",
      "dst": options["dstFieldLabelL"+layerId] ? options["dstFieldLabelL"+layerId] : "To:",
      "data": options["dataFieldLabelL"+layerId] ? options["dataFieldLabelL"+layerId] : "Volume:",
    }

    if(d.meta.template){
        var text = renderTemplate(d.meta.template, {"d": d, "self": d, "labels": labels });
    } else {
        var text = `<p><b>${labels.src}</b> ${ isAZ ? d.nodeA : d.nodeZ }</p>
        <p><b>${labels.dst}</b>  ${ isAZ ? d.nodeZ : d.nodeA }</p>
        <p><b>${labels.data}</b>  ${ isAZ ? d.AZdisplayValue : d.ZAdisplayValue }</p>`;
    }
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
      var connections = " connects-to-"+name.split("--").join(" connects-to-");
      var layerClass = ' l'+layerId;
      return 'edge edge-az edge-az-' + name + connections + layerClass;
    })
    .attr('text', function (d) {
      return d.AZname;
    })
    .attr('pointer-events', 'stroke')
    .on('mousedown', function(event, d){
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
      var connections = " connects-to-"+name.split("--").join(" connects-to-");
      var layerClass = ' l'+layerId;
      return 'edge edge-za edge-za-' + name + connections + layerClass;
    })
    .attr('text', function (d) {
      return d.ZAname;
    })
    .attr('pointer-events', 'stroke')
    .on('mousedown', function(event, d){
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

function deleteControlPoint(evt, d, obj, edgeData, ref){
  for(var i=0; i<edgeData.latLngs.length; i++){
    if(edgeData.latLngs[i] == d){
      edgeData.latLngs.splice(i, 1);
      PubSub.publish("updateMapTopology", ref.data, ref.svg.node());
      PubSub.publish("refresh", null, ref.svg.node());
      PubSub.publish("updateTopologyData", null, ref.svg.node());
      break;
    }
  }
}

function addControlPoint(evt, obj, ref) {

  var mapDiv = ref.leafletMap.getContainer();
  var ll = ref.leafletMap.containerPointToLatLng(L.point(d3.pointer(evt, mapDiv)));

  // we know the mouse is on one of the segmets
  // figure out difference in able between each pair of points and the click point
  // if the delta is nearly 0 we have a match
  // https://stackoverflow.com/questions/21608853/add-a-vertex-in-the-middle-of-a-path-with-d3js
  var latLngs = obj.__data__.latLngs;
  var target = [ll.lat, ll.lng];

  var idx = 0;
  var splicePoint = 0;
  var found = 0;
  var minDelta = 1000;
  for (idx = 0; idx < latLngs.length - 1; idx++) {
    var angleA = Math.abs(Math.atan((latLngs[idx][1] - target[1]) / (latLngs[idx][0] - target[0])));
    var angleB = Math.abs(Math.atan((latLngs[idx][1] - latLngs[idx + 1][1]) / (latLngs[idx][0] - latLngs[idx + 1][0])));

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
    var tmp = latLngs.slice(0, splicePoint);
    tmp.push(target);
    latLngs = tmp.concat(latLngs.slice(splicePoint));
    obj.__data__.latLngs = latLngs;
    ref.update();
  }
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

  function dragged(evt, pointData) {
    var mapDiv = ref.leafletMap.getContainer();
    PubSub.publish("dragStarted", evt, ref.svg.node());
    //--- set the control points to the new Lat lng
    var ll = ref.leafletMap.containerPointToLatLng(L.point(d3.pointer(evt, mapDiv)));
    pointData['latLng'][0] = ll.lat;
    pointData['latLng'][1] = ll.lng;
    // procedure for updating the edge:
    // get all edges that have "d.name" as a node
    var mapId = "map-" + ref.mapCanvas.instanceId;
    var layerSelector = !ref.mapCanvas.options.multiLayerNodeSnap ? `.l${layerId}` : ``;
    var selector = `#${mapId} ${layerSelector}.connects-to-${sanitizeName(pointData.name)}`;
    d3.selectAll(selector)
        // for each edge that we select:
        .attr('d', function (d) {
          // if we are manipulating the "A" end
          // the index of the point we want is 0
          var idx = 0;
          var step = 1;
          var end = d.latLngs.length - 1;
          if(d.nodeZ == pointData.name){
            // if we are manipulating the "Z" end
            // the index of the point we want is the last one
            idx = d.latLngs.length - 1;
            step = -1;
            end = 0;
          }
          // manipulate the point
          d.latLngs[idx][0] = ll.lat;
          d.latLngs[idx][1] = ll.lng;
          // and each of the other points (but not the endpoint);
          var totalCtrlPnts = d.latLngs.length - 1;
          var latDelta = (ll.lat - d.latLngs[end][0]) / (totalCtrlPnts);
          var lngDelta = (ll.lng - d.latLngs[end][1]) / (totalCtrlPnts);
          for(var i=(idx + step); i != end; i += step){
            if(end > 0){
              d.latLngs[i][0] = ll.lat - latDelta * i;
              d.latLngs[i][1] = ll.lng - lngDelta * i;
            } else {
              d.latLngs[i][0] = d.latLngs[end][0] + latDelta * i;
              d.latLngs[i][1] = d.latLngs[end][1] + lngDelta * i;
            }
          }
        })
    //
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
    PubSub.clearLast("dragStarted", ref.svg.node());
    PubSub.publish("updateTopology", {
      "layer1": ref.data["layer1"],
      "layer2": ref.data["layer2"],
      "layer3": ref.data["layer3"],
    }, ref.svg.node());
    ref.mapCanvas.updateTopology && ref.mapCanvas.updateTopology({
      "layer1": ref.data["layer1"],
      "layer2": ref.data["layer2"],
      "layer3": ref.data["layer3"],
    });
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
        "index": evt.target.getAttribute("data-index"),
        "layer": evt.target.getAttribute("data-layer"),
        "type": "nodes"
      }, ref.svg.node());
    })
    .call(d3.drag().on('drag', dragged).on('end', endDrag));

  setNodeEditSelection(PubSub.last("setEditSelection", ref.svg.node()))
  PubSub.subscribe("setEditSelection", setNodeEditSelection, ref.svg.node());

  g.selectAll('circle').attr('transform', function (d) {
    var ll = L.latLng(d.latLng);
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
      addControlPoint(d, this, ref);
    })
    .on('mousedown', function(evt, edgeData){
      evt.stopPropagation();
      var idx = evt.target.getAttribute("data-index");
      var layer = evt.target.getAttribute("data-layer");
      PubSub.publish("setEditSelection", {"object": edgeData, "type": "edges", "index": idx, "layer": layer}, ref.svg.node());
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
    PubSub.publish("dragStarted", evt, ref.svg.node());
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
    PubSub.clearLast("dragStarted", ref.svg.node());
    var zoom = ref.leafletMap.getZoom();
    var center = L.latLng(ref.leafletMap.getCenter());
    PubSub.publish("updateTopology", {
      "layer1": ref.data["layer1"],
      "layer2": ref.data["layer2"],
      "layer3": ref.data["layer3"],
    }, ref.svg.node());
    ref.mapCanvas.updateTopology && ref.mapCanvas.updateTopology({
      "layer1": ref.data["layer1"],
      "layer2": ref.data["layer2"],
      "layer3": ref.data["layer3"],
    });
    d3.select(`.controlEdge.l${layerId}.edge-az-${sanitizeName(edgeData.name)}`)
      .classed("control-selected", true);
  }

  data.edges.forEach(function (edgeData, idx) {
    var my_g = g.append('g');
    var feature = my_g.selectAll('circle').data(edgeData.latLngs);

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
        PubSub.publish("setEditSelection", {
          "object": edgeData,
          "index": idx,
          "layer": layerId,
          "type": "edges"
        }, ref.svg.node());
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
        deleteControlPoint(evt, d, this, edgeData, ref);
      });

    feature.exit().remove();
  });
}

function renderNodes(g, data, ref, layerId) {
  const defaultNodeColor = ref.options["color"+layerId];
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
      var circle = `<circle r='${ref.options["nodeWidthL"+layerId]}' />`
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
      return ref.options["nodeWidthL"+layerId] * 2;
    })
    .attr("width", function(d){
      return ref.options["nodeWidthL"+layerId] * 2;
    })
    .attr("x", function(d){
      return ref.options["nodeWidthL"+layerId] * -1;
    })
    .attr("y", function(d){
      return ref.options["nodeWidthL"+layerId] * -1;
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

      PubSub.publish("setVariables", selectionData, ref.svg.node());
  }

  PubSub.subscribe("setSelection", selectNode, ref.svg.node());
  var selection = PubSub.last("setSelection", ref.svg.node());
  if(selection && selection.type=="node"){
    selectNode(selection);
  }


  g.selectAll('g.node').attr('transform', function (d) {
    var ll = L.latLng(d.latLng);
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
    this.data = {};
    this.mapLayers = {};
    this.lineGen = d3.line().curve(curve);
    this.editEdges = this.mapCanvas.editingInterface && this.mapCanvas.editingInterface.editEdgeMode;
    this.editNodes = this.mapCanvas.editingInterface && this.mapCanvas.editingInterface.editNodeMode;
    this.div = div;
    this.options = this.mapCanvas.options;
    this.lastInteractedObject = null; // the last object that the user interacted with
                                      // used for nudging and deletion via keyboard
    this.lastInteractedType = null; // "nodes" or "edges"

    if(!this.mapCanvas.options.showSidebar){
      PubSub.subscribe("showTooltip",function(data){
        var elem = document.createElement("div");
        elem.setAttribute("id", "tooltip-hover");
        elem.setAttribute("class", "tight-form-func tooltip-hover");
        elem.innerHTML = data.text;
        var bounds = mapCanvas.getBoundingClientRect();
        elem.setAttribute("style", `top:${(data.event.clientY - bounds.top)}px; left:${(data.event.clientX - bounds.left)}px;`);
        var elemId = "#map-" + mapCanvas.instanceId;
        mapCanvas.querySelector(elemId).appendChild(elem);
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
        self.lastInteractedObject.latLng[idx] += amount;
        var ll = self.lastInteractedObject.latLng;
        d3.selectAll(".connects-to-"+sanitizeName(self.lastInteractedObject.name))
            // for each edge that we select:
            .attr('d', function (d) {
              // if we are manipulating the "A" end
              // the index of the point we want is 0
              var idx = 0;
              if(d.nodeZ == self.lastInteractedObject.name){
                // if we are manipulating the "Z" end
                // the index of the point we want is the last one
                idx = d.latLngs.length - 1;
              }
              // manipulate the point
              d.latLngs[idx] = ll;
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
      if (typeof d.latLngs === 'undefined' || d.latLngs === null) {
        d.rejected = 1;
        return;
      }

      //--- setup control points
      d.latLngs.forEach(function (coord) {
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
      d.azPath = ref.lineGen(offsetPoints(d.points, ref.mapCanvas.options["pathOffsetL"+layerId]));

      //--- setup the zaPath
      d.zaPath = ref.lineGen(offsetPoints(d.points.reverse(), ref.mapCanvas.options["pathOffsetL"+layerId]));
    });

    //---swap out edge list with the filtered list
    data.edges = newEdges;
  }

  //--- loop through data and map objects and refresh them
  update() {
    this.mapCanvas.options.enableScrolling && this.leafletMap.dragging.enable();
    var layerId = 0;
    for (const [name, data] of Object.entries(this.data)) {
      layerId++;
      this.updateCoordinates(data, layerId);
    }
    var layerId = 0;
    for (const [name, g] of Object.entries(this.mapLayers)) {
      layerId++;
      if(!this.options['layer' + layerId]){
        continue;
      }
      var edge_g = g.select('g.edge');
      var node_g = g.select('g.node');
      var controlpoint_g = g.select('g.cp');
      var data = this.data[name];

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
    }
  }

  addNetLayer(name, data) {
    var ref = this;
    ref.data[name] = data; //maybe use this to serialize
    var map_g = this.svg.append('g').attr('class', 'esmap');
    ref.mapLayers[name] = map_g;

    var edge_g = map_g.append('g').attr('class', 'edge');
    var node_g = map_g.append('g').attr('class', 'node');
    var cp_g = map_g.append('g').attr('class', 'cp');

    //--- render layer and ensure events are hooked up to map
    this.update();

    return map_g;
  }
}
