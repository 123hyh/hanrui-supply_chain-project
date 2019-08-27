export default [
	// {
	// 	type: "string",
	// 	key: "deliveryCompanyCode",
	// 	name: "提货公司编码",
	// 	prop: "deliveryCompanyCode",
	// 	disabled: true
	// },
	{
		type: "string",
		key: "deliveryCompanyName",
		name: "提货公司名称",
		prop: "deliveryCompanyName",
		btn: true,
    	readonly: true,
	},
	{
		type: "string",
		key: "liaisonPerson",
		name: "联络人",
		prop: "liaisonPerson"
	},
	{
		type: "string",
		key: "shippingCompany",
		name: "送货公司",
		prop: "shippingCompany"
	},
	{
		selectOption: [],
		type: "select",
		selectKey: "creditLevel",
		key: "carrierLevel",
		name: "承运商等级",
		prop: "carrierLevel"
	},
	{
		type: "string",
		key: "cashDiscount",
		name: "现金折扣",
		prop: "cashDiscount"
	},
	{
		type: "string",
		key: "defaultPurchaseGroup",
		name: "默认采购组",
		prop: "defaultPurchaseGroup"
	}
]