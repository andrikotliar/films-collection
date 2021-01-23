'use strict'

const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { VueLoaderPlugin } = require('vue-loader');

const utils = require('./utils');

module.exports = {
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      'components': utils.resolve('src/components')
    }
  },

  module: {
    rules: [
      {
        test: /\.vue$/,
        use: 'vue-loader'
      }, {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        }
      }, 
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'file-loader',
        options: {
          name: '[path][name].[ext]',
          emitFile: false
        }
      }
    ]
  },

  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html',
      inject: true
    }),
    new VueLoaderPlugin(),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: utils.resolve('database'),
          to: utils.resolve('dist/database'),
          toType: 'dir'        
        },
        {
          from: utils.resolve('src/images'),
          to: utils.resolve('dist/images'),
          toType: 'dir'        
        },
        {
          from: utils.resolve('src/sw.js'),
          to: utils.resolve('dist'),
          toType: 'dir'
        },
        {
          from: utils.resolve('src/manifest.json'),
          to: utils.resolve('dist'),
          toType: 'dir'
        }
      ]
    })
  ]
}
