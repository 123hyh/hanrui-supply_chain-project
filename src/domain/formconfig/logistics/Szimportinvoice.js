import validate from "@/domain/common/validate.js";
const rules = validate.setRequired();
export default [{
  name: "",
  list: [{
    key: "billNo",
    name: "单据编号",
    prop: "billNo",
    readonly: true,
    type: "string",
  },
  {
    type: 'source',
    name: '源单据来源',
    prop: 'source',
    type: 'select',
    selectKey:'',
    selectOption:[ {
      itemKey: '1',
      itemValue: '买方(接)提货'
    }]
  },
  {
    btn: true,
    key: "buyerReceiveGoodsNo",
    name: "买方接(提)货",
    prop: "buyerReceiveGoodsNo",
    readonly: true,
    type: "string",
    api: "getLogistics",
    rules
  },
  {
    key: "receiveFirstSendFirst",
    name: "先收先发货",
    prop: "receiveFirstSendFirst",
    type: "checkbox",
  },
  {
    key: "deliverWhenEveryoneHere",
    name: "等齐送",
    prop: "deliverWhenEveryoneHere",
    type: "checkbox",
  },
  {
    key: "deliverToSend",
    name: "送改发",
    prop: "deliverToSend",
    type: "checkbox",
  },
  {
    btn: true, // 可变
    key: "warehouseName",
    name: "仓库",
    prop: "warehouseName",
    type: "string",
    api: "getWarehouseList",
    rules
  },
  ]
},
{
  name: "基础信息",
  list: [{
    key: "bizDate",
    name: "业务日期",
    prop: "bizDate",
    type: "date",
  },
  {
    btn: true,
    key: "deliveryNo",
    name: "提运单号",
    prop: "deliveryNo",
    type: "string",
    api: "queryHkschedulebase",
    rules
  },
  {
    btn: true,
    key: "delegeteName",
    name: "委托方",
    prop: "delegeteName",
    readonly: true,
    type: "string",
    api: "queryclientSearch",
    rules
  },
  {
    key: "costRange",
    name: "费用区间",
    prop: "costRange",
    type: "select",
    selectOption: [],
    selectKey: 'costInnterval'
  },
  ]
},
{
  name: "货运安排",
  list: [{
    selectOption: [],
    selectKey: "freightCarrierType",
    key: "carrierType",
    name: "承运方类型",
    prop: "carrierType",
    type: "select",
    rules
  },
  {
    btn: true,
    key: "carrierName",
    name: "承运商",
    prop: "carrierName",
    readonly: true,
    type: "string",
    rules
  },
  {
    selectOption: [],
    selectKey: "shippingType",
    key: "transportType",
    name: "运输方式",
    prop: "transportType",
    type: "select",
    rules
  },
  {
    btn: true,
    key: "vehicleTypeName",
    name: "车型",
    prop: "vehicleTypeName",
    readonly: true,
    type: "string",
    api: "getCarModelList",
    rules
  },
  {
    key: "timeFirst",
    name: "时效优先",
    prop: "timeFirst",
    type: "checkbox",
    rules
  },
  {
    key: "costFirst",
    name: "费用优先",
    prop: "costFirst",
    type: "checkbox",
  },
  {
    btn: true,
    key: "deliveryAreaName",
    name: "交货区域",
    prop: "deliveryAreaName",
    readonly: true,
    type: "string",
    api: "getAreaData",
    rules
  },
  {
    btn: true,
    key: "sendLineName",
    name: "发货路线",
    prop: "sendLineName",
    readonly: true,
    type: "string",
    api: "getDispatchLineData",
    rules
  },
  {
    selectOption: [],
    selectKey: "deliveryMethod",
    key: "deliveryType",
    name: "交货方式",
    prop: "deliveryType",
    type: "select",
    rules
  },
  {
    key: "dispatchArea",
    name: "派送范围",
    prop: "dispatchArea",
    type: "string",
    rules
  },
  {
    key: "pickupAddress",
    name: "自提地址",
    prop: "pickupAddress",
    type: "string",
    // rules
  },
  ]
},
{
  name: "时效要求",
  list: [{
    key: "requiredTimeArrival",
    name: "要求到货时间",
    prop: "requiredTimeArrival",
    type: "date",
    rules
  },
  {
    selectOption: [],
    selectKey: "deliveryTime",
    key: "deliveryTimeSegment",
    name: "派送时段",
    prop: "deliveryTimeSegment",
    type: "select",
    rules
  },
  {
    btn: true,
    key: "transportTimeName",//transportTimeEfficiency
    name: "运输时效",
    prop: "transportTimeName",
    readonly: true,
    type: "string",
    api: "getTimeLimitData",
    rules
  },
  {
    selectOption: [],
    key: "timeEfficiencyType",
    name: "时效分类",
    prop: "timeEfficiencyType",
    type: "select",
    selectKey: "timeClassification",
    rules
  },
  {
    key: "receivables",
    name: "需收款",
    prop: "receivables",
    type: "checkbox",
  },
  {
    key: "deliveryUrgent",
    name: "加急送货",
    prop: "deliveryUrgent",
    type: "checkbox",
  },
  ]
},
{
  name: "收货方信息",
  list: [
    {
      type: "string",
      key: "consigneeName",
      name: "收货公司", // 收货方
      prop: "consigneeName",
      btn: true,
      readonly: true,
      api: "getCustomerList",
      rules
    },
    {
      type: "string",
      key: "contactsName",
      name: "联系人", // 委托方带出
      prop: "contactsName",
      disabled: true,
      rules
    },
    {
      key: "contactsPhone",
      name: "联系人电话",
      prop: "contactsPhone",
      type: "string",
      disabled: true,
      rules
    },
    {
      key: "receiveAddress",
      name: "收货地址",
      prop: "receiveAddress",
      type: "string",
      disabled: true,
      rules
    },
  ]
},
{
  name: "",
  list: [
    {
      key: "receiveCityName",
      name: "收件城市",
      prop: "receiveCityName",
      type: "string",
      btn: true,
      api: "getCityList",
      rules
    },
    {
      key: "sendCityName",
      name: "寄件城市",
      prop: "sendCityName",
      type: "string",
      btn: true,
      api: "getCityList",
      rules
    },
    {
      btn: true,
      key: "storekeeperName",
      name: "仓管员",
      prop: "storekeeperName",
      readonly: true,
      type: "string",
      api: "getEmployeeInfo",
      rules
    },
    {
      key: "platesNo",
      name: "板数",
      prop: "platesNo",
      type: "string",
      rules
    },
  ]
},
{
  name: "",
  list: [
    {
      selectOption: [],
      key: "freightPayType",
      name: "运费付费方式",
      prop: "freightPayType",
      type: "select",
      selectKey: "paymentMethod",
    },
    {
      selectOption: [],
      selectKey: "freightCarrierType",
      key: "freightReceiverType",
      name: "运费承担方类型",
      prop: "freightReceiverType",
      readonly: true,
      type: "select",
    },
    {
      btn: true,
      key: "freightPayerName",
      name: "运费承担方",
      prop: "freightPayerName",
      readonly: true,
      type: "string",
    },
    {
      key: "serviceCharge",
      name: "服务费收入",
      prop: "serviceCharge",
      type: "number",
      rules: [{
        validator: validate.validateNum,
      }],
    },
    {
      key: "chargingObject",
      name: "计费对象",
      prop: "chargingObject",
      type: "string",
    },
    {
      key: "mainland",
      name: "境内",
      prop: "mainland",
      type: "checkbox",
    },
    {
      key: "abroad",
      name: "境外",
      prop: "abroad",
      type: "checkbox",
    },
    {
      key: "premium",
      name: "保费",
      prop: "premium",
      type: "number",
      rules: [{
        validator: validate.validateNum,
      }],
    },
    {
      key: "importAddedValueTax",
      name: "进口增值税金",
      prop: "importAddedValueTax",
      type: "number",
      rules: [{
        validator: validate.validateNum,
      }],
    },
    {
      selectOption: [],
      selectKey: "miscFeeCategory",
      key: "incidentalType",
      name: "杂费类别",
      prop: "incidentalType",
      type: "select",
    },
    {
      key: "incidentalAmount",
      name: "杂费金额",
      prop: "incidentalAmount",
      type: "number",
      rules: [{
        validator: validate.validateNum,
      }],
    },
    {
      key: "cashAmount",
      name: "现金金额",
      prop: "cashAmount",
      type: "number",
      rules: [{
        validator: validate.validateNum,
      }],
    },
    {
      selectOption: [],
      selectKey: "currencyName",
      key: "currency",
      name: "币别",
      prop: "currency",
      type: "select",
    },
    {
      key: "waitNotice",
      name: "等通知",
      prop: "waitNotice",
      type: "checkbox",
    },
    {
      key: "priceIncludeFreight",
      name: "货价含运费",
      prop: "priceIncludeFreight",
      type: "checkbox",
    },
    {
      key: "splitCargo",
      name: "分货",
      prop: "splitCargo",
      type: "checkbox",
    },
    {
      key: "invoiceNo",
      name: "发票号",
      prop: "invoiceNo",
      type: "string",
    },
    {
      key: "printRemark",
      name: "送货单打印备注",
      prop: "printRemark",
      type: "string",
    },
    {
      key: "customerDesignatedCarrier",
      name: "客户指定承运商",
      prop: "customerDesignatedCarrier",
      type: "checkbox",
    },
    {
      btn: true,
      key: "recommendedName",
      name: "推荐承运商",
      prop: "recommendedName",
      readonly: true,
      type: "string",
      api: "querycarrierbaseSearch",
    },
    {
      key: "recommendedFreight",
      name: "推荐运费",
      prop: "recommendedFreight",
      type: "number",
      rules: [{
        validator: validate.validateNum,
      }],
    },
    {
      key: "orderNo",
      name: "订单号",
      prop: "orderNo",
      type: "string",
    },
    {
      key: "batchNo",
      name: "批次号",
      prop: "batchNo",
      type: "string",
    },
    {
      key: "remark",
      name: "备注",
      prop: "remark",
      type: "string",
    },
    //  {
    //   selectOption: [],
    //   selectKey: "sourcedocumentType",
    //   key: "sourceBillType",
    //   name: "来源单据类型",
    //   prop: "sourceBillType",
    //   type: "select",
    // },
    // {
    //   type: 'string',
    //   key: "delegeteBillNo",
    //   name: "委托单号",
    //   prop: "delegeteBillNo",
    //   readonly: true
    // },
    // {
    //   key: "fromWMS",
    //   name: "来自WMS",
    //   prop: "fromWMS",
    //   type: "checkbox",
    // },
    // {
    //   selectOption: [],
    //   selectKey: "orderStatus",
    //   key: "billStatus",
    //   name: "单据状态",
    //   prop: "billStatus",
    //   type: "select",
    // 	disabled: true
    // },
    // {
    //   key: "printAmount",
    //   name: "是否打印金额",
    //   prop: "printAmount",
    //   type: "checkbox",
    // },
    // {
    //   key: "receiveCompanyName",
    //   name: "收货公司",
    //   prop: "receiveCompanyName",
    //   type: "string",
    // 	btn: true,
    // 	readonly: true,
    // 	api: "querycompanyinfoSearch",
    // },
    // {
    //   key: "billBusiness",
    //   name: "本单商务", // 委托方 - 委托单带出
    //   prop: "billBusiness",
    //   type: "string",
    // 	disabled: true,
    //   rules
    // },
    // {
    //   key: "businessConfirm",
    //   name: "商务确认", // 审核后自动填充
    //   prop: "businessConfirm",
    //   type: "string",
    // 	disabled: true,
    //   rules
    // },
    // {
    //   key: "confirmTime",
    //   name: "确认时间", // 审核后自动填充
    //   prop: "confirmTime",
    //   type: "date",
    // 	disabled: true
    // },
    // {
    //   key: "dispatchNo",
    //   name: "调度单号",
    //   prop: "dispatchNo",
    //   type: "string",
    // },
    // {
    //   key: "auditor",
    //   name: "审核人",
    //   prop: "auditor",
    //   type: "string",
    // },
    // {
    //   key: "auditTime",
    //   name: "审核时间",
    //   prop: "auditTime",
    //   type: "date",
    // },
  ]
},
]