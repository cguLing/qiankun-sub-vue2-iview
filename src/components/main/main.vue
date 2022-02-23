<template>
  <Layout style="height: 100%;" class="layout-body">
    <div class="sider-bar left">
      <Sider
        class="sider-menu-bar"
        ref="siderProductBar"
        v-model="collapsed"
        collapsible
        :collapsed-width="50"
        :width="200"
      >
        <div class="menu-bar" style="height: calc(100% - 100px);">
          <MenuBar ref="sysMenu">
            <template slot="appInfo">{{$sysMainFrameInfo.APP_NAME}}</template>
          </MenuBar>
        </div>
      </Sider>
    </div>
    <Layout>
      <Content class="content-con">
        <Layout class="layout-con">
          <Content class="content-wrapper">
              <router-view/>
          </Content>
        </Layout>
      </Content>
    </Layout>
  </Layout>
</template>
<script>
import MenuBar from './menu/index.vue'
import { mapMutations, mapGetters } from 'vuex'
// import { getNewTagList, routeEqual } from '@/libs/util'
import routes from '@/router'
import minLogo from '@/assets/images/logo-min.jpg'
import maxLogo from '@/assets/images/logo.jpg'
import './main.less'
export default {
  name: 'Main',
  components: {
    MenuBar
  },
  data () {
    return {
      collapsed: false,
      minLogo,
      maxLogo,
      isFullscreen: false
    }
  },
  computed: {
    ...mapGetters([
      'errorCount'
    ]),
    tagNavList () {
      return this.$store.state.app.tagNavList
    },
    cacheList () {
      const list = ['ParentView', ...this.tagNavList.length ? this.tagNavList.filter(item => !(item.meta && item.meta.notCache)).map(item => item.name) : []]
      return list
    },
    local () {
      return this.$store.state.app.local
    },
  },
  methods: {
    ...mapMutations([
      'setBreadCrumb',
      'setTagNavList',
      'addTag',
      'setLocal',
      'setHomeRoute',
      'closeTag'
    ]),
    handleCollapsedChange (state) {
      this.collapsed = state
    }
  },
  watch: {
    // '$route' (newRoute) {
    //   const { name, query, params, meta } = newRoute
    //   this.addTag({
    //     route: { name, query, params, meta },
    //     type: 'push'
    //   })
    //   this.$refs.sideMenu.updateOpenName(newRoute.name)
    // }
  },
  mounted () {
    /**
     * @description 初始化设置面包屑导航和标签导航
     */
    this.setHomeRoute(routes)
  }
}
</script>
