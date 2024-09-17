export default class NetworkMap {
    /**
     * Renders the Network Map in the panel.
     *
     * @param mapCanvas - the parent MapCanvas object.
     */
    constructor(mapCanvas: any);
    mapCanvas: any;
    groups: any[];
    leafletMap: any;
    svgLayer: any;
    sideBar: any;
    esmap: es.EsMap;
    destroy(): void;
    renderMapLayers(): void;
    renderMap(): any;
}
import * as es from './lib/esmap.js';
//# sourceMappingURL=NetworkMap.d.ts.map