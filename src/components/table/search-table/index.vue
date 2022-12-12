<template>
  <div>
    <Row type="flex" justify="start">
      <Form ref="searchForm" :model="searchForm" inline>
        <FormItem prop="dateRange" v-if="searchForm.dateRange">
          <DatePicker v-model="searchForm.dateRange"
            format="yyyy年MM月dd日"
            type="daterange" placement="bottom-end"
            confirm
            :transfer="true"
            placeholder="开始日期 - 结束日期" style="width: 250px"
            @on-ok="handleSearch(searchForm.hasOwnProperty('keyword')?'am':'ac')"></DatePicker>
        </FormItem>
        <FormItem prop="keyword" style="width:300px" v-if="searchForm.hasOwnProperty('keyword')">
          <Input search v-model="searchForm.keyword" :placeholder="searchPlace" />
        </FormItem>
        <FormItem
          v-for="item in searchButton"
          :key="item.name">
            <Button
              :type="item.type"
              :icon="item.icon"
              ghost
              :style="item.style"
              @click="handleSearch(item.click)">
              {{item.name}}
            </Button>
        </FormItem>
      </Form>
    </Row>
    <Row>
      <Table :loading="tableLoading" :columns="tableCols" :data="tableData" />
    </Row>
    <Row type="flex" justify="end" style="margin-top:15px" v-if="searchForm.total">
      <Page
        :total="searchForm.total"
        :page-size="searchForm.page_size"
        :current.sync="searchForm.page"
        show-total show-elevator show-sizer
        @on-change="handlePage"
        @on-page-size-change="handlePageSize">
      </Page>
    </Row>
  </div>
</template>
<script>
export default {
  name: 'CommonTable',
  props: {
    searchPlace: {
      type: String,
      default: '请输入关键字搜索'
    },
    searchButton: {
      type: Array,
      default: ()=>[
        {name:'查询',type:'primary',icon:'', style:'',click:'am'},
        {name:'准确查询',type:'warning',icon:'', style:'',click:'ac'}]
    },
    tableCols: {
      required: true,
      type: Array
    },
    tableData: {
      type: Array,
      default: ()=>[]
    },
    tableLoading: {
      type: Boolean,
      default: false
    },
    searchForm: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
    }
  },
  watch: {
  },
  methods: {
    handleSearch(type){
      this.$emit('handleSearch', type, this.searchForm)
    },
    handlePage(){
      this.handleSearch('am')
    },
    handlePageSize(val){
      this.searchForm.page_size = val
      // this.handleSearch()
    }
  }
}
</script>