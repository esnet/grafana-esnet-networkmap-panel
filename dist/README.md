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

