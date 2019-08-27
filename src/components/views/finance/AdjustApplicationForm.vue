<template>
  <div>
    <!-- 顶部按钮 -->
    <preserve-btn
      :form='form.data'
      @handlePreserve='handlePreserve'
      @handleRollback='handleRollback'
      :isLoading='isLoading'
    ></preserve-btn>
    <!-- 查询栏 -->
    <query-bar
      :formConfig='queryBar.formConfig'
      :ruleForm='queryBar.data'
      :btnObj='queryBar.btnList'
      @handleBtnClickType='queryBarClick'
    ></query-bar>

    <!-- 输入框 -->
    <form-component
      :formConfig="form.formConfig"
      :formModel="form.data"
      :calculate='calculate'
      @handlerFormVerify='handlerFormVerify'
      @handlerSearchClick='handlerSearchClick'
    ></form-component>

    <!-- 来源单据表格 -->
    <div>
      <div class="cut-off-rule">来源单据信息</div>
      <table-component
        :dialog='false'
        popoverType='selectTable'
        :popoverList='sourceBills.list'
        :popoverListKey='sourceBills.config'
        :count='sourceBills.count'
        :multipleTable.sync='sourceBills.multipleTable'
        @handlePageChange='sourceBillsPageChange'
      ></table-component>
      <!-- 加入按钮 -->
      <btn-component
        :btnList="[{type: 'join', label: '加入'}]"
        @handleItemBtnClick='sourceBtnClick'
      ></btn-component>
      <!-- 页签 -->
      <el-tabs type="card">
        <el-tab-pane :label="tabsLabel" />
      </el-tabs>

      <!-- old new 公司 -->

      <form-component
        :formConfig="form.oldNewCompany"
        :formModel="form.data"
        :calculate='calculate'
        @handlerFormVerify='handlerFormVerify'
        @handlerSearchClick='handlerSearchClick'
      ></form-component>

      <!-- 子表 -->
      <div>
        <div class='cut-off-rule'></div>
        <!-- 操作按钮 -->
        <btn-component
          :btnList="itembtnList"
          @handleItemBtnClick='handleItemBtnClick'
        ></btn-component>
        <table-component
          :isSubTable='true'
          :dialog='false'
          :popoverList='itemTable.list'
          :popoverListKey='itemTable.config'
          :count='itemTable.count'
          :activeRow.sync='itemTable.activeRow'
          @handlePageChange='itemTablePageChange'
        ></table-component>
      </div>

    </div>
    <!-- 表格弹窗 -->
    <table-dialog
      :itemName='tableDialog.title'
      :isShowPopover.sync='tableDialog.visibel'
      :popoverList='tableDialog.list'
      :popoverListKey='tableDialog.config'
      :count='tableDialog.count'
      :ruleForm='tableDialog.queryBar.data'
      :formConfig='tableDialog.queryBar.formConfig'
      :btnObj='tableDialog.queryBar.btnList'
      @handleBtnClickType='handleTableDialogClickQuery'
      @handlerSubPreservation='handlerTableDialogSave'
      @handlePageChange='handleTableDialogPageChange'
    ></table-dialog>
    <!-- 表单弹窗 -->
    <form-dialog
      popoverType='form'
      :itemName='formDialog.title'
      :isShowPopover.sync='formDialog.visibel'
      :formData='formDialog.form'
      @formClickPreservation='formDialoClickPreservation'
      @handlerFormConfigClickSearch='handlerFormDialogClickSearch'
    ></form-dialog>
  </div>
</template>
<script>
// 组件
import QueryBar from '@/components/common/Table.Form.Dialog/query-bar/DialogQueryBar.vue'
import FormComponent from '@/components/common/form-template/FormComponent.vue'
import TableComponent from '@/components/common/Table.Form.Dialog/TableComponent.vue'
import BtnComponent from '@/components/common/BtnComponent.vue'



import { mapMutations, mapGetters } from 'vuex'
import api from "@/assets/js/appHelper.js";
import utools from '@/domain/common/utools.js'


// 配置
import formConfig from '@/domain/formconfig/finance/AdjustApplication.js'
import DialogComponent from '@/components/common/Table.Form.Dialog/NewDialogComponent.vue'
import companyFormConfig from '@/domain/formconfig/finance/AdjustApplication/AdjustApplication-company.js'

