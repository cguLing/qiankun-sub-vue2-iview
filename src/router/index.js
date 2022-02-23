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
      layout: true,
    },
    component: Main,
    children: [
      {
        path: '/home',
        name: 'home',
        meta: {
          hideInMenu: true,
          layout: true,
          title: '首页'
        },
      },
      {
        path: '/dept',
        name: 'dept',
        meta: {
          hideInMenu: false,
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
      layout: true,
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
      layout: true,
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
