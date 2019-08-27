import validate from "@/domain/common/validate"
export default [
	{
		type: "string",
		key: "billNo",
		name: "收款单单据编号",
		prop: "billNo"
	},
	{
		type: "number",
		key: "receiptsAmount",
		name: "收款金额",
		prop: "receiptsAmount"
	},
	// {
	// 	type: "number",
	// 	key: "baseCurrency",
	// 	name: "折本位币",
	// 	prop: "baseCurrency",
	// 	ruels: [
	// 		{
	// 			validator: validate.validateNum,
	// 			triggerL: ['blur','change']
	// 		}
	// 	]
	// },
	{
		type: "string",
		key: "otherSubject",
		name: "对方科目",
		prop: "otherSubject"
	},
	{
		type: "string",
		key: "costCenter",
		name: "成本中心",
		prop: "costCenter"
	},
	{
		selectOption: [],
		type: "select",
		selectKey: "typeOfExpense",
		key: "feeType",
		name: "费用类型",
		prop: "feeType"
	},
	{
		type: "string",
		key: "flowedInPlannedItem",
		name: "流入计划项目",
		prop: "flowedInPlannedItem"
	},
	{
		type: "textarea",
		key: "remark",
		name: "备注",
		prop: "remark"
	}
]