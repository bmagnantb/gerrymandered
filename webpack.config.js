var webpack = require('webpack')
var autoprefixer = require('autoprefixer')
var ExtractTextPlugin = require('extract-text-webpack-plugin')

var isDev = process.env.NODE_ENV === 'development'

var devServer = {
  client: 'webpack-dev-server/client?http://localhost:8080',
  server: 'webpack/hot/only-dev-server'
}

module.exports = {
  devServer: {
    headers: { 'Access-Control-Allow-Origin': '*' },
    contentBase: './build',
    hot: true
  },
  entry: {
    'app': isDev
      ? [devServer.client, devServer.server, './src/js/app']
      : './src/js/app'
  },
  output: {
    path: __dirname + '/build',
    filename: '[name].js',
    publicPath: isDev ? 'http://localhost:8080/' : '/'
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: [/node_modules/],
        loader: 'babel'
      },
      {
        test: /\.s?css$/,
        loader: isDev
          ? 'style!css!postcss!sass'
          : ExtractTextPlugin.extract('style', 'css!postcss!sass')
      }
    ],
    postcss: function() {
      return [autoprefixer]
    }
  },
  plugins: isDev
    ? [
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NoErrorsPlugin()
    ]
    : [
      new ExtractTextPlugin('style.css')
    ],
  resolve: {
    extensions: ['', '.js', '.jsx']
  }
}
