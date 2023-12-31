/*
 * @Author: qianhua.xiong
 */
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const {VueLoaderPlugin} = require('vue-loader');
const ESBuildPlugin = require('esbuild-webpack-plugin').default;
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const isProduction = process.env.NODE_ENV === 'production';
module.exports = () => {
  return {
    entry: './src/index.js',//入口文件位置
    devServer: { // 测试环境服务
      open: true,
      port: 4000
    },
    output: { //出口
      chunkFilename: isProduction ? '[name]@[chunkhash:8].chunk.js' : '[name].chunk.js',
      filename: isProduction ? '[name]@[contenthash].js' : '[name].js'
    },
    mode: isProduction ? 'production' : 'development',
    module: {
      rules: [
        {
          //.js文件loader
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              cacheDirectory: true,
              cacheCompression: false
            }
          }
        },
        {
          //.vue文件loader
          test: /\.vue$/,
          use: 'vue-loader'
        },
        {
          //.css文件loader
          test: /\.css$/,
          use: [isProduction ? MiniCssExtractPlugin.loader : 'vue-style-loader', 'css-loader']
        },
        { //图片
          test: /\.(png|svg|jpg|jpeg|gif|bmp)$/,
          type: 'asset/resource',
          generator:{ 
              filename: 'image/[contenthash:10].[ext]',
          }, 
        },
        {
          test: /\.mp4$/,
          use: {
            loader: 'file-loader',
            options: {
              name: 'video/[contenthash:10].[ext]',
            },
          },
        },
      ]
    },
    resolve: {// 设置模块如何被解析
      alias: {
        vue: "vue/dist/vue.esm-bundler.js"
      },
      extensions: ['.js', '.vue']// 按顺序解析这些后缀名
    },
    optimization: {
      minimizer: [new ESBuildPlugin()],
      splitChunks: {
        cacheGroups: {
          defaultVendors: {
            name: 'chunk-vendors',
            test: /[\\/]node_modules[\\/]/,
            priority: -10,
            chunks: 'initial'
          },
          common: {
            name: 'chunk-common',
            minChunks: 2,
            priority: -20,
            chunks: 'initial',
            reuseExistingChunk: true
          }
        }
      }
    },
    plugins: [
      new VueLoaderPlugin(),
      new HtmlWebpackPlugin({
        template: 'index.html',
        minify: {
          collapseWhitespace: true, //去掉空格
          removeComments: true, //删除注释
          removeAttributeQuotes: true, //删除双引号
          removeEmptyAttributes: true, //删除声明了但是没赋值的属性 let a;
          minifyCSS: true,
          minifyJS: true,
          minifyURLs: true,
          removeTagWhitespace: true
      }
      }),
      isProduction ? new MiniCssExtractPlugin({
        filename: '[name].[contenthash:8].css',
        chunkFilename: '[name].[contenthash:8].chunk.css'
      }) : null,
      new webpack.DefinePlugin({
        __VUE_OPTIONS_API__: false,
        __VUE_PROD_DEVTOOLS__: false,
      }),
      new CleanWebpackPlugin(),
    ].filter(Boolean)
  };
};
