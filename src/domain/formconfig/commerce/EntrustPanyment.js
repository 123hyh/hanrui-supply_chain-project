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
	/* {
		selectOption: [],
		select: true,
		key: "status",
		name: "状态",
		prop: "status"
	}, */
	{
		selectOption: [],
		select: true,
		key: "settlementMode",
		name: "结算方式",
		prop: "settlementMode"
	},
	{
		text: true,
		key: "chequeNo",
		name: "支票号",
		prop: "chequeNo"
	},
	{
		date: true,
		key: "paymentDate",
		name: "付款日期",
		prop: "paymentDate"
	},
	{
		type: true,
		text: true,
		key: "amount",
		name: "金额",
		prop: "amount"
	},
	{
		selectOption: [],
		select: true,
		key: "currency",
		name: "币别",
		prop: "currency"
	},
	{
		date: true,
		key: "takeTicketDate",
		name: "取票日期",
		prop: "takeTicketDate"
	},
	{
		date: true,
		key: "ticketDueDate",
		name: "期票到期日",
		prop: "ticketDueDate"
	},
	{
		type: true,
		text: true,
		key: "hasSettlement",
		name: "已计结算",
		prop: "hasSettlement"
	},
	{
		type: true,
		text: true,
		key: "settlementAmount",
		name: "结算单金额",
		prop: "settlementAmount"
	},
	{
		selectOption: [],
		select: true,
		key: "settlementCurrentcy",
		name: "结算币别",
		prop: "settlementCurrentcy"
	},
	{
		type: true,
		text: true,
		key: "exchangeRate",
		name: "付款汇率",
		prop: "exchangeRate"
	},
	{
		selectOption: [],
		select: true,
		key: "orderType",
		name: "来源单据类型",
		prop: "orderType"
	}
]