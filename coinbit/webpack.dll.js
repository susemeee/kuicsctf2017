/* eslint-disable */
// SEE: http://engineering.invisionapp.com/post/optimizing-webpack/

var path = require('path');
var webpack = require('webpack');

const config = {
  entry: {
    vendor: [path.join(__dirname, 'client', 'vendor.js')]
  },
  output: {
    path: path.join(__dirname, 'dist', 'client', 'dll'),
    filename: '[name].dll.js',
    library: '[name]'
  },
  devtool: 'source-map',
  plugins: [
    new webpack.DllPlugin({
      path: path.join(__dirname, 'dist', 'client', 'dll', '[name]-manifest.json'),
      name: '[name]',
      context: path.resolve(__dirname, 'client'),
      devtool: 'source-map',
    }),
    new webpack.optimize.OccurrenceOrderPlugin(),
  ],
  module: {
    loaders: [{
      test: /\.css$/,
      loaders: ['style-loader', 'css-loader']
    }],
  },
  resolve: {
    extensions: ['.js', '.css', '.html']
  }
};

if (process.env.NODE_ENV === 'production') {
  config.plugins.push(new webpack.optimize.UglifyJsPlugin());
}

module.exports = config;
