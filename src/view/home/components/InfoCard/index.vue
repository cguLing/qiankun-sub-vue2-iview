<template>
  <Card :shadow="shadow" class="info-card-wrapper" :padding="0">
    <div class="info-card-content">
      <div class="left-area" :style="{background: color, width: leftWidth}">
        <common-icon class="icon" :type="icon" :size="iconSize" color="#fff"/>
      </div>
      <div class="right-area" :style="{width: rightWidth}">
        <div>
          <slot></slot>
        </div>
      </div>
    </div>
  </Card>
</template>

<script>
import CommonIcon from '@/components/common-icon'
export default {
  name: 'InfoCard',
  components: {
    CommonIcon
  },
  props: {
    left: {
      type: Number,
      default: 36
    },
    color: {
      type: String,
      default: '#2d8cf0'
    },
    icon: {
      type: String,
      default: ''
    },
    iconSize: {
      type: Number,
      default: 20
    },
    shadow: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    leftWidth () {
      return `${this.left}%`
    },
    rightWidth () {
      return `${100 - this.left}%`
    }
  }
}
</script>

<style lang="less" scoped>
.common{
  float: left;
  height: 100%;
  display: table;
  text-align: center;
}
.size{
  width: 100%;
  height: 100%;
}
.middle-center{
  display: table-cell;
  vertical-align: middle;
}
.info-card-wrapper{
  ::v-deep .ivu-card-body{
    height:100%;
  }
  .size;
  overflow: hidden;
  .ivu-card-body{
    .size;
  }
  .info-card-content{
    .size;
    position: relative;
    .left-area{
      display: inline-block;
      .common;
      & > .icon{
        .middle-center;
      }
    }
    .right-area{
      .common;
      & > div{
        .middle-center;
      }
    }
  }
}
</style>