import * as should from "../node_modules/should/should.js"
import * as pubsub from '../src/components/lib/pubsub.js';
const PubSub = pubsub.PubSub;

describe( "Class MapCanvas", () => {
    beforeEach(async function(){  
        if(document.querySelector("map-canvas")){ return; }

        var elem = document.createElement("map-canvas");
        elem.setAttribute('width', 800);
        elem.setAttribute('height', 400);

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
            "tileSetLayer":"esri.shaded",
            "boundaryLayer":"toner.boundaries",
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
    it( "should append a map-canvas element", () => {
      document.querySelector("map-canvas").should.be.an.instanceOf(HTMLElement);
    } );
    it( "should have a sidebar child element", () => {
      document.querySelector("map-canvas").querySelector("side-bar").should.be.an.instanceOf(HTMLElement);
    } );
    it( "should have an editing-interface child element", () => {
      document.querySelector("map-canvas").querySelector("editing-interface").should.be.an.instanceOf(HTMLElement);
    } );
    it( "should call back a defined function when an 'updateTopology' signal fires", ()=>{
      var mapCanvas = document.querySelector("map-canvas");
      var closureVar = null;
      mapCanvas.updateTopology = () => { closureVar = "called"; }
      PubSub.publish("updateTopology", null, mapCanvas);
      "called".should.equal(closureVar);
    })
    it("should have a node vertex around (262, 194) with reference to the map-canvas's offset", ()=>{
      var map_coords = document.querySelector("map-canvas").getBoundingClientRect();
      // find the first circle in a "g.node". This should be the "A" node from topology
      var node_coords = document.querySelectorAll("g.node > circle")[0].getBoundingClientRect();

      // at 800x400 canvas size, we expect the offset (from the map-canvas top-left) of the first node to be 262, 194
      const expected_x = 262;
      const expected_y = 194;

      (expected_x).should.equal(node_coords.x - map_coords.x);
      (expected_y).should.equal(node_coords.y - map_coords.y);

      // conversely, if we look for the element at the offset of 262, 194 (plus 4 for its radius), we should find our circle.
      var expected_circle = document.elementFromPoint(map_coords.x + expected_x + 4, map_coords.y + expected_y + 4);
      expected_circle.tagName.should.equal("circle");
      // we bother with all of this work because we'll need to simulate click/drag/etc events on the nodes in other test
    })
} );