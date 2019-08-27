import validate from '@/domain/common/validate.js'
const rules = validate.setRequired()
export default [
  {
    type: 'string',
    key: 'billNo',
    name: '应收结算单编码',
    prop: 'billNo',
    readonly: true
  },
  {
    type: 'string',
    key: 'materielCode',
    name: '物料编码',
    prop: 'materielCode',
    readonly: true
  },
  {
    type: 'string',
    key: 'materielName',
    name: '物料名称',
    prop: 'materielName',
    readonly: true
  },
  {
    type: 'string',
    key: 'sourceBill',
    name: '原始凭证编码',
    prop: 'sourceBill',
    readonly: true,
    rules
  },
  {
    type: 'string',
    key: 'sourceBillName',
    name: '原始凭证名称',
    prop: 'sourceBillName',
    readonly: true,
    rules
  },
  {
    btn: true,
    type: 'string',
    key: 'feeProjectName',
    name: '款项明细',
    prop: 'feeProjectName',
    rules
  },
  {
    type: 'select',
    selectOption: [],
    selectKey: 'payMode',
    key: 'paymentType',
    name: '付款方式',
    prop: 'paymentType',
    rules
  },
  {
    type: 'date',
    key: 'happenTime',
    name: '业务日期',
    prop: 'happenTime'
  },
  {
    type: 'select',
    selectOption: [],
    selectKey: 'currencyName',
    key: 'soureceCurrency',
    name: '原币币别',
    prop: 'soureceCurrency',
    rules
  },
  {
    type: 'money',
    key: 'sourceAmount',
    name: '原币金额',
    prop: 'sourceAmount',
    rules: [
      { required: true, message: '必填', trigger: 'blur' },
      { validator: validate.validateNum, trigger: ['blur', 'change'] }
    ]
  },
  {
    type: 'select',
    selectOption: [],
    selectKey: 'currencyName',
    key: 'settleCurrency',
    name: '结算币别',
    prop: 'settleCurrency'
  },
  {
    type: 'string',
    key: 'settleRate',
    name: '结算汇率',
    prop: 'settleRate'
  },
  // {
  // 	type: "money",
  // 	key: "countSettleAmount",
  // 	name: "折结算币金额",
  // 	prop: "countSettleAmount",
  // },
  {
    type: 'money',
    key: 'insideAmount',
    name: '结算应收金额',
    prop: 'insideAmount'
  }
  // {
  // 	type: "string",
  // 	key: "reAndPay",
  // 	name: "收付",
  // 	prop: "reAndPay"
  // },
  // {
  // 	type: "money",
  // 	key: "payableAmount",
  // 	name: "应付金额",
  // 	prop: "payableAmount",
  // },
  // {
  // 	type: "date",
  // 	key: "receivablesDate",
  // 	name: "应收日期",
  // 	prop: "receivablesDate"
  // },
  // {
  // 	type: "checkbox",
  // 	key: "invoice",
  // 	name: "开票",
  // 	prop: "invoice"
  // },
  // {
  // 	type: "string",
  // 	key: "invoiceRate",
  // 	name: "开票汇率",
  // 	prop: "invoiceRate",
  // },
  // {
  // 	type: "select",
  // 	selectOption: [],
  // 	selectKey: "settlementUnitType",
  // 	key: "settleType",
  // 	name: "结算类型",
  // 	prop: "settleType"
  // },
  // {
  // 	type: "string",
  // 	key: "settleUnitName",
  // 	name: "结算单位名称",
  // 	prop: "settleUnitName"
  // },
  // {
  // 	type: "money",
  // 	key: "settleUnitNameAmount",
  // 	name: "应收结算单位金额",
  // 	prop: "settleUnitNameAmount",
  // },
  // {
  // 	type: "money",
  // 	key: "hasOffAmount",
  // 	name: "已核销金额",
  // 	prop: "hasOffAmount",
  // },
  // {
  // 	type: "money",
  // 	key: "hasPledgedAmount",
  // 	name: "已认款金额",
  // 	prop: "hasPledgedAmount",
  // },
  // {
  // 	type: "money",
  // 	key: "depositAmount",
  // 	name: "押金金额",
  // 	prop: "depositAmount",
  // },
  // {
  // 	type: "money",
  // 	key: "hasPledgedDeposit",
  // 	name: "已认款押金金额",
  // 	prop: "hasPledgedDeposit",
  // },
  // {
  // 	type: "money",
  // 	key: "applicationAmount",
  // 	name: "核销申请金额",
  // 	prop: "applicationAmount",
  // },
  // {
  // 	type: "string",
  // 	key: "description",
  // 	name: "说明",
  // 	prop: "description"
  // },
  // {
  // 	type: "string",
  // 	key: "sourceOrderCode",
  // 	name: "来源单据编号",
  // 	prop: "sourceOrderCode"
  // },
  // {
  // 	type: "string",
  // 	key: "exchangeFormula",
  // 	name: "汇差计算公式",
  // 	prop: "exchangeFormula"
  // },
  // {
  // 	type: "select",
  // 	selectOption: [],
  // 	selectKey: "DiscountType",
  // 	key: "discountType",
  // 	name: "贴现类型",
  // 	prop: "discountType"
  // },
  // {
  // 	type: "string",
  // 	key: "interestVat",
  // 	name: "利息增值税",
  // 	prop: "interestVat",
  // }
  // {
  // 	type: "string",
  // 	key: "itemCode",
  // 	name: "子表编码",
  // 	prop: "itemCode",
  // 	rules: [{
  // 		required: true,
  // 		message: '必填',
  // 		trigger: 'blur',
  // 	}]
  // },
]
