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
    <Card dis-hover>
      <div id="line1" ref="line1"></div>
    </Card>
  </div>
</template>

<script>
import echarts from "echarts"
import 'echarts/lib/chart/line'
import InfoCard from './components/InfoCard'
import CountTo from './components/CountTo'
import {
  infoGet,
  mouthGet
} from '@/api/home'
export default {
  components: {
    InfoCard,
    CountTo
  },
  data() {
    return {
      inforCardData: [],
      monthData:[]
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
      mouthGet().then((res)=>{
        this.monthData = res.data.data;
        this.monthData.timeList.reverse()
        this.monthData.successList.reverse()
        this.monthData.errorList.reverse()
      }).then(()=>{
        this.drawLine()
      })
    }, 
    drawLine() {
      let myCharts = echarts.init(this.$refs.line1);
      let option = {
        title : {
          text: '过去12个月的构建数据统计',
          subtext: '构建数'
        },
        tooltip : {
          trigger: 'axis'
        },
        legend: {
          data:['成功数','失败数']
        },
        toolbox: {
          show : true,
          feature : {
            mark : {show: true},
            dataView : {show: true, readOnly: false},
            magicType : {show: true, type: ['line', 'bar']},
            restore : {show: true},
            saveAsImage : {show: true}
          }
        },
        calculable : true,
        xAxis : [
          {
            type : 'category',
            data : this.monthData.timeList
          }
        ],
        yAxis : [
          {
            type : 'value'
          }
        ],
        series : [
          {
            name:'成功数',
            type:'bar',
            data: this.monthData.successList,
            markPoint : {
              data : [
                {type : 'max', name: '最大值'},
                {type : 'min', name: '最小值'}
              ]
            },
            markLine : {
              data : [
                {type : 'average', name: '平均值'}
              ]
            }
          },
          {
            name:'失败数',
            type:'bar',
            data: this.monthData.errorList,
            markPoint : {
              // data : [
              //     {name : '年最高', value : 182.2, xAxis: 7, yAxis: 183, symbolSize:18},
              //     {name : '年最低', value : 2.3, xAxis: 11, yAxis: 3}
              // ]
              data : [
                {type : 'max', name: '最大值'},
                {type : 'min', name: '最小值'}
              ]
            },
            markLine : {
              data : [
                {type : 'average', name : '平均值'}
              ]
            }
          }
        ]
      };
      myCharts.setOption(option);
    }
  }
}
</script>

<style lang='less' scoped>
#line1 {
  width: 100%;
  height: 400px;
}
</style>
