import { CustomTextArea } from "../../src/testables.ts";
import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { act } from "react-dom/test-utils";

function createReactRoot(){
    window.reactRoot = null;
    window.currentTextarea = null;
    const rootId = "testRoot";
    let rootElem = document.createElement("div");
    rootElem.id = rootId;
    document.body.appendChild(rootElem);
    rootElem = document.getElementById(rootId);
    window.reactRoot = ReactDOM.createRoot(rootElem);
}
createReactRoot();

const inputTypes = [
    window.HTMLInputElement,
    window.HTMLTextAreaElement,
];

// cribbed from https://stackoverflow.com/questions/23892547/what-is-the-best-way-to-trigger-change-or-input-event-in-react-js
function triggerInputChange(node, value = '') {
    // only process the change on elements we know have a value setter in their constructor
    if (inputTypes.indexOf(node.__proto__.constructor) >-1) {
        const setValue = Object.getOwnPropertyDescriptor(node.__proto__, 'value').set;
        const event = new Event('input', { bubbles: true });

        setValue.call(node, value);
        node.dispatchEvent(event);
    }
};

describe("Component CustomTextArea esmap", () => {
    beforeEach(async function(){
        let props = {
            item: {
                settings: {
                    useTextArea: true
                }
            }
        };

        await act(async () => {
            window.currentTextarea = React.createElement(CustomTextArea, props);
            reactRoot.render(window.currentTextarea);
        });
    });
    it("should be defined in the module scope", ()=>{
        expect(CustomTextArea).toBeDefined();
    });
    it("should render an HTML textarea", ()=>{
        expect(document.getElementsByTagName("textarea")).toBeTruthy();
    });
    it("should provide an error message if the value is changed to invalid JSON", async ()=>{
        await act(async () => {
            let elems = document.getElementsByTagName("textarea");
            let elem = elems[0];
            triggerInputChange(elem, '{ "test"');
        })
        let error = document.getElementsByClassName("validation-error")[0];

        expect(error.innerText).toBeTruthy();
    });
    it("should provide an error message if the user provides an incomplete edge", async()=>{
        await act(async () => {
            let elems = document.getElementsByTagName("textarea");
            let elem = elems[0];
            const badEdgeTopology = '{ "edges": [ {"name": "A--L", "coordinates": [[39, -98],[39, -99]], "meta": { } }], "nodes": [ {"name": "L", "coordinate": [39, -98], "meta": {} } ] }';
            triggerInputChange(elem, badEdgeTopology);
        })
        let error = document.getElementsByClassName("validation-error")[0];

        expect(error.innerText).toBe("Bad edge definition");
    })
})