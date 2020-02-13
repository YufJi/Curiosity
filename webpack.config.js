/* eslint-disable no-unused-vars */

const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const TestOnePlugin = require('./webpack/plugins/testOne');

const devMode = true;

module.exports = {
  entry: {
    index: path.join(__dirname, './src/index.js'),
    // list: path.join(__dirname, './src/list.js'),
    // ejs_index: path.join(__dirname, './ejs/index.ejs'),
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
    globalObject: 'this',
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
    modules: [
      path.resolve(__dirname, 'node_modules'),
    ],
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
  },
  resolveLoader: {
    modules: [
      'node_modules',
      path.join(__dirname, 'webpack', 'loaders'),
    ],
  },
  mode: devMode ? 'development' : 'production',
  externals: {
    // react: 'React',
    // 'react-dom': 'ReactDOM',
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        framework: {
          test: /[\\/](react|react-dom)[\\/]/,
          name: 'framework',
          chunks: 'all',
        },
        lib: {
          test: /[\\/]dayjs[\\/]/,
          name: 'lib',
          minChunks: 1,
          minSize: 0,
          chunks: 'all',
        },
        common: {
          chunks: 'all',
          minChunks: 2,
          minSize: 0,
          name: 'common',
        },
      },
    },
  },
  module: {
    rules: [{
      test: /.(js|jsx)$/,
      exclude: [
        /node_modules/,
        path.join(__dirname, 'src/core/Adapter'),
      ],
      use: [{
        loader: 'babel-loader',
      }],
    }, {
      test: /.(ts|tsx)$/,
      exclude: /node_modules/,
      use: [{
        loader: 'babel-loader',
      }, {
        loader: 'ts-loader',
      }],
    }, {
      test: /.scss$/,
      use: [{
        loader: MiniCssExtractPlugin.loader,
      }, {
        loader: 'css-loader',
        options: {
          modules: false,
        },
      }, 'postcss-loader', 'sass-loader'],
    }, {
      test: /.ejs$/,
      use: [{
        loader: 'file-loader',
        options: {
          name: 'html/[name].html',
        },
      }, {
        loader: 'extract-loader',
      }, {
        loader: 'html-loader',
        options: {
          minimize: false,
          removeComments: true,
          collapseWhitespace: false,
        },
      }, {
        loader: 'ejs-html-loader',
        options: {},
      }],
    }, {
      test: /.txt$/,
      use: [{
        loader: 'test-txt',
      }],
    }, {
      test: /.worker.js$/,
      use: [{
        loader: 'worker-loader',
        options: {
          inline: true,
          fallback: false,
          publicPath: '/',
        },
      }, {
        loader: 'babel-loader',
      }],
    }],
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'src/index.html',
    }),
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[name].css',
    }),
    new webpack.HotModuleReplacementPlugin(),
    new TestOnePlugin(),
    new BundleAnalyzerPlugin({

    }),
  ],
  devServer: {
    compress: true,
    port: 9000,
    open: false,
    hot: true,
    hotOnly: true,
  },
};
