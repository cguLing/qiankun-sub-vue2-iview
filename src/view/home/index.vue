<template>
  <div>
    <!-- <Row :gutter="20">
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
    </Row> -->
  </div>
</template>

<script>
// import InfoCard from '@/components/info-card'

export default {
  components: {
    // InfoCard
  },
  data() {
    return {
      inforCardData: []
    }
  },
  mounted(){

  },
  methods: {
    // async cardInfo() {
    //   try {
    //     const res = await HomeCard();
    //     if (res.status === 200) {
    //       this.inforCardData = res.data.data;
    //     } else {
    //       this.$Message.error("获取卡片数据失败");
    //     }
    //   } catch (err) {
    //     if (err.response && err.response.status !== 401) {
    //       this.$Message.error("获取卡片数据失败");
    //     }
    //   }
    // },  
  }
}
</script>

<style lang='less' scoped>
</style>
