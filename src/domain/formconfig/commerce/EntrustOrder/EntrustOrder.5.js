import validate from "@/domain/common/validate"
//服务费计算
export default [
	{
		selectOption: [],
		type: "select",
		selectKey: "serviceFeeType",
		key: "serviceCharge",
		name: "种类",
		prop: "serviceCharge",
		disabled: true
	},
	{
		type: "string",
		key: "serviceTaxRate",
		name: "服务费率%",
		prop: "serviceTaxRate",
		// rules: [{
		// 	validator: validate.validateNaN,
		// 	trigger: ['blur', 'change']
		// }],
		disabled: true
	},
	{
		type: "string",
		key: "orderExchangeRate",
		name: "订单汇率%",
		prop: "orderExchangeRate",
		// rules: [{
		// 	validator: validate.validateNaN,
		// 	trigger: ['blur', 'change']
		// }],
		disabled: true
	},
	{
		type: "string",
		key: "serviceFee",
		name: "定额服务费",
		prop: "serviceFee",
		// rules: [{
		// 	validator: validate.validateNaN,
		// 	trigger: ['blur', 'change']
		// }],
		disabled: true
	},
]
