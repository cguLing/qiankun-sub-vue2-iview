const { name } = require('./package.json')
module.exports = {
  publicPath: '/subapp/bus',
  transpileDependencies: ['common'],
  chainWebpack: config => config.resolve.symlinks(false),
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
      '/api/v1/': {
        target: 'http://127.0.0.1:9999',
        changeOrigin: true
        // pathRewrite: {
        //   '^/api/v1/vpn': '/api/v1/vpn'
        // }
      },
      '/auth': {
        target: 'https://ids.corp.youdao.com',
        logLevel: 'debug',
        changeOrigin: true
      }
    }
  }
}
