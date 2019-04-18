
const path = require('path')
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;


module.exports = {
  entry: {
    // index: path.join(__dirname, './src/index.js'),
    // list: path.join(__dirname, './src/list.js'),
    ejs_index: path.join(__dirname, './ejs/index.ejs')
  },

  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src')
    },
    extensions: ['.js'],
  },
  mode: 'development',
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
      }
    }
  },
  module: {
    rules: [{
      test: /.js$/,
      exclude: /node_modules/,
      use: [{
        loader: 'babel-loader'
      }]
    }, {
      test: /.less$/,
      use: [{
        loader: MiniCssExtractPlugin.loader,
      }, {
        loader: 'css-loader',
        options: {
          modules: true,
        }
      }, 'postcss-loader', 'less-loader']
    }, {
      test: /.ejs$/,
      use: [{
        loader: 'file-loader',
        options: {
          name: 'html/[name].html',
        }
      }, {
        loader: 'extract-loader'
      }, {
        loader: 'html-loader',
        options: {
          minimize: false,
          removeComments: true,
          collapseWhitespace: false
        },
      }, {
        loader: 'ejs-html-loader',
        options: {},
      }],
    }]
  },
  plugins: [
    // new HtmlWebpackPlugin({
    //   filename: 'index.html',
    //   template: 'src/index.html'
    // }),
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[name].css'
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
  }
};
