const Path = require( "path" );

module.exports = function( config ) {
    config.set( {
        frameworks: [
            "mocha",
            "should"
        ],

        files: [
            // tests
            { pattern: "test/*.spec.js", type: "module" },
            // helper files in tests
            { pattern: "test/*.js", type: "module"},
            // manually include the file that defines Leaflet as `window['L']` first.
            { pattern: "src/components/lib/leaflet.global.js", type: "module", included: true, served: true },
            // files tests rely on
            { pattern: "src/**/*.js", type: "module", included: true, served: true },
        ],
        exclude: [
            "src/components/lib/leaflet.js",
            "src/components/lib/dataParser.js",
        ],

        browsers: ["ChromeHeadless"],

        singleRun: false,

        preprocessors: {
            'src/components/lib/!(d3\.min|leaflet\.esm|leaflet|pubsub).js': ['coverage'],
            'src/components/lib/leaflet.global.js': ['coverage'],
            'src/components/hoc/*.tsx': ['coverage'],
            'src/components/css/*.js': ['coverage'],
            'src/components/*.tsx': ['coverage'],
            'src/components/*.js': ['coverage'],
            'src/*.tsx': ['coverage'],
            'src/*.ts': ['coverage'],
            'src/*.js': ['coverage'],
        },

        // coverage reporter generates the coverage
        reporters: ['progress', 'coverage'],
    } );
};
