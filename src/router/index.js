import Vue from 'vue'
import VueRouter from 'vue-router'
// import Main from '@/components/main'
import routesDefault, {routesCharge} from './routes'
Vue.use(VueRouter)
/**
 * 后台查询的菜单数据拼装成路由格式的数据
 * @param routes
 */
 function generaRoute(routes, data) {
  data.forEach((item) => {
    console.log(item.component,item)
    const menu = {
      path: item.path,
      component:
        item.component === "Main" ? ()=>import('@/components/main') : ()=>import(`@/view${item.component}`), 
      children: [],
      name: item.name,
      redirect: item.redirect,
      meta: item.meta 
    };
    if (item.children) {
      generaRoute(menu.children, item.children);
    }
    routes.push(menu);
  });
}

let result = []
if(sessionStorage.getItem('manager')==1){
  generaRoute(result,routesDefault.concat(routesCharge))
} else {
  generaRoute(result,routesDefault)
}
// 用户权限 => 此为写死的方案
// let user = store.state.user.username
// let right = store.state.app.right
// const routes = result.filter((obj)=>{
//   if(!obj.meta.right) return true
//   for (let i = 0; i < obj.meta.right.length; i++) {
//     const item = obj.meta.right[i];
//     if(right[item].includes(user)) return true
//   }
//   return false
// })
// const routes = result
// export default routes

const createRouter = () =>
  new VueRouter({
    base: window.__POWERED_BY_QIANKUN__ ? '/bill' : process.env.BASE_URL,
    // scrollBehavior: () => ({ y: 0 }),
    routes: result,
    mode: 'history'
  });

const router = createRouter();

export function resetRouter() {
  return new Promise(resolve => {
    result = []
    let tmp = routesDefault
    if(sessionStorage.getItem('manager')==1){
      tmp = tmp.concat(routesCharge)
    }
    generaRoute(result,tmp)
    const newRouter = createRouter();
    router.matcher = newRouter.matcher; // reset router
    resolve(result)
  })
}
export default router