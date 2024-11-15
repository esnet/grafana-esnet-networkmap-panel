export const signals = {
    TOPOLOGY_UPDATED: "topology updated",
    OPTIONS_UPDATED: "options updated",
    TRAFFIC_UPDATED: "traffic updated",

    TOPOLOGY_LOAD_SUCCESS: "topology load success",
    TOPOLOGY_LOAD_FAILURE: "topology load failure",

    LAYER_LOAD_SUCCESS: "layer load success",
    LAYER_LOAD_FAILURE: "layer load failure",

    NODE_CREATED: "node created",
    NODE_UPDATED: "node updated",
    NODE_DELETED: "node deleted",
    NODE_SELECTED: "node selected",

    EDGE_CREATED: "edge created",
    EDGE_UPDATED: "edge updated",
    EDGE_DELETED: "edge deleted",
    EDGE_SELECTED: "edge selected",

    DESELECTED: "deselected",

    MAP_DESTROYED: "map destroyed",
    MAP_CREATED: "map created",

    SCROLLING_TOGGLED: "scrolling toggled",
    SELECTION_SET: "selection set",
    SELECTION_CLEARED: "selection cleared",
    VARIABLES_SET: "variables set",
    EDITING_SET: "editing set",
    LAYER_TOGGLED: "layer toggled",

    DRAG_STARTED: "drag started",
    DRAG_ENDED: "drag ended",

    EDGE_SNAP: "edge snap",
    TOOLTIP_VISIBLE: "tooltip visible",
    TOOLTIP_HIDDEN: "tooltip hidden",

    REQUEST_MAP_CENTER_AND_ZOOM: "request map center and zoom",
    RETURN_MAP_CENTER_AND_ZOOM: "return map center and zoom",

    REQUEST_VIEWPORT: "request viewport",
    RETURN_VIEWPORT: "return viewport",

    private: {
        EDIT_NODE_DIALOG_VISIBLE: "edit node dialog visible",
        EDIT_EDGE_DIALOG_VISIBLE: "edge edge dialog visible",
        EDIT_SELECTION_SET: "edit selection set",
        EDIT_EDGE_TOGGLED: "edit edge toggled",
        EDIT_NODE_TOGGLED: "edit node toggled",
        EDIT_MODE_SET: "edit mode set",
        DRAG_STARTED: "drag started",
    }
}