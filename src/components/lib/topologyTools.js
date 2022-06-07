export function sanitizeNode(node){
  return {
    name: node.name,
    meta: node.meta,
    latLng: node.latLng,
  };
};

export function sanitizeEdge(edge){
  return {
    name: edge.name,
    meta: edge.meta,
    latLngs: edge.latLngs,
    children: edge.children,
  };
};

export function sanitizeTopology(layerData) {
  return {
    name: layerData.name,
    layer: layerData.layer,
    pathLayout: layerData.pathLayout,
    edges:
      (layerData.edges &&
        layerData.edges.reduce((output, edge) => {
          output.push(sanitizeEdge(edge));
          return output;
        }, [])) ||
      [],
    nodes:
      (layerData.nodes &&
        layerData.nodes.reduce((output, node) => {
          output.push(sanitizeNode(node));
          return output;
        }, [])) ||
      [],
  };
};