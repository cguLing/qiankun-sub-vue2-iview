<template>
  <Row style="height:100%">
    <Col span="12" style="height:100%">
      <Row class="parent">
        <div class="ship">
          <img :src="alien_ship" alt="" width="300" >
        </div>
        <div class="conversation">
          <img :src="conversation" alt="" width="330" >
        </div>
      </Row>
    </Col>
    <Col span="12" style="height:100%">
      <div class="bullshit">
        <div class="bullshit__oops">OOPS!</div>
        <div class="bullshit__headline">{{ message }}</div>
        <div class="bullshit__info">{{ info }}</div>
        <Button type="primary" shape="circle" to="/">返回首页</Button>
      </div>
    </Col>
  </Row>
</template>

<script>

export default {
  name: 'Page404',
  computed: {
    message() {
      return '抱歉，您找的页面不存在。'
    },
    info() {
      return '若是怀疑页面丢失，可以联系运维进行处理哟~'
    }
  },
  data(){
    return {
      alien_ship: require('@/assets/images/error-page/alien-ship.gif'),
      conversation: require('@/assets/images/error-page/404.png')
    }
  }
}
</script>
<style lang="less" scoped>
  .parent {
    position:relative;
    height: 100%;
    top: 10%;
    .ship {
      position:absolute;
      top: 160px;
      // left: 50%;
      // display: inline-block;
    }
    .conversation{
      position:absolute;
      // top: 20%;
      left:200px;
      // display: inline-block;
    }
  }
  
  .bullshit {
    position: relative;
    float: left;
    width: 300px;
    padding: 30px 0;
    top: 20%;
    overflow: hidden;
    &__oops {
      font-size: 32px;
      font-weight: bold;
      line-height: 40px;
      color: #1482f0;
      opacity: 0;
      margin-bottom: 20px;
      animation-name: slideUp;
      animation-duration: 0.5s;
      animation-fill-mode: forwards;
    }
    &__headline {
      font-size: 20px;
      line-height: 24px;
      color: #222;
      font-weight: bold;
      opacity: 0;
      margin-bottom: 10px;
      animation-name: slideUp;
      animation-duration: 0.5s;
      animation-delay: 0.1s;
      animation-fill-mode: forwards;
    }
    &__info {
      font-size: 13px;
      line-height: 21px;
      color: grey;
      opacity: 0;
      margin-bottom: 30px;
      animation-name: slideUp;
      animation-duration: 0.5s;
      animation-delay: 0.2s;
      animation-fill-mode: forwards;
    }
    @keyframes slideUp {
      0% {
        transform: translateY(60px);
        opacity: 0;
      }
      100% {
        transform: translateY(0);
        opacity: 1;
      }
    }
  }
</style>