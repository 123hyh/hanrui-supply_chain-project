import validate from "@/domain/common/validate.js";
const rules = validate.setRequired();
export default [
	{
		type: "string",
		key: "billCode",
		name: "编码",
		prop: "billCode",
		disabled: true,
		rules
	},
	{
		type: "string",
		key: "warehouseQuotionName",
		name: "名称",
		prop: "warehouseQuotionName",
		rules
	},
	{
		type: "string",
		key: "companyName",
		name: "公司",
		prop: "companyName",
		btn: true,
		readonly: true,
		rules
	},
	{
		type: "string",
		key: "clientName",
		name: "委托方",
		prop: "clientName",
		btn: true,
		readonly: true,
		rules
	},
	{
		type: "select",
		selectOption: [],
		selectKey: "currencyName",
		key: "currency",
		name: "币种",
		prop: "currency",
		rules
	},
	{
		type: "string",
		key: "warehouseName",
		name: "仓库",
		prop: "warehouseName",
		btn: true,
		readonly: true,
		rules
	},
	{
		type: 'select',
		selectOption: [],
		selectKey: "BillingMethod",
		key: "calcuMethod",
		name: "仓储费计算方式",
		prop: "calcuMethod",
		rules
	},
	{
		type: "textarea",
		key: "remark",
		name: "备注",
		prop: "remark"
	},
// 	{
// 		type: "select",
// 		selectOption: [],
// 		selectKey: "useStatus",
// 		key: "useStatus",
// 		name: "使用状态",
// 		prop: "useStatus"
// 	}
]