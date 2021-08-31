# grafana-esnet-networkmap-panel
A geographic bidirectional network map based on d3 and leaflet 

## Options
#### Network Map Panel
- **Default Color:** This is the color all nodes and links that do not match any data from the query will be colored.  The default is grey.
- **Map Data:** This is where you can paste in the JSON for your map.  It should be structured: {edges: [], nodes: []}
Each edge should have a name and the lat,lng coordinates for two endpoints. 
Each node should have a name and the lat,lng coordinates for that node.
- **Node highlight color:** This is the color that will be used for nodes whose names match the names returned by the query.
- **Link highlight color:** See  *Standard Options*

#### Choose Fields
- **Source Field, Destination Field:** These allow you to select which queried fields the map should compare to the Source & Destination (or target) nodes.  The defaults are the first and second *Group Bys* in the query respectively.
- **Value Field:** This allows you to select which queried field to use as the value for the nodes and links.  This should be a number.  The default is the first number field.

#### Standard Options
- **Unit:** This will be applied to the values from the query.
- **Color Scheme:** This will color the links that match Source/Destination pairs returned by the query.  
  - Single color will highlight all links the same color 
  - Preset palettes (eg Blues, Greens, etc) will color the links with a gradient determined by the value returned by the query
  - Thresholds is similar to the preset palettes, but allows more precise control over colors
