// low-key polyfill for process
window.process = {
    env: { DEBUG: true },
    stderr: { fd: 1 },
}

const { MapCanvas, PubSub, signals, CustomTextArea } = require("../../src/exports.ts");

const React = require("react");

const ReactDOM = require("react-dom/client");

const rootElem = document.createElement("div");

document.body.appendChild(rootElem);

const root = ReactDOM.createRoot(rootElem);

const props = {
    item: { settings: { useTextArea: true } }
};

root.render(React.createElement(CustomTextArea, props));

console.log(document.getElementsByTagName("textarea"))