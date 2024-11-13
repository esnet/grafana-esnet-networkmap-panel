export const LAVENDER = "rgb(202, 149, 229)";

/**
 * The regex to test the text for the default node tooltip template against.
 * Note that the textual representation of the template contains SVGs that are processed
 * by helperTestFn.getElementText such that they render SVGs a11y text in place of the
 * SVGs.
 * @see utils.getElementText
 * @see options.svgGauge
 * @see options.svgArrowLeftFromLine
 * @see options.svgArrowRightToLine
 */
export const EXPECTED_NODE_MOUSEOVER_REGEX = /A\s+In Volume(\s+|:\s*)\d+\s+Out Volume(\s+|:\s*)\d+/;

export const TOPOLOGY = [
            {
                "edges":[
                    {"name":"A--B","meta":{
                        "endpoint_identifiers":{"names":["A","B"]}},
                        "coordinates":[[39.02,-105.99],[35.81,-101.77],[34.59,-96.06]],
                        "children":[],
                        "azColor":LAVENDER,
                        "zaColor":LAVENDER,
                        "layer":1,
                    },
                    {"name":"B--C","meta":{
                        "endpoint_identifiers":{"names":["B","C"]}},
                        "coordinates":[[34.59,-96.06],[37.99,-93.86],[42.16,-93.95]],
                        "children":[],
                        "azColor":LAVENDER,
                        "zaColor":LAVENDER,
                        "layer":1
                    },
                    {"name":"A--C","meta":{
                        "endpoint_identifiers":{"names":["A","C"]}},
                        "coordinates":[[39.02,-105.99],[41.90,-100.72],[42.16,-93.95]],
                        "children":[],
                        "azColor":LAVENDER,
                        "zaColor":LAVENDER,
                        "layer":1
                    }
                ],
                "nodes":[
                        {
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
                        },
                        {
                            "name":"C",
                            "meta":{},
                            "coordinate":[42.16340342422403,-93.95507812500001],
                            "color":LAVENDER,
                            "inValue": 12358132134,
                            "outValue": 63063063012,
                        }
                ]}
        ]

export const OPTIONS = {
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
                    "topologySource": "json",
                    "configurationUrl": "",
                    "edgeWidth":3,
                    "editMode":true,
                    "nodeWidth":5,
                    "pathOffset":3,
                    "layers": [
                        {
                            "visible":true,
                            "endpointId":"names",
                            "nodeWidth":4,
                            "edgeWidth":1.5,
                            "pathOffset":1.5,
                            "name":"Core Topology",
                            "legend":true,
                            "dashboardEdgeSrcVar": "src",
                            "dashboardEdgeDstVar": "dst",
                            "dashboardNodeVar": "node",
                        },
                        {
                            "visible":false,
                            "endpointId":"names",
                            "nodeWidth":5,
                            "edgeWidth":3,
                            "pathOffset":3,
                            "name":"Site Topology",
                            "legend":true,
                        },
                        {
                            "visible":false,
                            "endpointId":"names",
                            "nodeHighlight":"red",
                            "nodeWidth":6.5,
                            "edgeWidth":2,
                            "pathOffset":1.5,
                            "name":"Peer Topology",
                            "legend":true,
                        }
                    ]
                }