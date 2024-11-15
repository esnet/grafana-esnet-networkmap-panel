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

export const AUTODETECT_TRAFFIC_DATA = [
    {"dst_latitude":41,"dst_longitude":-87,"dst_name":"UChicago","src_latitude":52,"src_longitude":21,"src_name":"NCBJ.pl","in_bits": 16000000, "out_bits": 160000000},
    {"dst_latitude":40,"dst_longitude":-74,"dst_name":"PPPL","src_latitude":43,"src_longitude":12,"src_name":"Cineca","in_bits": 4000000, "out_bits": 40000000},
    {"dst_latitude":41,"dst_longitude":-87,"dst_name":"UChicago","src_latitude":49,"src_longitude":8,"src_name":"KIT.de","in_bits": 1000000, "out_bits": 10000000},
    {"dst_latitude":41,"dst_longitude":-88,"dst_name":"FNAL","src_latitude":49,"src_longitude":8,"src_name":"KIT.de","in_bits": 32000000, "out_bits": 320000000},
    {"dst_latitude":40,"dst_longitude":-72,"dst_name":"BNL","src_latitude":46,"src_longitude":6,"src_name":"CERN","in_bits": 148000000, "out_bits": 1480000000},
    {"dst_latitude":40,"dst_longitude":-74,"dst_name":"GFDL-Z","src_latitude":46,"src_longitude":6,"src_name":"CERN","in_bits": 1000000, "out_bits": 10000000},
    {"dst_latitude":37,"dst_longitude":-76,"dst_name":"JeffersonLab","src_latitude":46,"src_longitude":6,"src_name":"CERN","in_bits": 13000000, "out_bits": 130000000},
    {"dst_latitude":38,"dst_longitude":-78,"dst_name":"Caltech","src_latitude":46,"src_longitude":6,"src_name":"CERN","in_bits": 3000000, "out_bits": 30000000},
    {"dst_latitude":29,"dst_longitude":-82,"dst_name":"UFlorida","src_latitude":46,"src_longitude":6,"src_name":"CERN","in_bits": 12000000, "out_bits": 120000000},
    {"dst_latitude":34,"dst_longitude":-86,"dst_name":"NASA","src_latitude":46,"src_longitude":6,"src_name":"CERN","in_bits": 1000000, "out_bits": 10000000},
    {"dst_latitude":40,"dst_longitude":-86,"dst_name":"Purdue","src_latitude":46,"src_longitude":6,"src_name":"CERN","in_bits": 82000000, "out_bits": 820000000},
    {"dst_latitude":41,"dst_longitude":-87,"dst_name":"UChicago","src_latitude":46,"src_longitude":6,"src_name":"CERN","in_bits": 372000000, "out_bits": 3720000000},
    {"dst_latitude":41,"dst_longitude":-88,"dst_name":"FNAL","src_latitude":46,"src_longitude":6,"src_name":"CERN","in_bits": 586000000, "out_bits": 5860000000},
    {"dst_latitude":40,"dst_longitude":-96,"dst_name":"UNLincoln","src_latitude":46,"src_longitude":6,"src_name":"CERN","in_bits": 452000000, "out_bits": 4520000000},
    {"dst_latitude":41,"dst_longitude":-88,"dst_name":"FNAL","src_latitude":50,"src_longitude":4,"src_name":"IIHE.be","in_bits": 45000000, "out_bits": 450000000},
];

// out -> dst; in -> src
export const TRAFFIC_DATA = [
    { "src_name": "A", "dst_name": "B", "in_bits": 1, "out_bits": 100 }, // A.in 1 B.out 100
    { "src_name": "B", "dst_name": "C", "in_bits": 1, "out_bits": 100 }, // B.in 1 C.out 100
    { "src_name": "C", "dst_name": "A", "in_bits": 1, "out_bits": 100 }, // C.in 1 A.out 100
    // all nodes should measure at 101 bits
    // <- 1
    // -> 100
]

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
                    "layerLimit": 3,
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
                            "srcField": "src_name",
                            "dstField": "dst_name",
                            "inboundValueField": "in_bits",
                            "outboundValueField": "out_bits",
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