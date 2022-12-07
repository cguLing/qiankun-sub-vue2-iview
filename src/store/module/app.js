import {
  getBreadCrumbList,
  setTagNavListInLocalstorage,
  getMenuByRouter,
  getTagNavListFromLocalstorage,
  getHomeRoute,
  // getNextRoute,
  routeHasExist,
  // routeEqual,
  getRouteTitleHandled,
  localSave,
  localRead
} from '@/libs/util'
import user from './user'
import routesDefault, {routesCharge} from '@/router/routes'
import config from '@/config'
const { homeName } = config

export default {
  state: {
    breadCrumbList: [],
    tagNavList: [],
    homeRoute: {},
    local: localRead('local'),
    menuList:[]
  },
  // getters: {
  //   menuList: (state, getters, rootState) => getMenuByRouter(routes, rootState.user.access),
  // },
  mutations: {
    RESET_MENULIST: (state) => {
      let tmp = routesDefault
      if(sessionStorage.getItem('manager')==1){
        tmp = tmp.concat(routesCharge)
      }
      state.menuList =  getMenuByRouter(user.state.right,tmp)
    },
    setBreadCrumb (state, route) {
      state.breadCrumbList = getBreadCrumbList(route, state.homeRoute)
    },
    setHomeRoute (state, routes) {
      state.homeRoute = getHomeRoute(routes, homeName)
    },
    setTagNavList (state, list) {
      let tagList = []
      if (list) {
        tagList = [...list]
      } else tagList = getTagNavListFromLocalstorage() || []
      // if (tagList[0] && tagList[0].name !== homeName) tagList.shift()
      // let homeTagIndex = tagList.findIndex(item => item.name === homeName)
      // if (homeTagIndex > 0) {
      //   let homeTag = tagList.splice(homeTagIndex, 1)[0]
      //   tagList.unshift(homeTag)
      // }
      state.tagNavList = tagList
      setTagNavListInLocalstorage([...tagList])
    },
    // closeTag (state, route) {
    //   let tag = state.tagNavList.filter(item => routeEqual(item, route))
    //   route = tag[0] ? tag[0] : null
    //   if (!route) return
    //   closePage(state, route)
    // },
    addTag (state, { route, type = 'unshift' }) {
      let router = getRouteTitleHandled(route)
      if (!routeHasExist(state.tagNavList, router)) {
        if (type === 'push') state.tagNavList.push(router)
        else {
          if (router.name === homeName) state.tagNavList.unshift(router)
          else state.tagNavList.splice(1, 0, router)
        }
        setTagNavListInLocalstorage([...state.tagNavList])
      }
    },
    setLocal (state, lang) {
      localSave('local', lang)
      state.local = lang
    },
  },
  actions: {
    resteMenulist({ commit }) {
      commit("RESET_MENULIST");
    }
  }
}
