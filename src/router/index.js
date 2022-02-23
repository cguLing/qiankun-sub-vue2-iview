import Vue from 'vue'
import VueRouter from 'vue-router'
import Main from '@/components/main'

Vue.use(VueRouter)

const routes =  [
  {
    path: '/',
    name: '/',
    redirect: '/home',
    meta: {
      hideInBread: true,
    },
    component: Main,
    children: [
      {
        path: '/home',
        name: 'home',
        meta: {
          hide: true,
          hideInBread: true,
          title: '首页'
        },
      },
      {
        path: '/dept',
        name: 'dept',
        meta: {
          hide: false,
          icon: 'logo-windows',
          title: '业务部门负责人'
        },
        component: () => import('@/view/dept/index.vue')
      }
    ]
  },
  {
    path: '/project',
    meta: {
      hideInBread: true,
    },
    component: Main,
    children: [
      {
        path: '/project',
        name: 'project',
        meta: {
          icon: 'ios-navigate',
          title: '项目组'
        },
        component: () => import('@/view/project/index.vue')
      }
    ]
  },
  {
    path: '/service',
    meta: {
      hideInBread: true,
    },
    component: Main,
    children: [
      {
        path: '/service',
        name: 'service',
        meta: {
          icon: 'icon-toTables',
          title: '服务'
        },
        component: () => import('@/view/service/index.vue')
      }
    ]
  }
]

export default routes
