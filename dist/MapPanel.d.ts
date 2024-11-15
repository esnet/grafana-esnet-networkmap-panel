import React, { Component } from 'react';
import { PanelProps } from '@grafana/data';
import { MapOptions } from './types';
import './components/MapCanvas.component.js';
export interface MapPanelProps extends PanelProps<MapOptions> {
    fieldConfig: any;
    options: MapOptions;
}
export declare function toDataFrames(data: any): any[];
export declare class MapPanel extends Component<MapPanelProps> {
    mapCanvas: any;
    lastOptions: any;
    lastTopology: any;
    theme: any;
    mapjsonCache: any;
    subscriptionHandle: any;
    variableChangeHandle: any;
    _configurationUrl: any;
    updateListener: any;
    constructor(props: MapPanelProps);
    setDashboardVariables(): (event: any) => void;
    updateCenter: (centerData: any) => void;
    updateMapViewport: (viewportData: any) => void;
    updateTopologyEditor: (mapData: any) => void;
    toggleLayer: (layer: any, value: any) => void;
    resolveLatLngFromVars(options: any, data: any, replaceVariables: any): {
        resolvedLat: number;
        resolvedLng: number;
    };
    resolveNodeThresholds(options: any): any;
    updateMap(forceRefresh?: any): void;
    componentDidMount(): void;
    componentWillUnmount(): void;
    componentDidUpdate(): void;
    render(): React.ReactElement<{
        width: number;
        height: number;
        startlat: number;
        startlng: number;
        ref: any;
    }, string | React.JSXElementConstructor<any>>;
}
//# sourceMappingURL=MapPanel.d.ts.map