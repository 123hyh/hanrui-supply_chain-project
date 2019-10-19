<template>
  <div class="receipt-form">

    <!-- 顶部操作按钮 -->
    <preserve-btn
      :form='form.data'
      @handlePreserve='handlePreserve'
      @handleRollback='handleRollback'
      :isLoading='topBtn.isLoading'
    ></preserve-btn>

    <!-- 输入框 -->
    <form-component
      :formConfig="form.formConfig"
      :formModel="form.data"
      :calculate='calculate'
      @handlerFormVerify='item => form.method = item'
      @handlerSearchClick='handlerSearchClick'
    ></form-component>

    <!-- 子表 -->
    <el-tabs type="card">
      <el-tab-pane label="收款信息">
        <div>
          <!-- <btn-component @handleItemBtnClick='handleItemBtnClick'></btn-component> itemTable.list-->
          <table-component
            :dialog='false'
            :activeRow.sync='itemTable.activeRow'
            :popoverList='tableList'
            :popoverListKey='itemTable.config'
            :count='itemTable.count'
            @handlePageChange='handleItemPageChange'
          ></table-component>
        </div>
      </el-tab-pane>
    </el-tabs>

    <!-- 表格弹窗 -->
    <table-dialog
      :itemName='tableDialog.title'
      :popoverType='dialog.type'
      :isShowPopover.sync='dialog.visibel'
      :popoverList='tableDialog.list'
      :popoverListKey='tableDialog.config'
      :count='tableDialog.count'
      :ruleForm='tableDialog.queryBar.data'
      :formConfig='tableDialog.queryBar.formConfig'
      :btnObj='tableDialog.queryBar.btnList'
      :formData='formDialog'
      @handlerSubPreservation='handlerDialogSave'
      @formClickPreservation='handleFormDialogSave'
      @handlePageChange='handleTableDialogPageChange'
    ></table-dialog>
  </div>
</template>
  
<script>
import { mapMutations, mapGetters } from 'vuex'
import api from "@/assets/js/appHelper.js";

// 组件
import FormComponent from '@/components/common/form-template/FormComponent.vue'
import DialogComponent from '@/components/common/Table.Form.Dialog/NewDialogComponent.vue'
import BtnComponent from '@/components/common/BtnComponent.vue'
import TableComponent from '@/components/common/Table.Form.Dialog/TableComponent.vue'

// 配置
import formConfig from '@/domain/formconfig/finance/Receipt.js'
import itemTable from '@/domain/tableconfig/finance/Receiptinformation.js'
import itemForm from '@/domain/formconfig/finance/Receiptinformation.js'

import companyInfo from '@/domain/tableconfig/basicdata/CompanyInfo.js'
import financeProject from '@/domain/tableconfig/basicdata/FinanceProject'
import department from '@/domain/tableconfig/system/Department.js'
import customer from '@/domain/tableconfig/basicdata/Customer.js'
import employeeInfo from '@/domain/tableconfig/basicdata/EmployeeInfo.js'
import client from '@/domain/tableconfig/business/Client'
import supplier from '@/domain/tableconfig/basicdata/SupplierBase'

import clientBank from '@/domain/tableconfig/business/ClientBank.js'
import customerBank from '@/domain/tableconfig/basicdata/CustomerBank.js'
import supplierBank from '@/domain/tableconfig/basicdata/SupplierBank.js'
import companyBank from '@/domain/tableconfig/basicdata/CompanyInfoBank.js'

// 计算模块
import calculation from '@/domain/common/calculation.js'

/**
 * @module utools 工具函数
 * @method isNull 判断是否为空对象或空数组
 * @method alertNullData 提示选中一条数据
 */
import utools from '@/domain/common/utools.js';
const { isNull, alertNullData } = utools;



