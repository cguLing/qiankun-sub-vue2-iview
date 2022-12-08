const { name } = require('./package.json')
const path = require('path')

function resolve (dir) {
  return path.join(__dirname, dir)
}
module.exports = {
  publicPath: '/subapp/bus',
  transpileDependencies: ['common'],
  chainWebpack: config => {
    config.resolve.symlinks(false)
    config.resolve.alias
      .set('@', resolve('src'))
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
