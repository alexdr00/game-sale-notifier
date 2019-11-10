const webpack = require('webpack');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const Dotenv = require('dotenv-webpack');

const isProduction = process.env.NODE_ENV === 'production';

let plugins = [
  new HtmlWebpackPlugin({
    template: './src/index.html',
  }),
  new webpack.HotModuleReplacementPlugin(),
  new Dotenv({
    safe: true
  }),
];

if (isProduction) {
  plugins = [
    ...plugins,
    new BundleAnalyzerPlugin({
      analyzerMode: 'disabled',
      generateStatsFile: true,
      statsFilename: '../coverage/client-bundle-stats.json',
    }),
    new MiniCssExtractPlugin({
      filename: "bundle.css"
    }),
  ]
} else {
  plugins = [
    ...plugins,
    new BundleAnalyzerPlugin({
      openAnalyzer: false,
    }),
  ]
}

module.exports = {
  entry: './src/index.jsx',
  plugins,
  module: {
    rules: [
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          isProduction ? MiniCssExtractPlugin.loader : 'style-loader',
          'css-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      },
      {
        test: /\.(gif|png|jpe?g|svg)$/i,
        use: [
          'file-loader',
          {
            loader: 'image-webpack-loader'
          },
        ],
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  output: {
    path: __dirname + '/dist',
    publicPath: '/',
    filename: 'bundle.js'
  },
  devServer: {
    contentBase: './dist',
    overlay: true,
    hot: true,
    port: 3000,
    open: true,
    stats: {
      colors: true,
      hash: false,
      version: false,
      timings: true,
      assets: false,
      chunks: false,
      modules: false,
      reasons: false,
      children: false,
      source: true,
      errors: true,
      errorDetails: false,
      warnings: false,
    }
  }
};
