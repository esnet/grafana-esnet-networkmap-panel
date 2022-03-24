import * as d3 from './d3.min.js';
import React from 'react';
import * as pubsub from './pubsub.js';

function createSvgMarker(svg) {
  //--- setup markers
  var defs = svg.append('svg:defs').attr('id', 'markers');

  //--- could not  this just be in a template somewhere?
  var marker = defs
    .selectAll('marker')
    .data([
      {
        id: 2,
        name: 'arrow',
        path: 'M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z',
        viewbox: '0 0 20 20',
      },
    ])
    .enter()
    .append('svg:marker')
    .attr('id', function (d) {
      return d.name;
    })
    .attr('markerHeight', 5)
    .attr('markerWidth', 4)
    .attr('markerUnits', 'strokeWidth')
    .attr('orient', 'auto')
    .attr('refX', 10)
    .attr('refY', 10)
    .attr('viewBox', function (d) {
      return d.viewbox;
    })
    .append('svg:path')
    .attr('d', function (d) {
      return d.path;
    })
    .attr('fill', function (d, i) {
      return '#333';
    })
    .attr('stroke', '#555') // color
    .attr('stroke-width', 0.5);
  return marker;
}

function clearSelection(){
  d3.selectAll(".selected")
    .classed('selected', false)
    .classed('animated-edge', false)
    .classed('edge', true)
}
pubsub.PubSub.subscribe("clearSelection", clearSelection);

function renderEdges(g, data, ref) {
  var div = ref.div;
  const edgeWidth = ref.options.edgeWidth;
  var azLines = g.selectAll('path.edge-az').data(data.edges);
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
      return d.azColor;
    })
    .attr('marker-mid', function (d, i) {
      return 'url(#arrow)';
    })
    .attr('stroke-width', edgeWidth)
    .attr('class', function (d) {
      var connections = " connects-to-"+d.name.split("--").join(" connects-to-");
      return 'edge edge-az edge-az-' + d.name + connections;
    })
    .attr('text', function (d) {
      return d.AZname;
    })
    .attr('pointer-events', 'visiblePainted')
    .on('click', function(event, d){
      pubsub.PubSub.publish("setVariables", d);
      d3.selectAll(".selected")
        .classed('selected', false)
        .classed('animated-edge', false)
        .classed('edge', true);
      d3.select(".edge-za-"+d.name)
        .classed('selected', true)
        .classed('animated-edge', true);
      d3.select(this)
        .classed('selected', true)
        .classed('edge', false)
        .classed('animated-edge', true);
    })
    .on('mouseover', function (event, d) {
      d3.select(this).classed("animated-edge", true);
      div
        .html(() => {
          var text =
            '<p><b>From: ' +
            d.nodeA +
            '</b></p><p><b>To: </b> ' +
            d.nodeZ +
            '</b></p><p><b>Volume: </b> ' +
            d.AZdisplayValue +
            '</p>';
          return text;
        })
        .transition()
        .duration(500)
        .style('opacity', 0.8);
    })
    .on('mouseout', function (d, i) {
      // don't stop animating if this component is selected
      if(d3.select(this).classed("selected")){ return }
      d3.select(this).classed("animated-edge", false);
      div.transition().duration(500).style('opacity', 0);
    });
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
      return d.zaColor;
    })
    .attr('marker-mid', function (d, i) {
      return 'url(#arrow)';
    })
    .attr('stroke-width', edgeWidth)
    .attr('class', function (d) {
      var connections = " connects-to-"+d.name.split("--").join(" connects-to-");
      return 'edge edge-za edge-za-' + d.name + connections;
    })
    .attr('text', function (d) {
      return d.ZAname;
    })
    .attr('pointer-events', 'visiblePainted')
    .on('click', function(event, d){
      pubsub.PubSub.publish("setVariables", d);
      d3.selectAll(".selected")
        .classed('selected', false)
        .classed('animated-edge', false)
        .classed('edge', true);
      d3.select(".edge-az-"+d.name)
        .classed('selected', true)
        .classed('animated-edge', true);
      d3.select(this)
        .classed('selected', true)
        .classed('animated-edge', true);
    })
    .on('mouseover', function (event, d) {
      d3.select(this).classed("animated-edge", true);
      div
        .html(() => {
          var text =
            '<p><b>From:</b> ' +
            d.nodeZ +
            '</p><p><b>To:</b> ' +
            d.nodeA +
            '</p><p><b>Volume: </b> ' +
            d.ZAdisplayValue +
            '</p>';
          return text;
        })
        .transition()
        .duration(500)
        .style('opacity', 0.8);
    })
    .on('mouseout', function (d, i) {
      // don't stop animating if this component is selected
      if(d3.select(this).classed("selected")){ return }
      d3.select(this).classed("animated-edge", false);
      div.transition().duration(500).style('opacity', 0);
    });
  zaLines.exit().remove();
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

