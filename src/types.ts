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
  useConfigurationUrl: boolean;
  configurationUrl: string;
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
