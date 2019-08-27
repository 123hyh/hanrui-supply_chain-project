import validate from "@/domain/common/validate.js";
const rules = validate.setRequired();
export default [
  {
    key: "scheduleBaseCode",
    name: "单据编码",
    prop: "scheduleBaseCode",
    readonly: true,
    type: "string",
  },
  /* 	{
      key: "planDate",
      name: "计划上货日期",
      prop: "planDate",
      type: "date",
    }, */
  {
    key: "planTime",
    name: "计划上货时间",
    prop: "planTime",
    type: "time",
  },
  {
    btn: true,
    key: "trips",
    name: "车次",
    prop: "trips",
    isShowPopover: true,
    readonly: true,
    required: true,
    type: "string",
    api: "queryTrainnumber",
    rules
  },
  {
    key: "loadingBillNo",
    name: "提运单号",
    prop: "loadingBillNo",
    type: "string",
    rules
  },
  {
    key: "charterBus",
    name: "包车",
    prop: "charterBus",
    type: "checkbox",
  },
  {
    key: "busEntrustNo",
    name: "包车委托单号",
    prop: "busEntrustNo",
    type: "string",
  },
  {
    selectOption: [],
    selectKey: "entryPort",
    key: "port",
    name: "口岸",
    prop: "port",
    type: "select",
    rules
  },
  {
    btn: true,
    key: "startWarehouseName",
    name: "起运地",
    prop: "startWarehouseName",
    isShowPopover: true,
    readonly: true,
    type: "string",
    api: "getWarehouseList",
    rules
  },
  {
    btn: true,
    key: "endWarehouseName",
    name: "目的地",
    prop: "endWarehouseName",
    isShowPopover: true,
    readonly: true,
    type: "string",
    api: "getWarehouseList",
    rules
  },
  {
    key: "carType",
    name: "车型",
    prop: "carType",
    type: "string",
  },
  {
    btn: true,
    key: "platesNoName",
    name: "车牌号",
    prop: "platesNoName",
    isShowPopover: true,
    readonly: true,
    type: "string",
    api: "queryVehicleinfo",
    rules
  },
  {
    btn: true,
    key: "carrierName",
    name: "承运商",
    prop: "carrierName",
    isShowPopover: true,
    readonly: true,
    type: "string",
    api: "querycarrierbaseSearch",
    rules
  },
  {
    selectOption: [],
    selectKey: "freightType",
    key: "freightType",
    name: "运费类型",
    prop: "freightType",
    type: "select",
    rules
  },
  {
    btn: true,
    key: "containerName",
    name: "集装箱代码",
    prop: "containerName",
    isShowPopover: true,
    readonly: true,
    type: "string",
    api: "queryContainer",
    rules
  },
  {
    key: "freight",
    name: "运费",
    prop: "freight",
    type: "number",
    rules: [{ validator: validate.validateNum, }],
  },
  {
    selectOption: [],
    selectKey: "currencyName",
    key: "currency",
    name: "币种",
    prop: "currency",
    type: "select",
  },
  {
    key: "containerNo",
    name: "集装箱号",
    prop: "containerNo",
    type: "string",
    rules
  },
  {
    key: "containerSpecification",
    name: "集装箱规格",
    prop: "containerSpecification",
    type: "string",
  },
  {
    isString: true,
    key: "remark",
    name: "备注",
    prop: "remark",
    type: "string",
  },
  {
    date: true,
    key: "departTime",
    name: "发车时间",
    prop: "departTime",
    type: "date",
  },
  {
    date: true,
    key: "arrivePortTime",
    name: "到达口岸时间",
    prop: "arrivePortTime",
    type: "date",
    rules
  },
  {
    date: true,
    key: "leavePortTime",
    name: "离开口岸时间",
    prop: "leavePortTime",
    type: "date",
    rules
  },
  {
    date: true,
    key: "destinationTime",
    name: "到目的地时间",
    prop: "destinationTime",
    type: "date",
    rules
  },
  {
    date: true,
    key: "shipmentTime",
    name: "开始装货时间",
    prop: "shipmentTime",
    type: "date",
    rules
  },
  {
    date: true,
    key: "overTime",
    name: "整车完成确报时间",
    prop: "overTime",
    type: "date",
    rules
  },
  {
    checked: true,
    key: "hasSend",
    name: "本车已发出",
    prop: "hasSend",
    type: "checkbox",
  },
  {
    checked: true,
    key: "hasBackOrder",
    name: "车行是否已回六联单",
    prop: "hasBackOrder",
    type: "checkbox",
  },
  {
    isString: true,
    key: "declareCodeHK",
    name: "香港报关编号",
    prop: "declareCodeHK",
    type: "string",
  },
  // {
  // 	isString: true,
  // 	key: "user",
  // 	name: "操作人",
  // 	prop: "user",
  // 	type: "string",
  // },
  // {
  // 	date: true,
  // 	key: "operateTime",
  // 	name: "操作时间",
  // 	prop: "operateTime",
  // 	type: "date",
  // }
]