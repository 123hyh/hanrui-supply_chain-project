<template>
  <!-- 第二计量单位 -->
  <div class="container pd-10">
    <query-bar
      :formConfig="queryBarFormConfig"
      :ruleForm="queryBar.data"
      @handleBtnClickType="handleBtnClickType"
    ></query-bar>
    <!-- 表格 -->
    <table-component
      :dialog="false"
      :queryBarVisible='false'
      :popoverList="table.list"
      :popoverListKey='table.config'
      :count="table.count"
      :activeRow.sync="table.activeRow"
      @handlePageChange="handlePageChange"
    ></table-component>

    <!-- form弹窗 -->
    <form-dialog
      popoverType='form'
      :isShowPopover.sync='formDialog.visible'
      :saveLoading='formDialog.saveLoading'
      :billsStatus='formDialog.formData.ruleForm.status'
      :formData='formDialog.formData'
      itemName='第二计量单位'
      @handlerFormConfigClickSearch='handlerFormDialogClickSearch'
      @formClickPreservation='handleSaveFormDialog'
      @handlerFormVerify="handlerFormVerify"
    ></form-dialog>

    <!-- table 弹窗 -->
    <table-dialog
      :isShowPopover.sync='tableDialog.visible'
      :itemName='tableDialog.title'
      :formConfig='tableDialog.queryBarFormConfig.formConfig'
      :ruleForm='tableDialog.queryBarFormConfig.data'
      :btnObj='tableDialog.queryBarFormConfig.btnObj'
      :popoverList='tableDialog.list'
      :popoverListKey='tableDialog.config'
      :count='tableDialog.count'
      @handlePageChange='getTableDialogPageData'
      @handlerSubPreservation='handlerTableDialogPreservation'
    ></table-dialog>
  </div>
</template>
<script>
// 接口 工具
import api from "@/assets/js/appHelper";
import utools from "@/domain/common/utools.js";
const { isNull, cloneObj, removeReceiptsTips, saveReceiptsTips, sbumitReceiptsTips } = utools;

// 组件
import QueryBar from "@/components/common/QueryBar.vue";
import TableComponent from "@/components/common/Table.Form.Dialog/TableComponent.vue";
import FormDialog from '@/components/common/Table.Form.Dialog/DialogComponent.vue'

// 注册表
import tableConfig from "@/domain/tableconfig/basicdata/SecondUnitOfMeasure.js";
import formConfig from '@/domain/formconfig/basicdata/SecondUnitOfMeasure.js'

// 表格弹窗
import measurement from '@/domain/tableconfig/basicdata/Measurement.js'

