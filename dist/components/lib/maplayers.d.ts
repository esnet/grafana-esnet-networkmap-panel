export const TILESETS: {
    arcgis: {
        url: string;
        attributes: {
            attribution: string;
            minZoom: number;
            maxZoom: number;
            ext: string;
        };
    };
    usgs: {
        url: string;
        attributes: {
            maxZoom: number;
            attribution: string;
        };
    };
    "esri.shaded": {
        url: string;
        attributes: {
            attribution: string;
            maxZoom: number;
        };
    };
    geoportail: {
        url: string;
        attributes: {
            attribution: string;
            bounds: number[][];
            minZoom: number;
            maxZoom: number;
            apikey: string;
            format: string;
            style: string;
        };
    };
    "cartodb.labeled": {
        url: string;
        attributes: {
            attribution: string;
            subdomains: string;
            maxZoom: number;
        };
    };
    "cartodb.unlabeled": {
        url: string;
        attributes: {
            attribution: string;
            subdomains: string;
            maxZoom: number;
        };
    };
    opentopomap: {
        url: string;
        attributes: {
            maxZoom: number;
            attribution: string;
        };
    };
};
export const BOUNDARIES: {
    "toner.boundaries": {
        url: string;
        attributes: {
            attribution: string;
            subdomains: string;
            minZoom: number;
            maxZoom: number;
            ext: string;
        };
    };
};
export const LABELS: {
    "toner.labels": {
        url: string;
        attributes: {
            attribution: string;
            subdomains: string;
            minZoom: number;
            maxZoom: number;
            ext: string;
        };
    };
};
//# sourceMappingURL=maplayers.d.ts.map