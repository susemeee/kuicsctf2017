/* eslint-disable */
// SEE: https://github.com/geniuscarrier/webpack-angular-es6
// SEE: https://github.com/christianalfoni/webpack-express-boilerplate

var ExtractTextPlugin = require('extract-text-webpack-plugin');
var StatsPlugin = require('stats-webpack-plugin');
var ngAnnotatePlugin = require('ng-annotate-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var path = require('path');
var webpack = require('webpack');

var config = {
  entry: {
    app: [ 'webpack-hot-middleware/client?reload=true', path.join(__dirname, 'client/app.js') ],
  },
  output: {
    path: path.join(__dirname, 'dist', 'client'),
    filename: '[name].js',
    publicPath: '/'
  },
  cache: true,
  devtool: 'source-map',
  module: {
    loaders: [{
      enforce: 'pre',
      test: /\.js$/,
      loader: 'baggage-loader?[file].html&[file].css'
    }, {
      test: /\.js$/,
      exclude: /(node_modules)/,
      loader: 'babel-loader?cacheDirectory=true&presets[]=env'
    }, {
      test: /\.s?css$/,
      exclude: /(node_modules)/,
      loaders: ['style-loader', 'css-loader?sourceMap', 'autoprefixer-loader', 'sass-loader?sourceMap&includePaths[]=node_modules']
    }, {
      test: /\.html$/,
      loader: 'ngtemplate-loader?relativeTo=' + __dirname + '/!html-loader?minimize=true'
    }, {
      test: /\.(jpe?g|png|gif)$/,
      exclude: /(node_modules)/,
      loader: 'url-loader?limit=10000'
    }, {
      test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
      loader: 'url-loader?limit=10000&minetype=application/font-woff'
    }, {
      test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
      loader: 'url-loader'
    }, {
      test: /\.ejs/,
      loader: 'raw-loader'
    }]
  },
  plugins: [
    //Typically you'd have plenty of other plugins here as well
    new webpack.DllReferencePlugin({
      context: path.join(__dirname, 'client'),
      manifest: require('./dist/client/dll/vendor-manifest.json'),
    }),
    new HtmlWebpackPlugin({
      inject: 'body',
      filename: 'index.ejs',
      template: path.join(__dirname, 'client', 'index.ejs'),
      hash: true,
    }),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development')
    }),
    new ngAnnotatePlugin({
        add: true,
        // other ng-annotate options here
    }),
    new webpack.ProvidePlugin({
      _: 'lodash',
      moment: 'moment',
    }),
  ],
  resolve: {
    extensions: ['.js', '.css', '.html', '.ejs']
  }
};

if (process.env.NODE_ENV === 'production') {

  config.output.filename = '[name]-[hash].min.js';

  config.plugins.push(...[
    new ExtractTextPlugin('[name]-[hash].min.css'),
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        warnings: false,
        screw_ie8: true
      },
    }),
    new StatsPlugin('webpack.stats.json', {
      source: false,
      modules: false
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    }),
  ]);
}

module.exports = config;