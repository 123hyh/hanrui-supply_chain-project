import validate from "@/domain/common/validate.js";
const rules = validate.setRequired();
export default [
	{
		type: "string",
		key: "billNo",
		name: "付款单编码",
		prop: "billNo",
		disabled: true,
	},
	{
		type: "string",
		key: "delegateBillNo",
		name: "付款申请单",
		prop: "delegateBillNo",
		disabled: true,
	},
	{
		type: "money",
		key: "amount",
		name: "付款金额",
		prop: "amount",
		rules
	},
	{
		type: "string",
		key: "baseCurrency",
		name: "折本位币",
		prop: "baseCurrency"
	},
	{
		type: "string",
		key: "costCenterName",
		name: "成本中心",
		prop: "costCenterName"
	},
	{
		type: "select",
		selectOption: [],
		selectKey: "typeOfExpense",
		key: "feeType",
		name: "费用类型",
		prop: "feeType"
	},
	{
		type: "string",
		key: "otherSubject",
		name: "对方科目",
		prop: "otherSubject"
	},
	// {
	// 	type: "string",
	// 	key: "flowedOutPlannedItem",
	// 	name: "流出计划项目",
	// 	prop: "flowedOutPlannedItem"
	// },
	{
		type: "textarea",
		key: "remark",
		name: "备注",
		prop: "remark"
	},
	{
		selectOption: [],
		type: "select",
		selectKey: "currencyName",
		key: "billMoney",
		name: "订单币",
		prop: "billMoney"
	},
	{
		type: "select",
		selectOption: [],
		selectKey: "sourceFinanciaRequisition",
		key: "billType",
		name: "单据类型",
		prop: "billType"
	},
	{
		type: "money",
		key: "incidentalAmount",
		name: "杂费金额",
		prop: "incidentalAmount"
	},
	{
		type: "money",
		key: "entrustPayAmount",
		name: "委托付款金额",
		prop: "entrustPayAmount"
	},
	{
		type: "string",
		key: "exchangeRateOnPayDay",
		name: "付款日汇率",
		prop: "exchangeRateOnPayDay"
	},
	{
		btn:true,
		type: "string",
		key: "supplierName",
		name: "供应商",
		prop: "supplierName"
	}
]