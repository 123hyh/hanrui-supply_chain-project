export default [
	{
		type: "string",
		key: "purchaseName",
		name: "采购组织名称",
		prop: "purchaseName",
		readonly: true,
		btn: true
	},
	{
		type: "string",
		key: "purchaseCompanyName",
		name: "结算公司",
		prop: "purchaseCompanyName",
		btn: true,
    	readonly: true,
	},
	{
		type: "string",
		key: "deliveryCompanyName",
		name: "送货公司",
		prop: "deliveryCompanyName",
		btn: true,
    	readonly: true,
	},
	{
		selectOption: [],
		type: "select",
		selectKey: "supplierLevel",
		key: "supplierLevel",
		name: "供应商等级",
		prop: "supplierLevel"
	},
	{
		selectOption: [],
		type: "select",
		selectKey: "materielStatus",
		key: "purchaseStatus",
		name: "采购物料状态",
		prop: "purchaseStatus"
	},
	{
		type: "textarea",
		key: "remark",
		name: "备注",
		prop: "remark"
	}
]