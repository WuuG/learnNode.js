const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: "./src/js/app.js",
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        oneOf: [
          {
            test: /\.html$/,
            use: [
              {
                loader: 'html-loader',
                options: {
                  minimize: false
                }
              },
            ],
          },
          {
            test: /\.s[ac]ss$/i,
            use: [
              // 将 JS 字符串生成为 style 节点
              "style-loader",
              // 将 CSS 转化成 CommonJS 模块
              "css-loader",
              // 将 Sass 编译成 CSS
              "sass-loader",
            ],
          },
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'index.html'
    }),
    new CleanWebpackPlugin(),
    new CopyPlugin([
      { from: './public', to: './public' }
    ]),
  ],
  devServer: {
    contentBase: "./dist",
    // hot: true
    compress: true,
    port: 9000
  },
  mode: 'development'
}
