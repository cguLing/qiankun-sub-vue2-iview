<template>
    <Menu width="200" ref="systemMenu" accordion :active-name="activeName" :open-names="openNames">
        <div class="product-current">
            <div class="item">
                <Icon :custom="'font_family icon-defaultLogo'"
                      size="18"/>
            </div>
            <div class="item">
                <slot name="appInfo">-</slot>
            </div>
        </div>
        <MenuChild :menuList="menuLists" :level="0"></MenuChild>
    </Menu>
</template>

<script>
import MenuChild from './children'

export default {
  components: { MenuChild },
  provide () {
    return {
      selectToRouterMain: this.selectToRouterMain
    }
  },
  data () {
    return {
      activeName: '',
      openNames: [],
      menuLists: [],
      menuNames: []
    }
  },
  computed: {
    menuList () {
      return this.$store.getters.menuList
    },
  },
  watch: {
  },
  created(){
    this.sysGetMenus()
  },
  methods: {
    sysGetMenus () {
      let result = this.getMenuName(this.menuList)
      this.menuNames = result.Name
      this.menuLists = result.Menu
      this.expandSideMenu()
    },
    getMenuName (menus, result = {Name: [], Menu: []}) {
      menus.forEach(value => {
        if (value.meta['hideInBread']){
          if (value.children) {
            result.Menu=result.Menu.concat(value.children)
            this.getMenuName(value.children, result)
          }
        } else {
          result.Name.push(value.name)
          if (value.children) {
            this.getMenuName(value.children, result)
          }
        }
      })
      return result
    },
    selectToRouterMain (name, target) {
      if (target === '_blank' || target === '_top') {
        let { href } = this.$router.resolve({
          name: name
        })
        if (target === '_top') href = '/full' + href
        window.open(href, '_blank')
      } else {
        this.$router.push({ name: name })
      }
    },
    expandSideMenu (route = this.$route) {
      // 根据路由地址判定需要展开与选中的菜单项
      this.openNames = route.matched.map(x => x.name).filter(x => x !== '/')
      const names = [...this.openNames].reverse()
      for (let i = 0; i < names.length; i++) {
        if (this.menuNames.includes(names[i])) {
          this.activeName = names[i]
          break
        }
      }
      // this.$nextTick(() => {
      //   const _systemMenu = this.$refs.systemMenu
      //   _systemMenu.updateOpened()
      //   _systemMenu.updateActiveName()
      // })
    }
  }
}
</script>
