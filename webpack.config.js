const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
let target = 'http://192.168.22.144'
function resolve(dir) {
  return path.join(__dirname, dir)
}

const config = {
  entry: './src/main.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        exclude: /node_modules/
      }, {
        test: /\.css$/,
        use: ['vue-style-loader', 'style-loader', 'css-loader'],
        exclude: /node_modules/
      }, {
        test: /\.less$/,
        use: [{
          loader: "style-loader" // creates style nodes from JS strings
        }, {
          loader: "css-loader" // translates CSS into CommonJS
        }, {
          loader: "less-loader" // compiles Less to CSS
        }],
        exclude: /node_modules/
      }, {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192
            }
          }
        ],
        exclude: /node_modules/
      }, {
        test: /\.js$/,
        use: 'babel-loader',
        exclude: /node_modules/
      }, {
        test: /\.(js|vue)$/,
        use: [{
          loader: 'eslint-loader',
          options: {
            formatter: require('eslint-friendly-formatter')
          }
        }],
        enforce: 'pre',
        include: [resolve('src'), resolve('test')]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'public/index.html')
    }),
    // 这个插件是必须的！ 它的职责是将你定义过的其它规则复制并应用到 .vue 文件里相应语言的块。例如，如果你有一条匹配 /\.js$/ 的规则，那么它会应用到 .vue 文件里的 <script> 块。
    new VueLoaderPlugin()
  ],
  devServer: {
    port: 10883,
    https: true,
    proxy: {
      '*': {
        target
      }
    }
  }
}

module.exports = config
