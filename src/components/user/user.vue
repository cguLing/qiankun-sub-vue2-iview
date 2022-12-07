<template>
  <div class="user-avator-dropdown">
    <span style="font-size:14px;color:#fff;margin-right:4px">{{cname}}</span>
    <!-- <Icon :size="18" type="md-arrow-dropdown" style="color:#fff"></Icon> -->
  </div>
</template>
<script>
import './user.less'
import { mapState } from 'vuex'
export default {
  name: 'User',
  props: {
    userAvator: {
      type: String,
      default: ''
    },
    name: {
      type: Number,
      default: 0
    }
  },
  computed: {
    ...mapState({
      cname: state => state.user.employeeName
    }),
  },
  methods: {
    // ...mapActions([
    //   'handleLogOut'
    // ]),
    logout () {
      // this.handleLogOut().then(() => {
      //   this.$router.push({
      //     name: 'login'
      //   })
      // })
    },
    // handleClick (name) {
    //   switch (name) {
    //     case 'logout': this.logout()
    //       break
    //     case 'userInfo':
    //       this.$router.push({
    //         name: 'userInfo'
    //       })
    //       break
    //   }
    // }
  }
}
</script>
