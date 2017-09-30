let _ = require('lodash');
let webpack = require('webpack');
let path = require('path');

let babelOptions = {
  "presets": "es2015"
};

function isVendor(module) {
  return module.context && module.context.indexOf('node_modules') !== -1;
}

module.exports = {
  entry: './src/index.ts',
  output: {
     path: path.resolve(__dirname, './dist'),
     filename: 'build.js',
     library: ['VueSocketio'],
     libraryTarget: 'umd'
 },
  module: {
    rules: [{
      test: /\.ts(x?)$/,
      exclude: /node_modules/,
      use: [
        {
          loader: 'babel-loader',
          options: babelOptions
        },
        {
          loader: 'ts-loader'
        }
      ]
    }, {
      test: /\.js$/,
      exclude: /node_modules/,
      use: [
        {
          loader: 'babel-loader',
          options: babelOptions
        }
      ]
    }]
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"]
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
        compress: {
            warnings: false
        }
    })
  ]
}
