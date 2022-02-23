/* eslint-disable */
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import './public-path'
import Vue from 'vue'
import App from './App'
import store from './store'
import iView from 'iview'
import config from '@/config'
import './index.less'
import '@/assets/icons/iconfont.css'
import routes from "./router";
import VueRouter from "vue-router";
import '@/components/resource/fonts'


// 加载系统配置
let sysMainframeInfo = {};
Vue.prototype.$sysMainFrameInfo = Object.assign({
  APP_NAME: '子系统模板',
}, sysMainframeInfo)
/* eslint-disable */

Vue.config.productionTip = false
let instance = null
Vue.use(iView)
/**
 * @description 全局注册应用配置
 */
Vue.prototype.$config = config


if (!window.__POWERED_BY_QIANKUN__) {
  const router = new VueRouter({
    base: window.__POWERED_BY_QIANKUN__ ? routerBase : process.env.BASE_URL,
    mode: 'history',
    routes
  })
  instance = new Vue({
    el: '#subContainer',
    router,
    store,
    render: (h) => h(App)
  })
}

export async function bootstrap () {
  console.log('[vue] vue app bootstraped')
}

export async function mount (props) {
  const { container, routerBase } = props
  const router = new VueRouter({
    base: routerBase,
    mode: 'history',
    routes
  })
  instance = new Vue({
    router,
    store,
    render: (h) => h(App)
  }).$mount(container.querySelector('#subContainer'))
}

export async function unmount () {
  instance.$destroy()
  instance.$el.innerHTML = ''
  instance = null
}