import { mapGetters, mapMutations } from 'vuex'
export default {
  name: 'SecondUnitOfMeasure',
  watch: {
    'formDialog.visible' (val) {
      if (!val) this.formDialog.resetFields()
    }
  },
  components: {
    QueryBar,
    TableComponent,
    FormDialog,
    TableDialog: TableComponent
  },

  data: _ => ({
    status: '',
    queryBar: {
      data: {}
    },
    table: {
      list: [],
      config: tableConfig,
      count: 0,
      activeRow: {}
    },
    formDialog: {
      searchTarget: '',
      visible: false,
      saveLoading: false,

      formData: {
        ruleForm: {},
        formConfig
      },
      validate: eval,
      resetFields: eval
    },
    tableDialog: {
      title: '',
      visible: false,
      queryBarFormConfig: {
        data: {},
        btnObj: [],
        formConfig: []
      },
      list: [],
      config: [],
      count: 0,
    }
  }),

  computed: {
    ...mapGetters(['orderStatus']),

    queryBarFormConfig () {
      return [
        { label: "名称", moduleBind: "tradeName", isInput: true },
        { label: '单据状态', moduleBind: 'status', isSelect: true, selectOption: this.orderStatus },
        { label: "物料分类", moduleBind: "materielType", isInput: true },
        { label: "物料状态", moduleBind: "materielStatus", isInput: true },
        { label: "规格型号", moduleBind: "specificationType", isInput: true },
      ]
    },
  },

  created () {
    this.getTablePageData()
  },

  methods: {
    ...mapMutations(['addbreadCrumbsList']),

    handlerFormVerify ({ formModel: { validate, resetFields } }) {
      this.formDialog.validate = validate,
        this.formDialog.resetFields = resetFields
    },
    
    // 获取单据编号
    async getSecondMeasurementCode () {
      this.formDialog.formData.ruleForm = {}
      try {
        const { data } = await api.getSecondMeasurementCode();
        this.$set(this.formDialog.formData.ruleForm, 'billNo', data)
      } catch (error) {
        this.$message.error('获取单据编号失败，请重试！')
        console.log(error)
      }
    },

    // 获取列表分页数据
    async getTablePageData (data = {}) {
      try {
        const {
          data: {
            list,
            count
          }
        } = await api.getSecondMeasurementPageData({ ...this.queryBar.data, ...data });
        this.table = { ...this.table, list, count }
      } catch (error) {
        this.$message.error('获取列表数据失败，请重试！')
        console.log(error);
      }
    },

    // 列表分页时间
    handlePageChange (pageData) {
      this.getTablePageData(pageData)
    },

    // 查询栏按钮点击事件
    handleBtnClickType (target) {
      if (['update', 'delete'].includes(target) && isNull(this.table.activeRow))
        return this.$message.warning('请选择一条数据进行操作！');

      switch (target) {
        case 'add':
        case 'update':
          this.status = target;
          if (
            target === 'update' && isNull(this.table.activeRow)
          ) return this.$message.warning('请选择一条数据进行操作！');

          target === 'add' ?
            this.getSecondMeasurementCode() :
            (
              this.formDialog.formData.ruleForm = cloneObj(this.table.activeRow),
              this.table.activeRow = {}
            );
          this.formDialog.visible = true;
          break;
        case 'delete':
          this.removeBills(); break;
        case 'search':
          this.getTablePageData();
      }
    },

    // 删除单据
    async removeBills () {
      removeReceiptsTips.call(
        this,
        async _ => {
          await api.deleteSecondmeasurement(this.table.activeRow.billNo);
          this.getTablePageData();
        }
      )
    },
    handlerFormDialogClickSearch (target) {
      this.formDialog.searchTarget = target,
        this.tableDialog.queryBarFormConfig.data = {},
        this.setTableDialog(target),
        this.getTableDialogPageData();
    },

    // 设置表格弹窗
    setTableDialog (target) {
      this.tableDialog = {
        ...this.tableDialog,
        ...{
          measurementUnit: {
            title: '计量单位',
            config: measurement,
            queryBarFormConfig: {}
          }
        }[target],
        visible: true
      }
    },

    // 获取表格弹窗数据
    getTableDialogPageData: (() => {
      let apiPort = { measurementUnit: api.querymeasurementSearch };
      return async function (pageData = {}) {
        try {
          const {
            data: {
              list,
              count
            }
          } = await apiPort[this.formDialog.searchTarget].call(
            api,
            {
              ...pageData,
              ...this.tableDialog.queryBarFormConfig.data
            }
          );
          this.tableDialog.list = list, this.tableDialog.count = count;
        } catch (error) {
          console.log(error);
          this.$message.error('获取列表数据失败，请重试！')
        }
      }
    })(),

    // 表格弹窗点击 确定事件
    handlerTableDialogPreservation (data = {}) {
      const { measurementCode, measurementUnit, measurementGroupName } = data;
      let obj = {
        measurementUnit: {
          measurementCode,
          measurementUnit,
          measurementGroup: measurementGroupName
        }
      }[this.formDialog.searchTarget];
      this.formDialog.formData.ruleForm = { ...this.formDialog.formData.ruleForm, ...obj }
    },

    // 保存 | 修改 主单据
    async handleSaveFormDialog () {
      this.formDialog.validate(valid => {
        if (valid) {
          saveReceiptsTips.call(
            this,
            async _ => {
              const { data } = await api.changeSecondeasurement({
                data: this.formDialog.formData.ruleForm,
                method: this.status === 'add' ? 'POST' : 'PUT'
              });
              this.formDialog.visible = false,
                this.table.activeRow = {},
                this.getTablePageData()
            }
          )
        }
      })

    }
  }
}
</script>