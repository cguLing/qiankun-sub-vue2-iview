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
    }
  }
}
