const path = require('path');
const webpack = require('webpack');

const ExtractTextPlugin = require('extract-text-webpack-plugin');

const GLOBALS = {
  'process.env.NODE_ENV' : JSON.stringify('production')
};

module.exports = {
    debug: true,
    devtool: 'source-map',
    noInfo: false,
    watch:true,
    entry: [
        path.resolve(__dirname, 'src/index')
    ],
    target: 'web',
    output: {
        path: __dirname + '/dist', // Note: Physical files are only output by the production build task `npm run build`.
        publicPath: '/',
        filename: 'bundle.js'
    },
    plugins: [
      new webpack.DefinePlugin(GLOBALS),
      new ExtractTextPlugin('styles.css')
    ],
    module: {
        loaders: [
            {test: /\.js$/, include: path.join(__dirname, 'src'), loaders: ['babel']},
            {test: /(\.css)$/, loader: ExtractTextPlugin.extract("css?sourceMap")},
            {test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: 'file'},
          {
            test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
            loader: 'url-loader?limit=10000'
          }]
    }
};
