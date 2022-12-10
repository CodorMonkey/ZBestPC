const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')

module.exports = {
  mode: 'development',
  entry: {
    bundle: './src/index.js',
  },
  output: {
    filename: 'js/bundle.js',
    path: path.resolve(__dirname, './dist/')
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
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
      template: './src/index.html'
    }),
    new HtmlWebpackPlugin({
      filename: 'login.html',
      template: './src/login.html'
    }),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
    })
  ]
}