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
import QueryBar from '@/components/common/QueryBar'
import TableComponent from "@/components/common/Table.Form.Dialog/TableComponent.vue";
import utools from '@/domain/common/utools.js'

import tableconfig from '@/domain/tableconfig/basicdata/VehicleInfo'
import ruleForm from '@/domain/entities/basicdata/VehicleInfo'
import formConfig from '@/domain/formconfig/basicdata/VehicleInfo'
import { mapGetters } from 'vuex'

export default {

  watch: {
    'formDialog.isShowPopover' (val) {
      if (!val) this.formDialog.resetFields()
    }
  },

  components: {
    QueryBar,
    PopoverComponent: () => import('@/components/common/Table.Form.Dialog/DialogComponent.vue'),
    TableComponent
  },

  data: () => ({

    tableconfig,
    menuName: '物流仓储车辆信息表',
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
      itemName: '物流仓储车辆信息'
    },
  }),

  computed: {

    ...mapGetters(['orderStatus']),

    queryBarFormConfig () {
      return [
        { label: "编码", moduleBind: "vehicleInfoCode", isInput: true },
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
            const { data: { list, count } } = await api.queryvehicleinfoSearch({ ...this.ruleForm, ...page });
            utools.turnCodeBoolean(list),
              this.tableData = list,
              this.tableCount = count;
          } catch (e) {
            this.$message.error('获取列表数据失败，请重试！')
            console.log(e)
          }
        },

        'add': () => (
          this.formDialog.isShowPopover = true,
          this.loadCodeNo(),
          this.formDialog.ruleForm = {
            ...new ruleForm(),
            vehicleInfoCode: this.formDialog.ruleForm.vehicleInfoCode
          }
        ),

        'update': () => {
          utools.titleCallBack.call(this, this.formDialog.clickRow,
            async () => {
              try {
                const { data } = await api.searchOnevehicleinfoData(this.formDialog.clickRow.vehicleInfoCode);
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
            () => {
              utools.removeReceiptsTips.call(
                this,
                async () => {
                  const { status, data: { list, count } } = await api.deletevehicleinfoData(this.formDialog.clickRow.vehicleInfoCode);
                  this.clickTypeAsync.search()
                }
              )
            },

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
    handlerFormVerify ({ formModel: { validate, resetFields } }) {
      this.formDialog.validate = validate;
      this.formDialog.resetFields = resetFields;
    },

    // 弹窗按钮事件
    async handlerOtherSubmit ({ type = '' } = {}) {
      type ? this.submitStatus() : this.saveForm()

    },

    // 提交单据
    async submitStatus () {
      utools.sbumitReceiptsTips.call(
        this,
        async () => {
          const { vehicleInfoCode } = this.formDialog.ruleForm,
            { status } = await api.updateBillStatus({ type: 'submit', code: vehicleInfoCode });
          this.formDialog.isShowPopover = false;
        }
      )
    },

    // 单据保存
    async saveForm () {
      this.formDialog.validate(async valid => {
        if (valid) {
          utools.saveReceiptsTips.call(
            this,
            async () => {
              const {
                data
              } = await api.changeVehicleinfoData({
                data: this.formDialog.ruleForm,
                method: this.formDialog.btnKey === 'add' ? 'POST' : 'PUT'
              });
              this.formDialog.ruleForm.status = data.status;
              this.formDialog.btnKey = 'update';
              this.clickTypeAsync.search()
            }
          )
        }
      })
    },

    handleChange (param) { //列表翻页
      this.handleBtnClick('search', param)
    },

    dblclickTableRow (row) {
      this.formDialog.clickRow = utools.cloneObj(row),
        this.handleBtnClick('update');
    },
    async loadCodeNo () { //加载编号
      // 新增时获取采购订单编号
      try {
        const {
          data
        } = await api.getvehicleinfoCode();
        this.$set(this.formDialog.ruleForm, 'vehicleInfoCode', data)
      } catch (e) { console.log(e) }
    },
  },
  created () {
    api.initSelect(this.formDialog.formConfig)
    this.handleBtnClick('search');
  },
}
</script>

<style lang="less" scoped>
</style>
