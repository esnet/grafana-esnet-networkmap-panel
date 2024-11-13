import * as React from "react";
import * as ReactDOM from "react-dom/client";

// low-key polyfill for the node 'process' built-in
// it's not available in a browser but ends up in the
// bundle anyway...
window.process = {
    env: { DEBUG: true },
    stderr: { fd: 1 },
}

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

// set up a regex glob
var context = require.context('.', true, /.+spec\.js$/);
// execute regex glob
context.keys().forEach(context);
// gotta love a terrible API
global.IS_REACT_ACT_ENVIRONMENT=true
