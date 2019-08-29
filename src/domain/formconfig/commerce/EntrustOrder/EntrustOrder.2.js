//卖方
export default [
	{
		type: "string",
		btn: true,
		key: "supplierName",
		name: "供应商", //add
		prop: "supplierName",
		disabled: true,
	},
	{
		type: "string",
		key: "supplierContactName",
		name: "联系人",
		prop: "supplierContactName"
	},
	// {
	// 	type: "string",
	// 	key: "supplierAssociatedInfo",
	// 	name: "卖方关联信息",
	// 	prop: "supplierAssociatedInfo"
	// },
	{
		type: "string",
		key: "supplierPhone",
		name: "手机",
		prop: "supplierPhone"
	},
	{
		type: "string",
		key: "supplierTel",
		name: "电话",
		prop: "supplierTel"
	},
	{
		selectOption: [],
		type: "select",
		key: "supplierCurrency",
		selectKey: "currencyName",
		name: "销售币别",
		prop: "supplierCurrency"
	},
	{
		type: "checkbox",
		key: "consignmentCollection",
		name: "委托收款",
		prop: "consignmentCollection"
	},
	{
		type: "checkbox",
		key: "deliverGoods",
		name: "卖方交(发)货",
		prop: "deliverGoods"
	},
]
