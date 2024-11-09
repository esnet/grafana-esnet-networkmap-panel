import { update } from "lodash";
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

const emptyTopology = `
    {
        "nodes": [
        ],
        "edges": [
        ]
    }
`.trim();

function makeNodeJson(name) {
    return `{
        "name": "${name}",
        "meta": {
            "displayName": "",
            "svg": "",
            "template": ""
        },
        "coordinate": [
            ${ 30 + Math.random() * 4},
            -${ -90 + Math.random() * 5},
        ]
    }`;
};

function makeEdgeNameOnlyJson(nodeAName, nodeBName) {
    return `{
        "name": "${nodeAName}--${nodeBName}"
    }`;
};

function makeMultilineEdgePartial(nodeA, nodeB) {
    return `
        "meta": {
            "endpoint_identifiers": {
                "names": [
                    "${nodeA.name}",
                    "${nodeB.name}"
                ]
            }
        },
        "coordinates": [
            [
                ${nodeA.coordinate[0]},
                ${nodeA.coordinate[1]}
            ],
            [
                ${(nodeA.coordinate[0] + nodeB.coordinate[0]) / 2},
                ${(nodeA.coordinate[1] + nodeB.coordinate[1]) / 2}
            ],
            [
                ${nodeB.coordinate[0]},
                ${nodeB.coordinate[1]}
            ],
        ],
        "children": []
    `.trim();
};

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
        let errorElems = document.getElementsByClassName("validation-error")[0];
        await act(async () => {
            let elems = document.getElementsByTagName("textarea");
            let elem = elems[0];
            triggerInputChange(elem, '{ "test"');
        })
        let error = document.getElementsByClassName("validation-error")[0];

        expect(error.innerText).toBeTruthy();
    })
    it("should allow adding multiline pasting without resetting the form", async () => {
        await act(async () => {
            let elems = document.getElementsByTagName("textarea");
            let elem = elems[0];
            triggerInputChange(elem, emptyTopology);
        });
        expect(elem.innerText).toEqual(emptyTopology);

        // TODO: complete test script
        await act(async () => {
            let startEditPos = elem.indexOf('"nodes": [');
            for (edgeName of ["A", "B"]) {
                const newNode = makeNodeJson(edgeName);
                const newNodeLen = newNode.length;
                let updatedText = `
                    ${elem.innerText.substring(0, startEditPos)}
                    ${newNode}
                    ${elem.innerText.substring(startEditPos + newNodeLen)}
                `.trim();
                triggerInputChange(elem, updatedText);
            }
        });
        await act(async () => {
            const newEdge = makeEdgeNameOnlyJson("A", "B");
            const newEdgeLen = newEdge.length;
            let startEditPos = elem.indexOf('"edges": [');
            let updatedText = `
                ${elem.innerText.substring(0, startEditPos)}
                ${newEdge}
                ${elm.innerText.substring(startEditPos + newEdgeLen)}
            `.trim();
            triggerInputChange(elem, updatedText);
        });
    });
})