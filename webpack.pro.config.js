var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin")
var Webpack_isomorphic_tools_plugin = require('webpack-isomorphic-tools/plugin')
var webpackIsomorphicAssets = require('././webpack-isomorphic-tools-configuration')
var webpackIsomorphicToolsPlugin=new Webpack_isomorphic_tools_plugin(webpackIsomorphicAssets);
var autoprefixer = require('autoprefixer')
var precss = require('precss')

var rootDir = path.resolve(__dirname, '.');

module.exports = {
    entry: {
       index: [
         rootDir + '/public/src/index'
      ]
    },
    postcss: function () {
        return {
            defaults: [precss, autoprefixer],
            cleaner: [autoprefixer({browsers: ["ios >= 7", "android >= 4.0"]})]
        }
    },
    output: {
        path: path.resolve(__dirname, 'static/js'),
        filename: '[name].min.js',
        publicPath: '/js/'
    },
    resolve: {
        alias: {
            react: path.join(rootDir, 'node_modules', 'react')
        },
        extensions: ['', '.js'],
        root: path.join(rootDir, '/public/src'),
        modulesDirectories: ['node_modules']
    },

    resolveLoader: {
        fallback: [path.join(__dirname, '../node_modules')]
    },
    
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('production')
            }
        }),

        new webpack.optimize.UglifyJsPlugin({
          compress: {
            warnings: false
          }
        }),

        new webpack.optimize.OccurenceOrderPlugin(),
        // split vendor js into its own file
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            minChunks: function (module, count) {
                // any required modules inside node_modules are extracted to vendor
                //console.log(module.resource)
                return (
                    module.resource &&
                    /\.js$/.test(module.resource) &&
                    module.resource.indexOf(
                        path.join(__dirname, '../node_modules')
                    ) === 0
                )
            }
        }),

        new webpack.optimize.CommonsChunkPlugin({
            name: 'manifest',
            chunks: ['vendor']
        }),
    
        new ExtractTextPlugin("[name].[hash].css"),
        new webpack.NoErrorsPlugin(),
        
        webpackIsomorphicToolsPlugin.development()
    ],
    module: {
        loaders: [{
            test: /\.js$/,
            loaders: ['babel'],
            exclude: /node_modules/
        }, {
            test: /\.css$/, 
            loader: 'style-loader!css-loader',
            exclude: /node_modules/
        }, { 
            test: /\.scss$/, 
            loader: 'style!css!sass',
            exclude: /node_modules/
        }]
    //     },, {
    //         test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
    //         loader: 'url',
    //         query: {
    //             limit: 8192,
    //             name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
    //         }
    //   }]
    }
}