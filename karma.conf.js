const Path = require( "path" );

module.exports = function( config ) {
    config.set( {
        frameworks: [
            "mocha",
            "should",
        ],

        files: [
            // tests
            { pattern: "test/*.spec.js", type: "module" },
            // manually include this file to make sure it exists in travis land...
            { pattern: "src/components/lib/pubsub.js", type: "module", included: true, served: true },
            // manually include this file to make sure it exists in travis land...
            { pattern: "src/components/MapCanvas.component.js", type: "module", included: true, served: true },
            // manually include the file that defines Leaflet as `window['L']` first.
            { pattern: "src/components/lib/leaflet.global.js", type: "module", included: true, served: true },
            // files tests rely on
            { pattern: "src/**/*.js", type: "module", included: true, served: true },
        ],
        exclude: [
            "src/components/lib/leaflet.js",
            "src/components/lib/dataParser.js",
            "src/components/old/*"
        ],

        browsers: ["ChromeHeadless"],

        singleRun: false

    } );
};
