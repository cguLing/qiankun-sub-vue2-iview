<template>
    <Modal
      v-model="open"
      :width="800"
      :title="title"
      @on-cancel="handleAction('cancel')">
        <Form ref="form" :model="form" :rules="rules">
          <FormItem>
          </FormItem>
        </Form>
        <Button slot="footer"
          v-for="item in actionButton"
          :key="item.name"
          :type="item.type"
          :icon="item.icon"
          :style="item.style"
          @click="handleAction(item.key)">{{item.name}}</Button>
    </Modal>
  </template>
  <script>
  export default {
    name: 'AddModal',
    props: {
      openModal: {
        type: Boolean,
        required: true
      },
      title: {
        type: String,
        default: '创建'
      },
      actionButton: {
        type: Array,
        default: ()=>[
          {name:'取消',type:'default',icon:'', style:'',key:'cancel'},
          {name:'确定',type:'primary',icon:'', style:'',key:'addConfirm'}]
      },
      modalForm: {
        type:Object,
        default: ()=>{}
      }
    },
    data(){
      return {
        form:{
        },
        rules:{},
        open: false
      }
    },
    watch: {
      openModal: {
        handler(val){
          this.open = val
          if(!val) {
            this.handleAction('cancel')
          }
        }
      },
      modalForm: {
        handler(val){
          this.form=val
        },
        deep: true
      }
    },
    methods: {
      handleAction(type){
        switch (type) {
          case 'addConfirm':
            this.$refs['form'].validate((valid) => {
              if (valid) {
                this.$emit('handleAction', type, this.form)
              }
            })
            break;
  
          case 'cancel':
            this.open = false
            this.$emit('update:openModal', false)
            this.form = {}
            break;
        
          default:
            this.$emit('handleAction', type)
            break;
        }
      }
    }
  }
  </script>