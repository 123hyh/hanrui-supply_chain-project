import validate from "@/domain/common/validate.js";
const rules = validate.setRequired();
export default [
  {
    name: "货物基础信息",
    list: [{
      key: "shipmentBaseCode",
      name: "发运单编码",
      prop: "shipmentBaseCode",
      readonly: true,
      type: "string",
			rules
    },
    {
      selectOption: [],
      key: "originOrderType",
      name: "来源单据类型",
      prop: "originOrderType",
      type: "select",
      selectKey: "sourcedocumentType",
    },
    {
      btn: true,
      key: "originOrder",
      name: "来源单据",
      prop: "originOrder",
      readonly: true,
      type: "string",
      api: "queryImportinvoice",
      rules
    },
    {
      date: true,
      key: "bizDate",
      name: "业务日期",
      prop: "bizDate",
      type: "date",
			rules
    },
    {
      key: "trainNo",
      name: "车次",
      prop: "trainNo",
      type: "string",
			btn: true,
			readonly: true,
			api: "queryTrainnumber",
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
      key: "boxCount",
      name: "总箱数",
      prop: "boxCount",
      type: "number",
      rules: [{
        required: true, message: '必填', trigger: 'blur',
        validator: validate.validateNum,
      }],
    },
    {
      key: "weight",
      name: "计费重量",
      prop: "weight",
      type: "number",
      rules: [{
        validator: validate.validateNum,
      }],
    },
    // {
    //   btn: true,
    //   key: "thisBusinessName",
    //   name: "本单商务",
    //   prop: "thisBusinessName",
    //   type: "string",
    //   api: "getEmployeeInfo",
		// 	rules
    // },
    {
      selectOption: [],
      selectKey: "shippingStatus",
      key: "sendStatus",
      name: "发运状态",
      prop: "sendStatus",
      type: "select",
			rules
    },
    {
      date: true,
      key: "signTime",
      name: "签收时间",
      prop: "signTime",
      type: "date",
    },
    {
      date: true,
      key: "actualShipmentTime",
      name: "实际发运时间",
      prop: "actualShipmentTime",
      type: "date",
    }]
  },
  {
    name: "发运信息",
    list: [{
      btn: true,
      key: "shipmentGroupName",
      name: "发运组织",
      prop: "shipmentGroupName",
      readonly: true,
      type: "string",
      api: "getCreditCompanyNameData",
			rules
    },
    {
      btn: true,
      key: "senderName",
      name: "寄件人",
      prop: "senderName",
      readonly: true,
      type: "string",
      api: "getEmployeeInfo",
			rules
    },
    {
      btn: true,
      key: "mainCarrierName",
      name: "主承运方",
      prop: "mainCarrierName",
      readonly: true,
      type: "string",
      api: "querycarrierbaseSearch",
			rules
    },
    {
      btn: true,
      key: "transportTimingName",
      name: "运输时效",
      prop: "transportTimingName",
      readonly: true,
      type: "string",
      api: "getTimeLimitData",
			rules
    },
    {
      checked: true,
      key: "sendUp",
      name: "送改发",
      prop: "sendUp",
      type: "checkbox",
    }]
  },
  {
    name: "收货方信息",
    list: [{
      btn: true,
      key: "clientName",
      name: "客户",
      prop: "clientName",
      readonly: true,
      type: "string",
      api: "getCustomerList",
			rules
    },
    {
      btn: true,
      key: "receiveClientName",
      name: "收货客户",
      prop: "receiveClientName",
      readonly: true,
      type: "string",
      api: "getCustomerList",
			rules
    },
    {
      key: "receiveContact",
      name: "收货客户联系人",
      prop: "receiveContact",
      type: "string",
			rules
    },
    {
      key: "telephone",
      name: "联系电话",
      prop: "telephone",
      type: "string",
			rules
    },
    {
      key: "address",
      name: "收货地址",
      prop: "address",
      type: "string",
			rules
    }]
  },
  {
    name: "承运方信息",
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
      key: "routeName",
      name: "发运总路线",
      prop: "routeName",
      readonly: true,
      type: "string",
      api: "getDispatchLineData",
			rules
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
      key: "driverName",
      name: "司机",
      prop: "driverName",
      readonly: true,
      type: "string",
      api: "getEmployeeInfo",
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
      btn: true,
      key: "plateNoName",
      name: "车牌号",
      prop: "plateNoName",
      readonly: true,
      type: "string",
      api: "queryVehicleinfo",
			rules
    },
    {
      key: "carrierCode",
      name: "承运单号",
      prop: "carrierCode",
      type: "string",
			api: "querycarrierbaseSearch",
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
      selectOption: [],
      selectKey: "deliveryMethod",
      key: "deliveryWay",
      name: "交货方式",
      prop: "deliveryWay",
      type: "select",
			rules
    },
    {
      key: "arrivePay",
      name: "到付运费",
      prop: "arrivePay",
      type: "number",
      rules: [{
        required: true, message: '必填', trigger: 'blur',
        validator: validate.validateNum,
      }],
    },
    {
      key: "startPlace",
      name: "起始地",
      prop: "startPlace",
      type: "string",
			btn: true,
			readonly: true,
			api: "querywarehouseSearch",
			rules
    },
    {
      key: "endPlace",
      name: "到达地",
      prop: "endPlace",
      type: "string",
			btn: true,
			readonly: true,
			api: "querywarehouseSearch",
			rules
    },
    {
      date: true,
      key: "planTime",
      name: "计划送达时间",
      prop: "planTime",
      type: "date",
			rules
    },
    {
      checked: true,
      key: "nightOperate",
      name: "夜间操作",
      prop: "nightOperate",
      type: "checkbox",
    },
    {
      checked: true,
      key: "needCash",
      name: "需收款",
      prop: "needCash",
      type: "checkbox",
    },
    {
      checked: true,
      key: "shelf",
      name: "货架含运费",
      prop: "shelf",
      type: "checkbox",
    }]
  },
  {
    name: "",
    list: [{
      selectOption: [],
      selectKey: "freightPayerType",
      key: "bearType",
      name: "运费承担方类型",
      prop: "bearType",
      type: "select",
			rules
    },
    {
      btn: true,
      key: "feeBearName",
      name: "运费承担方",
      prop: "feeBearName",
      readonly: true,
      type: "string",
			rules
    },
    {
      checked: true,
      key: "hasSend",
      name: "已发承运",
      prop: "hasSend",
      type: "checkbox",
    },
    {
      btn: true,
      key: "backBrokerName",
      name: "收回经手人",
      prop: "backBrokerName",
      readonly: true,
      type: "string",
      api: "getEmployeeInfo",
			rules
    },
    {
      selectOption: [],
      selectKey: "border",
      key: "border",
      name: "边境",
      prop: "border",
      type: "select",
			rules
    },
    {
      checked: true,
      key: "hasVerifi",
      name: "是否已复审",
      prop: "hasVerifi",
      type: "checkbox",
    },
    {
      selectOption: [],
      selectKey: "distributionMode",
      key: "shippingModel",
      name: "配送方式",
      prop: "shippingModel",
      type: "select",
			rules
    },
    {
      selectOption: [],
      selectKey: "shippingStatus",
      key: "shipmentStatus",
      name: "发运状态",
      prop: "shipmentStatus",
      type: "select",
			rules
    },
    {
      checked: true,
      key: "createOutOrder",
      name: "生成出库单",
      prop: "createOutOrder",
      type: "checkbox",
    },
    {
      key: "invoiceNo",
      name: "发票号",
      prop: "invoiceNo",
      type: "string",
			rules
    },
    {
			btn: true,
			readonly: true,
      key: "shipmentArea",
      name: "发运区域",
      prop: "shipmentArea",
      type: "string",
			api: "querywarehouseSearch",
			rules
    },
    {
      btn: true,
      key: "expressDesName",
      name: "快递目的地",
      prop: "expressDesName",
      readonly: true,
      type: "string",
      api: "getCreditCompanyNameData",
			rules
    },
    {
      key: "selfAddress",
      name: "自提地址",
      prop: "selfAddress",
      type: "string",
			rules
    },
    {
      key: "sendCity",
      name: "寄件城市",
      prop: "sendCity",
      type: "string",
			rules
    },
    {
      key: "receiveCity",
      name: "收件城市",
      prop: "receiveCity",
      type: "string",
    },
    {
      key: "withGoods",
      name: "是否随货开票",
      prop: "withGoods",
      type: "string",
			rules
    },
    {
      key: "firstSend",
      name: "先收先发货",
      prop: "firstSend",
      type: "string",
			rules
    },
    {
      key: "appointCarrier",
      name: "客户指定承运商",
      prop: "appointCarrier",
      type: "checkbox",
			rules
    },
    {
      key: "sfReceiptNo",
      name: "顺丰回单号",
      prop: "sfReceiptNo",
      type: "string",
			rules
    },
    {
      key: "grossWeight",
      name: "毛重",
      prop: "grossWeight",
      type: "number",
      rules: [{
        validator: validate.validateNum,
      }],
    },
    {
      key: "pieces",
      name: "件数",
      prop: "pieces",
      type: "number",
      rules: [{
        required: true, message: '必填', trigger: 'blur',
        validator: validate.validateNum,
      }],
    },
    {
      key: "summary",
      name: "摘要",
      prop: "summary",
      type: "string",
			rules
    },
    {
      btn: true,
      key: "recomCarrierName",
      name: "推荐承运商",
      prop: "recomCarrierName",
      readonly: true,
      type: "string",
      api: "querycarrierbaseSearch",
			rules
    },
    {
      key: "groupInvoiceNo",
      name: "集团发票号",
      prop: "groupInvoiceNo",
      type: "string",
			rules
    },
    // {
    //   key: "materialNo",
    //   name: "物料号",
    //   prop: "materialNo",
    //   type: "string",
    // },
    {
      btn: true,
      key: "shipperName",
      name: "发货方",
      prop: "shipperName",
      readonly: true,
      type: "string",
      api: "querysupplierbaseSearch",
    },
    // {
    //   key: "feeTarget",
    //   name: "计费对象",
    //   prop: "feeTarget",
    //   type: "string",
    // },
    // {
    //   selectOption: [],
    //   selectKey: "miscFeeCategory",
    //   key: "otherFeeType",
    //   name: "杂费类别",
    //   prop: "otherFeeType",
    //   type: "select",
    // },
    // {
    //   key: "cash",
    //   name: "现金金额",
    //   prop: "cash",
    //   type: "number",
    //   rules: [{
    //     validator: validate.validateNum,
    //   }],
    // },
    // {
    //   key: "checkAmount",
    //   name: "支票金额",
    //   prop: "checkAmount",
    //   type: "string",
    // },
    // {
    //   selectOption: [],
    //   selectKey: "currencyName",
    //   key: "otherCurrency",
    //   name: "杂费币种",
    //   prop: "otherCurrency",
    //   type: "select",
    // },
    // {
    //   selectOption: [],
    //   selectKey: "currencyName",
    //   key: "shipCurrency",
    //   name: "运保费币种",
    //   prop: "shipCurrency",
    //   type: "select",
    // },
    // {
    //   key: "payPremium",
    //   name: "应付保费",
    //   prop: "payPremium",
    //   type: "number",
    //   rules: [{
    //     validator: validate.validateNum,
    //   }],
    // },
    // {
    //   key: "payFee",
    //   name: "应付运费",
    //   prop: "payFee",
    //   type: "number",
    //   rules: [{
    //     validator: validate.validateNum,
    //   }],
    // },
    // {
    //   key: "infactFee",
    //   name: "实际运费",
    //   prop: "infactFee",
    //   type: "number",
    //   rules: [{
    //     validator: validate.validateNum,
    //   }],
    // },
    // {
    //   key: "recomFee",
    //   name: "推荐运费",
    //   prop: "recomFee",
    //   type: "number",
    //   rules: [{
    //     validator: validate.validateNum,
    //   }],
    // },
    // {
    //   selectOption: [],
    //   selectKey: "freightPaymentWay",
    //   key: "paymentType",
    //   name: "运费支付方式",
    //   prop: "paymentType",
    //   type: "select",
    // },
    // {
    //   checked: true,
    //   key: "otherFee",
    //   name: "收杂费",
    //   prop: "otherFee",
    //   type: "checkbox",
    // },
    // {
    //   key: "receiveFee",
    //   name: "应收运费",
    //   prop: "receiveFee",
    //   type: "number",
    //   rules: [{
    //     validator: validate.validateNum,
    //   }],
    // },
    ]
  }
]