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
		key: "delegeteBillNo",
		name: "委托单号",
		prop: "delegeteBillNo",
		readOnly:true
	},
	{
		selectOption: [],
		type:"select",
		key: "orderType",
		name: "来源单据类型",
		prop: "orderType"
	},
	{
		type: "string",
		key: "billNo",
		name: "来源单据编号",
		prop: "billNo"
	},
	{
		btn:true,
		type: "string",
		key: "deliveryNo",
		name: "提运单号",
		prop: "deliveryNo",
		readOnly:true
	},
	{
		type: "string",
		key: "sendLine",
		name: "路线区域",
		prop: "sendLine"
	},
	{
		btn: true,
		type: "string",
		key: "transportTimeEfficiency",
		name: "运输时效",
		prop: "transportTimeEfficiency",
		readOnly:true
	},
	{
		type: "date",
		key: "shipTime",
		name: "要求发货日期",
		prop: "shipTime"
	},
	{	
		selectOption: [],
		type: 'select',
		selectKey: "DeliveryPeriod",
		key: "deliveryTimeSegment",
		name: "派送时段",
		prop: "deliveryTimeSegment"
	},
]