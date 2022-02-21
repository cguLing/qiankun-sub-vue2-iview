<template>
  <div class="list">
    <Card>
      <Row style="margin-top: 15px">
        <i-col span='7'>
          <p class="left">用户名</p>
          <Input suffix="ios-search" v-model.trim='searchForm.name' style="width: 300px" ></Input>
        </i-col>
        <i-col span='3·调4润而为起a see wa q'>
          <Button type="primary" ghost @click="tableSearch">查询</Button>
        </i-col>
      </Row>
    </Card>
    <Card style="margin-top: 15px">
      <Row>
        <!-- 创建按钮 -->
        <template>
          <Button type="warning" ghost @click="add">添加新用户</Button>
        </template>
      </Row>

      <!-- 机房table 展示table -->
      <Table :columns="tableCols" :data="tableData">
        <template slot-scope="{ row, index }" slot="action">
          <template>
            <Button size="small" type="warning" ghost style="margin-right: 5px" @click="editUserGroup(row)">用户组</Button>
          </template>
        </template>
      </Table>

      <div class="page">
        <Page
          :total="searchForm.total"
          :page-size="searchForm.page_size"
          :current.sync="searchForm.page"
          show-total show-elevator
          @on-change="getUserInfo">
        </Page>
      </div>
    </Card>

    <!-- 创建model -->
    <Modal v-model="addModel" title="创建">
      <Form>
        <div>
          <Tag v-if="addErrorMessage" color="red">{{addErrorMessage}}</Tag>
        </div>

        <label>erp <Tag color="red"><Icon type="ios-star" style="color: red" ></Icon></Tag></label>
        <FormItem>
          <Input v-model.trim="addForm.username" name="name"></Input>
        </FormItem>
      </Form>
      <Button slot="footer" type="primary" @click="addSubmit">保存</Button>
    </Modal>
  </div>
</template>

<script>

  // import { urpUser,urpUserGroups, urpGroup, devDeptPermList, userGroups } from '@/bgt_apis'
  // import { api } from '@/libs/api_base'

  export default {
    data() {
      return {

        // 表格数据加载
        tableLoading: false,

        // 查询、分页
        searchForm:{
          page: 1,
          page_size: 10,
          total: 0,
          name: '',
        },

        //
        tableCols: [
          {
            title: '用户名',
            key: 'username'
          },
          {
            title: '所属部门',
            key: 'org_full_name'
          },
          {
            title: '操作',
            slot: 'action',
            width: 150,
            align: 'center'
          }
        ],
        tableData: [],

        // 添加
        addModel: false,
        addForm: {},
        addErrorMessage: '',

        // 功能权限修改
        editForm: {},
        allGroupList: [],
        transEditTarget: [],
        funcTransTitle: ['未绑定', '已绑定'],

        // 数据权限trans
        allDevDeptList: [],
        transDevDeptEditTarget: []

      }
    },
    methods: {
      // 获取权限(填充到transfer框中)
      async getAllGroup(){
        let res = await api.get(urpGroup)
        for (let i = 0; i < res.data.length; i++) {
          this.allGroupList.push({
            key: res.data[i].id,
            label: res.data[i].cn_name,
            disabled: false
          });
        }
      },

      // 获取所有研发部门
      async getDevDept(){
        let res = await api.get(devDeptPermList)
        for (let i = 0; i < res.data.length; i++) {
          this.allDevDeptList.push({
            key: res.data[i].id,
            label: res.data[i].level + "-" +res.data[i].full_name,
            disabled: false
          });
        }
      },
      // 表格数据获取
      async getUserInfo(){
        this.tableLoading=true
        let res = await api.get(urpUser, this.searchForm)
        this.tableData = res.data
        this.tableLoading=false
        this.searchForm.page= res.page
        this.searchForm.page_size= res.page_size
        this.searchForm.total= res.total
        this.tableLoading=false
      },

      // idc 查询按钮点击
      tableSearch(){
        this.searchForm.page = 1
        this.getUserInfo()
      },

      //添加
      add(){
        this.addForm={}
        this.addModel=true
      },

      // 添加提交
      async addSubmit () {
        if(!this.addForm.username){
          this.$Message.error("用户名称不能为空")
          return false
        }
        let res = await api.post(urpUser, this.addForm)
        if(res.code === 1){
          this.$Message.success(res.msg)
          this.getUserInfo()
          this.addModel=false
        }else{
          this.addErrorMessage = res.msg
        }
      },

      // 绑定用户组
      async editUserGroup(row){
        let res = await api.get(userGroups, {"user_id": row.id})
        this.$Modal.info({
          title: '用户所在组',
          content: res.data
        })
      },
    },
    mounted() {
      // this.getAllGroup()
      // this.getDevDept()
      // this.getUserInfo()
    }
  }
</script>

<style lang='less'>
  .ivu-transfer-list {
    width: 530px;
  }
  .list {
    .left {
      display: inline-block;
      width: 54px;
      text-align: right;
      margin-right: 7px;
      font-size: 12px;
    }
    .page {
      margin-top: 8px;
      width: 100%;
      text-align: right;
    }
    .ivu-card-head p, .ivu-card-head-inner {
      font-size:14px;
      font-family:PingFangSC-Medium,PingFang SC;
      font-weight:500;
      color:rgba(0,0,0,1);
    }
    .recode {
      font-size:12px;
      font-family:PingFangSC-Regular,PingFang SC;
      font-weight:400;
      color:rgba(16,110,204,1);
      margin-right: 15px;
    }
    .ivu-table {
      font-size: 12px;
    }
    .ivu-card {
      font-size: 12px;
    }
  }
</style>