function renderNodeControl(g, data, ref){
  var feature = g.selectAll('circle').data(data.nodes);

  function dragged(evt, pointData) {
    var mapDiv = ref.leafletMap.getContainer();
    pubsub.PubSub.publish("updateLastInteractedObject", {"object": pointData, "type": "nodes"});
    //--- set the control points to the new Lat lng
    var ll = ref.leafletMap.containerPointToLatLng(L.point(d3.pointer(evt, mapDiv)));
    pointData['latLng'][0] = ll.lat;
    pointData['latLng'][1] = ll.lng;
    // procedure for updating the edge:
    // get all edges that have "d.name" as a node
    d3.selectAll(".connects-to-"+pointData.name)
        // for each edge that we select:
        .attr('d', function (d) {
          // if we are manipulating the "A" end
          // the index of the point we want is 0
          var idx = 0;
          if(d.nodeZ == pointData.name){
            // if we are manipulating the "Z" end
            // the index of the point we want is the last one
            idx = d.latLngs.length - 1;
          } 
          // manipulate the point
          d.latLngs[idx][0] = ll.lat;
          d.latLngs[idx][1] = ll.lng;
        })
    // 
    //--- rerender stuff
    ref.update();
  }

  function endDrag(evt, d) {
    var zoom = ref.leafletMap.getZoom();
    var center = L.latLng(ref.leafletMap.getCenter());
    ref.updateMapJson(ref.data['layer1'], ref.data['layer2'], ref.data['layer3']);
  }

  feature
    .enter()
    .append('circle')
    .attr('r', 6)
    .attr('class', 'control controlPoint')
    .merge(feature)
    .on('mouseenter', function () {
      ref.leafletMap.dragging.disable();
    })
    .on('mouseout', function () {
      ref.leafletMap.dragging.enable();
    })
    .on('mousedown', function(evt, pointData){
      pubsub.PubSub.publish("updateLastInteractedObject", {"object": pointData, "type": "nodes"});
    })
    .call(d3.drag().on('drag', dragged).on('end', endDrag));

  g.selectAll('circle').attr('transform', function (d) {
    var ll = L.latLng(d.latLng);
    var pt = ref.leafletMap.latLngToLayerPoint(ll);
    return 'translate(' + pt.x + ',' + pt.y + ')';
  });
 feature.exit().remove();
}

function renderEdgeControl(g, data, ref) {
  var lines = g.selectAll('path').data(data.edges);

  lines
    .enter()
    .append('path')
    .merge(lines)
    .attr('d', function (d) {
      return d.controlPointPath;
    })
    .attr('class', function(d){
      return 'control'
    })
    // still need to figure out how to not zoom when doubleclicking here
    .on('dblclick', function (d) {
      addControlPoint(d, this, ref);
    })
    //--- when mouse is on the dot, make sure d3 gets the event and dont let map pan
    .on('mouseenter', function () {
      ref.leafletMap.dragging.disable();
    })
    .on('mouseout', function () {
      ref.leafletMap.dragging.enable();
    });

  lines.exit().remove();

  g.selectAll('g').remove();

  function dragged(evt, d, edgeData) {
    pubsub.PubSub.publish("updateLastInteractedObject", {"object": edgeData, "type": "edges"});
    var mapDiv = ref.leafletMap.getContainer();
    //--- set the control points to the new Lat lng
    var ll = ref.leafletMap.containerPointToLatLng(L.point(d3.pointer(evt, mapDiv)));
    d[0] = ll.lat;
    d[1] = ll.lng;
    //--- rerender stuff
    ref.update();
  }

  function endDrag(evt, d, edgeData) {
    var zoom = ref.leafletMap.getZoom();
    var center = L.latLng(ref.leafletMap.getCenter());
    ref.updateMapJson(ref.data['layer1'], ref.data['layer2'], ref.data['layer3']);
  }

  data.edges.forEach(function (edgeData) {
    var my_g = g.append('g');
    var feature = my_g.selectAll('circle').data(edgeData.latLngs);

    feature
      .enter()
      .append('circle')
      .attr('r', 4)
      .attr('class', 'control controlPoint')
      .merge(feature)
      .call(d3.drag()
        .on('drag', function(evt, d){ dragged(evt, d, edgeData); })
        .on('end', function(evt, d){ endDrag(evt, d, edgeData); }));

    my_g
      .selectAll('circle')
      .attr('transform', function (d) {
        var ll = L.latLng(d);
        var pt = ref.leafletMap.latLngToLayerPoint(ll);
        return 'translate(' + pt.x + ',' + pt.y + ')';
      })
      //--- when mouse is on the dot, make sure d3 gets the event and dont let map pan
      .on('mouseenter', function () {
        ref.leafletMap.dragging.disable();
      })
      .on('mouseout', function () {
        ref.leafletMap.dragging.enable();
      })
      .on('mousedown', function(evt, d){
        pubsub.PubSub.publish("updateLastInteractedObject", {"object": edgeData, "type": "edges"});
      });

    feature.exit().remove();
  });
}

