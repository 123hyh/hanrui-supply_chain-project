import validate from "@/domain/common/validate.js";
const rules = validate.setRequired();
export default [
	{
		type: "string",
		key: "purchaseName",
		name: "采购组织名称",
		prop: "purchaseName",
		btn: true,
    readonly: true,
    rules
	},
	{
		type: "string",
		key: "purchaseCompanyName",
		name: "结算公司",
		prop: "purchaseCompanyName",
		btn: true,
    readonly: true,
    rules
	},
	{
		type: "string",
		key: "deliveryCompanyName",
		name: "送货公司",
		prop: "deliveryCompanyName",
    btn: true,
    readonly: true,
    rules
	},
	{
		selectOption: [],
		type: "select",
		key: "supplierLevel",
		selectKey: "supplierLevel",
		name: "供应商等级",
		prop: "supplierLevel"
	},
	{
		type: "textarea",
		key: "remarks",
		name: "备注",
		prop: "remarks"
	}
]
