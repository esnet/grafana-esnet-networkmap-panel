// low-key polyfill for the node 'process' built-in
// it's not available in a browser but ends up in the
// bundle anyway...
window.process = {
    env: { DEBUG: true },
    stderr: { fd: 1 },
}

// set up a regex glob
var context = require.context('.', true, /.+spec\.js$/);
// execute regex glob
context.keys().forEach(context);
// gotta love a terrible API
global.IS_REACT_ACT_ENVIRONMENT=true
