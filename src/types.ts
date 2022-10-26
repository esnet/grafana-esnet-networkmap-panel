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
  viewportZoom: boolean;

  showSidebar: boolean;
  showViewControls: boolean;
  showLegend: boolean;
  enableScrolling: boolean;
  enableEditing: boolean;
  enableAnimations: boolean;
  layer1: boolean;
  mapjsonL1: string;
  nodeHighlightL1: string;
  srcFieldL1: string;
  dstFieldL1: string;
  inboundValueFieldL1: string;
  outboundValueFieldL1: string;
  endpointIdL1: string;
  layer2: boolean;
  mapjsonL2: string;
  nodeHighlightL2: string;
  srcFieldL2: string;
  dstFieldL2: string;
  inboundValueFieldL2: string;
  outboundValueFieldL2: string;
  endpointIdL2: string;
  layer3: boolean;
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
}