function renderNodes(g, data, ref) {
  var feature = g.selectAll('circle').data(data.nodes);
  var div = ref.div;

  feature
    .enter()
    .append('circle')
    .attr('r', ref.options.nodeWidth)
    .attr('class', 'node')
    .attr('text', function (d) {
      return d.name;
    })
    .attr('fill', function (d) {
      return d.color;
    })
    .on('mouseover', function (event, d) {
      div
        .html(() => {
          var text = `<p><b>${d.name}</b></p>
            <p><b>In Volume: </b> ${d.inValue}</p>
            <p><b>Out Volume: </b> ${d.outValue}</p>`;
          return text;
        })
        .style('left', ref.width + 'px')
        .style('top', ref.height + 100 + 'px')
        .transition()
        .duration(500)
        .style('opacity', 0.8);
    })
    .on('mouseout', function (d) {
      div.transition().duration(500).style('opacity', 0);
    });

  g.selectAll('circle').attr('transform', function (d) {
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

function angle(cx, cy, ex, ey) {
  var dy = ey - cy;
  var dx = ex - cx;
  var theta = Math.atan2(dy, dx); // range (-PI, PI]
  theta *= 180 / Math.PI; // rads to degs, range (-180, 180]
  //if (theta < 0) theta = 360 + theta; // range [0, 360)
  return theta;
}

function getBisectAngle(pointA, pointB, pointC) {
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
function rotate(cx, cy, x, y, angle, anticlock_wise = false) {
  if (angle == 0) {
    return { x: parseFloat(x), y: parseFloat(y) };
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
  constructor(leafletMap, svg, div, curve, options, updateMapJson, updateCenter) {
    this.leafletMap = leafletMap;
    this.svg = svg;
    this.data = {};
    this.mapLayers = {};
    this.offset = options.pathOffset;
    this.lineGen = d3.line().curve(curve);
    this.editEdges = 0;
    this.editNodes = 0;
    this.div = div;
    this.options = options;
    this.updateMapJson = updateMapJson;
    this.updateCenter = updateCenter;
    this.lastInteractedObject = null; // the last object that the user interacted with
                                      // used for nudging and deletion via keyboard
    this.lastInteractedType = null; // "nodes" or "edges"

    createSvgMarker(this.svg);

    //
    let ref = this;
    this.leafletMap.on('moveend', function () {
      ref.update();
    });
    this.leafletMap.on('viewreset', function () {
      ref.update();
    });

    var self = this;
    function updateLastInteractedObject(event){
      self.lastInteractedObject = event.object;
      self.lastInteractedType = event.type;
    }
    pubsub.PubSub.subscribe("updateLastInteractedObject", updateLastInteractedObject);

    function deleteObject(object, type){
      for(var i=1; i<=3; i++){ 
        if(!self.data["layer"+i]){
          continue;
        }
        var idx = self.data["layer"+i][type].indexOf(object)
        if(idx > -1){
          self.data["layer"+i][type].splice(idx, 1);
          self.update()
          return;
        }
      }
    }
    function nudge(latOrLng, amount){
      if (self.lastInteractedType == "nodes"){
        var idx = 0;
        if(latOrLng == "longitude"){
          idx = 1;
        }
        self.lastInteractedObject.latLng[idx] += amount;
        var ll = self.lastInteractedObject.latLng;
        d3.selectAll(".connects-to-"+self.lastInteractedObject.name)
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
        case 'Backspace':
        case 'Delete':
          deleteObject(self.lastInteractedObject, self.lastInteractedType);
          break;
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

  updateCoordinates(data) {
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
      d.azPath = ref.lineGen(offsetPoints(d.points, ref.offset));

      //--- setup the zaPath
      d.zaPath = ref.lineGen(offsetPoints(d.points.reverse(), ref.offset));
    });

    //---swap out edge list with the filtered list
    data.edges = newEdges;
  }

  //--- loop through data and map objects and refresh them
  update() {
    this.leafletMap.dragging.enable();
    for (const [name, data] of Object.entries(this.data)) {
      this.updateCoordinates(data);
    }
    for (const [name, g] of Object.entries(this.mapLayers)) {
      var edge_g = g.select('g.edge');
      var node_g = g.select('g.node');
      var controlpoint_g = g.select('g.cp');
      var data = this.data[name];

      if (this.editNodes == 1) {
        renderNodeControl(controlpoint_g, data, this);
        var zoom = this.leafletMap.getZoom();
        var center = L.latLng(this.leafletMap.getCenter());
        this.updateCenter(zoom, center);        
      }
      if (this.editEdges == 1) {
        renderEdgeControl(controlpoint_g, data, this);
        var zoom = this.leafletMap.getZoom();
        var center = L.latLng(this.leafletMap.getCenter());
        this.updateCenter(zoom, center);
      }
      if (!this.editEdges && !this.editNodes) {
        //  delete all the control point g children
        controlpoint_g.selectAll('*').remove();
      }
      renderNodes(node_g, data, this);
      renderEdges(edge_g, data, this);
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
