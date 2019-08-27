import validate from '@/domain/common/validate.js'
const rules = validate.setRequired()
export default {
  list: [
    {
      key: 'shipmentBaseCode',
      name: '发运单编码',
      prop: 'shipmentBaseCode',
      readonly: true,
      type: 'string',
      rules,
      group: 1
    },
    {
      selectOption: [],
      key: 'originOrderType',
      name: '来源单据类型',
      prop: 'originOrderType',
      type: 'select',
      selectKey: 'sourcedocumentType',
      group: 1
    },
    {
      btn: true,
      // key: "originOrder",
      key: 'sourceBillNo',
      name: '来源单据',
      // prop: "originOrder",
      prop: 'sourceBillNo',
      readonly: true,
      type: 'string',
      api: 'queryImportinvoice',
      rules,
      group: 1
    },
    {
      date: true,
      key: 'bizDate',
      name: '业务日期',
      prop: 'bizDate',
      type: 'date',
      rules,
      group: 1
    },
    {
      key: 'trainNoName' /* trainNo */,
      name: '车次',
      prop: 'trainNoName',
      type: 'string',
      btn: true,
      readonly: true,
      api: 'queryTrainnumber',
      rules,
      group: 1
    },
    {
      btn: true,
      key: 'delegeteName',
      name: '委托方',
      prop: 'delegeteName',
      readonly: true,
      type: 'string',
      api: 'queryclientSearch',
      rules,
      group: 1
    },
    {
      key: 'boxCount',
      name: '总箱数',
      prop: 'boxCount',
      type: 'number',
      rules: [
        {
          required: true,
          message: '必填',
          trigger: 'blur',
          validator: validate.validateNum
        }
      ],
      group: 1
    },
    {
      key: 'weight',
      name: '计费重量',
      prop: 'weight',
      type: 'number',
      rules: [
        {
          validator: validate.validateNum
        }
      ],
      group: 1
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
      selectKey: 'shippingStatus',
      key: 'sendStatus',
      name: '发运状态',
      prop: 'sendStatus',
      type: 'select',
      rules,
      group: 1
    },
    {
      date: true,
      key: 'signTime',
      name: '签收时间',
      prop: 'signTime',
      type: 'date',
      group: 1
    },
    {
      date: true,
      key: 'actualShipmentTime',
      name: '实际发运时间',
      prop: 'actualShipmentTime',
      type: 'date',
      group: 1
    },

    {
      btn: true,
      key: 'shipmentGroupName',
      name: '发运组织',
      prop: 'shipmentGroupName',
      readonly: true,
      type: 'string',
      api: 'getCreditCompanyNameData',
      rules,
      group: 2
    },
    {
      btn: true,
      key: 'senderName',
      name: '寄件人',
      prop: 'senderName',
      readonly: true,
      type: 'string',
      api: 'getEmployeeInfo',
      rules,
      group: 2
    },
    {
      btn: true,
      key: 'mainCarrierName',
      name: '主承运方',
      prop: 'mainCarrierName',
      readonly: true,
      type: 'string',
      api: 'querycarrierbaseSearch',
      rules,
      group: 2
    },
    {
      btn: true,
      key: 'transportTimingName',
      name: '运输时效',
      prop: 'transportTimingName',
      readonly: true,
      type: 'string',
      api: 'getTimeLimitData',
      rules,
      group: 2
    },
    {
      checked: true,
      key: 'sendUp',
      name: '送改发',
      prop: 'sendUp',
      type: 'checkbox',
      group: 2
    },
    {
      btn: true,
      key: 'clientName',
      name: '客户',
      prop: 'clientName',
      readonly: true,
      type: 'string',
      api: 'getCustomerList',
      rules,
      group: 3
    },
    {
      btn: true,
      key: 'receiveClientName',
      name: '收货客户',
      prop: 'receiveClientName',
      readonly: true,
      type: 'string',
      api: 'getCustomerList',
      rules,
      group: 3
    },
    {
      key: 'receiveContact',
      name: '收货客户联系人',
      prop: 'receiveContact',
      type: 'string',
      rules,
      group: 3
    },
    {
      key: 'telephone',
      name: '联系电话',
      prop: 'telephone',
      type: 'string',
      rules,
      group: 3
    },
    {
      key: 'address',
      name: '收货地址',
      prop: 'address',
      type: 'string',
      rules,
      group: 3
    },
    {
      selectOption: [],
      selectKey: 'freightCarrierType',
      key: 'carrierType',
      name: '承运方类型',
      prop: 'carrierType',
      type: 'select',
      rules,
      group: 4
    },
    {
      btn: true,
      key: 'routeName',
      name: '发运总路线',
      prop: 'routeName',
      readonly: true,
      type: 'string',
      api: 'getDispatchLineData',
      rules,
      group: 4
    },
    {
      btn: true,
      key: 'deliveryAreaName',
      name: '交货区域',
      prop: 'deliveryAreaName',
      readonly: true,
      type: 'string',
      api: 'getAreaData',
      rules,
      group: 4
    },
    {
      btn: true,
      key: 'driverName',
      name: '司机',
      prop: 'driverName',
      readonly: true,
      type: 'string',
      api: 'getEmployeeInfo',
      rules,
      group: 4
    },
    {
      btn: true,
      key: 'storekeeperName',
      name: '仓管员',
      prop: 'storekeeperName',
      readonly: true,
      type: 'string',
      api: 'getEmployeeInfo',
      rules,
      group: 4
    },
    {
      btn: true,
      key: 'plateNoName',
      name: '车牌号',
      prop: 'plateNoName',
      readonly: true,
      type: 'string',
      api: 'queryVehicleinfo',
      rules,
      group: 4
    },
    {
      key: 'carrierCode',
      name: '承运单号',
      prop: 'carrierCode',
      type: 'string',
      api: 'querycarrierbaseSearch',
      group: 4
    },
    {
      selectOption: [],
      selectKey: 'shippingType',
      key: 'transportType',
      name: '运输方式',
      prop: 'transportType',
      type: 'select',
      rules,
      group: 4
    },
    {
      selectOption: [],
      selectKey: 'deliveryMethod',
      key: 'deliveryWay',
      name: '交货方式',
      prop: 'deliveryWay',
      type: 'select',
      rules,
      group: 4
    },
    {
      key: 'arrivePay',
      name: '到付运费',
      prop: 'arrivePay',
      type: 'number',
      rules: [
        {
          message: '格式错误',
          trigger: 'blur',
          validator: validate.validateNum
        }
      ],
      group: 4
    },
    {
      key: 'startPlace',
      name: '起始地',
      prop: 'startPlace',
      type: 'string',
      btn: true,
      readonly: true,
      api: 'querywarehouseSearch',
      rules,
      group: 4
    },
    {
      key: 'endPlace',
      name: '到达地',
      prop: 'endPlace',
      type: 'string',
      btn: true,
      readonly: true,
      api: 'querywarehouseSearch',
      rules,
      group: 4
    },
    {
      date: true,
      key: 'planTime',
      name: '计划送达时间',
      prop: 'planTime',
      type: 'date',
      rules,
      group: 4
    },
    {
      checked: true,
      key: 'nightOperate',
      name: '夜间操作',
      prop: 'nightOperate',
      type: 'checkbox',
      group: 4
    },
    {
      checked: true,
      key: 'needCash',
      name: '需收款',
      prop: 'needCash',
      type: 'checkbox',
      group: 4
    },
    {
      checked: true,
      key: 'shelf',
      name: '货架含运费',
      prop: 'shelf',
      type: 'checkbox',
      group: 4
    },
    {
      selectOption: [],
      selectKey: 'freightPayerType',
      key: 'bearType',
      name: '运费承担方类型',
      prop: 'bearType',
      type: 'select',
      group: 5
    },
    {
      btn: true,
      key: 'feeBearName',
      name: '运费承担方',
      prop: 'feeBearName',
      readonly: true,
      type: 'string',
      group: 5
    },
    {
      checked: true,
      key: 'hasSend',
      name: '已发承运',
      prop: 'hasSend',
      type: 'checkbox',
      group: 5
    },
    {
      btn: true,
      key: 'backBrokerName',
      name: '收回经手人',
      prop: 'backBrokerName',
      readonly: true,
      type: 'string',
      api: 'getEmployeeInfo',
      group: 5
    },
    {
      selectOption: [],
      selectKey: 'border',
      key: 'border',
      name: '边境',
      prop: 'border',
      type: 'select',
      group: 5
    },
    {
      checked: true,
      key: 'hasVerifi',
      name: '是否已复审',
      prop: 'hasVerifi',
      type: 'checkbox',
      group: 5
    },
    {
      selectOption: [],
      selectKey: 'distributionMode',
      key: 'shippingModel',
      name: '配送方式',
      prop: 'shippingModel',
      type: 'select',
      rules,
      group: 5
    },
    {
      selectOption: [],
      selectKey: 'shippingStatus',
      key: 'shipmentStatus',
      name: '发运状态',
      prop: 'shipmentStatus',
      type: 'select',
      group: 5
    },
    {
      checked: true,
      key: 'createOutOrder',
      name: '生成出库单',
      prop: 'createOutOrder',
      type: 'checkbox',
      group: 5
    },
    {
      key: 'invoiceNo',
      name: '发票号',
      prop: 'invoiceNo',
      type: 'string',
      group: 5
    },
    {
      btn: true,
      readonly: true,
      key: 'shipmentArea',
      name: '发运区域',
      prop: 'shipmentArea',
      type: 'string',
      api: 'querywarehouseSearch',
      rules,
      group: 5
    },
    {
      btn: true,
      key: 'expressDesName',
      name: '快递目的地',
      prop: 'expressDesName',
      readonly: true,
      type: 'string',
      api: 'getCreditCompanyNameData',
      rules,
      group: 5
    },
    {
      key: 'selfAddress',
      name: '自提地址',
      prop: 'selfAddress',
      type: 'string',
      rules,
      group: 5
    },
    {
      btn: true,
      key: 'sendCityName',
      name: '寄件城市',
      prop: 'sendCity',
      type: 'string',
      rules,
      group: 5
    },
    {
      btn: true,
      key: 'receiveCityName',
      name: '收件城市',
      prop: 'receiveCity',
      type: 'string',
      group: 5
    },
    {
      key: 'withGoods',
      name: '是否随货开票',
      prop: 'withGoods',
      type: 'select',
      selectKey: 'ticketWithGoods',
      selectOption: [],
      rules,
      group: 5
    },
    {
      key: 'firstSend',
      name: '先收先发货',
      prop: 'firstSend',
      type: 'select',
      selectKey: 'has',
      selectOption: [],
      rules,
      group: 5
    },
    {
      key: 'appointCarrier',
      name: '客户指定承运商',
      prop: 'appointCarrier',
      type: 'checkbox',
      group: 5
    },
    {
      key: 'sfReceiptNo',
      name: '顺丰回单号',
      prop: 'sfReceiptNo',
      type: 'string',
      group: 5
    },
    {
      key: 'grossWeight',
      name: '毛重',
      prop: 'grossWeight',
      type: 'number',
      rules: [
        {
          validator: validate.validateNum
        }
      ],
      group: 5
    },
    {
      key: 'pieces',
      name: '件数',
      prop: 'pieces',
      type: 'number',
      rules: [
        {
          required: true,
          message: '必填',
          trigger: 'blur',
          validator: validate.validateNum
        }
      ],
      group: 5
    },
    {
      key: 'summary',
      name: '摘要',
      prop: 'summary',
      type: 'string',
      group: 5
    },
    {
      btn: true,
      key: 'recomCarrierName',
      name: '推荐承运商',
      prop: 'recomCarrierName',
      readonly: true,
      type: 'string',
      api: 'querycarrierbaseSearch',
      group: 5
    },
    {
      key: 'groupInvoiceNo',
      name: '集团发票号',
      prop: 'groupInvoiceNo',
      type: 'string',
      group: 5
    },
    // {
    //   key: "materialNo",
    //   name: "物料号",
    //   prop: "materialNo",
    //   type: "string",
    // },
    {
      btn: true,
      key: 'shipperName',
      name: '发货方',
      prop: 'shipperName',
      readonly: true,
      type: 'string',
      api: 'querysupplierbaseSearch',
      group: 5
    }
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
  ],
  otherConfig: {
    title: {
      '1': {
        text: '货物基础信息',
        visible: true
      },
      '2': {
        text: '发运信息',
        visible: true
      },
      '3': {
        text: '收货方信息',
        visible: true
      },
      '4': {
        text: '承运方信息',
        visible: true
      },
      '5': {
        text: '',
        visible: true
      }
    }
  }
}
