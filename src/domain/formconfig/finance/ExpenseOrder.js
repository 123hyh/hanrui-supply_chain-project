import validate from "@/domain/common/validate"
const rules = validate.setRequired()
export default [
	{
		type: "string",
		key: "billNo",
		name: "单据编号",
		prop: "billNo",
		disabled: true,
		rules,
	},
	{
		btn: true,
		type: "string",
		key: "applicationDept",
		name: "申请人部门",
		prop: "applicationDept"
	},
	{
		type: "string",
		key: "expenseName",
		name: "名称",
		prop: "expenseName"
	},
	{
		btn:true,
		type: "string",
		key: "expensePerson",
		name: "报销人",
		prop: "expensePerson"
	},
	{
		type: "date",
		key: "applicationDate",
		name: "申请日期",
		prop: "applicationDate",
		disabled: true,
	},
	{
		type: "select",
		selectOption: [],
		selectKey: "degreeUrgency",
		key: "emergencyLevel",
		name: "紧急程度",
		prop: "emergencyLevel"
	},
	{
		btn: true,
		type: "string",
		key: "paymentDept",
		name: "费用支付部门",
		prop: "paymentDept"
	},
	{
		btn: true,
		type: "string",
		key: "applicationCompany",
		name: "申请人公司",
		prop: "applicationCompany"
	},
	{
		type: "string",
		key: "position",
		name: "职位",
		prop: "position"
	},
	{
		btn: true,
		type: "string",
		key: "paymentCompany",
		name: "费用支付公司",
		prop: "paymentCompany"
	},
	{
		btn: true,
		type: "string",
		key: "paymentBear",
		name: "费用承担对象",
		prop: "paymentBear"
	},
	{
		type: "string",
		key: "phoneNo",
		name: "联系电话",
		prop: "phoneNo"
	},
	{
		type: "select",
		selectOption: [],
		selectKey: "freightPaymentWay",
    	key: "paymentType",
		name: "支付方式",
		prop: "paymentType"
	},
	{
		type: "string",
		key: "attachmentNumbers",
		name: "附件数",
		prop: "attachmentNumbers"
	},
	{
		type: "select",
		selectOption: [],
		selectKey: "currencyName",
    	key: "paymentType",
		key: "currrency",
		name: "币别",
		prop: "currrency"
	},
	{
		type: "string",
		key: "totalAmount",
		name: "合计金额",
		prop: "totalAmount"
	},
	{
		type: "string",
		key: "reason",
		name: "事由",
		prop: "reason"
	},
	{
		type: "string",
		key: "remark",
		name: "备注",
		prop: "remark"
	},
	{
		type: "string",
		key: "expenseAmount",
		name: "核定报销总额",
		prop: "expenseAmount"
	},
	{
		type: "string",
		key: "advanceAmount",
		name: "预支金额",
		prop: "advanceAmount"
	},
	{
		type: "string",
		key: "cash",
		name: "付现",
		prop: "cash"
	},
	// {
	// 	type: "string",
	// 	key: "reviewer",
	// 	name: "审核人",
	// 	prop: "reviewer"
	// }
]