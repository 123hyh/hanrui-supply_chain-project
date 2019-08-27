//买方
export default [
	{
		type: "string",
		btn: true,
		key: "customerName",
		name: "客户",
		prop: "customerName",
		disabled: true,
	},
	{
		selectOption: [],
		type: "select",
		key: "currency",
		selectKey: "currencyName",
		name: "采购币别",
		prop: "currency"
	},
	{
		type: "checkbox",
		key: "consignmentPayment",
		name: "委托付款",
		prop: "consignmentPayment"
	},
	{
		type: "checkbox",
		key: "pickUpGoods",
		name: "买方接(提)货",
		prop: "pickUpGoods"
	},
]
