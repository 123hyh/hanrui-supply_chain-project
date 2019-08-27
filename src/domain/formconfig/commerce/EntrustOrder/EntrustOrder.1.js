//委托方
export default [
	{
		type: "string",
		btn: true,
		key: "clientName",
		name: "委托方",
		prop: "clientName",
		disabled: true,
	},
	// {
	// 	selectOption: [],
	// 	type: "select",
	// 	selectKey: "associatedInformation",
	// 	key: "clientAssociatedInfo",
	// 	name: "委托方关联信息",
	// 	prop: "clientAssociatedInfo"
	// },
	{
		btn: true,
		type: "string",
		key: "clientContactName",
		name: "联系人",//一个委托方有多个联系人，选择其中一个，带出相应的电话和手机
		prop: "clientContactName",
		disabled: true,
	},
	{
		type: "string",
		key: "clientTel",
		name: "电话",
		prop: "clientTel",
		disabled: true,
	},
	{
		type: "string",
		key: "clientPhone",
		name: "手机",
		prop: "clientPhone",
		disabled: true,
	},
	{
		type: "string",
		key: "clientOrderNo",
		name: "订单号",
		prop: "clientOrderNo"
	},
]
