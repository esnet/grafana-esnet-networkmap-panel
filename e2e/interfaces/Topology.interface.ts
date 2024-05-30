import { ITopologyEdge } from "./TopologyEdge.interface";
import { ITopologyNode } from "./TopologyNode.interface";

export interface ITopology {
    nodes: ITopologyNode[];
    edges: ITopologyEdge[];
}