export default [
	{
		type: "string",
		key: "itemCode",
		name: "子表编码",
		prop: "itemCode"
	},
	{
		type: "string",
		key: "billNo",
		name: "认款单编码",
		prop: "billNo"
	},
	{
		type: "string",
		key: "documentaryPerson",
		name: "跟单人",
		prop: "documentaryPerson"
	},
	{
		type: "string",
		key: "receiptPerson",
		name: "接单人",
		prop: "receiptPerson"
	},
	{
		type: "string",
		key: "entrustOrderNo",
		name: "委托单号",
		prop: "entrustOrderNo"
	},
	{
		selectOption: [],
		type: "select",
		selectKey: "businessType",
		key: "bizType",
		name: "业务类型",
		prop: "bizType"
	},
	{
		selectOption: [],
		type: "select",
		selectKey: "declareCustoms",
		key: "declareCustoms",
		name: "报关类型",
		prop: "declareCustoms"
	},
	{
		type: "string",
		key: "feeNo",
		name: "计费结算单号",
		prop: "feeNo"
	},
	{
		type: "string",
		key: "feeProject",
		name: "计费项目",
		prop: "feeProject"
	},
	{
		type: "string",
		key: "settlementAmount",
		name: "结算金额",
		prop: "settlementAmount"
	},
	{
		type: "string",
		key: "hasSubscribedAmount",
		name: "已认款金额",
		prop: "hasSubscribedAmount"
	},
	{
		type: "string",
		key: "subscribedAmount",
		name: "认款金额",
		prop: "subscribedAmount"
	},
	{
		selectOption: [],
		type: "select",
		selectKey: "currencyName",
		key: "singleCurrency",
		name: "结算单币别",
		prop: "singleCurrency"
	},
	{
		type: "date",
		key: "setUpTime",
		name: "立账发生时间",
		prop: "setUpTime"
	},
	{
		type: "date",
		key: "receivablesDate",
		name: "应收日期",
		prop: "receivablesDate"
	},
	{
		type: "date",
		key: "collectionDate",
		name: "收款时间",
		prop: "collectionDate"
	},
	{
		type: "textarea",
		key: "remark",
		name: "备注",
		prop: "remark"
	}
]