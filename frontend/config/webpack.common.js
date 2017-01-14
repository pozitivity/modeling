/**
 * Created by tatiana.gorbunova on 03.12.2016.
 */
const webpack = require('webpack');
const helpers = require('./helpers');

const tryGetEnvironmentVariable = require('./tryGetEnvironmentVariable');

/*
 * Webpack Plugins
 */
// problem with copy-webpack-plugin
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ForkCheckerPlugin = require('awesome-typescript-loader').ForkCheckerPlugin;
const HtmlElementsPlugin = require('./html-elements-plugin');
// const ExtractTextPlugin = require('extract-text-webpack-plugin');

/*
 * Webpack Constants
 */
const METADATA = {
    title: 'Next',
    description: 'Next',
    isDevServer: helpers.isWebpackDevServer()
};

/*
 * Webpack configuration
 *
 * See: http://webpack.github.io/docs/configuration.html#cli
 */
module.exports = {

    /*
     * Static metadata for index.html
     *
     * See: (custom attribute)
     */
    metadata: METADATA,

    /*
     * Cache generated modules and chunks to improve performance for multiple incremental builds.
     * This is enabled by default in watch mode.
     * You can pass false to disable it.
     *
     * See: http://webpack.github.io/docs/configuration.html#cache
     */
    //cache: false,

    /*
     * The entry point for the bundle
     * Our Angular.js app
     *
     * See: http://webpack.github.io/docs/configuration.html#entry
     */
    entry: {
        'polyfills': './src/polyfills.ts',
        'vendor': './src/vendor.ts',
        'main': './src/main.ts'

    },

    /*
     * Options affecting the resolving of modules.
     *
     * See: http://webpack.github.io/docs/configuration.html#resolve
     */
    resolve: {

        /*
         * An array of extensions that should be used to resolve modules.
         *
         * See: http://webpack.github.io/docs/configuration.html#resolve-extensions
         */
        extensions: ['', '.ts', '.js'],

        // Make sure root is src
        root: helpers.root('src'),

        // remove other default values
        modulesDirectories: ['node_modules']

    },

    /*
     * Options affecting the normal modules.
     *
     * See: http://webpack.github.io/docs/configuration.html#module
     */
    module: {

        /*
         * An array of applied pre and post loaders.
         *
         * See: http://webpack.github.io/docs/configuration.html#module-preloaders-module-postloaders
         */
        preLoaders: [
            {
                test: /\.ts$/,
                loader: 'string-replace-loader',
                query: {
                    search: '(System|SystemJS)(.*[\\n\\r]\\s*\\.|\\.)import\\((.+)\\)',
                    replace: '$1.import($3).then(mod => mod.__esModule ? mod.default : mod)',
                    flags: 'g'
                },
                include: [helpers.root('src')]
            }

        ],

        /*
         * An array of automatically applied loaders.
         *
         * IMPORTANT: The loaders here are resolved relative to the resource which they are applied to.
         * This means they are not resolved relative to the configuration file.
         *
         * See: http://webpack.github.io/docs/configuration.html#module-loaders
         */
        loaders: [

            {
                test: /\.ts$/,
                loaders: ['awesome-typescript-loader', 'angular2-template-loader', '@angularclass/hmr-loader'],
                exclude: [/\.(spec|e2e)\.ts$/]
            },

            {
                test: /\.json$/,
                loader: 'json-loader'
            },
            {test: /\.css$/, loader: 'raw', exclude: /node_modules/},
            {test: /\.css$/, loader: 'style!css?-minimize', exclude: /src/},

            {
                test: /\.scss$/,
                loaders: ["style", "css?sourceMap", "sass?sourceMap"]
            },


            {test: /\.html$/, loader: 'html', exclude: ['./node_modules']},
            {test: /\.otf/, loader: "url-loader?limit=100000"},
            {test: /\.jpeg/, loader: "url-loader?limit=100000"},
            {test: /\.jpg/, loader: "url-loader?limit=100000"},
            {test: /\.png/, loader: "url-loader?limit=100000"},

            {
                test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
                loader: "url?limit=10000&mimetype=application/font-woff"
            }, {
                test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
                loader: "url?limit=10000&mimetype=application/font-woff"
            }, {
                test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
                loader: "url?limit=10000&mimetype=application/octet-stream"
            }, {
                test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
                loader: "file"
            }, {
                test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
                loader: "url?limit=10000&mimetype=image/svg+xml"
            }
        ]

    },

    /*
     * Add additional plugins to the compiler.
     *
     * See: http://webpack.github.io/docs/configuration.html#plugins
     */
    plugins: [
    /**
     * Plugin: DefinePlugin
     * Description: Define free variables.
     * Useful for having development builds with debug logging or adding global constants.
     *
     * Environment helpers
     *
     * See: https://webpack.github.io/docs/list-of-plugins.html#defineplugin
     */
        // NOTE: when adding more properties, make sure you include them in custom-typings.d.ts
        new webpack.DefinePlugin({
            'BACKEND': {
                'contextPath': tryGetEnvironmentVariable('BACKEND_CONTEXT_PATH', '/privateApi')
            },
            'FRONTEND': {
                'contextPath': tryGetEnvironmentVariable('FRONTEND_CONTEXT_PATH', '/angular2-site')
            },
            'SELF_SERVICE': {
                'contextPath': tryGetEnvironmentVariable('SELF_SERVICE_CONTEXT_PATH', '/self-service')
            }
        }),

        // new ExtractTextPlugin({ filename: 'initial.css', allChunks: true }),

        /*
         * Plugin: ForkCheckerPlugin
         * Description: Do type checking in a separate process, so webpack don't need to wait.
         *
         * See: https://github.com/s-panferov/awesome-typescript-loader#forkchecker-boolean-defaultfalse
         */
        new ForkCheckerPlugin(),

        /*
         * Plugin: CommonsChunkPlugin
         * Description: Shares common code between the pages.
         * It identifies common modules and put them into a commons chunk.
         *
         * See: https://webpack.github.io/docs/list-of-plugins.html#commonschunkplugin
         * See: https://github.com/webpack/docs/wiki/optimization#multi-page-app
         */
        new webpack.optimize.CommonsChunkPlugin({
            name: ['polyfills', 'vendor'].reverse()
        }),
        new CopyWebpackPlugin([
            {
                from: './src/assets/i18n/', // replace with your folder
                to: 'assets/i18n'
            }
        ]),
        /*
         * Plugin: CopyWebpackPlugin
         * Description: Copy files and directories in webpack.
         *
         * Copies project static assets.
         *
         * See: https://www.npmjs.com/package/copy-webpack-plugin
         */
        /*        new CopyWebpackPlugin([{
         from: 'src/assets',
         to: 'assets'
         }]),*/

        /*
         * Plugin: HtmlWebpackPlugin
         * Description: Simplifies creation of HTML files to serve your webpack bundles.
         * This is especially useful for webpack bundles that include a hash in the filename
         * which changes every compilation.
         *
         * See: https://github.com/ampedandwired/html-webpack-plugin
         */
        new HtmlWebpackPlugin({
            template: 'src/index.html',
            chunksSortMode: 'dependency'
        }),

        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery",
            "window.jQuery": "jquery",
            "window.Tether": 'tether',
            "Tether": 'tether'
        }),

        /*
         * Plugin: HtmlHeadConfigPlugin
         * Description: Generate html tags based on javascript maps.
         *
         * If a publicPath is set in the webpack output configuration, it will be automatically added to
         * href attributes, you can disable that by adding a "=href": false property.
         * You can also enable it to other attribute by settings "=attName": true.
         *
         * The configuration supplied is map between a location (key) and an element definition object (value)
         * The location (key) is then exported to the template under then htmlElements property in webpack configuration.
         *
         * Example:
         *  Adding this plugin configuration
         *  new HtmlElementsPlugin({
         *    headTags: { ... }
         *  })
         *
         *  Means we can use it in the template like this:
         *  <%= webpackConfig.htmlElements.headTags %>
         *
         * Dependencies: HtmlWebpackPlugin
         */
        new HtmlElementsPlugin({
            headTags: require('./head-config.common')
        })

    ],

    /*
     * Include polyfills or mocks for various node stuff
     * Description: Node configuration
     *
     * See: https://webpack.github.io/docs/configuration.html#node
     */
    node: {
        global: 'window',
        crypto: 'empty',
        process: true,
        module: false,
        clearImmediate: false,
        setImmediate: false
    }

};
