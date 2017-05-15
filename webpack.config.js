var path = require('path');
var node_modules = path.resolve(__dirname, 'node_modules');
var pathToReact = path.resolve(node_modules, 'react/dist/react.min.js');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var webpack = require('webpack');
module.exports = {
  entry: path.resolve(__dirname, 'assets/js/app.js'),
  output: {
      path: path.resolve(__dirname, 'dest'),
      publicPath: ' http://192.168.126.38:3000/dest',
      filename: 'bundle.js',
  },
  resolve: {
    alias: {
      'react': pathToReact
    }
  },
  watch: true,
  module: {
    preLoaders: [
     {
       test: /\.js$/,
       exclude: /node_modules/,
       loader: 'jshint-loader'
     }
     ],
    loaders: [
      {
        test: [/\.js$/,/\.es6$/],
        exclude: /node_modules/,
        loaders: ['babel-loader']
      }
      // { test: /\.css$/,
      //   loader: 'style!css?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]&-url!postcss-loader'
      // }
    ],
    noParse: [pathToReact]
  },
  resolve: {
    extensions: ['','.js','.es6']
  },
  plugins: [ new webpack.DefinePlugin({
    "process.env": {
      NODE_ENV: JSON.stringify("production")
    }})
  ]
};
