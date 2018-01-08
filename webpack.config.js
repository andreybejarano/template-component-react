'use strict';

const pkg = require('./package.json');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const LIB_NAME = pkg.name;

const config = {
  target: 'web',
  entry: {
    [LIB_NAME]: path.resolve(__dirname, 'src'),
    sandbox: './sandbox/index.jsx'
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist')
  },
  plugins: [
    new ExtractTextPlugin({
      filename: '[name].css',
      allChunks: true
    })
  ],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        include: [
          path.resolve(__dirname, './src'),
          path.resolve(__dirname, './sandbox')
        ],
        loader: 'babel-loader',
        exclude: /node_modules/,
        options: {
          presets: ['es2016', 'es2017', 'react']
        }
      },
      {
        test: /\.css/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'postcss-loader',
              options: {
                sourceMap: true,
                minimize: true
              }
            }
          ]
        })
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx', '.css']
  }
};

module.exports = config;
