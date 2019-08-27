//协议
export default [
	{
		type: "string",
		btn: true,
		key: "agreementName",
		name: "协议名称",
		prop: "agreementName",
		disabled: true,
	},
	{
		type: "string",
		btn: true,
		key: "agreementSolutionName",
		name: "协议方案",
		prop: "agreementSolutionName",
		disabled: true,
	},
	{
		type: "checkbox",
		key: "reportUntilComplete",
		name: "等齐报", //add
		prop: "reportUntilComplete"
	},
	{
		type: "checkbox",
		key: "sendUntilComplete",
		name: "等齐送", //add
		prop: "sendUntilComplete"
	},
	// {
	// 	type: "checkbox",
	// 	key: "logisticsOnly",
	// 	name: "纯物流", //add
	// 	prop: "logisticsOnly"
	// },
]
