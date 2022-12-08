export const routesDefault =  [
  {
    path: '/',
    name: '/',
    redirect: '/home',
    meta: {
      layout: true,
      right: ['none']
    },
    component: 'Main',
    children: [
      {
        path: '/home',
        name: 'home',
        meta: {
          // hideInMenu: true,
          icon:'logo-chrome',
          // layout: true,
          title: '首页',
          right: ['none']
        },
        component: '/home/index.vue'
      },
      {
        path: '/dept',
        name: 'dept',
        meta: {
          hideInMenu: false,
          icon: 'logo-windows',
          title: '业务部门负责人',
          right: ['none']
        },
        component: '/dept/index.vue'
      },
    ]
  },
  {
    path: '/myConnect',
    name: 'myConnect',
    meta: {
      icon: 'ios-bookmarks',
      title: '我的服务',
      right: ['none']
    },
    component: 'Main',
    children: [
      {
        path: '/myConnect/IDC',
        name: 'myConnect_IDC',
        meta: {
          title: '服务1',
          right: ['none']
        },
        component: '/service/index.vue'
      },
      {
        path: '/myConnect/IT',
        name: 'myConnect_IT',
        meta: {
          title: '服务2',
          right: ['none']
        },
        component: '/service/index.vue'
      }
    ]
  },
  {
    path: '/compileImage',
    meta: {
      layout: true,
      right: ['none']
    },
    component: 'Main',
    children: [
      {
        path: '/compileImage',
        name: 'compile-image',
        meta: {
          icon: 'md-filing',
          title: '编译镜像',
          right: ['none']
        },
        component: '/compile_image/index.vue'
      }
    ]
  },
  {
    path: '/opLog',
    meta: {
      layout: true,
      right: ['none']
    },
    component: 'Main',
    children: [
      {
        path: '/opLog',
        name: 'option-log',
        meta: {
          icon: 'ios-copy',
          title: '操作日志',
          right: ['none']
        },
        component: '/op_log/index.vue'
      }
    ]
  },
  // {
  //   path: 'https://www.baidu.com/',
  //   name: 'doc',
  //   meta: {
  //     icon: 'ios-navigate',
  //     title: '操作文档',
  //     target: 'link',
  //     right: ['none']
  //   }
  // },
  {
    path: '/404',
    meta: {
      layout: true,
      right: ['none']
    },
    component: '/error/404/index.vue'
  },
  {
    path: '*',
    name: '*',
    redirect: '/404',
    meta: {
      layout: true,
      right: ['none']
    }
  }
]
export const routesCharge = [
  // {
  //   path: '/configuration',
  //   meta: {
  //     layout: true,
  //   },
  //   component: 'Main',
  //   children: [
  //     {
  //       path: '/configuration',
  //       name: 'configuration',
  //       meta: {
  //         icon: 'cmdb-settings',
  //         title: '服务配置'
  //       },
  //       component: '/charge/configuration/index.vue'
  //     }
  //   ]
  // }
]
export default routesDefault