
import validate from "@/domain/common/validate"
const rules = validate.setRequired()
export default [
	{
		type: "string",
		key: "clientNo",
		name: "委托方编号",
		prop: "clientNo",
		disabled: true,
	},
	{
	  type: "string",
	  key: "companyName",
	  name: "公司名称",
	  prop: "companyName",
		btn: true,
		readonly: true,
	  rules
	},
	{
	  type: "string",
	  key: "taxNo",
	  name: "纳税识别号",
	  prop: "taxNo",
	  rules
	},
	{
	  type: "string",
	  key: "bankName",
	  name: "开户行",
	  prop: "bankName",
	  rules
	},
	{
	  type: "string",
	  key: "bankNo",
	  name: "银行账号",
	  prop: "bankNo",
	  rules
	},
	{
		selectOption: [],
		type: 'select',
		selectKey: 'InvoiceTypes',
		key: 'invoiceType',
		name: '发票类型',
		prop: 'invoiceType',
		rules
	},
	{
		type: "string",
		key: "invoiceShortName",
		name: "开票简称",
		prop: "invoiceShortName"
	},
	{
		type: "string",
		key: "invoiceName",
		name: "开票全称",
		prop: "invoiceName"
	},
	{
		type: "string",
		key: "invoiceAddress",
		name: "收票地址",
		prop: "invoiceAddress"
	},
	{
		type: "string",
		key: "invoiceTel",
		name: "发票签收人联系电话",
		prop: "invoiceTel"
	},
	{
		type: "string",
		key: "invoiceEmail",
		name: "发票签收人Email",
		prop: "invoiceEmail"
	},
	{
		type: "string",
		key: "invoiceFile",
		name: "发票签收人预留印件",
		prop: "invoiceFile"
	},
	{
		selectOption: [],
		type: "select",
		selectKey: "InvoiceSendingMethod",
		key: "invoiceSendMode",
		name: "发票发送方式",
		prop: "invoiceSendMode"
	},
	{
		type: "string",
		key: "remark",
		name: "备注",
		prop: "remark"
	}
]