<template>
  <div>
    <Row type="flex" justify="end">
      <Form
        v-if="!$slots.default"
        ref="searchForm"
        :model="searchForm"
        inline
        :label-width="searchFormConf.labelWidth"
        @submit.native.prevent>
        <FormItem
          v-for="item in Object.keys(searchForm)" :key="item"
          :prop="item+'.value'"
          :label="searchForm[item].label"
          :label-width="searchForm[item].labelWidth">
          <Input
            v-if="searchForm[item].type=='input'"
            :style="searchForm[item].style"
            :search="searchForm[item].search"
            v-model="searchForm[item].value"
            :placeholder="searchForm[item].placeholder" 
            @keyup.enter.native="handleSearch(searchForm[item].searchKey||'search')"/>
        </FormItem>
        <!-- <FormItem
          prop="keyword"
          style="width:300px"
          v-if="searchForm.hasOwnProperty('keyword')">
          <Input
            search
            v-model="searchForm.keyword"
            :placeholder="searchPlace" 
            @keyup.enter.native="handleSearch"/>
        </FormItem> -->
        <FormItem v-if="JSON.stringify(searchForm) != '{}'" :label-width="0">
          <Button
            v-for="item in searchButton"
            :key="item.key"
            :type="item.type"
            :style="item.style"
            :icon="item.icon"
            :ghost="item.ghost"
            @click="handleSearch(item.key)">{{item.name}}</Button>
        </FormItem>
      </Form>
    </Row>
    <Row v-if="tableButton.length>0" :style="Object.keys(searchForm).length==0?'margin-bottom:10px':'margin:-20px 0 10px 0'">
      <Button
        v-for="item in tableButton"
        :key="item.key"
        :type="item.type"
        :style="item.style"
        :icon="item.icon"
        :ghost="item.ghost"
        :size="item.size"
        @click="handleTable(item.key)">{{item.name}}</Button>
    </Row>
    <Row>
      <Table :loading="tableLoading" :columns="tableCols" :data="tableData">
        <template slot-scope="{ row, index }" slot="action">
          <div
            v-for="item in actionButton"
            :key="item.name"
            style="display:inline-block">
            <div v-if="item.click=='delete'">
              <Poptip
                confirm
                title="确定删除选中记录吗？"
                :transfer="true"
                @on-ok="handleAction(row,item.click)">
                <Button
                  size="small"
                  :type="item.type"
                  :icon="item.icon"
                  :ghost="item.ghost"
                  :style="item.style">{{item.name}}</Button>
              </Poptip>
            </div>
            <Button
              v-else
              size="small"
              :type="item.type"
              :icon="item.icon"
              ghost
              :style="item.style"
              @click="handleAction(row,item.click)">
              {{item.name}}</Button>
          </div>
        </template>
      </Table>
    </Row>
    <Row type="flex" justify="end" style="margin-top:15px" 
      v-if="tablePages.hasOwnProperty('total')">
      <Page
        :total="tablePages.total"
        :page-size.sync="tablePages.page_size"
        :current.sync="tablePages.page"
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
    searchFormConf: {
      type: Object,
      default: () => { return {
        labelWidth:0
      }}
    },
    searchPlace: {
      type: String,
      default: '请输入关键字搜索'
    },
    searchButton: {
      type: Array,
      default: ()=>{ return [{
        key:'search',
        type:'primary',
        style:'',
        icon:'',
        ghost:true,
        name:'查询'
      }]}
    },
    tableButton: {
      type: Array,
      default: ()=>[{
        key:'add',
        type:'primary',
        style:'',
        ghost:true,
        icon:'md-add',
        name:'新增'
      }]
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
    actionButton: {
      type: Array,
      default: ()=>[
        {name:'编辑',type:'text',icon:'md-create', style:'color:#2d8cf0;',click:'edit'},
        {name:'删除',type:'text',icon:'md-trash', style:'color:#ed4014;',click:'delete'}]
    },
    tablePages: {
      type: Object,
      default: () => { return {}}
    },
    searchForm: {
      type: Object,
      default: () => { return {}}
    }
  },
  data() {
    return {
    }
  },

  watch: {
  },
  methods: {
    handleSearch(key){
      this.$emit('handleSearch', this.searchForm, key)
    },
    handleTable(key){
      this.$emit('handleTable', key)
    },
    handleAction(row, type){
      this.$emit('handleAction', row, type)
    },
    handlePage(){
      this.handleSearch('page')
    },
    handlePageSize(val){
      this.searchForm.page_size = val
      // this.handleSearch()
    }
  }
}
</script>
<style lang="less">
@keyframes rotate {
    0%{-webkit-transform:rotate(0deg);}
    25%{-webkit-transform:rotate(90deg);}
    50%{-webkit-transform:rotate(180deg);}
    75%{-webkit-transform:rotate(270deg);}
    100%{-webkit-transform:rotate(360deg);}
}
.run {
  animation: rotate 1s linear infinite;
}
</style>