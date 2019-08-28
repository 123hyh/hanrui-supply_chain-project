<template>
  <div>
    <breadcrumb-navigation />
    <div class="container pd-10">

      <!-- 查询栏 -->
      <query-bar
        :ruleForm="ruleForm"
        :formConfig="queryBarFormConfig"
        @handleBtnClickType="handleBtnClick"
      ></query-bar>

      <!-- 表格 -->
      <table-component
        :dialog="false"
        :queryBarVisible='false'
        :popoverList="tableData"
        :popoverListKey='tableconfig'
        :count="tableCount"
        @dblclickTableRow='dblclickTableRow'
        :activeRow.sync="formDialog.clickRow"
        @handlePageChange="handleChange"
      ></table-component>
    </div>
    
    <popover-component
      :isShowPopover.sync='formDialog.isShowPopover'
      popoverType="form"
      :billsStatus='formDialog.ruleForm.status'
      :formData='formDialog'
      :itemName='formDialog.itemName'
      @formClickPreservation="handlerOtherSubmit"
      @handlerFormVerify="handlerFormVerify"
    ></popover-component>
  </div>
</template>

<script>
import api from '@/assets/js/appHelper'
import utools from '@/domain/common/utools.js'

import QueryBar from '@/components/common/QueryBar'
import TableComponent from "@/components/common/Table.Form.Dialog/TableComponent.vue";
import PopoverComponent from '@/components/common/Table.Form.Dialog/DialogComponent.vue'

import tableconfig from '@/domain/tableconfig/basicdata/DeliveryArea'
import ruleForm from '@/domain/entities/basicdata/DeliveryArea'
import formConfig from '@/domain/formconfig/basicdata/DeliveryArea'
import { mapGetters } from 'vuex'

export default {

  watch: {
    'formDialog.isShowPopover' (val) {
      if (!val) this.formDialog.resetFields()
    }
  },

  components: {
    QueryBar,
    TableComponent,
    PopoverComponent,
  },

  data: () => ({
    tableconfig,
    tableData: [],
    tableCount: 0,
    ruleForm: {},

    formDialog: {
      isShowPopover: false,
      paper: {},
      ruleForm: new ruleForm(),
      formConfig,
      btnKey: '',
      clickRow: {},
      validate: eval, //表单验证回调
      resetFields: eval,
      itemName: '交货区域'
    },
  }),

  computed: {

    ...mapGetters(['orderStatus']),

    queryBarFormConfig () {
      return [
        { label: "编码", moduleBind: "deliveryAreaCode", isInput: true },
        { label: '单据状态', moduleBind: 'status', isSelect: true, selectOption: this.orderStatus },
        { label: "制单人", moduleBind: "creator", isInput: true },
        { label: "制单时间", moduleBind: "createTimeFrom", isDate: true },
        { label: "至", moduleBind: "createTimeTo", isDate: true },
      ]
    },

    clickTypeAsync () {
      return {
        'search': async (page = {}) => {
          try {
            const { data: { list, count } } = await api.querydeliveryareaSearch({ ...this.ruleForm, ...page });
            this.tableData = list, this.tableCount = count;
          } catch (e) {
            this.$message.error('获取列表数据失败，请重试！')
            console.log(e)
          }
        },

        'add': () => (
          this.formDialog.isShowPopover = true,
          this.loadCodeNo(),
          this.formDialog.ruleForm = { ...new ruleForm(), deliveryAreaCode: this.formDialog.ruleForm.deliveryAreaCode }
        ),

        'update': () => {
          utools.titleCallBack.call(
            this,
            this.formDialog.clickRow,
            async () => {
              try {
                const { data } = await api.searchOnedeliveryareaData(this.formDialog.clickRow.deliveryAreaCode);
                this.formDialog.ruleForm = this.formDialog.clickRow = data;
                this.formDialog.isShowPopover = true;
              } catch (e) {
                this.$message.error('获取数据失败，请重试！')
                console.log(e)
              }
            }
          )
        },

        'delete': () => {
          utools.titleCallBack.call(
            this,
            this.formDialog.clickRow,
            utools.removeReceiptsTips.bind(
              this,
              async () => {
                await api.deletedeliveryareaData(this.formDialog.clickRow.deliveryAreaCode);
                this.clickTypeAsync.search()
              }
            )
          )
        },
      }
    }
  },

  methods: {

    /**
     * @method handleBtnClick 点击查询栏按钮事件
     */
    handleBtnClick (clickType, page) {
      this.formDialog.btnKey = clickType;
      this.clickTypeAsync[clickType](page);
    },

    /**
     * @method handlerFormVerify 设置验证规则
     */
    handlerFormVerify ({ formModel: { validate, resetFields } } = {}) {
      this.formDialog.validate = validate;
      this.formDialog.resetFields = resetFields
    },

    // 弹窗按钮点击
    async handlerOtherSubmit () {
      this.saveForm()
    },

    // 保存单据
    async saveForm () {
      this.formDialog.validate(valid => {
        if (valid) {
          utools.saveReceiptsTips.call(
            this,
            async () => {
              const {
                data,
                status
              } = await api.changEdeliveryareaData({ data: this.formDialog.ruleForm, method: this.formDialog.btnKey === 'add' ? 'POST' : 'PUT' });
              this.formDialog.ruleForm.status = data.status;
              this.clickTypeAsync.search();
              this.formDialog.btnKey = 'update'
            }
          )
        }
      })
    },

    //列表翻页
    handleChange (param) {
      this.handleBtnClick('search', param)
    },

    // 双击事件
    dblclickTableRow (row) {
      this.formDialog.clickRow = row;
      this.handleBtnClick('update');
    },

    //加载编号
    async loadCodeNo () {
      // 新增时获取采购订单编号
      try {
        const {
          data
        } = await api.getdeliveryareaCode()
        this.$set(this.formDialog.ruleForm, 'deliveryAreaCode', data)
      } catch (e) {
        this.$message.error('获取单据编号失败，请重试！')
        console.log(e)
      }
    },
  },

  created () {
    this.handleBtnClick('search');
  }
}
</script>
