var path = require('path');
var webpack = require('webpack');
var Webpack_isomorphic_tools_plugin = require('webpack-isomorphic-tools/plugin');
var webpackIsomorphicAssets = require('././webpack-isomorphic-tools-configuration');
var webpackIsomorphicToolsPlugin=new Webpack_isomorphic_tools_plugin(webpackIsomorphicAssets);
var autoprefixer = require('autoprefixer')


var precss = require('precss')
var rootDir = path.resolve(__dirname, '.')

module.exports = {
    devtool: 'cheap-module-eval-source-map',
    entry: {
       index: [
        'webpack-hot-middleware/client',
         rootDir + '/public/src/index'
      ]
    },
    output: {
        path: path.resolve(__dirname, 'static/js'),
        filename: '[name].js',
        publicPath: '/js/'
    },
    postcss: function () {
        return {
            defaults: [precss, autoprefixer],
            cleaner: [autoprefixer({browsers: ["ios >= 7", "android >= 4.0"]})]
        }
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
        new webpack.HotModuleReplacementPlugin(),
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
    //     }, {
    //         test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
    //         loader: 'url',
    //         query: {
    //             limit: 8192,
    //             name: utils.assetsPath('img/[name].[hash:7].[ext]')
    //         }
    //     }, {
    //         test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
    //         loader: 'url',
    //         query: {
    //             limit: 8192,
    //             name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
    //         }
    //   }]
    }
}