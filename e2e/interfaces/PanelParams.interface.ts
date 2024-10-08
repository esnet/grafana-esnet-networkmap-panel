import { IFlowSheet } from "../../src/types";
import { IDataSource } from "./DataSource.interface";
import { ITopology } from "./Topology.interface";

/**
 * Parameters for creating a Network Map Panel
 */
export interface INetworkPanelParams {
    /**
     * The topology to render in the network map panel
     * @var
     */
    topology?: ITopology;
    /**
     * The individual data sources for each layer in the panel.
     * @var
     */
    layerData?: IDataSource[];
    /**
     * The title of the the network map panel
     * @var
     */
    title?: string;
    /**
     * The uid of the data source for a single network map panel overall
     */
    uid?: string;
    /**
     * The URL to configure for the panel's query.
     * @var
     */
    flowSheets?: IFlowSheet[];
    /**
     * The query type to configure for the panel's query.
     */
    queryType?: string;
}