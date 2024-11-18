
export interface ITopologyEdge {
    name: string;
    meta: {
        endpoint_identifiers: {
            names: [string, string]
        }
    },
    coordinates: [number, number, number];
}