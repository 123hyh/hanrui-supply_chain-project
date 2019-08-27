<template>
  <div class="subscription-order-form">

    <!-- 顶部操作按钮 -->
    <preserve-btn
      :form='form.data'
      @handlePreserve='handlePreserve'
      @handleRollback='handleRollback'
      :isLoading='topBtn.isLoading'
    ></preserve-btn>

    <!-- 委托单 收款单表格 -->
    <div
      v-for="(val,key,i) of table"
      :key="i"
    >
      <!-- 标题 -->
      <div class="cut-off-rule">{{val.title}}</div>

      <!-- 按钮 -->
      <btn-component
        :btnList='val.btnList'
        @handleItemBtnClick='(type) => handleItemBtnClick(type,key)'
      ></btn-component>

      <!-- 表格 -->
      <table-component
        :dialog='false'
        :popoverType='val.type'
        :popoverList='val.table.list'
        :popoverListKey='val.table.config'
        :multipleTable.sync='val.table.multipleTable'
        :activeRow.sync='val.table.activeRow'
        :count='val.table.count'
        @handlePageChange='formDialoClickPreservation'
      ></table-component>
    </div>

    <!-- 输入框 -->
    <p class="cut-off-rule"></p>
    <form-component
      :formConfig="form.formConfig"
      :formModel="form.data"
      :calculate='calculate'
      @handlerFormVerify='handlerFormVerify'
      @handlerSearchClick='handlerSearchClick'
    >
      <btn-component
        :btnList="recognition"
        @handleItemBtnClick='handleItemBtnClick'
      ></btn-component>
    </form-component>

    <!-- 子表 -->
    <div>
      <btn-component
        :btnList="itemTableBtn"
        @handleItemBtnClick='handleItemTableBtnClick'
      ></btn-component>
      <table-component
        :isSubTable='true'
        :dialog='false'
        :popoverList='itemTable.list'
        :popoverListKey='itemTable.config'
        :count='itemTable.count'
        :activeRow.sync='itemTable.activeRow'
        @handlePageChange='getItemData'
      ></table-component>
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

import { mapMutations, mapGetters } from 'vuex'
import api from "@/assets/js/appHelper.js";
import utools from '@/domain/common/utools.js';
const { isNull, alertNullData, cloneObj, setFormConfig } = utools;

// 组件
import FormComponent from '@/components/common/form-template/FormComponent.vue'
import DialogComponent from '@/components/common/Table.Form.Dialog/NewDialogComponent.vue'
import TableComponent from '@/components/common/Table.Form.Dialog/TableComponent.vue'
import BtnComponent from '@/components/common/BtnComponent.vue'

// 配置
import formConfig from '@/domain/formconfig/finance/SubscriptionOrder.js'
import itemTableConfig from '@/domain/tableconfig/finance/SubscriptionItem.js'

import entrustOrderQuery from '@/domain/formconfig/finance/SubscriptionOrder/SubscriptionOrder-entrustOrder-query.js'
import receiptQuery from '@/domain/formconfig/finance/SubscriptionOrder/SubscriptionOrder-receipt-query.js'

// 委托订单 / 应收结算单
import receivesettlement from '@/domain/formconfig/finance/SubscriptionOrder/SubscriptionOrder-receivesettlement.js'
// 收款单
import receipt from '@/domain/tableconfig/finance/Receipt.js'

// 表格弹窗配置
import customer from '@/domain/tableconfig/basicdata/Customer.js'
import client from '@/domain/tableconfig/business/Client'
import employeeInfo from '@/domain/tableconfig/basicdata/EmployeeInfo.js'
import supplier from '@/domain/tableconfig/basicdata/SupplierBase'



