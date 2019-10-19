import validate from '@/domain/common/validate.js'
const rules = validate.setRequired()
export default [
	{
		btn: true,
		type: "string",
		key: "entrustOrderNo",
		name: "委托单号",
		prop: "entrustOrderNo"
	},
	{
		type: "select",
		selectOption: [],
		selectKey: "entrustOrderType",
		key: "entrustOrderType",
		name: "委托单类型",
		prop: "entrustOrderType"
	},
	{
		btn: true,
		type: "string",
		key: "clientName",
		name: "委托方",
		prop: "clientName"
	},
	{
		type: "select",
		selectOption: [],
		selectKey: "payeeUnitType",
		key: "receiveUnitType",
		name: "应收结算单位类型",
		prop: "receiveUnitType"
	},
	{
		btn: true,
		type: "string",
		key: "receiveUnitName",
		name: "应收结算单位",
		prop: "receiveUnitName",
		readonly: true,
	},
	{
		type: "date",
		key: "occurrenceDate",
		name: "发生日期",
		prop: "occurrenceDate"
	},
	{
		type: "select",
		selectOption: [],
		selectKey: "settlementUnitType",
		key: "payableUnitType",
		name: "应付结算单位类型",
		prop: "payableUnitType"
	},
	{
		btn: true,
		type: "string",
		key: "payableUnitName",
		name: "应付结算单位",
		prop: "payableUnitName",
		readonly: true,
	},
	{
		btn: true,
		type: "string",
		key: "feeProjectName",
		name: "计费项目",
		prop: "feeProjectName"
	},
	{
		type: "select",
		selectOption: [],
		selectKey: "receiptPaymentType",
		key: "paymentType",
		name: "收付类型",
		prop: "paymentType"
	},
	{
		type: "string",
		key: "makePrice",
		name: "定价",
		prop: "makePrice"
	},
	{
		type: "select",
		selectOption: [],
		selectKey: "currencyName",
		key: "currency",
		name: "币别",
		prop: "currency",
		rules,
	},
	{
	  type: 'string',
	  key: "settleRate",
	  name: "汇率",
	  prop: "settleRate",
		disabled: true,
		rules
	},
	{
		type: "money",
		key: "receiveAmount",
		name: "应收金额",
		prop: "receiveAmount",
		disabled: true,
	},
	{
		type: "money",
		key: "payableAmount",
		name: "应付金额",
		prop: "payableAmount",
		disabled: true,
	},
	{
		type: "select",
		selectOption: [],
		selectKey: "settlementMethod",
		key: "settlementMethod",
		name: "结算方式",
		prop: "settlementMethod"
	},
]