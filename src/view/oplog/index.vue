<template>
  <Card>
    <common-table ref=""
      :tableCols="tableCols"
      :tableData="tableData"
      :tableLoading="tableLoading"
      :searchForm.sync="searchForm"
      @handleSearch="handleSearch" />
  </Card> 
</template>
<script>
import commonTable from '@/components/table/common-table'
import {
  opLogGet
} from '@/api/opLog'
export default {
  name:'OptionLog',
  components: {
    commonTable
  },
  data(){
    return {
      searchButton:[
        {name:'查询',type:'',icon:'', style:'',click:'ac'}],
      searchForm:{
        page: 1,
        page_size: 10,
        total: 0,
        keyword:''
      },
      tableCols: [
        {
          title: '操作模块',
          align: 'center',
          key: 'module'
        },
        {
          title: '创建人',
          align: 'center',
          key: 'create_person'
        },
        {
          title: '创建时间',
          align: 'center',
          key: 'created_at'
        },
        {
          title: '操作结果',
          align: 'center',
          key: 'res',
          render: (h, scope) => {
            return h('div',{
              style:{
                color:scope.row.res?'forestgreen':'red'
              }
            },[
              h('Icon',{
                props:{
                  type:scope.row.res?"md-checkmark-circle":"md-close-circled",
                },
                style:{
                  'margin-right':'5px'
                }
              })
            ,scope.row.res?'成功':'失败'])
          }
        },
        // {
        //   title: '操作',
        //   width: 80,
        //   align: 'center',
        //   render: (h, params) => {
        //     return h('div', [
        //       h('Button', {
        //         props: {
        //           size: "small",
        //           type: 'text',
        //           icon: 'ios-eye',
        //           ghost: true
        //         },
        //         style: {
        //           color: '#2d8cf0',
        //           'margin-left': '-10px'
        //         },
        //         on: {
        //           click: () => {
        //             this.showIpsetModal(params.row)
        //           }
        //         }
        //       }, '查看')
        //     ])
        //   }
        // }
      ],
      tableData: [],
      tableLoading: false
    }
  },
  computed: {
    // username () {
    //   return this.$store.state.user.username
    // },
  },
  created(){
    this.handleSearch(this.searchForm)
  },
  watch:{
    // username:{
    //   handler(val){
    //     this.handleSearch('ac', this.searchForm)
    //   },
    //   deep: true
    // }
  },
  methods: {
    handleSearch(form){
      this.tableLoading = true
      let query = {
        page: form.page,
        per_page: form.page_size,
        create_person: form.keyword,
      }
      opLogGet(query).then((res)=>{
        this.tableData = res.data.data
        this.searchForm.total= res.data.total
      }).then(()=>{
        this.tableLoading = false
      }).catch(()=>{
        this.tableLoading = false
      })
    },
  }
}
</script>