export default {

  name: 'SubscriptionOrderForm',

  components: {
    FormComponent,
    TableDialog: DialogComponent,
    TableComponent,
    BtnComponent,
    formDialog: DialogComponent
  },

  data: _ => ({
    status: '',

    topBtn: {
      isLoading: false,
    },
    recognition: [{ type: 'recognition', label: '自动认款' }],

    table: {
      entrustOrdert: {
        title: '委托单信息',
        type: 'selectTable',
        btnList: [{ type: 'search', label: '查询' }],
        table: {
          multipleTable: [],
          list: [],
          config: receivesettlement,
          count: 0
        }
      },
      receipt: {
        title: '收款单信息',
        type: 'table',
        btnList: [{ type: 'search', label: '查询' }, { type: 'add', label: '新增' }],
        table: {
          activeRow: {},
          list: [],
          config: receipt,
          count: 0
        }
      },
    },
    itemTable: {
      btnList: [{ type: 'update', label: '修改' }],
      activeRow: {},
      list: [],
      tempList: [],
      config: itemTableConfig,
      count: 0
    },
    form: {
      data: {},
      formConfig
    },
    formDialog: {
      target: '',
      title: '查询条件',
      visibel: false,
      form: {
        ruleForm: {},
        queryList: {
          entrustOrdert: entrustOrderQuery,
          receipt: receiptQuery
        },
        formConfig: []
      }

    },
    tableDialog: {
      searchTarget: '',
      title: '',
      visibel: false,
      list: [],
      count: 0,
      config: [],
      queryBar: {
        data: {},
        formConfig: [{ label: "编码", moduleBind: '', isInput: true }],
        btnList: [{ type: "search", label: "查询" }]
      }
    }
  }),

  watch: {
    'formDialog.form.ruleForm.type' () {
      this.formDialog.form.ruleForm = { ...this.formDialog.form.ruleForm, paymentAccountName: '', paymentAccount: '' }
    },
    'status': {
      handler (cur, pre) {
        setFormConfig.call(utools, this.form.formConfig.list, [{
          key: 'subscriptionAmount',
          type: cur === 'add' ? 'calculate' : 'number' /* 修改type */
        }])
        if (cur === 'update' && pre) this.getItemData();
        // 重新设置按钮
        if (cur === 'update') {
          this.recognition = [],
            this.table.receipt.btnList.splice(1, 1)
        }
      },
      deep: true
    }
  },
  computed: {
    ...mapGetters(['getActivePathData']),
    calculate () {
      return {
        subscriptionAmount: this.itemTable.list.reduce((pre, cur, i) => {
          pre += (cur.subscribedAmount || 0);
          return pre
        }, 0)
      }
    },
    itemTableBtn () {
      if (+this.form.data.status <= 1) {
        return [{ type: 'update', label: '修改' }, { type: 'delete', label: '删除' }]
      }
      return []
    }
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

  created () {
    this.initData()
  },

  methods: {
    ...mapMutations([
      'addbreadCrumbsList'
    ]),

    // 初始化表单数据
    initData () {
      const { code, status, formData, itemTable } = this.getActivePathData(this.$route.path);
      this.status = status;
      !code && !formData && this.getCode();
      formData && (this.form.data = formData);
      code && (this.form.data.billNo = code); // 有code一定是修改状态
      itemTable && (this.itemTable = { ...this.itemTable, list: itemTable.list, count: itemTable.count, tempList: itemTable.tempList });
      status === 'update' && this.getData(code);

      /* status === 'add' && Promise.all([
        this.getentrustOrdertData(),
        this.getReceiptData()
      ]) */
    },

    // 获取单据表单数据
    async getData (code) {
      try {
        const [{ data }, sum] = await Promise.all([
          api.getOneSubscriptionorderData(code),
          this.getItemData()
        ]).catch(error => { console.log(error); return {} })
        this.form.data = { ...data, subscriptionAmount: sum };
      } catch (error) {
        this.$message({ type: 'error', message: '获取单据数据失败' })
        console.log(error)
      }
    },

    // 获取子表数据
    async getItemData (data = {}) {
      try {
        const { data: { list, count, subscribedAmountCount } } = await api.getSubscriptionorderItem({ ...data, billNo: this.form.data.billNo });
        this.itemTable.list = list, this.itemTable.count = count;
        this.form.data = { ...this.form.data, subscriptionAmount: subscribedAmountCount }
        return Promise.resolve(subscribedAmountCount)
      } catch (error) {
        this.$message({
          type: 'error',
          message: '获取子表数据失败,请重试！'
        })
        console.log(error)
      }
    },

    // 获取单据编码
    async getCode () {
      try {
        this.form.data = { ...this.form.data, billNo: (await api.getSubscriptionorderCode()).data }
      } catch (error) {
        this.getCode()
        console.log(error)
      }
    },
    // 保存按钮事件
    async handlePreserve () {
      let sCode = 200;
      try {
        let isAdd = this.status === 'add',
          param = { data: this.form.data, method: isAdd ? 'POST' : 'PUT' };
        isAdd && (param.data.subscriptionItemList = this.itemTable.tempList); // 新增单据时把子表一同保存
        const { data } = await api.changeSubscriptionorderData(param);
        isAdd && (this.status = 'update', this.$set(this.form.data, 'status', '1'));
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

    // 返回上一级
    handleRollback () {
      this.$router.push('/M0807')
    },

    // 表单验证配置
    handlerFormVerify () {

    },

    // 表单点击search按钮
    handlerSearchClick () { },

    // 表格弹窗点击保存
    handlerTableDialogSave (data = {}) {
      const {
        customerName, customerNo,
        clientName, clientNo,
        employeeInfoName, employeeInfoCode,
        supplierCode, supplierName
      } = data,
        target = this.tableDialog.searchTarget,
        param = {
          clientName: { clientName: customerName, client: customerNo },
          delegateName: { delegateName: clientName, delegate: clientNo },
          accountingName: { accountingName: employeeInfoName, accounting: employeeInfoCode },
          paymentAccountName: new Map([
            ['1', [clientNo, clientName]],
            ['2', [customerNo, customerName]],
            ['3', [supplierCode, supplierName]]
          ])
        };
      this.formDialog.form.ruleForm = { ...this.formDialog.form.ruleForm, ...this.setTableDialogValue(param[target], target) }
    },

    // 设置表格弹窗保存取值
    setTableDialogValue (set, target) {
      const type = this.formDialog.form.ruleForm.type;
      let config = {
        paymentAccountName: () => ({ paymentAccount: set.get(type)[0], paymentAccountName: set.get(type)[1] })
      }
      return target in config ? config[target]() : set
    },

    // 表格弹窗分页事件
    handleTableDialogPageChange () {
    },

    // 显示查询弹窗
    showQueryDialog () {

    },

    // 表格的操作按钮事件 激活form弹窗
    handleItemBtnClick (type, target) {
      if (type === 'search') {
        this.formDialog.form.ruleForm = {};
        const { queryList } = this.formDialog.form;
        this.formDialog.form.formConfig = queryList[target],
          this.formDialog.visibel = true,
          this.formDialog.target = target;
        return
      }

      if (target === 'receipt' && type === 'add')/* 收款单新增 */ {
        this.tanstionReceiptForm(this.table[target].table.activeRow);
        return
      };

      if (type === 'recognition')/* 自动认款 */ {
        const IS_TRUE = this.table.entrustOrdert.table.multipleTable.every(
          item => item.settleCurrency === this.form.data.sourceCurrency// 多选的应收结算 的币种必须和收款单的币种相同
        );

        if (IS_TRUE) {

          this.transtionItemTableData()
        } else {
          this.$message({
            type: 'warning',
            message: '请确保币种是否相同！'
          })
        }
      }
    },

    // 子表数据 字段转换
    transtionItemTableData () {
      const config = {
        entrustOrderNo: 'delegeteBillNo', // 委托单号
        bizType: 'bizType', // 业务类型
        bizTypeName: 'bizTypeName',
        declareCustoms: 'declareCustoms',
        declareCustomsName: 'declareCustomsName', // 报关类型
        feeNo: 'billNo', // 计费结算单号
        settlementAmount: 'totalAmount',  // 结算金额
        hasSubscribedAmount: 'confirmedAmount', //已认款金额
        subscribedAmount: 'unconfirmedAmount', // 认款金额
        singleCurrencyName: 'settleCurrencyName', // 结算单币别
        singleCurrency: 'settleCurrency',
      };

      const table = this.itemTable;
      table.tempList = cloneObj(this.table.entrustOrdert.table.multipleTable).map(item => {
        for (let elem of Object.keys(config)) {
          item[elem] = item[config[elem]]
        }
        this.form.data.receivableAmount = (this.form.data.receivableAmount || 0) + (item.unconfirmedAmount || 0)
        item.billNo = this.form.data.receiptNo;
        return item
      });
      table.count = table.tempList.length;
      this.itemTable.list = cloneObj(this.itemTable.tempList.slice(0, 10));
      this.form.data = { ...this.form.data }
    },

    // form弹窗 点击保存之后获取表格数据
    formDialoClickPreservation (data = {}) {
      switch (this.formDialog.target) {
        case 'entrustOrdert': this.getentrustOrdertData(data); break;     /* 应收结算单查询 */
        case 'receipt': this.getReceiptData(data); break;     /* 收款单的查询 */
        case 'itemTable': this.updateItemTbaleMoney() /* 子表的表单保存 */
      }
    },

    // 点击新增转换到表单当中
    tanstionReceiptForm (data = {}) {
      if (isNull(data)) { this.$message({ type: 'warning', message: '请选中一条数据后再操作！' }); return };

      const {
        billNo, //收款单号
        moneyType,// 币别
        receiptsType, //收款类型
        receiverAccountName, receiverAccount, // 收款账户 
        receiveBank, // 收款银行
        paymentBank, // 付款银行
        paymentAccountName, paymentAccount, // 付款账户
        payerType, // 往来类型
        payerName, payer, // 往来户
        unconfirmedAmount, // 未认款金额
      } = data;
      this.form.data = {
        ...this.form.data,
        receiptNo: billNo,
        sourceCurrency: moneyType,
        receiptType: receiptsType,
        receiptAccountName: receiverAccountName,
        receiptAccount: receiverAccount,
        receiptBank: receiveBank,
        paymentBank,
        paymentAccount,
        paymentAccountName,
        communicateType: payerType,
        communicateAccount: payer, communicateAccountName: payerName,
        unsubscribedAmount: unconfirmedAmount
      }
    },

    // 获取委托订单分页数据
    getentrustOrdertData (data = {}) {
      this.getTableData(api.queryreceivesettlementSearch, { ...data, unZero: true }) // 查询应收结算单单！！,带上 未认款金额 > 0 的条件
    },

    // 获取收款单分页数据 
    getReceiptData (data = {}) {
      this.getTableData(api.queryReceiptSearch, { ...data, unZero: true }) // 查询未认款金额大于0的
    },

    // 获取表格数据
    async getTableData (cb, pageData = {}, ) {
      try {
        const target = this.formDialog.target,
          { data: { list, count } } = await cb.call(api, { ...pageData, ...this.setRequestParam() });
        this.table[target].table = { ... this.table[target].table, list, count };
        this.formDialog.visibel = false;
      } catch (error) {
        this.$message({ type: 'error', message: '获取数据失败，请重试！' })
        console.log(error)
      }
    },

    // 子表单据修改认款金额
    async updateItemTbaleMoney () {
      try {
        if (this.status === 'add') {
          const { settlementAmount, hasSubscribedAmount, subscribedAmount, billNo } = this.formDialog.form.ruleForm;
          if ((subscribedAmount || 0) + (hasSubscribedAmount || 0) > settlementAmount) {
            this.$message({
              type: 'warning',
              message: '金额不允许超过结算金额！'
            });
            return
          }
          const fn = item => item.billNo === billNo,
            formData = this.formDialog.form.ruleForm,
            tIndex = this.itemTable.tempList.findIndex(fn),
            lIndex = this.itemTable.list.findIndex(fn);

          ~tIndex && (this.itemTable.tempList[tIndex] = { ...formData });
          ~lIndex && (this.itemTable.list[lIndex] = { ...formData });

          this.itemTable.list = [...this.itemTable.list];
          this.formDialog.visibel = false;
        } else {
          await api.changeSubscriptionorderItem({ data: this.formDialog.form.ruleForm, method: 'PUT' });
          this.formDialog = { ...this.formDialog, visibel: false, form: { ...this.formDialog.form, ruleForm: {} } }
          this.getItemData();
        }
        this.$message({
          type: 'success',
          message: '保存成功！'
        })
      } catch (error) {
        this.$message({
          type: 'error',
          message: '保存失败，请重试！'
        })
        console.log(error)
      }
    },

    // 过滤带Name后缀的请求参数
    setRequestParam () {
      return Object.keys(this.formDialog.form.ruleForm).filter((item) => !/Name$/i.test(item)).reduce((pre, cur, i) => {
        pre[cur] = this.formDialog.form.ruleForm[cur];
        return pre
      }, {});
    },

    // form弹窗点击 search 按钮
    handlerFormDialogClickSearch (target) {
      if (target === 'paymentAccountName' && !this.formDialog.form.ruleForm.type) {
        this.$message({
          type: 'warning',
          message: '请先选择往来户类型！'
        });
        return
      }
      Promise.all([this.setTableDialog(target), this.getTableDialogData(target)])
    },

    // 请求表格弹窗的数据
    getTableDialogData: (() => {
      let client = api.queryclientSearch,
        port = {
          clientName: api.getCustomerList,
          delegateName: api.queryclientSearch,
          accountingName: api.queryemployeeinfoSearch,
          paymentAccountName: new Map([
            ['1', client],
            ['2', api.getCustomerList],
            ['3', api.querysupplierbaseSearch]
          ])
        };
      return async function (target) {
        try {
          const { data: { list, count } } = await this.setRequestPort(port[target], target).call(api, this.formDialog.form.ruleForm);
          this.tableDialog = { ...this.tableDialog, list, count }
        } catch (error) {
          console.log(error)
        }
      }
    })(),

    // 设置 表格弹窗的请求接口
    setRequestPort (set, target) {
      let config = {
        paymentAccountName: () => set.get(this.formDialog.form.ruleForm.type)
      }
      return target in config ? config[target]() : set
    },

    // 设置弹窗的配置
    setTableDialog: (() => {
      let config = {
        clientName: { title: '客户', config: customer, queryBarConfig: { moduleBind: 'customerNo' } },
        delegateName: { title: '委托方', config: client, queryBarConfig: { moduleBind: 'clientNo' } },
        accountingName: { title: '跟账人', config: employeeInfo, queryBarConfig: { moduleBind: 'employeeInfoCode' } },
        paymentAccountName: new Map([
          ['1', { title: '委托方', config: client, queryBarConfig: { moduleBind: 'clientNo' } }],
          ['2', { title: '客户', config: customer, queryBarConfig: { moduleBind: 'customerNo' } }],
          ['3', { title: '供应商', config: supplier, queryBarConfig: { moduleBind: 'supplierCode' } }]
        ])
      }
      return function (target) {
        this.tableDialog = {
          ...this.tableDialog,
          visibel: true,
          list: [],
          count: 0,
          searchTarget: target,
          ...this.setTableDialogConfig(config[target], target)
        }
      }
    })(),

    // 设置 弹窗 接上
    setTableDialogConfig (set, target) {
      let config = {
        paymentAccountName: () => set.get(this.formDialog.form.ruleForm.type)
      };
      return target in config ? config[target]() : set
    },

    // 表格弹窗点击查询
    handleTableDialogClickQuery () {
    },

    // 子表点击按钮事件
    handleItemTableBtnClick (type) {
      if (type === 'update')/* 点击子表修改时 */ {
        this.formDialog = {
          ...this.formDialog, visibel: true, title: '修改认款金额',
          target: 'itemTable',
          form: {
            ...this.formDialog.form,
            ruleForm: { ...this.itemTable.activeRow },
            formConfig: [
              { type: 'number', key: 'subscribedAmount', name: '认款金额', prop: 'subscribedAmount' },
              { type: 'textarea', key: 'remark', name: '备注', prop: 'remark' },
            ]
          }
        }
      } else/* 删除 */ {
        this.removeItemTableData()
      }
    },
    async removeItemTableData () {
      try {
        if (isNull(this.itemTable.activeRow)) {
          this.$message({
            type: 'warning',
            message: '请选中一条数据操作'
          });
          return
        };
        if (this.status === 'add') {
          const { billNo } = this.itemTable.activeRow,
            fn = item => item.billNo === billNo,
            tIndex = this.itemTable.tempList.findIndex(fn),
            lIndex = this.itemTable.list.findIndex(fn);
          ~tIndex && (
            this.itemTable.tempList.splice(tIndex, 1),
            this.itemTable.list.splice(lIndex, 1)
          );
          this.itemTable.list = [...this.itemTable.list]
        } else {
          const { data } = await api.deleteSubscriptionorderItem(this.itemTable.activeRow.itemCode);
          this.getItemData()
        }
        this.$message({
          type: 'success',
          message: '删除成功！'
        })
      } catch (error) {
        this.$message({
          type: 'error',
          message: '删除失败，请重试！'
        })
        console.log(error)
      }

    }
  }
}
</script>