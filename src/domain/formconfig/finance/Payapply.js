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
		type: "select",
		selectOption: [],
		selectKey: "sourcePayment",
		key: "payType",
		name: "付款类型",
		prop: "payType",
		rules,
	},
	{
		btn: true,
		type: 'string',
		key: 'entrustOrderNo',
		name: '委托单号',
		prop: 'entrustOrderNo',
		readonly: true,
	},
	{
		type: "select",
		selectOption: [],
		selectKey: "payeeUnitType",
		key: "receiverDepartmentType",
		name: "收款单位类型",
		prop: "receiverDepartmentType",
	},
	{
		btn: true,
		type: "string",
		key: "receiverDepartmentName",
		name: "收款单位",
		prop: "receiverDepartmentName",
		readonly: true
	},
	{
		btn: true,
		type: "string",
		key: "companyName",
		name: "公司",
		prop: "companyName",
	},
	{
		type: "date",
		key: "plannedPayDate",
		name: "计划付款日期",
		prop: "plannedPayDate"
	},
	{
		type: "select",
		selectOption: [],
		selectKey: "currencyName",
		key: "payMoneyType",
		name: "付款币别",
		prop: "payMoneyType"
	},
	{
		type: "string",
		key: "exchangeRate",
		name: "汇率",
		prop: "exchangeRate"
	},
	{
		type: "date",
		key: "bizDate",
		name: "业务日期",
		prop: "bizDate"
	},
	{
		type: "select",
		selectOption: [],
		selectKey: "settlementMethod",
		key: "settlementMethod",
		name: "结算方式",
		prop: "settlementMethod"
	},
	{
		btn: true,
		type: "string",
		key: "receiverAccount",
		name: "收款账号",
		prop: "receiverAccount",
		readonly: true
	},
	{
		type: "string",
		key: "accountName",
		name: "开户名称",
		prop: "accountName"
	},
	{
		type: "string",
		key: "payBank",
		name: "收款银行",
		prop: "payBank"
	},
	{
		type: "string",
		name: "付款人电话",
		prop: "payerPhone"
	},
	{
		type: "select",
		selectOption: [],
		selectKey: "paymentStatus",
		key: "payState",
		name: "付款状态",
		prop: "payState"
	},
	{
		type: "string",
		key: "receiverCountry",
		name: "收款国家",
		prop: "receiverCountry",
	},
	{
		type: "string",
		key: "receiverRegion",
		name: "收款地区",
		prop: "receiverRegion",
	},
	{
		type: "string",
		key: "swiftCode",
		name: "SWIFT",
		prop: "swiftCode"
	},
	{
		type: "string",
		key: "destination",
		name: "目的地",
		prop: "destination"
	},
	{
		type: "money",
		key: "payAmount",
		name: "实付合计",
		prop: "payAmount"
	},
	{
		btn: true,
		type: "string",
		key: "departmentName",
		name: "部门",
		prop: "departmentName",
		readonly: true
	},
	{
		type: "string",
		key: "backAddress",
		name: "银行地址",
		prop: "backAddress"
	},
	{
		type: "string",
		key: "receiverProvence",
		name: "收款方省",
		prop: "receiverProvence",
	},
	{
		type: "string",
		key: "receiverCityCountry",
		name: "收款方市县",
		prop: "receiverCityCountry",
	},
	{
        type: "checkbox",
		key: "multipleBill",
		name: "是否来源多张单",
		prop: "multipleBill"
	},
	{
		type: "textarea",
		key: "remark",
		name: "备注",
		prop: "remark"
	},
	{
		type: "checkbox",
		key: "refundAllowedWhenArrears",
		name: "有欠款时允许退款",
		prop: "refundAllowedWhenArrears"
	},
	{
		type: "string",
		key: "auditDateExchangeRate",
		name: "审核日汇率",
		prop: "auditDateExchangeRate",
	},
	// {
	// 	checked: true,
	// 	key: "delegateBillNoFY",
	// 	name: "是否FY委托单号",
	// 	prop: "delegateBillNoFY"
	// },
	// {
	// 	text: true,
	// 	key: "auditor",
	// 	name: "审核人",
	// 	prop: "auditor"
	// },
	// {
	// 	date: true,
	// 	key: "auditTime",
	// 	name: "审核时间",
	// 	prop: "auditTime"
	// },
]