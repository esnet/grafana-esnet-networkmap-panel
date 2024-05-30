
export interface ITopologyEdge {
    name: string;
    meta: {
        endpoint_identifiers: {
            pops: [string, string]
        }
    },
    coordinates: [number, number, number];
}