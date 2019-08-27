export default [
	{
		type: "string",
		key: "consignee",
		name: "收货方",
		prop: "consignee"
	},
	{
		btn:true,
		type: "string",
		key: "deliveryNo",
		name: "提运单号",
		prop: "deliveryNo",
	},
	{
		btn:true,
		type: "string",
		key: "delegeteBillNo",
		name: "委托单号",
		prop: "delegeteBillNo",
	},
	{
		btn: true,
		type: "string",
		key: "transportTimeEfficiency",
		name: "运输时效",
		prop: "transportTimeEfficiency",
	},
	{
		type: "string",
		key: "billNo",
		name: "来源单据编号",
		prop: "billNo"
	},
	{
		type: "string",
		key: "shipTime",
		name: "要求发货日期",
		prop: "shipTime"
	},
	{
		type: "string",
		key: "sendLine",
		name: "路线区域",
		prop: "sendLine"
	},

	{	
		selectOption: [],
		type: 'select',
		selectKey: "DeliveryPeriod",
		key: "deliveryTimeSegment",
		name: "派送时段",
		prop: "deliveryTimeSegment"
		},
		// {	
		// 	selectOption: [],
		// 	type: 'select',
		// 	selectKey: "DeliveryPeriod",
		// 	key: "deliveryTimeSegment",
		// 	name: "排序条件",
		// 	prop: "deliveryTimeSegment"
		// 	},
			{	
				selectOption: [],
				type:"select",
				key: "orderType",
				name: "来源单据类型",
				prop: "orderType"
				},

]