export default {
  name: 'ReceiptForm',
  components: {
    FormComponent,
    TableDialog: DialogComponent,
    BtnComponent,
    TableComponent
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
    this.status === 'add' && (param.data = {
      ...param.data,
    });
    this.addbreadCrumbsList(param)
    next()
  },
  watch: {
    'form.data.actualReceiptCompany' (cur, pre) { // 实际收款公司 变化时 清空 收款账户 收款银行
      if (pre === undefined) return;
      this.form.data = { ...this.form.data, receiverAccountName: '', receiverAccount: '', receiveBank: '' }
    },
    'form.data.payerType' (cur, pre) { //付款人类型 变化 清空 付款账户
      if (pre === undefined) return;
      this.form.data = { ...this.form.data, payerName: '', payer: '', paymentAccountName: '', paymentAccount: '', paymentBank: '', bankNo: '' }
    },
    'form.data.moneyType' (cur, pre) { //币别
      if (cur === undefined) return;
      this.getexchangeratetodata()
    },
    'form.data.originalMoneyType' (cur, pre) { //原币币别
      if (cur === undefined) return;
      this.getexchangeratetodatay()
    },
    'form.data.baseCurrency' (cur, pre) { //折本位币
      if (cur === undefined) return;
      if (this.form.data.originalSettlementExchangeRate) {
        this.form.data.originalMoneyAmount = eval(this.form.data.baseCurrency / this.form.data.originalSettlementExchangeRate || 0).toFixed(4)   //原币金额
      } else {
        this.form.data.originalMoneyAmount = 0
      }
    },

  },
  computed: {
    ...mapGetters(['getActivePathData']),
    // 表单需要计算的值
    calculate () {
      const { receiptsAmount, exchangeRate, originalSettlementExchangeRate } = this.form.data;
      return {
        // 折本位币的计算
        baseCurrency: calculation.baseCurrency(receiptsAmount, exchangeRate),
        originalMoneyAmount: calculation.originalMoneyAmount(receiptsAmount, originalSettlementExchangeRate)
      }
    },
    tableList () {
      try {
        const data = (this.form.formConfig.list || []).filter(item => {
          return item.key === 'feeType' || item.key === 'otherPaymentSubject'
        })

        function filter (itemKey, key) {
          for (let item of data) {
            if (item.key === key) {
              for (let elem of item.selectOption) {
                if (elem.itemKey === itemKey) return elem.itemValue
              }
            }
          }
        }

        return [{
          billNo: this.form.data.billNo,
          receiptsAmount: this.form.data.receiptsAmount,
          otherSubject: filter(this.form.data.otherPaymentSubject, 'otherPaymentSubject'),
          costCenter: this.form.data.costCenterName,
          feeType: filter(this.form.data.feeType, 'feeType'),
          flowedInPlannedItem: this.form.data.flowedInPlannedItemName,
        }]
      } catch (error) {
        console.log(error)
        return [{}]
      }
    }
  },
  data: _ => ({
    status: 'add',
    topBtn: {
      isLoading: false
    },
    form: {
      method: {},
      searchTarget: '',
      data: {},
      formConfig: utools.cloneObj(formConfig)
    },
    dialog: {
      type: 'table',
      visibel: false,
      btnTarget: ''
    },
    formDialog: {
      ruleForm: {},
      formConfig: itemForm
    },
    tableDialog: {
      list: [],
      config: [],
      queryBar: {
        data: {},
        formConfig: [{ label: "", moduleBind: "", isInput: true },],
        btnList: [{ type: "search", label: "查询" }]
      },
      count: 0,
      title: ''
    },
    itemTable: {
      activeRow: {},
      list: [],
      config: itemTable,
      count: 0
    }
  }),
  methods: {
    ...mapMutations([
      'addbreadCrumbsList'
    ]),
    // 初始化 该页面的数据
    initData () {
      const { code, formData, status } = this.getActivePathData(this.$route.path);
      status && (this.status = status);
      formData && (this.form.data = { ...this.form.data, ...formData });
      (!code && !formData) && this.getCode();
      code && this.getFormData(code); /* 从列表页点击修改 到这个页面 有 code ; 点击新增则没有 */
      // status === 'update' && formData && this.getReceiptinformationPageData();
    },
    // 获取单据编号
    async getCode () {
      try {
        const { data } = await api.getReceiptCode();
        this.form.data = { ...this.form.data, billNo: data }
      } catch (error) {
        console.log(error)
      }
    },
    // 获取主表单数据
    async getFormData (code) {
      try {
        const { data } = await api.getOneReceiptData(code);
        !data.attachment && (data.attachment = false);
        !data.billReceive && (data.billReceive = false);
        for (let key in data) {
          if (data.hasOwnProperty(key)) {
            this.$set(this.form.data, key, data[key])
          }
        }
        // this.getReceiptinformationPageData();
      } catch (error) {
        console.log(error)
      }
    },


    // 表单点击 search按钮事件
    handlerSearchClick (target) {
      this.form.searchTarget = target;
      const fn = msg => (
        this.$message({
          type: 'warning',
          message: `请先选择${msg}`
        })
      );

      // 付款账户 以来 付款类型
      if (target === 'payerName' && !this.form.data.payerType) {
       return fn('付款类型');
        ;
      };

      // 付款银行 依赖 付款账户
      if (target === 'paymentBank' && !this.form.data.paymentAccount) {
        return fn('付款账户');
        
      }; 
      if(target === 'paymentAccountName' && !this.form.data.payerName){
        return fn('付款人名称')
      }
      if (target === 'receiverAccountName' && !this.form.data.actualReceiptCompany) {
        return fn('收款公司');
      }

      this.setTableDialogConfig(target);
      this.getTableDialogData()
    },

    // 设置表格弹窗的配置
    setTableDialogConfig: (() => {
      let company = { title: '公司', config: companyInfo, queryBarConfig: [] },
        project = { title: '项目', config: financeProject, queryBarConfig: [] },
        departmen = { title: '部门', config: department, queryBarConfig: [] },
        Employee = { title: '', config: employeeInfo, queryBarConfig: [] },
        blank = { title: '银行信息' }
        ;
      let config = {
        companyName: company,
        actualReceiptCompanyName: company,
        flowedInPlannedItemName: project,
        departmentName: departmen,
        flowedOutPlannedItemName: project,
        costCenterName: departmen,
        projectName: project,
        paymentCustomerName: { title: '打款客户', config: customer, queryBarConfig: [] },
        cashierName: { ...Employee, title: '出纳' },
        accountingName: { ...Employee, title: '会计' },
        receiverAccountName: { ...blank, config: companyBank, queryBarConfig: [] },
        // payerName
        payerName: { /* paymentAccountName */
          '1': { title: '委托方', config: client, queryBarConfig: [] },
          '2': { title: '客户', config: customer, queryBarConfig: [] },
          '3': { title: '供应商', config: supplier, queryBarConfig: [] },
          '4': company
        },
        paymentAccountName: {
          '1': { ...blank, config: clientBank, queryBar: [] },
          '2': { ...blank, config: customerBank, queryBar: [] },
          '3': { ...blank, config: supplierBank, queryBar: [] },
          '4': { ...blank, config: supplierBank, queryBar: [] } // 暂未配置
        }
      };
      return function (target) {
        let data = this.setTableDialogColumn(target, config[target]);
        this.tableDialog = {
          ...this.tableDialog,
          config: data.config,
          title: data.title,
          queryBar: {
            ...this.tableDialog.queryBar,
            data: {},
            formConfig: data.queryBarConfig
          }
        },
          this.dialog = { type: 'table', visibel: true }
      }
    })(),

    // 设置 配置
    setTableDialogColumn (target, obj) {
      const type = this.form.data.payerType;
      let config = {
        payerName: obj[type],
        paymentAccountName: obj[type]
      };
      return (target in config) ? config[target] : obj
    },

    // 设置 表格弹窗的api接口
    getTableDialogData: (() => {
      let companyInfoProt = api.querycompanyinfoSearch,
        project = api.getFinanceProject,
        departmen = api.getDepartment,
        employee = api.queryemployeeinfoSearch,
        customer = api.getCustomerList;

      let config = {
        companyName: companyInfoProt,
        actualReceiptCompanyName: companyInfoProt,
        flowedInPlannedItemName: project,
        departmentName: departmen,
        flowedOutPlannedItemName: project,
        costCenterName: departmen,
        projectName: project,
        paymentCustomerName: customer,
        cashierName: employee,
        accountingName: employee,
        receiverAccountName: api.getALLBankData,
        payerName: { /* paymentAccountName */
          '1': api.queryclientSearch,
          '2': customer,
          '3': api.querysupplierbaseSearch,
          '4': companyInfoProt
        },
        paymentAccountName: {
          '1': api.getClientBlankData,
          '2': api.getCustomerBan,
          '3': api.querysupplierbankSearch,
          '4': api.getALLBankData
        },
      }
      return async function (data = {}) {
        let param = typeof (data) === 'object' ? data : {},
          target = this.form.searchTarget;
        // 请求参数

        param = { ...this.setrequestParam(), ...param };

        const WHITE_LIST = [
          'companyName', 'actualReceiptCompanyName', 'flowedInPlannedItemName', 'departmentName', 'flowedOutPlannedItemName', 'costCenterName',
          'projectName', 'cashierName', 'accountingName','payerName'
        ];
        WHITE_LIST.includes(target) && (param.status = '2');
        // target === 'payerName' && this.form.data.payerType !== '1' && (param.status = '2');

        let { data: { list, count } } = await this.setRequestPort(target, config[target]).call(api, { ...this.tableDialog.queryBar.data, ...param });
        this.tableDialog.list = list, this.tableDialog.count = count;
      }
    })(),

    // 设置请求参数
    setrequestParam (param) {
      const target = this.form.searchTarget,
        actualReceiptCompany = this.form.data.actualReceiptCompany,
        account = this.form.data.payer,
        config = {
          receiverAccountName: {
            billNo: actualReceiptCompany
          },
          paymentAccountName: {
            billNo: account
          }
        };
      let data = {};
      if (target === 'receiverAccountName') {
        data = config[target]
      }
      if (target === 'paymentAccountName') {
        data = config[target] /* [this.form.data.payerType] */
      }
      return data
    },

    // 设置请求接口
    setRequestPort (target, obj) {
      let config = {
        payerName: obj[this.form.data.payerType],
        paymentAccountName: obj[this.form.data.payerType]
      };
      return (target in config) ? config[target] : obj
    },

    // 表格弹窗 取值
    handlerDialogSave (data = {}) {
      const {
        companyCode, companyName,
        financeProjectCode, financeProjectName,
        departmentCode, departmentName,
        employeeInfoCode, employeeInfoName,
        customerNo, customerName,
        clientNo, clientName, supplierCode, supplierName,
        bankCardNo, bankName, blankNo, contact,
        itemCode, userName, bankNo
      } = data;
      let config = {
        companyName: { company: companyCode, companyName },
        actualReceiptCompanyName: { actualReceiptCompany: companyCode, actualReceiptCompanyName: companyName },
        flowedInPlannedItemName: { flowedInPlannedItem: financeProjectCode, flowedInPlannedItemName: financeProjectName },
        departmentName: { department: departmentCode, departmentName },
        flowedOutPlannedItemName: { flowedOutPlannedItem: financeProjectCode, flowedOutPlannedItemName: financeProjectName },
        costCenterName: { costCenter: departmentCode, costCenterName: departmentName },
        projectName: { project: financeProjectCode, projectName: financeProjectName },
        cashierName: { cashier: employeeInfoCode, cashierName: employeeInfoName },
        accountingName: { accounting: employeeInfoCode, accountingName: employeeInfoName },
        paymentCustomerName: { paymentCustomer: customerNo, paymentCustomerName: customerName },
        receiverAccountName: { receiverAccountName: userName, receiverAccount: itemCode, receiveBank: bankName },
        payerName: new Map([ /* 下标 0 为code， 1 为name， 2 为付款人名称  */
          ['1', [clientNo, clientName, contact]],
          ['2', [customerNo, customerName, contact]],
          ['3', [supplierCode, supplierName, contact]],
          ['4', [companyCode, companyName, contact]]
        ]).get(this.form.data.payerType),
        paymentAccountName: new Map([
          ['1', [itemCode, userName, bankName, bankNo]], /* 单号，账户名，银行名称，银行账号 */
          ['2', [itemCode, userName, bankName, bankNo]],
          ['3', [itemCode, userName, bankName, bankNo]],
          ['4', [itemCode, userName, bankName, bankNo]]
        ]).get(this.form.data.payerType)
      }
      this.form.data = { ...this.form.data, ...this.tableDialogTrantion(this.form.searchTarget, config[this.form.searchTarget]) }

    },

    // 取值转换 
    tableDialogTrantion (target, obj) {
      let config = {
        payerName: { payer: obj[0], payerName: obj[1] },
        paymentAccountName: { paymentAccount: obj[0], paymentAccountName: obj[1], paymentBank: obj[2], bankNo: obj[3] }
      }
      return (target in config) ? config[target] : obj
    },

    // 点击顶部 保存按钮事件
    async handlePreserve () {
      this.form.data = {...this.form.data, ...this.calculate};
      if (utools.checkFormPass(this.form.method))
        utools.saveReceiptsTips.call(
          this,
          async () => {
            // let param = { ...this.form.data, ...this.calculate };
            let param = { ...this.form.data };
            const { data } = await api.changeReceiptData({ data: param, method: this.status === 'add' ? 'POST' : 'PUT' });
            this.status !== 'update' && (this.status = 'update', this.$set(this.form.data, 'status', '1'));
          }
        )
    },


    // 返回到list页面 事件
    handleRollback () {
      this.$router.push({ path: '/M0806' })

    },
    // 弹窗表格的分页事件
    handleTableDialogPageChange (data = {}) {
      this.getTableDialogData(data)
    },

    // 子表操作按钮
    handleItemBtnClick (target) {
      this.dialog.btnTarget = target;
      switch (target) {
        case 'remove':
          if (isNull(this.itemTable.activeRow)) return this.$message.warning('请选择一条数据进行操作！');
          this.deleteReceiptinformationData()
          break;
        case 'create':
          this.$set(this.formDialog.ruleForm, 'billNo', this.form.data.billNo); // 点击新增时 插入收款单号
          break;
        case 'update':
          this.formDialog.ruleForm = this.utools.cloneObj(this.itemTable.activeRow);
      }
      target !== 'remove' && (this.dialog.type = 'form', this.dialog.visibel = true)
    },

    // 子表分页
    handleItemPageChange () {

    },

    // 子表表单弹窗点击保存事件
    handleFormDialogSave () {
      this.changeReceiptinformationData()
    },

    // 获取子表分页数据
    async getReceiptinformationPageData (data = {}) {
      try {
        const { data: { list, count } } = await api.getReceiptinformationPageData(
          { ...data, billNo: this.form.data.billNo }
        );
        this.itemTable = { ...this.itemTable, list, count }
        this.getStatistics()
      } catch (error) {
        console.log(error)
      }
    },

    // 子表修改
    async changeReceiptinformationData () {
      let sCode = 200;
      try {
        const data = await api.changeReceiptinformationData({
          data: this.formDialog.ruleForm,
          method: this.dialog.btnTarget === 'create' ? 'POST' : 'PUT'
        });
        this.dialog.visibel = false,
          this.itemTable.activeRow = {},
          this.getReceiptinformationPageData();
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


    // 删除子表数据
    async deleteReceiptinformationData () {
      let sCode = 200;
      try {
        const data = await api.deleteReceiptinformationData(this.itemTable.activeRow.itemCode);
        this.getReceiptinformationPageData()
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

    // 统计金额
    async getStatistics () {
      try {
        const { data: { list, count }, advanceAmountCount = 0 } = await api.getReceiptinformationPageData({ billNo: this.form.data.billNo })
        var mun = 0
        list.map(e => {
          mun += e.receiptsAmount || 0
        })
        this.form.data.receiptsAmount = mun
        this.form.data.baseCurrency = eval(this.form.data.receiptsAmount * this.form.data.exchangerate || 0).toFixed(4)   //折本位币
        this.form.data = { ...this.form.data }
      } catch (error) {
        console.log(error)
      }
    },

    // 查询 币别 汇率
    async getexchangeratetodata () {
      this.form.data.exchangeRate = ''
      if (this.form.data.createTime) {
        // 建单日期
        var time = this.form.data.createTime.slice(0, 10);
      } else {
        // 当前日期
        var time = new Date().toJSON().slice(0, 10);
      }
      // 选择的币别（中文）
      var currency = ''
      for (let con of this.form.formConfig.list) {
        if (con.key == 'moneyType') {
          if (con.selectOption.length) {
            currency = con.selectOption[this.form.data.moneyType - 1].itemValue || ''
          }
        }
      }
      if (!currency) return
      if (currency == "人民币") {
        this.form.data.exchangeRate = "1.0000";
        return
      }
      try {
        const vdata = await api.gettimeExchangerate(time);
        var list = vdata.data
        for (let i = 0; i < list.length; i++) {
          var exchangerate = "";
          list.forEach(b => {
            if (currency == b.currency) {
              exchangerate = b.cenPrice;
            }
          });
          this.form.data.exchangeRate = exchangerate
          this.form.data.baseCurrency = eval(this.form.data.receiptsAmount * this.form.data.exchangerate || 0).toFixed(4)   //折本位币
          this.form.data = { ...this.form.data }
          return
        }
        this.$message.warning("请录入系统汇率");
      } catch (e) {
        console.log(e);
      }
    },

    // 查询 原币币别 汇率
    async getexchangeratetodatay () {
      this.form.data.originalSettlementExchangeRate = ''
      if (this.form.data.createTime) {
        // 建单日期
        var time = this.form.data.createTime.slice(0, 10);
      } else {
        // 当前日期
        var time = new Date().toJSON().slice(0, 10);
      }
      // 选择的币别（中文）
      var currency = ''
      for (let con of this.form.formConfig.list) {
        if (con.key == 'originalMoneyType') {
          if (con.selectOption.length) {
            currency = con.selectOption[this.form.data.originalMoneyType - 1].itemValue || ''
          }
        }
      }
      if (!currency) return
      if (currency == "人民币") {
        this.form.data.originalSettlementExchangeRate = "1.0000";
        return
      }
      try {
        const vdata = await api.gettimeExchangerate(time);
        var list = vdata.data
        for (let i = 0; i < list.length; i++) {
          var exchangerate = "";
          list.forEach(b => {
            if (currency == b.currency) {
              exchangerate = b.cenPrice;
            }
          });
          this.form.data.originalSettlementExchangeRate = exchangerate
          if (this.form.data.originalSettlementExchangeRate) {
            this.form.data.originalMoneyAmount = eval(this.form.data.baseCurrency / this.form.data.originalSettlementExchangeRate || 0).toFixed(4)   //原币金额
          } else {
            this.form.data.originalMoneyAmount = 0
          }
          this.form.data = { ...this.form.data }
          return
        }
        this.$message.warning("请录入系统汇率");
      } catch (e) {
        console.log(e);
      }
    },

  },
  beforeDestroy () {
    // 闭包的清理
    this.setTableDialogConfig = null;
  },

  destroyed () {

  },
}
</script>
<style lang="less">
.receipt-form {
}
</style>



