import * as d3 from './d3.min.js';
import React from 'react';

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
      return 'edge edge-az edge-az-' + d.name;
    })
    .attr('text', function (d) {
      return d.AZname;
    })
    .attr('pointer-events', 'visiblePainted')
    .on('mouseover', function (event, d) {
      d3.select(this).attr('class', function (d) {
        return 'animated-edge edge-az edge-az-' + d.name;
      });
      d3.selectAll('#tooltip')
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
      d3.select(this).attr('class', function (d) {
        return 'edge edge-az edge-az-' + d.name;
      });
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
      return 'edge edge-za edge-za-' + d.name;
    })
    .attr('text', function (d) {
      return d.ZAname;
    })
    .attr('pointer-events', 'visiblePainted')
    .on('mouseover', function (event, d) {
      d3.select(this).attr('class', function (d) {
        return 'animated-edge edge-za edge-za-' + d.name;
      });
      d3.selectAll('#tooltip')
        .html(() => {
          var text =
            '<p><b>From:</b> ' +
            d.nodeZ +
            '</p><p><b>To:</b> ' +
            d.nodeA +
            '</p><p><b>Volume: </b> ' +
            d.AZdisplayValue +
            '</p>';
          return text;
        })
        .transition()
        .duration(500)
        .style('opacity', 0.8);
    })
    .on('mouseout', function (d, i) {
      d3.select(this).attr('class', function (d) {
        return 'edge edge-za edge-za-' + d.name;
      });
      div.transition().duration(500).style('opacity', 0);
    });

  zaLines.exit().remove();
}

function addControlPoint(evt, obj, ref) {
  console.log('add control point');

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
      console.log('split between: ' + idx + ' and ' + (idx + 1));
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

function renderEdgeControl(g, data, ref) {
  var lines = g.selectAll('path').data(data.edges);

  lines
    .enter()
    .append('path')
    .merge(lines)
    .attr('d', function (d) {
      return d.controlPointPath;
    })
    .attr('class', 'control')
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

  function dragged(evt, d) {
    var mapDiv = ref.leafletMap.getContainer();
    //--- set the control points to the new Lat lng
    var ll = ref.leafletMap.containerPointToLatLng(L.point(d3.pointer(evt, mapDiv)));
    d[0] = ll.lat;
    d[1] = ll.lng;
    //--- rerender stuff
    ref.update();
    //--- this is where we can update json????
    // var zoom = ref.leafletMap.getZoom();
    // var center = L.latLng(ref.leafletMap.getCenter());
    // ref.updateMapJson(data, zoom, center);
    // find a way to persist zoom and center lat/lng
  }

  function endDrag(evt, d) {
    var zoom = ref.leafletMap.getZoom();
    var center = L.latLng(ref.leafletMap.getCenter());
    console.log(ref.data);
    console.log(data);
    ref.updateMapJson(ref.data['layer1'], ref.data['layer2'], ref.data['layer3'], zoom, center);
  }

  data.edges.forEach(function (d) {
    var my_g = g.append('g');
    var feature = my_g.selectAll('circle').data(d.latLngs);

    feature
      .enter()
      .append('circle')
      .attr('r', 4)
      .attr('class', 'control controlPoint')
      .merge(feature)
      .call(d3.drag().on('drag', dragged).on('end', endDrag));

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
      });

    feature.exit().remove();
  });
  // ref.updateMapJson(data); not here
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

  //console.log(angle1 +" "+angle2+ "--> " + bisectAngle);

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
    this.edit = 0;
    this.div = div;
    this.options = options;
    this.updateMapJson = updateMapJson;
    this.updateCenter = updateCenter;

    createSvgMarker(this.svg);

    //
    let ref = this;
    this.leafletMap.on('moveend', function () {
      ref.update();
    });
    this.leafletMap.on('viewreset', function () {
      ref.update();
    });
  }

  editMode(setting) {
    if (setting === null || setting === undefined) {
      return this.edit;
    }

    if (setting > 0) {
      this.edit = 1;
    } else {
      this.edit = 0;
    }

    this.update();
    return this.edit;
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
        console.log('marking as rejected: ' + d.name);
        d.rejected = 1;
        return;
      }
      newEdges.push(d);
      //console.log("sddetup the paths for " + d.name +" reject? "+reject);

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
    // console.log(this.data);
    for (const [name, data] of Object.entries(this.data)) {
      // console.log(name);
      // console.log(data);
      this.updateCoordinates(data);
    }
    for (const [name, g] of Object.entries(this.mapLayers)) {
      var edge_g = g.select('g.edge');
      var node_g = g.select('g.node');
      var cp_g = g.select('g.cp');
      var data = this.data[name];

      if (this.edit == 1) {
        renderEdgeControl(cp_g, data, this);
        var zoom = this.leafletMap.getZoom();
        var center = L.latLng(this.leafletMap.getCenter());
        this.updateCenter(zoom, center);
      } else {
        //  delete all the control point g children
        cp_g.selectAll('*').remove();
      }
      renderNodes(node_g, data, this);
      renderEdges(edge_g, data, this);
    }
  }

  addNetLayer(name, data) {
    var ref = this;
    ref.data[name] = data; //maybe use this to serialize
    console.log(data);
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
