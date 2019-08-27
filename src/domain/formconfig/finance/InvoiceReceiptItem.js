export default [
	// {
	// 	text: true,
	// 	key: "itemCode",
	// 	name: "子表编码",
	// 	prop: "itemCode"
	// },
	{
		type: "string",
		key: "billNo",
		name: "发票签收单编码",
		prop: "billNo"
	},
	// {
	// 	type: 'select',
	// 	selectOption: [],
	// 	selectKey:'orderStatus',
	// 	key: "status",
	// 	name: "单据状态",
	// 	prop: "status"
	// },
	// {
	// 	type: "string",
	// 	key: "outOrderCode",
	// 	name: "发运单据编号",
	// 	prop: "outOrderCode",
	// },
	// {
	// 	btn: true,
	// 	type: "string",
	// 	key: "customer",
	// 	name: "客户",
	// 	prop: "customer"
	// },
	{
		btn:true,
		type: "string",
		key: "receiverName",
		name: "签收人",
		prop: "receiverName"
	},
	// {
	// 	type: "date",
	// 	key: "outTime",
	// 	name: "发运时间",
	// 	prop: "outTime"
	// },
	{
		type: "select",
		selectOption: [],
		selectKey: "InvoiceTypes",
		key: "invoiceType",
		name: "发票类型",
		prop: "invoiceType"
	},
	{
		type: "string",
		key: "receivableNo",
		name: "应收单号",
		prop: "receivableNo"
	},
	{
		type: "string",
		key: "invoiceAmount",
		name: "发票金额",
		prop: "invoiceAmount"
	},
	{
		type: "string",
		key: "invoiceNo",
		name: "发票号码",
		prop: "invoiceNo"
	},
	{
		type: "checkbox",
		key: "followGoods",
		name: "票是否随货",
		prop: "followGoods"
	},
	{
		type: "textarea",
		key: "remark",
		name: "备注",
		prop: "remark"
	},
	// {
	// 	type: "string",
	// 	key: "reviewer",
	// 	name: "审核人名称",
	// 	prop: "reviewer"
	// },
	// {
	// 	type: "date",
	// 	key: "reviewTime",
	// 	name: "审核时间",
	// 	prop: "reviewTime"
	// },
]