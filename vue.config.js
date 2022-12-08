const { name } = require('./package.json')
const path = require('path')

function resolve (dir) {
  return path.join(__dirname, dir)
}
module.exports = {
  publicPath: '/subapp/bus',
  transpileDependencies: ['common'],
  css: {
    loaderOptions: {
      less: {
        lessOptions: { javascriptEnabled: true }
      }
    }
  },
  chainWebpack: (config) => {
    config.resolve.symlinks(false)
    config.plugin('preload').tap(() => [
      {
        rel: 'preload',
        fileBlacklist: [/\.map$/, /hot-update\.js$/, /runtime\..*\.js$/],
        include: 'initial'
      }
    ])

    // when there are many pages, it will cause too many meaningless requests
    config.plugins.delete('prefetch')

    // 将 font文件 编译成 base64 内嵌到css文件
    config.module
      .rule('fonts')
      .test(/\.(ttf|otf|eot|woff|woff2)$/)
      .use('url-loader')
      .loader('url-loader')
      .tap((options) => {
        options = {
          // limit: 10000,
          name: 'fonts/[name].[ext]'
        }
        return options
      })

    // 原有的svg图像处理loader添加exclude
    config.module
      .rule('svg')
      .exclude.add(resolve('src/icons'))
      .end()

    // 添加新的svg-sprite-loader处理svgIcon
    config.module
      .rule('svgIcon')
      .test(/\.svg$/)
      .include.add(resolve('src/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })
      .end()

    // set preserveWhitespace
    config.module
      .rule('vue')
      .use('vue-loader')
      .loader('vue-loader')
      .tap((options) => {
        options.compilerOptions.preserveWhitespace = true
        return options
      })
      .end()

    // 图片打包
    // config.module
    // .rule("images")
    // .test(/\.(png|jpe?g|gif|webp)$/)
    // .use("url-loader")
    // .loader("url-loader")
    // .tap((options) => {
    //   options = {
    //     // limit: 4096,
    //     name: "img/[name].[hash:7].[ext]",
    //     publicPath:'/assets'
    //   };
    //   return options;
    // })
  },
  configureWebpack: {
    output: {
      // 把子应用打包成 umd 库格式
      library: 'bus',
      libraryTarget: 'umd',
      jsonpFunction: `webpackJsonp_n${name}`
    }
  },
  devServer: {
    port: 8000,
    headers: {
      'Access-Control-Allow-Origin': '*'
    },
    proxy: {
      '/api': {
        target: 'https://cicd-bak-nbj01.inner.youdao.com', // 要访问的接口域名
        changeOrigin: true // 开启代理：在本地会创建一个虚拟服务端，然后发送请求的数据，并同时接收请求的数据，这样服务端和服务端进行数据的交互就不会有跨域问题
      },
      '/auth': {
        target: 'https://ids.corp.youdao.com',
        logLevel: 'debug',
        changeOrigin: true
      }
    }
  }
}
