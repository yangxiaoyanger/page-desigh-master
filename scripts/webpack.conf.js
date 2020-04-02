var path = require('path')
var webpack = require('webpack')
const NODE_ENV = process.env.NODE_ENV;


const VueLoaderPlugin = require('vue-loader/lib/plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin')
const ProgressBarPlugin = require('progress-bar-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const env = process.env.NODE_ENV
const production = env === 'production'




const assetsPath = function (_path) {
  const assetsSubDirectory = process.env.NODE_ENV === 'production'
    ? 'static'
    : 'static'

  return path.posix.join(assetsSubDirectory, _path)
}

console.log(122333)
module.exports = {
  // entry: './src/main.js',
  // output: {
  //      path: path.resolve(__dirname, './dist'),
  //      publicPath: '/dist/',
  //      filename: 'build.js'
  //    },
  entry: NODE_ENV == 'development' ? './src/index.js' : './src/index.js',
  output: {
    path: path.resolve(__dirname, '../dist'),
    publicPath: '/dist/', // 路径
    filename: 'vue-page-designer-ytt.js', // 打包之后的名称
    library: 'lvue-page-designer-ytt', // 指定的就是你使用require时的模块名
    libraryTarget: 'umd', // 指定输出格式
    umdNamedDefine: true // 会对 UMD 的构建过程中的 AMD 模块进行命名。否则就使用匿名的 define
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'vue-page-designer-ytt.css'
    }),
    new CleanWebpackPlugin(['../dist']),
    new VueLoaderPlugin(),
    new webpack.LoaderOptionsPlugin({ options: {} }),
    new FriendlyErrorsWebpackPlugin(),
    new ProgressBarPlugin()
  ],
  watchOptions: {
    aggregateTimeout: 300,
    poll: 1000
  },
  devServer: {
    historyApiFallback: true,
    hot: true,
    inline: true,
    stats: 'errors-only',
    host: '0.0.0.0',
    port: 8084,
    proxy: { // proxy URLs to backend development server
      '/api': 'http://10.0.30.208:19090'
    }
  },
  module: {
    rules: [
      // {
      //   test: /.js$/,
      //   exclude: /node_modules/,
      //   loader: 'eslint-loader',
      //   enforce: 'pre'
      // },
      {
        test: /.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: { babelrc: true }
        }
      },
      {
        test: /\.less$/,
        use: [
          'style-loader',
          'css-loader',
          'less-loader'
        ]
      },
      // {
      //   test: /\.vue$/,
      //   loader: 'eslint-loader',
      //   enforce: 'pre'
      // },
      {
        test: /\.vue$/,
        use: [
          {
            loader: 'vue-loader',
            options: {

            }
          },
          {
            loader: 'iview-loader',
            options: {
              prefix: false
            }
          }
        ]
      },
      {
        test: /\.css$/,
        loader: ['style-loader', 'css-loader']
      },
      {
        test: /\.scss?$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.(ttf|eot|svg)(\?.*)?$/,
        loader: 'file-loader',
        options: {
          name: 'font/[name].[ext]'
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/i,
        use: [
          /* config.module.rule('fonts').use('url-loader') */
          {
            loader: 'url-loader',
            options: {
              limit: 4096,
              fallback: {
                loader: 'file-loader',
                options: {
                  name: 'fonts/[name].[hash:8].[ext]'
                }
              }
            }
          }
        ]
      },
      {
        test: /\.(png|jpg|gif|jpeg)$/,
        use: [{
          loader: 'url-loader',
          // loader: 'file-loader',
          options: {
            esModule: false, // 这里设置为false
            name: '[name].[ext]',
            limit: 10240
          }
        }]
      }

      // {
      //   test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
      //   loader: 'url-loader',
      //   options: {
      //     limit: 10000,
      //     name: assetsPath('img/[name].[hash:7].[ext]')
      //   }
      // },
    ]
  },
  externals: {
    vue: {
      root: 'Vue',
      commonjs: 'vue',
      commonjs2: 'vue',
      amd: 'vue'
    },
    tree: {
      root: 'vue-giant-tree',
      commonjs: 'tree',
      commonjs2: 'tree',
      amd: 'vue-giant-tree'
    },
    echarts: {
      root: 'echarts',
      commonjs: 'echarts',
      commonjs2: 'echarts',
      amd: 'echarts'
    }
  },
  resolve: {
    extensions: ['.js', '.vue', '.json']
  }
}
