const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const resolve = dir => path.resolve(__dirname, '..', dir);
const cssLoaders = () => {
  if (process.env.NODE_ENV === 'production') {
    return ExtractTextPlugin.extract({
      use: 'css-loader!sass-loader',
      fallback: 'vue-style-loader',
    });
  }
  return 'vue-style-loader!css-loader!sass-loader';
};

module.exports = {
  entry: resolve('src/index.js'),
  output: {
    path: resolve('dist'),
    publicPath: '/',
    filename: 'app-[hash].js',
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loaders: {
            scss: cssLoaders(),
          },
        },
      },
      {
        exclude: /node_modules/,
        test: /\.js$/,
        loader: 'babel-loader',
      },
      {
        test: /\.(jpg|png|gif)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]?[hash]',
        },
      },
      {
        include: resolve('src/'),
        test: /\.svg$/,
        loader: 'vue-svg-loader',
      },
    ],
  },
  resolve: {
    alias: {
      vue$: 'vue/dist/vue.esm.js',
      '@': resolve('src'),
    },
  },
  performance: {
    hints: false,
  },
  devtool: '#eval-source-map',
  plugins: [
    new HtmlWebpackPlugin({
      template: resolve('src/index.template.html'),
    }),
  ],
};

if (process.env.NODE_ENV === 'production') {
  module.exports.devtool = '#source-map';
  module.exports.plugins = (module.exports.plugins || []).concat([
    new ExtractTextPlugin('style-[hash].css'),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"',
      },
    }),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      compress: {
        warnings: false,
      },
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true,
    }),
  ]);
}
