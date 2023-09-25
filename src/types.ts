export interface MapOptions {
  background: string;
  color1: string;
  color2: string;
  color3: string;

  initialViewStrategy: string;

  latitudeVar: string;
  longitudeVar: string;

  startLat: number;
  startLng: number;
  startZoom: number;

  viewportTopLeftLat: number;
  viewportTopLeftLng: number;
  viewportBottomRightLat: number;
  viewportBottomRightLng: number;

  showSidebar: boolean;
  showViewControls: boolean;
  showLegend: boolean;
  enableScrolling: boolean;
  enableEditing: boolean;
  enableNodeAnimation: boolean;
  enableEdgeAnimation: boolean;
  layer1: boolean;
  jsonFromUrlL1: boolean;
  mapjsonUrlL1: string;
  mapjsonL1: string;
  nodeHighlightL1: string;
  srcFieldL1: string;
  dstFieldL1: string;
  inboundValueFieldL1: string;
  outboundValueFieldL1: string;
  endpointIdL1: string;
  layer2: boolean;
  jsonFromUrlL2: boolean;
  mapjsonUrlL2: string;
  mapjsonL2: string;
  nodeHighlightL2: string;
  srcFieldL2: string;
  dstFieldL2: string;
  inboundValueFieldL2: string;
  outboundValueFieldL2: string;
  endpointIdL2: string;
  layer3: boolean;
  jsonFromUrlL3: boolean;
  mapjsonUrlL3: string;
  mapjsonL3: string;
  nodeHighlightL3: string;
  srcFieldL3: string;
  dstFieldL3: string;
  inboundValueFieldL3: string;
  outboundValueFieldL3: string;
  endpointIdL3: string;
  editMode: boolean;
  legendL1: boolean;
  legendL2: boolean;
  legendL3: boolean;
  layerName1: string;
  layerName2: string;
  layerName3: string;
  nodeWidthL1: number;
  nodeWidthL2: number;
  nodeWidthL3: number;
  edgeWidthL1: number;
  edgeWidthL2: number;
  edgeWidthL3: number;
  pathOffsetL1: number;
  pathOffsetL2: number;
  pathOffsetL3: number;
  thresholds: any[];
  legendColumnLength: number;
  legendPosition: string;
  legendDefaultBehavior: string;
  zIndexBase: number;
  dashboardEdgeSrcVarL1: string;
  dashboardEdgeDstVarL1: string;
  dashboardNodeVarL1: string;
  dashboardEdgeSrcVarL2: string;
  dashboardEdgeDstVarL2: string;
  dashboardNodeVarL2: string;
  dashboardEdgeSrcVarL3: string;
  dashboardEdgeDstVarL3: string;
  dashboardNodeVarL3: string;

}

export interface IEndpointIdentifiers {
  pops: string[];
}

type LatLong = number[];

export interface IMapEdge {
  name: string;
  "meta": {
    endpoint_identifiers: IEndpointIdentifiers,
    template: string;
  },
  latLngs: Array<LatLong>;
  children: any[];
  azColor: string;
  zaColor: string;
  nodeA?: string;
  nodeZ?: string;
}

export interface IMapNode {
  name: string;
  meta: {[metaKey: string]: any},
  latLng: LatLong,
  color: string;
}

export interface IMapLayer {
  edges: IMapEdge[];
  nodes: IMapNode[];
}

export interface ITopology {
  [layerKey: string]: IMapLayer
}

/**
 * Labels for a unidirectional edge
 * 
 * @prop {string} src     The source of the edge
 * @prop {string} dst     The destination of the edge
 * @prop {string} data    The amount of data flow, in bytes per sec, on that edge.
 */
export interface ILabels {
  src: string;
  dst: string;
  data: string;
}