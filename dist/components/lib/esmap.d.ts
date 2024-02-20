export function toRadians(degrees: any): number;
export function toDegrees(radians: any): number;
export function bearingAngle(src: any, dest: any): number;
export function angle(cx: any, cy: any, ex: any, ey: any): number;
export function getBisectAngle(pointA: any, pointB: any, pointC: any): number;
export function rotate(cx: any, cy: any, x: any, y: any, angle: any, anticlock_wise?: boolean): any[];
export class EsMap {
    constructor(mapCanvas: any, svg: any, div: any, curve: any);
    mapCanvas: any;
    leafletMap: any;
    svg: any;
    data: any[];
    mapLayers: any[];
    curves: any[];
    lineGen: any;
    editEdges: any;
    editNodes: any;
    div: any;
    options: any;
    lastInteractedObject: any;
    lastInteractedType: any;
    showTooltipSubscription: any;
    editEdgeMode(setting: any): any;
    editNodeMode(setting: any): any;
    updateCoordinates(data: any, layerId: any): void;
    update(): void;
    addNetLayer(idx: any, data: any): any;
}
//# sourceMappingURL=esmap.d.ts.map