import React, { Component } from 'react';
import { PanelProps } from '@grafana/data';
import { MapOptions } from './types';
import './components/MapCanvas.component.js';
export interface MapPanelProps extends PanelProps<MapOptions> {
    fieldConfig: any;
    options: MapOptions;
}
export declare class MapPanel extends Component<MapPanelProps> {
    mapCanvas: any;
    lastOptions: any;
    theme: any;
    mapjsonCache: any;
    subscriptionHandle: any;
    constructor(props: MapPanelProps);
    setDashboardVariables(): (event: any) => void;
    updateCenter: (centerData: any) => void;
    updateMapViewport: (viewportData: any) => void;
    updateMapJson: (mapData: any) => void;
    calculateOptionsChanges: () => string[];
    toggleLayer: (layer: any, value: any) => void;
    resolveLatLngFromVars(options: any, data: any, replaceVariables: any): {
        resolvedLat: number;
        resolvedLng: number;
    };
    updateMap(forceRefresh?: any): void;
    componentDidMount(): void;
    componentWillUnmount(): void;
    componentDidUpdate(): void;
    render(): React.ReactElement<{
        options: string;
        width: number;
        height: number;
        startlat: number;
        startlng: number;
        ref: any;
    }, string | React.JSXElementConstructor<any>>;
}
//# sourceMappingURL=MapPanel.d.ts.map