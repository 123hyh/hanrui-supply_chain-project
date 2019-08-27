export default [
	{
		text: true,
		key: "distributionTaskCode",
		name: "单据编号",
		prop: "distributionTaskCode"
	},
	{
		selectOption: [],
		select: true,
		selectKey: "schedulingType",
		key: "dispatchType",
		name: "调度类型",
		prop: "dispatchType"
	},{
		selectOption: [],
		select: true,
		selectKey: "orderStatus",
		key: "orderStatus",
		name: "单据状态",
		prop: "orderStatus"
	},
	{
		btn: true,
		text: true,
		key: "carrier",
		name: "承运商",
		prop: "carrier",
		isShowPopover: true,
        readonly: true
	},
	{
		btn: true,
		text: true,
		key: "deliveryTrain",
		name: "配送车次",
		prop: "deliveryTrain",
		isShowPopover: true,
        readonly: true
	},
	{
		btn: true,
		text: true,
		key: "deliveryCar",
		name: "配送车辆",
		prop: "deliveryCar",
		isShowPopover: true,
        readonly: true
	},
	{
		text: true,
		key: "carType",
		name: "车型",
		prop: "carType"
	},
	{
		btn: true,
		text: true,
		key: "driver",
		name: "司机",
		prop: "driver",
		isShowPopover: true,
        readonly: true
	},
	{
		text: true,
		key: "driverPhone",
		name: "司机电话",
		prop: "driverPhone"
	},
	{
		date: true,
		key: "departureTime",
		name: "发车时间",
		prop: "departureTime"
	},
	{
		text: true,
		key: "remark",
		name: "备注",
		prop: "remark"
	},
	{
		date: true,
		key: "deliveryTime",
		name: "配送时间",
		prop: "deliveryTime"
	},
	{
		selectOption: [],
		select: true,
		selectKey: "deliveryTime",
		key: "timeSlot",
		name: "时间段",
		prop: "timeSlot"
	},
	{
		date: true,
		key: "outcarTime",
		name: "出库时间",
		prop: "outcarTime"
	},
	{
		btn: true,
		text: true,
		key: "shopper",
		name: "配送员",
		prop: "shopper",
		isShowPopover: true,
        readonly: true
	},
	{
		selectOption: [],
		select: true,
		selectKey: "",
		key: "chargingScheme",
		name: "计费方案",
		prop: "chargingScheme"
	},
	{
		btn: true,
		text: true,
		key: "shippingRoute",
		name: "发运路线",
		prop: "shippingRoute",
		isShowPopover: true,
        readonly: true
	},
	{
		checked: true,
		key: "outCar",
		name: "外请车辆",
		prop: "outCar"
	}
]