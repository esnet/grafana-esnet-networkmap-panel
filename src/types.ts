export interface LayerOptions {
  color: string;
  visible: boolean;
  jsonFromUrl: boolean;
  mapjsonUrl: string;
  mapjson: string;
  nodeHighlight: string;
  srcField: string;
  dstField: string;
  inboundValueField: string;
  outboundValueField: string;
  endpointId: string;
  legend: boolean;
  name: string;
  nodeWidth: number;
  edgeWidth: number;
  pathOffset: number;
  dashboardEdgeSrcVar: string;
  dashboardEdgeDstVar: string;
  dashboardNodeVar: string;
  nodeThresholds: any;
  nodeNameMatchField: string;
  nodeValueField: string;
}

export interface MapOptions {
  background: string;
  initialViewStrategy: string;
  latitudeVar: string;
  longitudeVar: string;
  showSidebar: boolean;
  showViewControls: boolean;
  showLegend: boolean;
  enableScrolling: boolean;
  enableEditing: boolean;
  enableNodeAnimation: boolean;
  enableEdgeAnimation: boolean;
  editMode: boolean;
  thresholds: any[];
  legendColumnLength: number;
  legendPosition: string;
  legendDefaultBehavior: string;
  zIndexBase: number;

  viewport: {
    top?: number;
    left?: number;
    bottom?: number;
    right?: number;
    center?: {
      lat: number;
      lng: number;
    }
    zoom?: number;
  }

  layers: LayerOptions[]
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
  layer: string;
}

export type Topology = IMapLayer[];


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