
export interface ITopologyNode {
    name: string;
    coordinate: [number, number];
    meta: {
        display_name: string;
        svg: string;
        template: string;
    };
}