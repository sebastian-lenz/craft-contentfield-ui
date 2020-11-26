const path = require('path');

const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const LiveReloadPlugin = require('webpack-livereload-plugin');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
  entry: './src/index.tsx',
  output: {
    jsonpFunction: 'contentFieldJsonp',
    path: path.resolve(__dirname, 'dist'),
    filename: 'content-field.js',
    chunkFilename: '[name].js',
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.styl'],
  },
  externals: {
    jquery: 'jQuery',
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'content-field.css',
    }),
    new LiveReloadPlugin(),
  ],
  stats: 'minimal',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: ['babel-loader', 'ts-loader'],
      },
      {
        test: /\.styl$/i,
        use: [
          { loader: MiniCssExtractPlugin.loader },
          { loader: 'css-loader', options: { url: false } },
          { loader: 'stylus-loader' },
        ],
      },
    ],
  },
  optimization: {
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          output: {
            semicolons: false,
          },
        },
      }),
    ],
    splitChunks: {
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendor',
          chunks: 'all',
        },
      },
    },
  },
  performance: {
    maxEntrypointSize: 600000,
    maxAssetSize: 600000,
  },
};
