export default [
// 	{
// 		type: "string",
// 		key: "solutionNo",
// 		name: "方案编号",
// 		prop: "solutionNo",
// 		disabled: true,
// 	},
// 	{
// 		type: "string",
// 		key: "chargeItemCode",
// 		name: "计费项目编码",
// 		prop: "chargeItemCode",
// 		disabled: true,
// 	},
	{
		type: "string",
		key: "chargeItemName",
		name: "计费项目名称",
		prop: "chargeItemName",
		btn: true,
		readonly: true,
	},
	{
		type: "checkbox",
		key: "inprice",
		name: "价内",
		prop: "inprice"
	},
	{
		type: "checkbox",
		key: "outprice",
		name: "价外",
		prop: "outprice"
	},
	{
		type: "string",
		key: "remark",
		name: "备注",
		prop: "remark"
	}
]