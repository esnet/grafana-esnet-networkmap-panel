function _createSvgMarker(svg){
  //--- setup markers
  var defs = svg.append('svg:defs')
		.attr('id', 'markers');

  //--- could not  this just be in a template somewhere?
  var marker = defs.selectAll('marker')
		.data([{ id: 2, name: 'arrow', path: 'M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z', viewbox: '0 0 20 20' }])
		.enter()
		.append('svg:marker')
			.attr('id', function(d){ return d.name})
			.attr('markerHeight', 3)
			.attr('markerWidth', 3 )
			.attr('markerUnits', 'strokeWidth')
			.attr('orient', 'auto')
                	.attr('refX', 10)
                	.attr('refY', 10)
                	.attr('viewBox', function(d){ return d.viewbox })
                	.append('svg:path')
                		.attr('d', function(d){ return d.path })
                		.attr('fill', function(d,i) { return "#333"})
                		.attr('stroke',"#555")
                		.attr('stroke-width',.5);
  return marker;
}


function renderEdges(g,data){
  
  var azLines = g.selectAll("path.edge-az")
		.data(data.edges);
  azLines.enter()
    //-- A to Z path 
    .append("path")
      .merge(azLines)
      .attr('d',function(d){return d.azPath;})
      .attr('marker-mid', function(d,i){ return 'url(#arrow)' })
      .attr('class',function(d){return "edge edge-az edge-az-"+d.name})
      .on('mouseover',function(d,i){d3.select(this).attr('class',function(d){return "animated-edge edge-az edge-az-"+d.name})})
      .on('mouseout',function(d,i){d3.select(this).attr('class',function(d){return "edge edge-az edge-az-"+d.name})})
      
  azLines.exit().remove();
 
  var zaLines = g.selectAll("path.edge-za")
                .data(data.edges);
  zaLines.enter()
    //-- Z to A path 
    .append("path")
      .merge(zaLines)
      .attr('d',function(d){return d.zaPath;})
      .attr('marker-mid', function(d,i){ return 'url(#arrow)' })
      .attr('class',function(d){return "edge edge-za edge-za-"+d.name})
      .on('mouseover',function(d,i){d3.select(this).attr('class',function(d){return "animated-edge edge-za edge-za-"+d.name})})
      .on('mouseout',function(d,i){d3.select(this).attr('class',function(d){return "edge edge-za edge-za-"+d.name})});

  zaLines.exit().remove();
}

function renderEdgeControlPoints(g,data,ref){
  var lines = g.selectAll("path")
                .data(data.edges);

  lines.enter()
    .append("path")
    .merge(lines)
    .attr('d',function(d){return d.controlPointPath;})
    .attr('class','control');

  lines.exit().remove();

  g.selectAll('g').remove();

  function dragged(event, d) {
    //--- set the control points to the new Lat lng 
    var foo = ref.leafletMap.containerPointToLayerPoint(L.point(event));
    d3.select(this).attr("transform",function(d){
        return "translate(" + foo.x + "," + foo.y +")";
      })
    var ll = ref.leafletMap.layerPointToLatLng(foo); 
    d[0]=ll.lat;
    d[1]=ll.lng;
    //--- rerender stuff
    ref.update();
  }

  data.edges.forEach(function(d){
    var my_g = g.append("g");
    var feature = my_g.selectAll("circle")
      .data(d.latLngs)

    feature.enter()
      .append('circle')
      .attr('r',3)
      .attr('class','control controlPoint')
      .merge(feature)
      .call(d3.drag().on("drag", dragged));

    my_g.selectAll("circle")
      .attr("transform",function(d){
        var ll = L.latLng(d);
        var pt = ref.leafletMap.latLngToLayerPoint(ll);
        return "translate(" + pt.x + "," + pt.y +")";
      })
       //--- when mouse is on the dot, make sure d3 gets the even and dont let map pan
      .on("mouseenter",function(){ref.leafletMap.dragging.disable();})
      .on("mouseout",function(){ref.leafletMap.dragging.enable();})


    feature.exit().remove();
  });
}



function renderNodes(g,data,ref){
  var feature = g.selectAll("circle")
    .data(data.nodes);

  feature.enter()
    .append('circle')
    .attr('r',5)
    .attr('class','node');

  g.selectAll("circle")
    .attr("transform",function(d){
      var ll = L.latLng(d.latLng);
      var pt = ref.leafletMap.latLngToLayerPoint(ll);
      return "translate(" + pt.x + "," + pt.y +")";
    });

  feature.exit().remove();
}



function calcTranslation(distance,targetPoint,pointA,pointB){
  var segmentAngle = Math.atan2((pointB[1] - pointA[1]), (pointB[0] - pointA[0]));
  return  [
	    targetPoint[0] + (Math.sin(segmentAngle)*distance),
            targetPoint[1] + (-Math.cos(segmentAngle)*distance)
	  ];
}

function angle(cx, cy, ex, ey) {
  var dy = ey - cy;
  var dx = ex - cx;
  var theta = Math.atan2(dy, dx); // range (-PI, PI]
  theta *= 180 / Math.PI; // rads to degs, range (-180, 180]
  //if (theta < 0) theta = 360 + theta; // range [0, 360)
  return theta;
}


