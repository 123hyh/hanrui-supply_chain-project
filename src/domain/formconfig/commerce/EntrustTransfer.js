export default [
	{
		text: true,
		key: "itemCode",
		name: "表业务主键编号",
		prop: "itemCode"
	},
	{
		text: true,
		key: "entrustOrderNo",
		name: "委托订单号",
		prop: "entrustOrderNo"
	},
	{
		text: true,
		key: "billNo",
		name: "单据编号",
		prop: "billNo"
	},
	{
		date: true,
		key: "bizDate",
		name: "业务日期",
		prop: "bizDate"
	},
	{
		type: true,
		text: true,
		key: "refundAmount",
		name: "不来货退款",
		prop: "refundAmount"
	},
	{
		text: true,
		key: "otherOrder",
		name: "转其他委托单",
		prop: "otherOrder"
	},
	{
		text: true,
		key: "transferOrderNo",
		name: "转出委托单号",
		prop: "transferOrderNo"
	},
	{
		type: true,
		text: true,
		key: "transferAmount",
		name: "转出金额",
		prop: "transferAmount"
	},
	{
		selectOption: [],
		select: true,
		key: "transferCurrency",
		name: "转出币别",
		prop: "transferCurrency"
	},
	{
		text: true,
		key: "intoOrderNo",
		name: "转入委托单号",
		prop: "intoOrderNo"
	},
	{
		type: true,
		text: true,
		key: "intoAmount",
		name: "转入金额",
		prop: "intoAmount"
	},
	{
		selectOption: [],
		select: true,
		key: "intoCurrency",
		name: "转入币别",
		prop: "intoCurrency"
	},
	{
		text: true,
		key: "transferReason",
		name: "转款理由",
		prop: "transferReason"
	},
	{
		date: true,
		key: "auditTime",
		name: "审核时间",
		prop: "auditTime"
	},
	{
		text: true,
		key: "auditor",
		name: "审核人",
		prop: "auditor"
	}
]