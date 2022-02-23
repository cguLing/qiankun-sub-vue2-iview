<template>
    <div :class="'menu-level-'+level">
        <template v-for="item in menuList" >
            <template>
                <Menu-item v-if="!item.children" v-show="!item.meta.hide" :name="item.name" :key="item.name" @click.native="selectToRouterMain(item.name, item.target)">
                    <span>
                        <!-- <myIcon v-if="level==0" :type="item.icon||'icon-defaultLogo'"/> -->
                        <Icon v-if="level==0" :type="item.icon.includes('icon-')?'':item.icon" :custom="item.icon.includes('icon-')?('font_family icon-defaultLogo '+item.icon||''):''" size="18"/>
                        {{item.meta['title']?item.meta.title:item.name}}
                    </span>
                </Menu-item>
                <Submenu v-if="item.children" v-show="!item.meta.hide" :name="item.name" :key="item.name" @click.native="selectToRouterMain(item.name, item.target)">
                    <template slot="title">
                        <span>
                            <!-- <myIcon v-if="level==0" :type="item.icon||'icon-defaultLogo'"/> -->
                            {{item.meta['title']?item.meta.title:item.name}}
                        </span>
                    </template>
                    <MenuChild :menuList="item.children" :level="level+1"></MenuChild>
                </Submenu>
            </template>
        </template>
    </div>
</template>

<script>
export default {
  components: {
  },
  name: 'MenuChild',
  inject: ['selectToRouterMain'],
  props: ['menuList', 'level'],
  created () {
    // console.log(this.menuList)
  }
}
</script>
