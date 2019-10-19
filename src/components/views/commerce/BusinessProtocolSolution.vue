<template>
  <div class="container pd-10 business-protocol-solution">

    <!-- 查询栏 -->

    <query-bar
      :formConfig="queryBarFormConfig"
      :ruleForm="queryBar.data"
      @handleBtnClickType="handleBtnClickType"
    ></query-bar>

    <!-- 表格 -->
    <table-component
      :dialog='false'
      :popoverList='table.list'
      :popoverListKey='table.config'
      :count='table.count'
      :activeRow.sync='table.activeRow'
      @handlePageChange='handleTablePageChange'
    ></table-component>

    <!-- 表单弹窗 -->
    <form-dialog
      popoverType='form'
      itemName='业务协议方案'
      :isShowPopover.sync='formDialog.visible'
      :formData='formDialog.formData'
      @formClickPreservation='formDialogClickPreservation'
    >

      <!-- 表格插槽 -->
      <template slot='bottom'>
        <div class="layout">
          <div>
            <div
              v-for="(val,key) of slotTable"
              :key='key'
            >
              <el-button
                v-for=" item of [{type: 'create',label: '新增公式'},{type: 'remove', label: '删除'},{type: 'setProject', label: '设置项目'}]"
                :key='item.type'
                @click.stop='handleSlotTableBtnClick({target: key, type: item.type})'
              >{{item.label}}</el-button>
              <slot-tableComponent
                :dialog='false'
                :activeRow.sync="slotTable[key].activeRow"
                :popoverList='val.list'
                :popoverListKey='val.config'
                :count='val.count'
                @handlePageChange='pageData => handleFormDialogPageChange(pageData, key)'
              ></slot-tableComponent>
            </div>
          </div>
        </div>
      </template>
    </form-dialog>

    <!-- 表格弹窗 -->
    <table-dialog
      :popoverType='tableDialog.popoverType'
      :itemName='tableDialog.title'
      :isShowPopover.sync='tableDialog.visible'
      :popoverList='tableDialog.list'
      :popoverListKey='tableDialog.config'
      :activeRow.sync='tableDialog.activeRow'
      :multipleTable.sync='tableDialog.multipleTable'
      :count='tableDialog.count'
      @handlePageChange='handleTableDialogPageChange'
      @handlerSubPreservation='handlerTableDialogPreservation'
    ></table-dialog>
  </div>
</template>
<script>
import QueryBar from "@/components/common/QueryBar.vue";
import TableFormComponent from '@/components/common/Table.Form.Dialog/TableComponent.vue'

import tableConfig from '@/domain/tableconfig/basicdata/BusinessProtocolSolution.js'
import formConfig from '@/domain/formconfig/basicdata/BusinessProtocolSolution.js'
import financeProject from '@/domain/tableconfig/basicdata/FinanceProject.js'
import calculatingItemFormula from '@/domain/tableconfig/basicdata/CalculatingItemFormula.js'


import api from '@/assets/js/appHelper.js'
import utools from '@/domain/common/utools.js'
const { cloneObj, isNull } = utools;

