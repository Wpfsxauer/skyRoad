let path = require('path')
const ThemeColorReplacer = require('webpack-theme-color-replacer')
const Jarvis = require('webpack-jarvis')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const SimpleProgressWebpackPlugin = require('simple-progress-webpack-plugin')

const {
  getThemeColors, modifyVars
} = require('./src/utils/themeUtil')
const {
  resolveCss
} = require('./src/utils/theme-color-replacer-extend')
module.exports = {
  devServer: {
    port: 8000
    // proxy: {
    //   '/api': { //此处要与 /services/api.js 中的 API_PROXY_PREFIX 值保持一致
    //     target: '',
    //     changeOrigin: true,
    //     pathRewrite: {
    //       '^/api': ''
    //     }
    //   }
    // }
  },
  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'less',
      patterns: [path.resolve(__dirname, "./src/theme/theme.less")]
    }
  },
  configureWebpack: config => {
    config.entry.app = [
      "babel-polyfill",
      "whatwg-fetch",
      "./src/main.js"
    ];
    config.performance = {
      hints: false
    }
    const plugins = [
      new ThemeColorReplacer({
        fileName: 'css/theme-colors-[contenthash:8].css',
        matchColors: getThemeColors(),
        injectCss: true,
        resolveCss
      }),
      new Jarvis({
        port: 9999
      }),
      new BundleAnalyzerPlugin({
        analyzerPort: 8080,
        generateStatsFile: false
      }),
      new SimpleProgressWebpackPlugin({
        format: 'minimal'
      })
    ]
    if (process.env.NODE_ENV === 'development') plugins.splice(2, 1)
    for (const item of plugins) config.plugins.push(item)
  },
  chainWebpack: config => {
    // 生产环境下关闭css压缩的 colormin 项，因为此项优化与主题色替换功能冲突
    if (process.env.NODE_ENV === 'production') {
      config.plugin('optimize-css')
        .tap(args => {
          args[0].cssnanoOptions.preset[1].colormin = false
          return args
        })
    }
  },
  css: {
    loaderOptions: {
      less: {
        lessOptions: {
          modifyVars: modifyVars(),
          javascriptEnabled: true
        }
      }
    }
  },
  publicPath: process.env.NODE_ENV === 'production' ? '/skyRoad/' : '/',
  outputDir: 'skyRoad',
  assetsDir: 'static',
  productionSourceMap: false
}
