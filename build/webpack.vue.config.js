const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CssMinimizerWebpackPlugin = require('css-minimizer-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const TerserWebpackPlugin = require('terser-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')

const BASE_PATH = path.resolve(__dirname, '../')

module.exports = {
  mode: 'development',
  entry: {
    index: path.resolve(BASE_PATH, './src/main.js'),
  },
  devtool: 'source-map',
  output: {
    filename: 'js/[name].[contenthash:6].js',
    path: path.resolve(BASE_PATH, './dist/'),
    clean: true
  },
  devServer: {
    static: path.resolve(BASE_PATH, 'dist'),
    compress: true,
    port: 9000,
    hot: false,
    liveReload: true
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      // html-loader和vue-loader会冲突，如果同时使用，vue-loader必须在html-loader之前
      // 理论上Vue项目中，不需要html-loader
      // {
      //   test: /\.html$/,
      //   use: ['html-loader']
      // },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader']
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
        parser: {
          dataUrlCondition: {
            maxSize: 4 * 1024
          }
        },
        generator: {
          filename: 'images/[name].[contenthash:6][ext]'
        }
      },
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: path.resolve(BASE_PATH, './public/index.html'),
      chunks: ['index']
    }),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
    }),
    new MiniCssExtractPlugin({
      filename: 'css/[name].[contenthash:6].css',
    }),
    new VueLoaderPlugin(),
  ],
  optimization: {
    minimizer: [
      new CssMinimizerWebpackPlugin(),
      new TerserWebpackPlugin({
        extractComments: false
      })
    ]
  },
}