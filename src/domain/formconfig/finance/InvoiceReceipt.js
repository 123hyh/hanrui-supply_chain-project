import validate from "@/domain/common/validate.js";
const rules = validate.setRequired();
export default [
	{
		type: "string",
		key: "billNo",
		name: "单据编号",
		prop: "billNo",
		rules
	},
	// {
	// 	type: "select",
	// 	selectOption: [],
	// 	selectKey:"orderStatus",
    // 	key: "status",
	// 	name: "单据状态",
	// 	prop: "status"
	// },
	// {
	// 	type: "string",
	// 	key: "outOrderType",
	// 	name: "出库单据类别",
	// 	prop: "outOrderType"
	// },
	{
		btn:true,
		type: "string",
		key: "outOrderCode",
		name: "发运单据编号",
		prop: "outOrderCode",
		rules
	},
	{
		btn:true,
		type: "string",
		key: "customerName",
		name: "客户",
		prop: "customerName",
		rules
	},
	{
		btn:true,
		type: "string",
		key: "receiverName",
		name: "签收人",
		prop: "receiverName",
		rules
	},
	{
		type: "date",
		key: "outTime",
		name: "发运时间",
		prop: "outTime"
	},
	// {
	// 	type: "string",
	// 	key: "invoiceNo",
	// 	name: "发票号码",
	// 	prop: "invoiceNo",
	// 	rules
	// },
	// {
	// 	type: "select",
	// 	selectOption: [],
	// 	selectKey: "InvoiceTypes",
	// 	key: "invoiceType",
	// 	name: "发票类型",
	// 	prop: "invoiceType",
	// 	rules
	// },
	// {
	// 	type: "string",
	// 	key: "receivableNo",
	// 	name: "应收单号",
	// 	prop: "receivableNo",
	// 	rules
	// },
	// {
	// 	type: "string",
	// 	key: "invoiceAmount",
	// 	name: "发票金额",
	// 	prop: "invoiceAmount",
	// 	rules
	// },
	{
		type: "checkbox",
		key: "followGoods",
		name: "票是否随货",
		prop: "followGoods",
		rules
	},

	{
		type: "string",
		key: "reviewer",
		name: "审核人名称",
		prop: "reviewer"
	},
	{
		type: "date",
		key: "reviewTime",
		name: "审核时间",
		prop: "reviewTime"
  },
  {
		type: "textarea",
		key: "remark",
		name: "备注",
    prop: "remark",
    layout: `flex-basis:100%;height:auto !important`
	},
]