import validate from "@/domain/common/validate.js";
const rules = validate.setRequired();
export default [
	{
		type: 'string',
		key: "organizationName",
		name: "销售组织名称",
		prop: "organizationName",
		btn: true,
		readonly: true,
		rules
	},
	{
		type: 'string',
		key: "channelSalesName",
		name: "渠道销售名称",
		prop: "channelSalesName"	
	},
	{
		type: 'string',
		key: 'salesmanName',
		name: '销售员',
		prop: 'salesmanName'
	},
	{
		type: 'string',
		key: "receivableCustName",
		name: "应收客户名称",
		prop: "receivableCustName",
		btn: true,
		readonly: true,
	},
	{
		type: 'string',
		btn: true,
		key: "receiptCustName",
		name: "收款客户名称",
		prop: "receiptCustName",
		readonly: true,
	},
	{
		type: 'string',
		btn: true,
		key: "deliverCustName",
		name: "送货客户名称",
		prop: "deliverCustName",
		readonly: true,

	},
	{
		type: 'string',
		key: "leadTime",
		name: "运输提前期",
		prop: "leadTime"
	},
	{
		type: 'select',
		selectOption: [],
		selectKey: 'shipLevel',
		key: "deliveryPriority",
		name: "发货优先级",
		prop: "deliveryPriority"
	},
	{
		type: 'number',
		key: "discount",
		name: "现金折扣",
		prop: "discount"
	},
	{
		selectOption: [],
		type: 'select',
		key: "status",
		name: "销售资料状态",
		prop: "status",
		selectKey: 'status'
	},
	{
		type: 'string',
		key: "invoiceRemark",
		name: "开票备注",
		prop: "invoiceRemark"
	},
	{
		type: 'checkbox',
		key: "containAgencyInvoice",
		name: "代理费发票是否随货",
		prop: "containAgencyInvoice"
	},
	{
		type: 'checkbox',
		key: "containInvoice",
		name: "发票是否随货",
		prop: "containInvoice"
	}
]