import Vue from 'vue'
import VueRouter from 'vue-router'
import Main from '@/components/main'

Vue.use(VueRouter)

const routes =  [
  {
    path: '/',
    meta: {
      hideInBread: true,
    },
    component: Main,
    children: [
      {
        path: '',
        name: 'dept',
        meta: {
          icon: 'ios-navigate',
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
        path: '',
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
        path: '',
        name: 'service',
        meta: {
          icon: 'ios-navigate',
          title: '服务'
        },
        component: () => import('@/view/service/index.vue')
      }
    ]
  }
]

export default routes
