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
      popoverType='form'
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
import TableComponent from "@/components/common/Table.Form.Dialog/TableComponent.vue";
import utools from '@/domain/common/utools.js'

import QueryBar from '@/components/common/QueryBar'
import PopoverComponent from '@/components/common/Table.Form.Dialog/DialogComponent.vue'

import tableconfig from '@/domain/tableconfig/basicdata/TransportArea'
import ruleForm from '@/domain/entities/basicdata/TransportArea'
import formConfig from '@/domain/formconfig/basicdata/TransportArea'
import { mapGetters } from 'vuex'

export default {
  created () {
    this.handleBtnClick('search');
  },

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
    menuName: '物流仓储运输区域',
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
      itemName: ' 物流仓储运输区域'
    }
  }),

  computed: {
    ...mapGetters(['orderStatus']),

    queryBarFormConfig () {
      return [
        { label: "编码", moduleBind: "areaCode", isInput: true },
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
            const { data: { list, count } } = await api.querytransportareaSearch({ ...this.ruleForm, ...page });
            utools.turnCodeBoolean(list),
              this.tableData = list,
              this.tableCount = count;
          } catch (e) {
            this.$message.error('获取列表数据失败，请重试！')
            console.log(e)
          }
        },

        'add': _ => (
          this.formDialog.isShowPopover = true,
          this.loadCodeNo(),
          this.formDialog.ruleForm = {
            ...new ruleForm(),
            areaCode: this.formDialog.ruleForm.areaCode
          }
        ),

        'update': _ => {
          utools.titleCallBack.call(
            this,
            this.formDialog.clickRow,
            async () => {
              try {
                const { data } = await api.searchOnetransportareaData(this.formDialog.clickRow.areaCode);
                this.formDialog.ruleForm = this.formDialog.clickRow = data;
                this.formDialog.isShowPopover = true;
              } catch (e) {
                this.$message.error('获取列表数据失败，请重试！')
                console.log(e)
              }
            }
          )
        },

        'delete': _ => {
          utools.titleCallBack.call(
            this,
            this.formDialog.clickRow,
            utools.removeReceiptsTips.bind(
              this,
              async () => {
                const { status, data: { list, count } } = await api.deletetransportareaData(this.formDialog.clickRow.areaCode);
                this.clickTypeAsync.search()
              }
            )
          )
        }
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
    handlerFormVerify ({ formModel: { validate, resetFields } }) {
      this.formDialog.validate = validate;
      this.formDialog.resetFields = resetFields;
    },

    // 弹窗提交
    async handlerOtherSubmit ({ type = '' } = {}) {
      type ? this.submitStatus() : this.saveForm()
    },

    // 表单保存
    async saveForm () {
      this.formDialog.validate(async valid => {
        if (valid) {
          utools.saveReceiptsTips.call(
            this,
            async () => {
              const {
                data
              } = await api.changeTransportareaData({
                data: this.formDialog.ruleForm,
                method: this.formDialog.btnKey === 'add' ? 'POST' : 'PUT'
              });
              this.formDialog.ruleForm.status = data.status;
              this.clickTypeAsync.search();
              this.formDialog.btnKey = 'update'
            }
          )
        }
      })
    },

    // 提交单据
    async submitStatus () {
      utools.sbumitReceiptsTips.call(
        this,
        async () => {
          let { areaCode } = this.formDialog.ruleForm;
          const { status } = await api.updateBillStatus({ type: 'submit', code: areaCode });
          this.formDialog.isShowPopover = false;
        }
      )
    },


    handleChange (param) { //列表翻页
      this.handleBtnClick('search', param)
    },

    dblclickTableRow (row) {
      this.formDialog.clickRow = utools.cloneObj(row);
      this.handleBtnClick('update');
    },
    async loadCodeNo () { //加载编号
      // 新增时获取采购订单编号
      try {
        const {
          data
        } = await api.gettransportareaCode()
        this.formDialog.ruleForm.areaCode = data;
      } catch (e) {
        this.$message.error('获取单据编号失败，请重试！')
        console.log(e)
      }
    },
  },

}
</script>
