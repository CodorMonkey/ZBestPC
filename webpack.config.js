const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CssMinimizerWebpackPlugin = require('css-minimizer-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = {
  mode: 'development',
  entry: {
    index: './src/index.js',
    login: './src/login.js',
  },
  output: {
    filename: 'js/[name].[hash:6].js',
    path: path.resolve(__dirname, './dist/')
  },
  devServer: {
    static: path.join(__dirname, 'dist'),
    compress: true,
    port: 9000,
    hot: false,
    liveReload: true
  },
  module: {
    rules: [
      {
        test: /\.html$/,
        use: ['html-loader']
      },
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
          filename: 'images/[name].[hash:6][ext]'
        }
      },
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './src/index.html',
      chunks: ['index']
    }),
    new HtmlWebpackPlugin({
      filename: 'login.html',
      template: './src/views/login.html',
      chunks: ['login']
    }),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
    }),
    new MiniCssExtractPlugin({
      filename: 'css/[name].[hash:6].css',
      chunkFilename: '[name].css'
    })
  ]
}