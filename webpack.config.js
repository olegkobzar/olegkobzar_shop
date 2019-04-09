const path = require('path');
const HTMLPlugin = require('html-webpack-plugin');
const CssPlugin = require('mini-css-extract-plugin');

const package = require('./package.json');
const isProduction = process.env.NODE_ENV === 'production';

const dateNow = Date.now();

module.exports = {
  entry: './index.js',
  context: path.resolve(__dirname, 'src'),
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'prod')
  },
  mode: 'development',
  
  module: {
    rules: [
      {  
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },

      {
        test: /\.s?css$/,
        use: [
          // {
          //   loader: 'style-loader',
          //   options: {singleton: true}
          // },
          CssPlugin.loader,
          'css-loader',
          'sass-loader'
        ]
      }
    ]
  },

  plugins: [
    new HTMLPlugin({
      title: package.name,
      template: './index.html',
      version: package.version
    }),

    // new CssPlugin({filename: '[name]-[contenthash].css'})
    new CssPlugin({filename: `[name]-${dateNow}.css`})
  ],

  optimization: {
    splitChunks: {
      chunks: 'all'
    }
  },

  devtool: 'source-map'
}