export class MapCanvas extends BindableHTMLElement {
    static get observedAttributes(): string[];
    instanceId: string;
    _topology: any;
    _options: any;
    _selection: boolean;
    map: NetworkMap | null;
    leafletMap: any;
    set jsonResults(arg: any);
    get jsonResults(): any;
    legendMinimized: boolean;
    userChangedMapFrame: boolean;
    connectedCallback(): void;
    set topology(arg: any);
    get topology(): any;
    set options(arg: any);
    get options(): any;
    _jsonResults: any;
    set updateTopology(arg: any);
    get updateTopology(): any;
    _updateTopology: any;
    set updateOptions(arg: any);
    get updateOptions(): any;
    _updateOptions: any;
    set height(arg: any);
    get height(): any;
    _height: any;
    set width(arg: any);
    get width(): any;
    _width: any;
    set startlat(arg: any);
    get startlat(): any;
    _startlat: any;
    set startlng(arg: any);
    get startlng(): any;
    _startlng: any;
    set selection(arg: boolean);
    get selection(): boolean;
    attributeChangedCallback(attribute: any, oldValue: any, newValue: any): void;
    clearSelection(): void;
    disableEditing(): void;
    enableEditing(): void;
    enableScrolling(): void;
    disableScrolling(): void;
    updateMapOptions(changedOptions: any): void;
    shadow: HTMLDivElement | null | undefined;
    updateMapTopology(newTopology: any): void;
    updateMapDimensions(newDimensions: any): void;
    recalculateMapZoom(): void;
    updateCenter(centerData: any): void;
    /**
     * Updates the canvas to display tooltips with an updated toggle event to render an icon or text.
     *
     * @param {{isIcon: boolean, legend: string}} labelTypeData
     */
    toggleTooltipLabelType(labelTypeData: {
        isIcon: boolean;
        legend: string;
    }): void;
    toggleLayer(layerData: any): void;
    getCurrentLeafletMap(): any;
    destroyMap(): void;
    homeMap(): void;
    newMap(): void;
    renderStyle(): void;
    valueFormat(bytes: any, unit: any): "0" | {
        text: string;
        suffix: string;
    };
    legendFormatter(thisValue: any, nextValue: any): string;
    toggleMinimizeLegend(): void;
    renderLegend(): void;
    render(): void;
    mapContainer: Element | null | undefined;
    editingInterface: Element | null | undefined;
    sideBar: Element | null | undefined;
}
import { BindableHTMLElement } from './lib/rubbercement.js';
import NetworkMap from "./NetworkMap.js";
//# sourceMappingURL=MapCanvas.component.d.ts.map