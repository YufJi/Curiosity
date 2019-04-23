
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

const devMode = false;


module.exports = {
  entry: {
    index: path.join(__dirname, './src/index.tsx'),
    // list: path.join(__dirname, './src/list.js'),
    // ejs_index: path.join(__dirname, './ejs/index.ejs'),
  },
  output: {
    path: path.resolve(__dirname, 'build'),
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
  },
  mode: devMode ? 'development' : 'production',
  externals: {
    // 'react': 'React',
    // 'react-dom': 'ReactDOM'
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        react: {
          test: /[\\/]node_modules[\\/](react|react-dom)[\\/]/,
          name: 'react-bundle',
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
      exclude: /node_modules/,
      use: [{
        loader: 'babel-loader',
      }],
    }, {
      test: /.(ts|tsx)$/,
      exclude: /node_modules/,
      use: [{
        loader: 'ts-loader',
      }],
    }, {
      test: /.scss$/,
      use: [{
        loader: MiniCssExtractPlugin.loader,
      }, {
        loader: 'css-modules-typescript-loader',
        options: {
          modules: true, // 开启css-modules
          namedExport: true,
          camelCase: true,
          minimize: true,
          sass: true,
          localIdentName: '[local]_[hash:base64:5]',
        },
      }, {
        loader: 'css-loader',
        options: {
          modules: true,
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
    new BundleAnalyzerPlugin({
      openAnalyzer: false,
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
