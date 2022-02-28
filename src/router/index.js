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
    path: '/myConnect',
    name: 'myConnect',
    meta: {
      icon: 'ios-bookmarks',
      title: '我的服务'
    },
    component: Main,
    children: [
      {
        path: '/myConnect/IDC',
        name: 'myConnect_IDC',
        meta: {
          title: '服务1'
        },
        component: () => import('@/view/service/index.vue')
      },
      {
        path: '/myConnect/IT',
        name: 'myConnect_IT',
        meta: {
          title: '服务2'
        },
        component: () => import('@/view/service/index.vue')
      }
    ]
  },
  {
    path: 'https://www.baidu.com/',
    name: 'doc',
    meta: {
      icon: 'ios-navigate',
      title: '操作文档',
      target: 'link'
    }
  },
  {
    path: '/404',
    meta: {
      layout: true,
    },
    component: () => import('@/view/error/404/index.vue')
  },
  {
    path: '*',
    name: '*',
    redirect: '/404',
    meta: {
      layout: true,
    }
  }
]

export default routes
