import api from "@/assets/js/appHelper.js";
import utools from '@/domain/common/utools.js'
const { cloneObj } = utools;
export default {
  watch: {
    'form.data.adjustmentSources' (cur, pre) {
      this.setQueryConfig(),
        this.setSourceTableConfig();
    },
    'form.data.settlementUnitType': { /* 结算单位类型 变化时清空 结算单位 */
      handler (cur, pre) {
        if (!cur || !pre || (cur === pre)) return;
        this.form.data = { ...this.form.data, settlementUnitName: '', settlementUnit: '' }
      },
      deep: true
    },
    'queryBar.data.adjustmentSources': {
      handler (cur) {
        if (this.status === 'add') {
          this.$set(this.form.data, 'adjustmentSources', cur)
        }
      },
      deep: true
    },
  },
  data: _ => ({
    queryBar: {
      formConfig: [
        { label: '单据编号', moduleBind: 'billNo', isInput: true },
        { label: '委托单号', moduleBind: 'entrustOrderNo', isInput: true },
        {
          label: '调整帐务来源', moduleBind: 'adjustmentSources', isSelect: true, selectOption: [
            { itemKey: '1', itemValue: '应收结算单' },
            { itemKey: '2', itemValue: '应付结算单' },
            { itemKey: '3', itemValue: '收款单' }
          ]
        }
      ],
      data: {},
      btnList: [
        { type: 'search', label: '查询' }
      ]
    },
    sourceBills: {
      list: [],
      count: 0,
      config: [
        { label: '单据编号', prop: 'billNo' },
        { label: '委托单号', prop: 'entrustOrderNo' },
        { label: '公司', prop: 'companyName' },
        { label: '结算单位', prop: 'settleUnitName' },
        { label: '计费项目', prop: 'feeProject' },
        { label: '应计金额', prop: 'payableAmount' },
        { label: '币别', prop: 'settleCurrencyName' }
      ],
      multipleTable: []
    },
  }),
  methods: {
    async queryBarClick (data = {}) {
      if (!this.form.data.adjustmentSources) {
        this.$message({
          type: 'warning',
          message: '请先选择调整账务来源！'
        });
        return
      }
      data = typeof data == 'object' ? data : {};
      let prot = {
        '1': api.queryreceivesettlementFeeSearch,
      };
      try {
        const { data: { list, count } } = await prot[this.form.data.adjustmentSources].call(api, { ...this.queryBar.data, ...data });
        this.sourceBills = {
          ...this.sourceBills, list, /* (() => {
            var set = [];
            for (let i = 0; i < 20; i++) {
              set.push(cloneObj(list[0]))
            }
            return set
          })() */ count
        }
      } catch (error) {
        console.log(error)
      }

    },

    // 来源单据 表格分页事件
    sourceBillsPageChange (pageData = {}) {
      this.queryBarClick(pageData)
    },
    // 设置 查询栏 
    setQueryConfig () {
    },
    // 设置表格
    setSourceTableConfig () {

    },
    // 点击加入按钮事件
    sourceBtnClick () {
      if (!this.sourceBills.multipleTable.length || this.status === 'update') {
        this.$message({
          type: 'warning',
          message: this.status === 'update' ? '该功能只可新增时使用' : '请选择来源单据'
        });
        return;
      }
      const [{ company, companyName, customer, customerName, client, clientName, settleCurrency, settleCurrencyName }] = this.sourceBills.multipleTable;
      this.form.data = {
        ...this.form.data,
        oldCompany: company, oldCompanyName: companyName,
        customer: customer, oldCustomerName: customerName,
        oldClient: client, oldClientName: clientName,
        oldCurrency: settleCurrency, oldCurrencyName: settleCurrencyName
      };
      if (this.status === 'add') {
        const data = this.sourceBills.multipleTable;
        this.itemTable = {
          ...this.itemTable,
          tempList: cloneObj(data),
          list: cloneObj(data.slice(0, 10)),
          count: this.sourceBills.multipleTable.length
        }
      }
    }
  },
}