function getBisectAngle(pointA,pointB,pointC){
  var angle1 = angle(...pointB,...pointA);
  var angle2 = angle(...pointB,...pointC);
  var relativeAngle = angle1-angle2;;
  bisectAngle  = angle1 -  (relativeAngle *.5) ;
  
  //console.log(angle1 +" "+angle2+ "--> " + bisectAngle);

  if(angle1> angle2){bisectAngle+=180;}
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
function rotate(cx, cy, x, y, angle,anticlock_wise = false) {
    if(angle == 0){
        return {x:parseFloat(x), y:parseFloat(y)};
    }if(anticlock_wise){
        var radians = (Math.PI / 180) * angle;
    }else{
        var radians = (Math.PI / -180) * angle;
    }
    var cos = Math.cos(radians);
    var sin = Math.sin(radians);
    var nx = (cos * (x - cx)) + (sin * (y - cy)) + cx;
    var ny = (cos * (y - cy)) - (sin * (x - cx)) + cy;
    return [nx, ny];
 }

//---- Takes a set of points representing the points between endpoint A and endpoint Z
//---- it then cacluates the point positions for an offset path parallel to the original
//---- useful when laying out circuits that look like divided highways

function offsetPoints(origPoints,offset){
  var points = origPoints.slice();
  let x =0;

  //--- for the first and last point, offset 90 degrees from the line
  points[0] = calcTranslation(offset,points[0],points[0],points[1]);
  x=points.length-1;
  points[x] = calcTranslation(- offset,points[x],points[x],points[x-1]);
  for(x = 1;x < points.length-1;x++){
     //--- for these, split the difference to basically miter cut
     var bisAngle = getBisectAngle(points[x-1],points[x],points[x+1]);
     points[x] = rotate(...points[x],points[x][0]+offset,points[x][1],bisAngle);
  }
 
  return points;
}

class esmap {
  constructor(leafletMap,svg,curve){
    this.leafletMap = leafletMap;
    this.svg        = svg;
    this.data       = {};
    this.mapLayers  = {};
    this.offset     = 3;
    this.lineGen    = d3.line().curve(curve);
    this.edit       = 0;

    _createSvgMarker(this.svg)
  }

  updateCoordinates(data){
    //console.log("updateCoordinates");
    var ref = this;

    var idx =0;

    var newEdges = [];
    data.edges.forEach(function(d){
      var reject = 0;
      d.points = [];
      d.rejected = 0;
      if(typeof d.latLngs === 'undefined' || d.latLngs === null){
        d.rejected = 1;
	return;
      }

      //--- setup control points 
      d.latLngs.forEach(function(coord) {
	if( ! Array.isArray(coord)){
	  reject = 1;
          return;
	}
        var ll = L.latLng(coord);
        var pt =ref.leafletMap.latLngToLayerPoint(ll);
	//--- setup the control points
        d.points.push([pt.x,pt.y]);
      });

      if(d.points.length < 2){
        reject = 1;
        //--- skip if not at least 2 coordinates in the array
      }

      if(reject){
	//--- issue found we should remove this from the list
	idx = data.edges.indexOf(d);
	console.log("marking as rejected: "+ d.name );
	d.rejected = 1;
        return;
      }
      newEdges.push(d);
      //console.log("sddetup the paths for " + d.name +" reject? "+reject);

      //--- setup the controlPoint path
      d.controlPointPath = d3.line()(d.points);

      //--- setup the azPath
      d.azPath = ref.lineGen(offsetPoints(d.points,ref.offset));

      //--- setup the zaPath
      d.zaPath = ref.lineGen(offsetPoints(d.points.reverse(),ref.offset));

    });

    //---swap out edge list with the filtered list
    data.edges = newEdges;

  }

  //--- loop through data and map objects and refresh them
  update(){
    console.log("update");
    for(const [name,data] of Object.entries(this.data)){
      this.updateCoordinates(data);
    }

    for(const [name,g] of Object.entries(this.mapLayers)){
      var edge_g = g.select("g.edge");
      var node_g = g.select("g.node");
      var cp_g   = g.select("g.cp");
      var data   = this.data[name];

      if(this.edit){
         renderEdgeControlPoints(cp_g,data,this);
       }
       renderNodes(node_g,data,this);
       renderEdges(edge_g,data);
    }
  }

  addNetLayer(name,data){
    var ref = this;
    ref.data[name] = data;
    var map_g = this.svg.append("g").attr('class','esmap');
    ref.mapLayers[name] = map_g;

    var edge_g = map_g.append("g").attr('class','edge');
    var node_g = map_g.append("g").attr('class','node');
    var cp_g = map_g.append("g").attr('class','cp');
  
    //--- render layer and ensure events are hooked up to map 
    this.update();
    var ref = this;
    ref.leafletMap.on("moveend",function(){ref.update();});
    ref.leafletMap.on("viewreset",function(){ref.update();});

    return map_g;
  }
}
