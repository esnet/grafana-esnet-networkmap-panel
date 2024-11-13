const Path = require( "path" );
const os = require("os");
var webpack = require('webpack');

module.exports = function( config ) {
    config.set( {
        frameworks: [
            "jasmine",
            "webpack",
        ],
        client: {
            jasmine: {
                random: false
            }
        },
        files: ['test/react/webpack.tests.js'],
        preprocessors: {
            "test/react/webpack.tests.js": ["webpack", "sourcemap"],
        },
        webpack: {
            mode: "development",
            devtool: 'inline-source-map', // sourcemap support
            output: { 
                filename: '[name].js',
                path: Path.join(__dirname, 'test/dist/_karma_webpack_') + Math.floor(Math.random() * 1000000),
            },
            externals: [
              'emotion',
              '@emotion/react',
              '@emotion/css',
              //'@grafana/runtime', // this is commented in favor of the NormalModuleReplacementPlugin entry below.
              '@grafana/slate-react',
              'react-redux',
              'redux',
              'react-router',
              'react-router-dom',
              'd3',
              'slate',
              'slate-plain-serializer',
              'prismjs',
              '@grafana/ui',
              'jquery',
              'moment',
              'angular',
            ],
            module: {
                rules: [
                    {
                      test: /src\/(?:.*\/)?module\.tsx?$/,
                      use: [
                        {
                          loader: 'imports-loader',
                          options: {
                            imports: `side-effects grafana-public-path`,
                          },
                        },
                      ],
                    },
                    {
                      exclude: /(node_modules)/,
                      test: /\.[tj]sx?$/,
                      use: {
                        loader: 'swc-loader',
                        options: {
                          jsc: {
                            baseUrl: Path.resolve(process.cwd(), "./src"),
                            target: 'es2015',
                            loose: false,
                            parser: {
                              syntax: 'typescript',
                              tsx: true,
                              decorators: false,
                              dynamicImport: true,
                            },
                          },
                        },
                      },
                    },
                ],
            },
            plugins: [
              new webpack.NormalModuleReplacementPlugin(/@grafana\/runtime/, "../test/react/LocationService.ts")
            ],
            resolve: {
              extensions: ['.js', '.jsx', '.ts', '.tsx'],
              // handle resolving "rootDir" paths
              modules: [Path.resolve(process.cwd(), 'src'), 'node_modules'],
              fallback: {
                "fs": false,
                "util": false,
                "stream": false,
                "tty": require.resolve("tty-browserify"),
              } 
            },
            stats: {
                modules: false,
                colors: true,
            },
            watch: false,
            optimization: {
              runtimeChunk: 'single',
              splitChunks: {
                chunks: 'all',
                minSize: 0,
                cacheGroups: {
                  commons: {
                    name: 'commons',
                    chunks: 'initial',
                    minChunks: 1,
                  },
                },
              },
            }
        },
        client: {
            captureConsole: true,
        },
        reporters: ['dots'],
        exclude: [
            "src/components/lib/leaflet.js",
            "src/components/old/*"
        ],
        browsers: ["ChromeHeadless"],
        webpackMiddleware: { noInfo: true },
        browserNoActivityTimeout: 60000 // 60s; wait for webpack to compile :-(
    } );
};
