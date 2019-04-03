const path = require('path');
const HTMLPlugin = require('html-webpack-plugin');
const package = require('./package.json');

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
      }
    ]
  },

  plugins: [
    new HTMLPlugin({
      title: package.name,
      template: './index.html',
      version: package.version
    })
  ],

  optimization: {
    splitChunks: {
      chunks: 'all'
    }
  }
}