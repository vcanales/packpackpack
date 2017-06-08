const webpack = require('webpack');
const merge = require('webpack-merge');
const path = require('path');
const baseConfig = require('./webpack.config');
const config = require('./index');

const webpackConfig = merge(baseConfig, {
  devtool: '#inline-source-map',
  plugins: [
    new webpack.DefinePlugin({
      'process.env': { NODE_ENV: '"testing"' },
    }),
  ],
  node: { fs: 'empty' },
  devServer: {
    historyApiFallback: true,
    noInfo: true,
    contentBase: path.resolve(__dirname, '..', 'dist'),
    port: process.env.PORT || config.port || 9000,
  },
  module: {
    rules: [
      {
        test: /\.(js|vue)$/,
        exclude: /(test|node_modules)/,
        enforce: 'post',
      },
    ],
  },
});

module.exports = webpackConfig;
