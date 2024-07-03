export const signals = {
    TOPOLOGY_UPDATED: "topology updated",
    OPTIONS_UPDATED: "options updated",
    TRAFFIC_UPDATED: "traffic updated",

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
    VARIABLES_SET: "variables set",
    EDITING_SET: "editing set",
    LAYER_TOGGLED: "layer toggled",

    DRAG_STARTED: "drag started",
    DRAG_ENDED: "drag ended",

    EDGE_SNAP: "edge snap",
    TOOLTIP_VISIBLE: "tooltip visible",
    TOOLTIP_HIDDEN: "tooltip hidden",
    private: {
        EDIT_NODE_DIALOG_VISIBLE: "edit node dialog visible",
        EDIT_EDGE_DIALOG_VISIBLE: "edge edge dialog visible",
        EDIT_SELECTION_SET: "edit selection set",
        EDIT_EDGE_TOGGLED: "edit edge toggled",
        EDIT_NODE_TOGGLED: "edit node toggled",
        EDIT_MODE_SET: "edit mode set",
    }
}

/*

map.getCenterAndZoom
map.getMapViewport
"getMapCenterAndZoom"
"getMapViewport"


"toggleNodeEdit"

"dragStarted"
"snapEdges"
"updateMapDimensions"

// how do these differ?
"updateOptions"
"updateMapOptions"

  // wow how do these differ?
"updateMapTopology"
"updateTopology"
"updateTopologyData"

how/why does this differ from getMapCenterAndZoom?
// hopefully these can all
"returnMapCenterAndZoom"
"returnMapViewport"

*/