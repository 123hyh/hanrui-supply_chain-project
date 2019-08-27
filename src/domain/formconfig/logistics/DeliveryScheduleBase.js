export default [
	{
		text: true,
		key: "scheduleBaseCode",
		name: "上货计划单编码",
		prop: "scheduleBaseCode"
	},
	{
		date: true,
		key: "planDate",
		name: "计划上货日期",
		prop: "planDate"
	},
	{
		date: true,
		key: "planTime",
		name: "计划上货时间",
		prop: "planTime"
	},
	{
		text: true,
		key: "tripsCode",
		name: "车次编码",
		prop: "tripsCode"
	},
	{
		btn: true,
		text: true,
		key: "trips",
		name: "车次",
		prop: "trips",
		isShowPopover: true,
        readonly: true
	},
	{
		checked: true,
		key: "charterBus",
		name: "包车",
		prop: "charterBus"
	},
	{
		text: true,
		key: "busEntrustNo",
		name: "包车委托单号",
		prop: "busEntrustNo"
	},
	{
		selectOption: [],
		select: true,
		selectKey: "entryPort",
		key: "port",
		name: "口岸",
		prop: "port"
	},
	{
		btn: true,
		text: true,
		key: "startWarehouse",
		name: "起运地",
		prop: "startWarehouse",
		isShowPopover: true,
        readonly: true
	},
	{
		btn: true,
		text: true,
		key: "endWarehouse",
		name: "目的地",
		prop: "endWarehouse",
		isShowPopover: true,
        readonly: true
	},
	{
		btn: true,
		text: true,
		key: "platesNo",
		name: "车牌号",
		prop: "platesNo",
		isShowPopover: true,
        readonly: true
	},
	{
		text: true,
		key: "loadingBillNo",
		name: "提运单号",
		prop: "loadingBillNo",
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
		text: true,
		key: "carType",
		name: "车型",
		prop: "carType"
	},
	{
		selectOption: [],
		select: true,
		selectKey: "freightType",
		key: "freightType",
		name: "运费类型",
		prop: "freightType"
	},
	{
		btn: true,
		text: true,
		key: "containerCode",
		name: "集装箱代码",
		prop: "containerCode",
		isShowPopover: true,
        readonly: true
	},
	{
		type: true,
		text: true,
		key: "freight",
		name: "运费",
		prop: "freight"
	},
	{
		selectOption: [],
		select: true,
		selectKey: "currencyName",
		key: "currency",
		name: "币种",
		prop: "currency"
	},
	{
		text: true,
		key: "containerNo",
		name: "集装箱号",
		prop: "containerNo"
	},
	{
		text: true,
		key: "containerSpecification",
		name: "集装箱规格",
		prop: "containerSpecification"
	},
	{
		text: true,
		key: "remark",
		name: "备注",
		prop: "remark"
	},
	{
		date: true,
		key: "departTime",
		name: "发车时间",
		prop: "departTime"
	},
	{
		date: true,
		key: "arrivePortTime",
		name: "到达口岸时间",
		prop: "arrivePortTime"
	},
	{
		date: true,
		key: "leavePortTime",
		name: "离开口岸时间",
		prop: "leavePortTime"
	},
	{
		date: true,
		key: "destinationTime",
		name: "到目的地时间",
		prop: "destinationTime"
	},
	{
		date: true,
		key: "shipmentTime",
		name: "开始装货时间",
		prop: "shipmentTime"
	},
	{
		date: true,
		key: "overTime",
		name: "整车完成确报时间",
		prop: "overTime"
	},
	{
		checked: true,
		key: "hasSend",
		name: "本车已发出",
		prop: "hasSend"
	},
	{
		checked: true,
		key: "hasBackOrder",
		name: "车行是否已回六联单",
		prop: "hasBackOrder"
	},
	{
		text: true,
		key: "declareCodeHK",
		name: "香港报关编号",
		prop: "declareCodeHK"
	},
	{
		text: true,
		key: "user",
		name: "操作人",
		prop: "user"
	},
	{
		date: true,
		key: "operateTime",
		name: "操作时间",
		prop: "operateTime"
	}
]