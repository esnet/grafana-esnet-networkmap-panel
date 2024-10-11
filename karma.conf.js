const Path = require( "path" );

module.exports = function( config ) {
    config.set( {
        frameworks: [
            "jasmine",
        ],
        client: {
            jasmine: {
                random: false
            }
        },
        files: [
            // tests
            { pattern: "test/module.spec.js", type: "module" },
            { pattern: "test/esmap.spec.js", type: "module" },
            { pattern: "test/pubsub.spec.js", type: "module" },
            // helper files in tests
            { pattern: "test/utils.js", type: "module"},
            { pattern: "test/constants.js", type: "module"},
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
