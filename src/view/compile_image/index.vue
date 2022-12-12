<template>
  <Card>
    <common-table ref=""
      :tableCols="tableCols"
      :tableData="tableData"
      :tableButton="tableButton"
      :tableLoading="tableLoading"
      :searchForm.sync="searchForm"
      @handleSearch="handleSearch"
      @handleTable="handleTable" />
    <add-modal
      :openModal.sync="addModalOpen"
      :modalForm="addModalForm"
      :title="'创建编译镜像'"
      @handleAction="handleAddModalAction" />
  </Card> 
</template>
<script>
import commonTable from '@/components/table/common-table'
import {
  compileImageGet
} from '@/api/compileImage'
import AddModal from './components/addModal.vue'
export default {
  name:'CompileImage',
  components: {
    commonTable,
    AddModal
  },
  data(){
    return {
      searchButton:[
        {name:'查询',type:'',icon:'', style:'',key:'ac'}],
      searchForm:{
        page: 1,
        page_size: 10,
        total: 0,
        keyword:''
      },
      tableButton:[{
        key:'add',
        type:'info',
        style:'margin-right:5px;',
        ghost:true,
        icon:'',
        name:'添加编译镜像'
      },{
        key:'history',
        type:'warning',
        style:'',
        ghost:true,
        icon:'',
        name:'查看同步历史'
      }],
      tableCols: [
        {
          title: '编译镜像名称',
          align: 'center',
          key: 'name'
        },
        {
          title: '语言',
          width: 80,
          align: 'center',
          key: 'language'
        },
        {
          title: '创建人',
          align: 'center',
          key: 'create_person'
        },
        {
          title: '创建时间',
          width: 160,
          align: 'center',
          key: 'created_at'
        },
        {
          title: '最后同步时间',
          width: 160,
          align: 'center',
          key: 'last_sync_time'
        },
        {
          title: '操作',
          width: 140,
          align: 'center',
          render: (h, params) => {
            return h('div', [
              h('Button', {
                props: {
                  size: "small",
                  type: 'text',
                  icon: 'ios-eye',
                  ghost: true
                },
                style: {
                  color: '#2d8cf0',
                  'margin-left': '-10px'
                },
                on: {
                  click: () => {
                    this.handleAction(params.row,'dockerfile')
                  }
                }
              }, 'Dockerfile')
            ])
          }
        }
      ],
      tableData: [],
      tableLoading: false,
      addModalOpen:false,
      addModalForm:{}
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
    handleTable(key){
      switch (key) {
        case 'add':
          this.addModalOpen=true
          break;
        case 'history':
          
          break;
      
        default:
          break;
      }
    },
    handleSearch(form){
      this.tableLoading = true
      let query = {
        page: form.page,
        per_page: form.page_size,
        name: form.keyword,
      }
      compileImageGet(query).then((res)=>{
        this.tableData = res.data.data
        this.searchForm.total= res.data.total
      }).then(()=>{
        this.tableLoading = false
      }).catch(()=>{
        this.tableLoading = false
      })
    },
    handleAction(row,key){
      switch (key) {
        case 'dockerfile':
          
          break;
      
        default:
          break;
      }
    },
    handleAddModalAction(key,form){
      switch (key) {
        case 'addConfirm':
          
          break;
      
        default:
          break;
      }
    }
  }
}
</script>