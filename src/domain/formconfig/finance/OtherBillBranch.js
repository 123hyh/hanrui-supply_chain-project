export default [
	// {
	// 	text: true,
	// 	key: "itemCode",
	// 	name: "子表主键",
	// 	prop: "itemCode"
	// },
	// {
	// 	text: true,
	// 	key: "billNo",
	// 	name: "其他计费单编码",
	// 	prop: "billNo"
	// },
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
		selectOption:[{
			itemKey: '1',
			itemValue: '应收'
		},{
			itemKey: '2',
			itemValue: '应付'
		}],
		selectKey: "",
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
		prop: "currency"
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
	// {
	// 	type: "string",
	// 	key: "inSettlementPrice",
	// 	name: "内部结算价",
	// 	prop: "inSettlementPrice"
	// },
	{
		type: "select",
		selectOption: [],
		selectKey: "settlementMethod",
		key: "settlementMethod",
		name: "结算方式",
		prop: "settlementMethod"
	},
	// {
	// 	type: "date",
	// 	key: "paymentTime",
	// 	name: "付款时间",
	// 	prop: "paymentTime"
	// },
	// {
	// 	text: true,
	// 	key: "paymenter",
	// 	name: "付款勾选人",
	// 	prop: "paymenter"
	// }
]