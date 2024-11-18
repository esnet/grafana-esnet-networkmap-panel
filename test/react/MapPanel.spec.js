import { MapPanel } from "../../src/testables.ts";
import * as React from "react";
import { act } from "react-dom/test-utils";
import { LAVENDER, EXPECTED_NODE_MOUSEOVER_REGEX, TOPOLOGY, OPTIONS } from "../constants.js";
import { locationService } from "./LocationService"

describe("Component MapPanel", () => {
    beforeEach(async function(){
        let topo = JSON.parse(JSON.stringify(TOPOLOGY));
        let opts = JSON.parse(JSON.stringify(OPTIONS));
        opts.layers[0].mapjson = JSON.stringify(topo[0]);
        const props = {
            options: opts,
            fieldConfig: {
                defaults: {
                    thresholds: {
                        steps: []
                    }
                }
            },
            replaceVariables: function(){},
            data: { state: "loading", series: [] },
            onOptionsChange: function(){},
            eventBus: { getStream(){ return {subscribe: function(){ } } } }
        };
        await act(async () => {
            window.currentTextarea = React.createElement(MapPanel, props);
            reactRoot.render(window.currentTextarea);
        });
    });

    it("should be defined in the module scope", ()=>{
        expect(MapPanel).toBeDefined();
    });
    it("should call locationService.partial when a selection is set", async ()=>{
        spyOn(locationService, "partial");
        expect(locationService.partial).toHaveBeenCalledTimes(0);
        await act(async () => {
            // clear selection: call 1x
            // click edge to call 2x
            let elems = document.getElementsByClassName("edge-az");
            let elem = elems[0];
            let down = new MouseEvent("mousedown", {"bubbles": true});
            let up = new MouseEvent("mouseup", {"bubbles": true});
            elem.dispatchEvent(down);
            elem.dispatchEvent(up);
        })
        expect(locationService.partial).toHaveBeenCalledWith({"var-src": "A", "var-dst": "B", "var-node": null}, false);
        // once for 'clear selection' at startup, then for set selection on click
        expect(locationService.partial).toHaveBeenCalledTimes(2);
    })
    it("should call locationService.partial when selection is cleared", async ()=>{
        spyOn(locationService, "partial");
        await act(async () => {
            // clear selection: call 1x
            // click edge to call 2x
            let elems = document.getElementsByClassName("edge-az");
            let elem = elems[0];
            let down = new MouseEvent("mousedown", {"bubbles": true});
            let up = new MouseEvent("mouseup", {"bubbles": true});
            elem.dispatchEvent(down);
            elem.dispatchEvent(up);
            // click "Clear Selection" to call 3x
            elem = document.getElementById("clear_selection");
            let click = new MouseEvent("click", {"bubbles": true});
            elem.dispatchEvent(click);
        })
        expect(locationService.partial).toHaveBeenCalledWith({"var-src": null, "var-dst": null, "var-node": null}, false);
        expect(locationService.partial).toHaveBeenCalledTimes(3);
    })
})