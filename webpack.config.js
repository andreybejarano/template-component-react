'use strict';

const pkg = require('./package.json');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const LIB_NAME = pkg.name;

const config = {
  target: 'web',
  entry: {
    [LIB_NAME]: path.resolve(__dirname, 'src'),
    sandbox: './sandbox/index.js'
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
        exclude: /node_modules/,
        rules: [
          {
            include: [
              path.resolve(__dirname, './src')
            ],
            use: ExtractTextPlugin.extract({
              fallback: 'isomorphic-style-loader', // Convert CSS into JS module
              use: [
                // Process internal/project styles (from client folder)
                {
                  loader: 'css-loader',
                  options: {
                    importLoaders: 1,
                    sourceMap: true,
                    camelCase: 'dashes',
                    modules: true,
                    localIdentName: '[name]-[local]-[hash:base64:5]',
                    minimize: true,
                    discardComments: { removeAll: true }
                  }
                },
                // Apply PostCSS plugins including autoprefixer
                {
                  loader: 'postcss-loader',
                  options: {
                    config: {
                      path: './postcss.config.js'
                    }
                  }
                }
              ]
            })
          }
        ]
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx', '.css']
  }
};

module.exports = config;
