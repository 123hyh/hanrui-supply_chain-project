import validate from "@/domain/common/validate.js";
const rules = validate.setRequired();
export default [
// 	{
// 		type: "string",
// 		key: "billCode",
// 		name: "仓储报价单编码",
// 		prop: "billCode",
// 		disabled: true
// 	},
// 	{
// 		type: "string",
// 		key: "itemCode",
// 		name: "编码",
// 		prop: "itemCode"
// 	},
	{
		type: "string",
		key: "financeProjectName",
		name: "计费项目",
		prop: "financeProjectName",
		btn: true,
		readonly: true,
		rules
	},
	{
		type: "string",
		key: "singlePrice",
		name: "单价",
		prop: "singlePrice",
		rules
	},
	{
		type: "string",
		key: "miniConsumption",
		name: "最低消费",
		prop: "miniConsumption",
		rules
	},
	{
		type: "string",
		key: "feeUnit",
		name: "计费单位",
		prop: "feeUnit",
		rules
	},
	{
		type: "string",
		key: "settlementCycle",
		name: "结算周期",
		prop: "settlementCycle",
		rules
	},
	{
		type: "checkbox",
		key: "useSettlementCycle",
		name: "不足周期按周期算",
		prop: "useSettlementCycle"
	},
	{
		type: "textarea",
		key: "remark",
		name: "备注",
		prop: "remark"
	}
]