// 弹窗配置
import employeeInfo from '@/domain/tableconfig/basicdata/EmployeeInfo'
import companyInfo from '@/domain/tableconfig/basicdata/CompanyInfo.js'
import supplier from '@/domain/tableconfig/basicdata/SupplierBase'
import client from '@/domain/tableconfig/business/Client'
import customer from '@/domain/tableconfig/basicdata/Customer.js'




// 混入
import sourceBills from '@/mixin/finance/AdjustApplicationForm/sourceBills.js'
import itemTable from '@/mixin/finance/AdjustApplicationForm/itemTable.js'
import formDialog from '@/mixin/finance/AdjustApplicationForm/formDialog.js'


export default {
  name: 'AdjustApplicationForm',

  mixins: [sourceBills, itemTable, formDialog],

  components: {
    QueryBar,
    FormComponent,
    TableComponent,
    tableDialog: DialogComponent,
    FormDialog: DialogComponent,
    BtnComponent
  },

  created () {
    this.initData()
  },

  beforeRouteLeave (to, from, next) {
    let param = {
      data: {
        status: this.status,
        formData: this.form.data,
      },
      path: this.$route.path
    }
    this.status === 'add' && (param.data.itemTable = this.itemTable)
    this.addbreadCrumbsList(param)
    next()
  },

  data: _ => ({
    isLoading: false,
    status: '',
    form: {
      searchTarget: '',
      data: {},
      oldNewCompany: companyFormConfig,
      formConfig: utools.cloneObj(formConfig)
    },

    tableDialog: {
      visibel: false,
      title: '',
      list: [],
      config: [],
      count: 0,
      queryBar: {
        data: {},
        formConfig: [{ label: "编码", moduleBind: '', isInput: true }],
        btnList: [{ type: 'search', label: '查询' }],
      }
    }
  }),

  computed: {
    ...mapGetters(['getActivePathData']),
    calculate () {
      return {}
    },
    tabsLabel () {
      return new Map([
        ['1', '应收结算单'],
        ['2', '应付结算单'],
        ['3', '收款单']
      ]).get(this.form.data.adjustmentSources);
    },
    itembtnList () {
      if ((+this.form.data.status || 0) <= 1) {
        return this.itemTable.btnList
      };
      return []
    }
  },

  methods: {
    ...mapMutations(['addbreadCrumbsList']),
    async initData () {
      const { code, status, formData, itemTable } = this.getActivePathData(this.$route.path);
      this.status = status;
      !code && !formData && this.getBillCode();
      formData && (this.form.data = formData);
      status === 'add' && itemTable && (this.itemTable = itemTable);
      code && status === 'update' && this.getFormData(code);
    },
    async getFormData (code) {
      try {
        const { data } = await api.getOneAdjustapplicationData(code);
        this.form.data = data;
        await this.getItemTableData()
        return 1
      } catch (error) {
        console.log(error)
      }
    },

    // 获取单据编号
    async getBillCode () {
      try {
        this.form.data = { ...this.form.data, billNo: (await api.getAdjustApplicationCode()).data }
      } catch (error) {
        this.$message({
          type: 'error',
          message: '获取单据编号失败！'
        })
        console.log(error)
      }
    },
    // 保存单据
    async handlePreserve () {
      let sCode = 200;
      try {
        let param = { ...this.form.data };
        this.status === 'add' && (param.adjustApplicationItemList = this.itemTable.tempList);
        const { data } = await api.changeAdjustApplicationData({ data: param, method: this.status === 'add' ? 'POST' : 'PUT' });
        this.status === 'add' && (this.getItemTableData(), this.status = 'update');
      } catch (error) {
        sCode = 0;
        console.log(error)
      } finally {
        this.$message({
          type: sCode ? 'success' : 'error',
          message: sCode ? '保存成功！' : '保存失败，请重试！'
        })
      }
    },
    // 返回列表
    handleRollback () {
      this.$router.push('/M0803')
    },

    // 表单校验
    handlerFormVerify () {
    },

    // 表单点击弹窗
    handlerSearchClick (target) {
      this.form.searchTarget = target;
      if (target === 'settlementUnitName' && !this.form.data.settlementUnitType) {
        this.$message({
          type: 'warning',
          message: '请先选择结算单位类型！'
        });
        return
      }
      Promise.all([
        this.setTabledialog(),
        this.getTableDialogData()
      ])
    },

    // 设置表格弹窗
    setTabledialog: (() => {
      let config = {
        applicanterName: { title: '申请人', config: employeeInfo, queryBarConfig: { moduleBind: 'employeeInfoCode' } },
        companyName: { title: '公司', config: companyInfo, queryBarConfig: { moduleBind: 'companyCode' } },
        settlementUnitName: new Map([
          ['1', { title: '供应商', config: supplier, queryBarConfig: { moduleBind: 'supplierCode' } }],
          ['2', { title: '退款客户', config: [], queryBarConfig: { moduleBind: '' } }],/* 暂未配置 */
          ['3', { title: '委托方', config: client, queryBarConfig: { moduleBind: 'clientNo' } }],
          ['5', { title: '客户', config: customer, queryBarConfig: { moduleBind: 'customerNo' } }]
        ]),
        clientName: { title: '委托方', config: client, queryBarConfig: { moduleBind: 'clientNo' } }
      }
      return function () {
        const target = this.form.searchTarget,
          hit = this.setTableDialogConfig(config[target]),
          [one] = this.tableDialog.queryBar.formConfig;
        this.tableDialog = {
          ...this.tableDialog,
          title: hit.title,
          config: hit.config,
          visibel: true,
          queryBar: {
            ...this.tableDialog.queryBar, data: {}, formConfig: [{ ...one, moduleBind: hit.queryBarConfig.moduleBind }]
          }
        }
      }
    })(),
    setTableDialogConfig (obj) {
      const target = this.form.searchTarget;
      let config = {
        settlementUnitName: () => obj.get(this.form.data.settlementUnitType)
      }
      return target in config ? config[target]() : obj
    },
    // 请求表格弹窗的数据
    getTableDialogData: (() => {
      let config = {
        applicanterName: api.getEmployeeInfo,
        companyName: api.querycompanyinfoSearch,
        settlementUnitName: new Map([
          ['1', api.querysupplierbaseSearch],
          ['2', () => ('暂未配置')],
          ['3', api.queryclientSearch],
          ['5', api.getCustomerList]
        ]),
        clientName: api.queryclientSearch
      };
      return async function (pageData = {}) {
        const target = this.form.searchTarget,
          WHITE_LIST = ['applicanterName', 'companyName', 'settlementUnitName'];
        try {
          const { data: { list, count } } = await this.setTableDialogPort(config[target]).call(api, {
            ...pageData,
            ...this.tableDialog.queryBar.data,
            status: WHITE_LIST.includes(target) ? '2' : ''
          });
          this.tableDialog = { ...this.tableDialog, list, count }
        } catch (error) {
          this.$message({
            type: 'error',
            message: '获取数据失败，请重试！'
          })
          console.log(error)
        }
      }
    })(),

    setTableDialogPort (obj) {
      const target = this.form.searchTarget,
        config = {
          settlementUnitName: () => obj.get(this.form.data.settlementUnitType)
        };
      return target in config ? config[target]() : obj
    },

    // 表格弹窗点击查询
    handleTableDialogClickQuery () {
      this.getTableDialogData()
    },
    // 表格弹窗点击确定 取值操作
    handlerTableDialogSave (data = {}) {
      const {
        employeeInfoCode, employeeInfoName, department,
        companyCode, companyName,
        supplierCode, supplierName,
        clientNo, clientName,
        customerNo, customerName
      } = data,
        target = this.form.searchTarget,
        config = {
          applicanterName: { applicanter: employeeInfoCode, applicanterName: employeeInfoName, applicantDept: department },
          companyName: { company: companyCode, companyName },
          settlementUnitName: new Map([
            ['1', [supplierCode, supplierName]],
            ['3', [clientNo, clientName]],
            ['5', [customerNo, customerName]]
          ]),
          clientName: { client: clientNo, clientName: clientName }
        };
      this.form.data = { ...this.form.data, ...this.getValue(config[target]) };
      this.tableDialog.visibel = false
        ;
    },
    getValue (obj) {
      const target = this.form.searchTarget;
      let config = {
        settlementUnitName: () => ({ settlementUnit: obj.get(this.form.data.settlementUnitType)[0], settlementUnitName: obj.get(this.form.data.settlementUnitType)[1] })
      }
      return target in config ? config[target]() : obj
    },
    // 表格弹窗 分页事件
    handleTableDialogPageChange (pageData = {}) {
      this.getTableDialogData(pageData)
    },


  }
}
</script>
