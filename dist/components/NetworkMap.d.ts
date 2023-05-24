export default class NetworkMap {
    /**
     * Renders the Network Map in the panel.
     *
     * @param mapCanvas - the parent MapCanvas object.
     */
    constructor(mapCanvas: any);
    mapCanvas: any;
    g1: any;
    g2: any;
    g3: any;
    leafletMap: any;
    svgLayer: any;
    sideBar: any;
    esmap: es.EsMap;
    dispatchEvent(event: any): any;
    setEdgeEdit(bool: any): void;
    setNodeEdit(bool: any): void;
    setEditMode(mode: any): void;
    renderMapLayers(): void;
    renderMap(): any;
}
import * as es from "./lib/esmap.js";
//# sourceMappingURL=NetworkMap.d.ts.map