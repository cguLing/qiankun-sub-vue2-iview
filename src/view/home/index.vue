<template>
  <div>
    <Row :gutter="20">
      <Col
        :xs="12" :md="8" :lg="4"
        v-for="(infor, i) in inforCardData"
        :key="`infor-${i}`"
        style="height: 120px;padding-bottom: 10px;">
        <InfoCard shadow :color="infor.color" :icon="infor.icon" :icon-size="36">
          <CountTo :end="infor.count" count-class="count-style"/>
          <p>{{ infor.title }}</p>
        </InfoCard>
      </Col>
    </Row>
  </div>
</template>

<script>
import InfoCard from './components/InfoCard'
import CountTo from './components/CountTo'
import {
  infoGet
} from '@/api/home'
export default {
  components: {
    InfoCard,
    CountTo
  },
  data() {
    return {
      inforCardData: []
    }
  },
  mounted(){
    this.init()
  },
  methods: {
    init() {
      infoGet().then((res)=>{
        this.inforCardData = res.data.data
      }).catch((e)=>{
        this.$Message.error("获取卡片数据失败")
      })
    },  
  }
}
</script>

<style lang='less' scoped>
</style>
