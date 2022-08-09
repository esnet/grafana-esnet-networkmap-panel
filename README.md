[![Build Status](https://api.travis-ci.com/esnet/grafana-esnet-networkmap-panel.svg?branch=main)](https://app.travis-ci.com/github/esnet/grafana-esnet-networkmap-panel)

# grafana-esnet-networkmap-panel
A geographic bidirectional network map using the leaflet and d3 libraries.

## Options
#### Network Map Panel
- **Starting Latitude & Longitude of Map:** This will be the center of the map when it loads.  If you move the map in edit mode and save your changes, they will persist here.
- **Starting zoom level of map:** A number between 1 & 15 that indicates the starting zoom level of the map. Higher numbers will be more zoomed in. If you zoom into the map in edit mode and save your changes, they will persist here.
- **Node Size:** The size of the nodes on the map.  Half steps are allowed.
- **Edge Width:** The width of the edges on the map.  Half steps are allowed.
- **Edge Offset:** The space between the edges on the map.  Half steps are allowed.

#### Layer Options
Up to 3 Layers can be toggled on and off.  For each layer, you have the following options:
- **Map Data:** This is where you can paste in the JSON for your map.  It will be converted to a JSON and checked with JSON schema. (*See full schema below)
Any edits you make to the edges & nodes in edit mode will persist here.
- **Default Color:** This is the color all nodes and links that do not match any data from the query will be colored.  The default is grey if unchanged.
- **Endpoint Identifier:** This string needs to match the endpoint identifier field to use exactly.
- **Node highlight color:** This is the color that will be used for nodes whose names match the names returned by the query.


#### Choose Fields
For each layer you that is turned on, the following options will be available:
- **Source Field, Destination Field:** These allow you to select which queried fields the map should compare to the Source & Destination (or target) nodes.  The defaults are the first and second *Group Bys* in the query respectively.
- **Value Field:** This allows you to select which queried field to use as the value for the nodes and links.  This should be a number.  The default is the first number field.

#### Legend Options
For each layer you that is turned on, the following options will be available:
- **Show Layer toggle:**
- **Layer Display Name:**

#### Some notes on Standard Options
- **Unit:** This will be applied to the values returned from the query and displayed in the sidebar when hovering over a line/edge.
- **Color Scheme:** This will color the edges that match Source/Destination pairs returned by the query.  All layers will follow the same color scheme.
  - Single color will highlight all links the same color 
  - Preset palettes (eg Blues, Greens, etc) will color the links with a gradient determined by the value returned by the query
  - Thresholds is similar to the preset palettes, but allows more precise control over colors.


## This plugin can be run as a standalone web component

#### Instructions to run standalone

1. Change your working directory to the project root. If the repo is cloned into your ~/work directory:
```
cd ~/work
```

2. Start your favorite simple HTTP server. For instance, the python http.server
```
python3 -m http.server 3500
```
3. Load `index.html` in your browser

```
https://localhost:3500/
```

#### Running in a native HTML context

`index.html` contains a complete example to run this plugin in a native HTML context. 

#### Imports:
```
    <script src="./src/components/lib/react.17.0.2.umd.js"></script>
    <script type="module">
        import "./src/components/lib/leaflet.global.js";
    </script>
    <script type="module">
        import "./src/components/lib/d3.min.js"; 
    </script>
    <script type="module">
        import "./src/components/MapCanvas.component.js";
    </script>```

```

#### Minimal JSON Topology:
```
        var topology = {
            "layer1":{ "edges":[], "nodes": [] },
            "layer2":{ "edges":[], "nodes": [] },
            "layer3":{ "edges":[], "nodes": [] },
        }
```


#### Instantiate the Web Component (create a DOM element) and bind Topology and Options. Bind to DOM

```
        var canvas = document.createElement("esnet-map-canvas");
        canvas.setAttribute('width', 800);
        canvas.setAttribute('height', 400);
        canvas.topology = topology;
        canvas.options = options;
        document.getElementById("mapContainer").append(canvas);        
```


#### Minimal Options JSON
```
        var options = {
            "startLat":38.68,
            "startLng":-96.96,
            "startZoom":3,
            "background":"#EDEDED",
            // global options
            // this string corresponds to options in RenderMap.js
            "tileSetLayer":"esri.shaded",
            // this string (or null) corresponds to options in RenderMap.js
            "boundaryLayer":"toner.boundaries",
            // this string (or null) corresponds to options in RenderMap.js
            "labelLayer":null,
            // these are legacy, they've been overridden by per-layer options.
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
```

#### JSON Schema
```
{
  type: 'object',
  properties: {
    name: { type: 'string' },
    nodes: {
      type: 'object',
      properties: {},
    },
    edges: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          name: { type: 'string' },
          latLngs: { type: 'array', items: { type: 'array', items: { type: 'number' } } },
          meta: {
            type: 'object',
            properties: { endpoint_identifiers: { type: 'object' } },
          },
        },
        required: ['name', 'latLngs', 'meta'],
      },
    },
    nodes: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          name: { type: 'string' },
          latLng: { type: 'array', items: { type: 'number' } },
        },
        required: ['name', 'latLng'],
      },
    },
  },
  required: ['edges', 'nodes'],
  additionalProperties: true,
};
```

