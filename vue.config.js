const path = require('path')
const CompressionWebpackPlugin = require('compression-webpack-plugin')

function resolve(dir) {
  return path.join(__dirname, './', dir)
}


// cdn预加载使用
// const externals = {
//   'vue': 'Vue',
//   'vue-router': 'VueRouter',
//   'vuex': 'Vuex',
//   'axios': 'axios',
//   'animate': 'animate.min',
//   'vue-aplayer':'Aplayer',
//   'qs':'qs',
//   'marked':'marked',
//   'moment':'moment',
// }

// const cdn = {
//   // 开发环境
//   dev: {
//     css: [],
//     js: []
//   },
//   // 生产环境
//   build: {
//     css: [
//       'https://cdn.jsdelivr.net/npm/animate.css@3.5.2/animate.min.css',
//       'https://cdn.jsdelivr.net/npm/mescroll.js@1.4.1/mescroll.min.css',
//     ],
//     js: [
//       'https://cdn.jsdelivr.net/npm/vue@2.5.17/dist/vue.min.js',
//       'https://cdn.jsdelivr.net/npm/vue-router@3.0.1/dist/vue-router.min.js',
//       'https://cdn.jsdelivr.net/npm/vuex@3.0.1/dist/vuex.min.js',
//       'https://cdn.jsdelivr.net/npm/axios@0.18.0/dist/axios.min.js',
//       'https://cdn.jsdelivr.net/npm/vue-aplayer',
//       'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/9.15.6/highlight.min.js',
//       'https://cdnjs.cloudflare.com/ajax/libs/qs/6.6.0/qs.js',
//       'https://cdnjs.cloudflare.com/ajax/libs/marked/0.6.1/marked.js',
//       'https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.24.0/moment.min.js',
//     ]
//   }
// }


// 是否使用gzip
const productionGzip = true
// 需要gzip压缩的文件后缀
const productionGzipExtensions = ['js', 'css']
module.exports = {
  // publicPath:"/",
  devServer: {
    proxy: {
      '/api': {
        target: 'http://119.29.230.48', //对应自己的接口
        // target: 'http://localhost:8080', //对应自己的接口
        changeOrigin: true,
        ws: true,
        pathRewrite: {
          '^api/*': '^api/*'
        }
      }
    }
  },
  chainWebpack: config => {
    // 这里是对环境的配置，不同环境对应不同的BASE_API，以便axios的请求地址不同
    config.plugin('define').tap(args => {
      const argv = process.argv
      const mode = argv[argv.indexOf('--project-mode') + 1]
      args[0]['process.env'].MODE = `"${mode}"`
      args[0]['process.env'].BASE_API = '"/"'
      return args
    })

        /**
     * 添加CDN参数到htmlWebpackPlugin配置中， 详见public/index.html 修改
     */
    // config.plugin('html').tap(args => {
    //   if (process.env.NODE_ENV === 'production') {
    //     args[0].cdn = cdn.build
    //   }
    //   if (process.env.NODE_ENV === 'development') {
    //     args[0].cdn = cdn.dev
    //   }
    //   return args
    // })

    // svg loader
    const svgRule = config.module.rule('svg') // 找到svg-loader
    svgRule.uses.clear() // 清除已有的loader, 如果不这样做会添加在此loader之后
    svgRule.exclude.add(/node_modules|assets/) // 正则匹配排除node_modules目录
    svgRule // 添加svg新的loader处理
      .test(/\.svg$/)
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })

    // 修改images loader 添加svg处理
    const imagesRule = config.module.rule('images')
    imagesRule.exclude.add(resolve('src/icons'))
    config.module
      .rule('images')
      .test(/\.(png|jpe?g|gif|svg)(\?.*)?$/)
  },
  configureWebpack: config => {
    const myConfig = {}
    if (process.env.NODE_ENV === 'production') {
      // 1. 生产环境npm包转CDN
      // myConfig.externals = externals

      myConfig.plugins = []
      // 2. 构建时开启gzip，降低服务器压缩对CPU资源的占用，服务器也要相应开启gzip
      productionGzip && myConfig.plugins.push(
        new CompressionWebpackPlugin({
          test: new RegExp('\\.(' + productionGzipExtensions.join('|') + ')$'),
          threshold: 8192,
          minRatio: 0.8,
          algorithm: 'gzip',
          cache: true
        })
      )
    }
    return myConfig
  }

}