export default {
  components: {
    QueryBar,
    TableComponent: TableFormComponent,
    FormDialog: TableFormComponent,
    SlotTableComponent: TableFormComponent,
    TableDialog: TableFormComponent
  },
  data: _ => ({
    status: '',
    queryBar: {
      data: {},
    },
    table: {
      list: [],
      config: tableConfig,
      count: 0,
      activeRow: {}
    },
    formDialog: {
      visible: false,
      formData: {
        ruleForm: {},
        formConfig
      }
    },
    slotTable: {
      formula: {
        activeRow: {},
        list: [],
        config: [
          { prop: 'formulaName', label: '公式名称' },
          { prop: 'formula', label: '公式', width: '500' },
          { prop: 'formulaDes', label: '公式描述', width: '500' },
          { prop: 'statusName', label: '使用状态' },
          { prop: 'financeProjectCode', label: '计费项目编号' },
          { prop: 'financeProjectName', label: '计费项目名称' },
          { prop: 'remark', label: '备注' }
        ],
        count: 0
      },
    },
    tableDialog: {
      popoverType: 'selectTable',
      target: '',
      title: '',
      visible: false,
      activeRow: {},
      list: [],
      config: [],
      count: 0,
      multipleTable: []
    }
  }),
  computed: {
    queryBarFormConfig () {
      return [
        { label: "单据编码", moduleBind: "billNo", isInput: true },
      ]
    },
  },
  created () {
    this.getTableData()
  },
  methods: {

    // 列表分页数据获取
    async getTableData (pageData = {}) {
      try {
        this.table = { ...this.table, ...(await api.getSolutionPageData({ ...pageData, ...this.queryBar.data }))['data'] }
      } catch (error) {
        this.$message.error('获取列表数据失败，请重试！')
        console.log(error)
      }
    },

    // 列表分页事件
    handleTablePageChange (pageData) {
      this.getTableData(pageData)
    },

    // 查询栏按钮点击事件
    handleBtnClickType (type) {
      switch (type) {
        case 'search':
          this.getTableData();
          break;
        case 'add':
          this.formDialog.formData.ruleForm = {};
          const { formula } = this.slotTable;
          this.slotTable = {
            formula: { ...formula, list: [], count: 0 },
            // project: { ...project, list: [], count: 0 }
          }
          break;
        case 'update':
          if (isNull(this.table.activeRow)) return this.$message.warning('请选择一条数据操作！');
          this.getformDialogData();
          break;
        case 'delete':
          this.removeSolutionData()
      }
      // 控制弹窗的显示
      if (type != "search" && type != "delete") {
        this.status = type,
          this.formDialog.visible = true;
      }
    },


    // 获取当前单据的公式
    async getBillsFormulaData (pageData = {}) {
      try {
        this.slotTable.formula = {
          ...this.slotTable.formula,
          ...(
            await api.getSolutionFormulaData({ ...pageData, billNo: this.formDialog.formData.ruleForm.billNo })
          )['data']
        }
      } catch (error) {
        this.$message.error('获取数据失败，请重试！')
        console.log(error)
      }
    },

    // 修改状态时获取form弹窗的slot表格数据
    async getformDialogData () {
      this.formDialog.formData.ruleForm = cloneObj(this.table.activeRow),
        this.getBillsFormulaData();
    },

    // 获取slot表格的数据
    async getTableDialogData (fn, pageData) {
      try {
        this.tableDialog = { ...this.tableDialog, ...(await fn.call(api, pageData))['data'] };
        this.tableDialog.multipleTable = [];
      } catch (error) {
        this.$message.error('获取数据失败，请重试！')
        console.log(error)
      }
    },

    // 请求 计费项目的弹窗列表
    getProjectList (data = {}) {
      this.getTableDialogData(api.queryfinanceprojectSearch, data)
    },

    // 请求 计费公式的弹窗列表
    getCustomizedFormulaPageData (data = {}) {
      this.getTableDialogData(api.getCustomizedFormulaPageData, data)
    },

    // 插槽表格的点击按钮事件 / 设置弹窗
    handleSlotTableBtnClick ({ target, type } = {}) {
      let fn;
      switch (type) {
        case 'create':
          fn = this.handleSlotTableCreate; break;
        case 'remove':
          fn = this.handleSlotTableRemove; break;
        default:
          fn = this.handleSetProjectTableDialog
      }
      fn(target);
    },

    // 点击slot表格新增
    handleSlotTableCreate (target) {
      let { title, api: apiPort, tableConfig } = {
        formula: { title: '计费公式', api: this.getCustomizedFormulaPageData, tableConfig: calculatingItemFormula }
      }[target];
      this.tableDialog = { ...this.tableDialog, title, visible: true, config: tableConfig, target, popoverType: 'selectTable' },
        apiPort.call(api);
    },

    // 点击slot表格删除
    handleSlotTableRemove (target) {
      if (isNull(this.slotTable[target].activeRow)) return this.$message.warning('请选择一条数据删除！');
      if (this.status === 'add') {
        const activeRow = this.slotTable[target].activeRow;
        // 删除逻辑
        this.slotTable[target].list.splice((() =>
          this.slotTable[target].list.findIndex(item =>
            ((item.formulaCode || item.financeProjectCode) === (activeRow.formulaCode || activeRow.financeProjectCode))
          )
        )(), 1);
        this.slotTable[target].count--
      } else {
        this.removeSlotTableData(target)
      }
    },

    // 点击设置公式按钮
    handleSetProjectTableDialog (target) {
      if (isNull(this.slotTable.formula.activeRow)) return this.$message.warning('请选择一条数据进行操作！');
      this.tableDialog = {
        target: 'project',
        title: '计费项目',
        visible: true,
        list: [],
        config: financeProject,
        count: 0,
        multipleTable: []
      };
      this.getProjectList()
    },


    async handleSetProject () {
      let sCode = 200;
      try {
        const { financeProjectCode, financeProjectName } = this.tableDialog.activeRow,
          data = await api.changeSolutionformulaOneData({ ...this.slotTable.formula.activeRow, financeProjectCode, financeProjectName });
        this.getBillsFormulaData(),
          this.tableDialog.activeRow = {},
          this.slotTable.formula.activeRow = {};
      } catch (error) {
        sCode = 0
        console.log(error)
      } finally {
        this.alertMessage(sCode)
      }
    },

    // 删除一条计费项目 || 计算公式 数据
    async removeSlotTableData (target) {

      let apiPort = {
        formula: { remove: api.removeSolutionFormulaData, next: this.getBillsFormulaData },
      }[target];
      utools.deleteMessage.call(this, async () => {
        let sCode = 200;
        try {
          const data = await apiPort.remove.call(api, this.slotTable[target].activeRow.itemCode);
          apiPort.next.call(api),
            this.slotTable[target].activeRow = {};
        } catch (error) {
          sCode = 0;
          console.log(error)
        } finally {
          this.$message({
            type: sCode ? 'success' : 'error',
            message: sCode ? '删除成功！' : '删除失败，请重试'
          })
        }
      })
    },

    // 表格弹窗分页事件
    handleTableDialogPageChange (pageData = {}) {
      if (this.tableDialog.target === "project")
        return this.getProjectList(pageData);
      this.getCustomizedFormulaPageData(pageData)
    },

    // 表格弹窗点击 确定按钮
    handlerTableDialogPreservation () {
      let { multipleTable, target } = this.tableDialog, IS_FORMULA = this.tableDialog.target === "formula"
      if (this.status === 'add') {
        if (IS_FORMULA) {
          this.slotTable[target] = { ...this.slotTable[target], list: [...this.slotTable[target].list, ...cloneObj(multipleTable)], count: multipleTable.length };
          this.tableDialog.multipleTable = [];
        } else {
          const { activeRow: { formulaCode: itemCode }, list } = this.slotTable.formula,
            { financeProjectCode, financeProjectName } = this.tableDialog.activeRow;
          list.forEach((item, index) => {
            if (item.formulaCode === itemCode) {
              this.$set(this.slotTable.formula.list, index, { ...item, financeProjectCode, financeProjectName });
              return;
            }
          })
        }
      } else {
        if (IS_FORMULA) {
          this.changeSolutionFormulaData();
        } else {
          this.handleSetProject()
        }
      }
    },

    // 单据状态 修改 时 批量新增计费公式
    async changeSolutionFormulaData () {

      let sCode = 200;
      try {
        const data = await api.changeSolutionFormulaData({
          data: this.tableDialog.multipleTable.map(item => {
            item.billNo = this.formDialog.formData.ruleForm.billNo;
            return item;
          })
        });
        this.tableDialog.multipleTable = [];
        this.getBillsFormulaData();
      } catch (error) {
        sCode = 0;
        console.log(error)
      } finally {
        this.alertMessage(sCode)
      }
    },


    // 操作提示信息
    alertMessage (sCode) {
      this.$message({
        type: sCode ? 'success' : 'error',
        message: sCode ? '保存成功' : '保存失败，请重试！'
      })
    },

    // 表单弹窗点击保存事件
    async formDialogClickPreservation () {
      let sCode = 200;
      try {
        let reqData = { solutionFormulaList: this.slotTable.formula.list },
          IS_ADD = this.status === 'add';
        const { data } = await api.changeSolutionData({
          data: {
            ...this.formDialog.formData.ruleForm,
            ...(IS_ADD ? reqData : {})
          },
          method: IS_ADD ? 'POST' : 'PUT'
        });
        // 保存成功后的操作
        this.getTableData();
        this.formDialog.visible = false;
        const { formula, project } = this.slotTable;
        this.slotTable = {
          formula: { ...formula, list: [], count: 0 },
        }
      } catch (error) {
        sCode = 0;
        console.log(error)
      } finally {
        this.alertMessage(sCode)
      }
    },

    // 删除列表一条数据
    async removeSolutionData () {
      let sCode = 200;
      try {
        const data = await api.removeSolutionData(this.table.activeRow.billNo);
        this.getTableData()
      } catch (error) {
        sCode = 0;
        console.log(error)
      } finally {
        this.$message({
          type: sCode ? 'success' : 'error',
          message: sCode ? '删除成功！' : '删除失败，请重试！'
        })
      }
    },

    // 表单弹窗表格的分页
    handleFormDialogPageChange (pageData, target) {
      this.getBillsFormulaData(pageData);
    }
  }
}
</script>