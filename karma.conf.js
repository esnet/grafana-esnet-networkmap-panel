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
            // helper files in tests
            { pattern: "test/*.js", type: "module"},
            // files tests rely on
            { pattern: "src/**/*.js", type: "module", included: true, served: true },
            { pattern: "src/**/*.mjs", type: "module", included: true, served: true },
        ],
        exclude: [
            "src/components/lib/leaflet.js",
            "src/components/old/*"
        ],

        browsers: ["ChromeHeadless"],

        singleRun: false

    } );
};
