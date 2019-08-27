import validate from '@/domain/common/validate';
const rules  = validate.setRequired()
export default [
  {
    title: '',
    list: [
      {
        type: 'string',
        key: "billNo",
        name: "单据编号",
        prop: "billNo",
        disabled: true,
        rules: [
          { required: true, message: "不能为空", trigger: "blur" }
        ],
      },
      {
        type: 'string',
        btn: true,
        disabled: true,
        name: "委托单号",
        key: "delegeteBillNo",
        api: 'queryentrustorderSearch',
        tableConfig: [
          {
            name: "委托单号",
            key: "entrustOrderNo",
            value: "delegeteBillNo"
          },
        ],
        rules: [
          { required: true, message: "不能为空", trigger: "blur" }
        ],
      },
      {
        type: 'string',
        btn: true,
        disabled: true,
        name: "发运组织",
        key: "dispatchOrganizationName",
        api: 'getCreditCompanyNameData',
        tableConfig: [//表格配置
          {
            name: "发运组织",
            key: "companyName",
            value: "dispatchOrganizationName"
          },
          {
            name: "发运组织编码",
            key: "companyCode",
            value: "dispatchOrganizationCode"
          },
        ],
        rules
      },
      {
        type: 'string',
        btn: true,
        disabled: true,
        name: "承运商",
        key: "carrierName",//表单元素v-model显示
        api: 'querycarrierbaseSearch',
        rules: [
          { required: true, message: "不能为空", trigger: "blur" }
        ],
        tableConfig: [
          {
            name: "承运商",
            key: "carrierName",
            value: "carrierName"
          },
          {
            name: "承运商编码",
            key: "carrierCode",
            value: "carrierCode"
          },
        ],
      },
      // {
      //   type: 'string',
      //   btn: true,
      //   // disabled: true,
      //   name: "寄件城市",
      //   key: "sendCityName",
      //   api: 'getCityList',
      //   tableConfig: [//表格配置
      //     {
      //       name: "城市名称",
      //       key: "city",
      //       value: "sendCityName"
      //     },
      //     {
      //       name: "城市编码",
      //       key: "code",
      //       value: "sendCity"
      //     },
      //     {
      //       name: "所属省份",
      //       key: "province",
      //     },
      //   ],
      //   rules
      // },
      // {
      //   type: 'string',
      //   btn: true,
      //   // disabled: true,
      //   name: "收件城市",
      //   key: "receiptCityName",
      //   api: 'getCityList',
      //   tableConfig: [//表格配置
      //     {
      //       name: "城市名称",
      //       key: "city",
      //       value: "receiptCityName"
      //     },
      //     {
      //       name: "城市编码",
      //       key: "code",
      //       value: "receiptCity"
      //     },
      //     {
      //       name: "所属省份",
      //       key: "province",
      //     },
      //   ],
      //   rules
      // },
      {
        selectOption: [],
        type: 'select',
        key: "pickUpGoods",
        name: "接(提)货",
        prop: "pickUpGoods",
        selectKey: "pickUpMethod",
        rules
      },
      // {
      //   type: 'checkbox',
      //   key: "hasAssignCarrier",
      //   name: "客户指定承运商",
      //   prop: "hasAssignCarrier"
      // },
      {
        type: 'string',
        btn: true,
        disabled: true,
        name: "运输时效",
        key: "timeLimitName",
        api: 'getTimeLimitData',
        tableConfig: [
          {
            name: "运输时效",
            key: "transportTimeName",
            value: "timeLimitName"
          },
          {
            name: "运输时效编码",
            key: "transportTimeCode",
            value: "timeLimit"
          },
        ],
        rules
      },
      {
        selectOption: [],
        type: 'select',
        selectKey: "shippingType",
        key: "transportMode",
        name: "运输方式",
        prop: "transportMode",
        rules
      },
      // {
      //   type: 'date',
      //   key: "deliverDate",
      //   name: "要求发货日期",
      //   prop: "deliverDate",
      //   rules
      // },
      // {
      //   type: 'date',
      //   key: "arrivalDate",
      //   name: "要求到货日期",
      //   prop: "arrivalDate",
      //   rules
      // },
      
    ]
  },
  {
    title: '收货人信息',
    list: [
      {
        type: 'string',
        btn: true,
        disabled: true,
        type: 'string',
        key: "receiveCompanyName",
        name: "收货公司",
        api: "getCustomerList",
        prop: "receiveCompanyName",
        tableConfig: [//表格配置
          {
            name: "收货联系人",
            key: "contact",
            value: "receiveContactName"
          },
          {
            name: "收货联系人编码",
            key: "itemCode",
            value: "receiveContactId"
          },
        ],
        rules
      },
      {
        type: 'string',
        btn: true,
        disabled: true,
        name: "收货联系人",
        key: "receiveContactName",
        api: "getCustomerContact",
        tableConfig: [//表格配置
          {
            name: "收货联系人",
            key: "contact",
            value: "receiveContactName"
          },
          {
            name: "收货联系人编码",
            key: "itemCode",
            value: "receiveContactId"
          },
        ],
        rules
      },
      // {
      //   type: 'checkbox',
      //   key: "entrustReceive",
      //   name: "委托收货",
      //   prop: "entrustReceive"
      // },
      {
        type: 'checkbox',
        key: "receivePayment",
        name: "需收货款",
        prop: "receivePayment"
      },
      {
        type: 'checkbox',
        key: "waitNotice",
        name: "等通知",
        prop: "waitNotice"
      },
      // {
      //   type: 'string',
      //   btn: true,
      //   disabled: true,
      //   name: "发运路线",
      //   key: "dispatchLineName",
      //   api: "getDispatchLineData",
      //   tableConfig: [
      //     {
      //       name: "发运路线",
      //       key: "shippingRouteName",
      //       value: "dispatchLineName"
      //     },
      //     {
      //       name: "发运路线编码",
      //       key: "shippingRouteCode",
      //       value: "dispatchLine"
      //     },
      //   ],
      //   rules
      // },
      {
        type: 'string',
        key: "contactTel",
        name: "联系电话",
        prop: "contactTel"
      },
      // {
      //   type: 'string',
      //   key: "goodsPacking",
      //   name: "货物包装",
      //   prop: "goodsPacking"
      // },
      // {
      //   type: 'string',
      //   btn: true,
      //   disabled: true,
      //   name: "所在区域",
      //   key: "areaName",
      //   api: 'getAreaData',
      //   tableConfig: [//表格配置
      //     {
      //       name: "所在区域",
      //       key: "deliveryAreaName",
      //       value: "areaName"
      //     },
      //     {
      //       name: "所在区域编码",
      //       key: "deliveryAreaCode",
      //       value: "area"
      //     },
      //   ],
      // },
      {
        type: 'string',
        key: "phone",
        name: "联系手机",
        prop: "phone"
      },
      // {
      //   type: 'string',
      //   key: "receivePostCode",
      //   name: "收货邮编",
      //   prop: "receivePostCode"
      // },
      {
        type: 'string',
        key: "receiveAddress",
        name: "收货地址",
        prop: "receiveAddress",
        rules
      },
    ]
  },
  {
    title: '费用与发票信息',
    list: [
      {
        selectOption: [],
        type: 'select',
        key: "paymentMode",
        selectKey: "freightPaymentWay",
        name: "运费支付方式",
        prop: "paymentMode",
        rules
      },
      {
        type: 'number',
        key: "premium",
        name: "保险费",
        prop: "premium",
      },
      {
        selectOption: [],
        type: 'select',
        selectKey: "currencyName",
        key: "currency",
        name: "币别",
        prop: "currency"
      },
      {
        type: 'checkbox',
        key: "invoiceWithGoods",
        name: "票随货",
        prop: "invoiceWithGoods"
      },
      {
        type: 'checkbox',
        key: "needCollectFee",
        name: "收杂费",
        prop: "needCollectFee"
      },
      {
        type: 'checkbox',
        key: "goodsValueContainFee",
        name: "货价含运费",
        prop: "goodsValueContainFee"
      },
      // {
      //   type: 'string',
      //   key: "invoiceNo",
      //   name: "发票号",
      //   prop: "invoiceNo"
      // },
      {
        type: 'checkbox',
        key: "urgent",
        name: "是否加急",
        prop: "urgent"
      },
      {
        type: 'checkbox',
        key: "costPriority",
        name: "费用优先",
        prop: "costPriority"
      },
      {
        type: 'checkbox',
        key: "timeLimitPriority",
        name: "时效优先",
        prop: "timeLimitPriority"
      },
      {
        type: 'checkbox',
        key: "deliveryPriority",
        name: "先收先发货",
        prop: "deliveryPriority"
      },
      {
        selectOption: [],
        type: 'select',
        selectKey: "typeInsurancePayer",
        key: "underPartyType",
        name: "运费承担方类型",
        prop: "underPartyType",
        rules
      },
      {
        type: 'string',
        btn: true,
        disabled: true,
        name: "运费承担对象",
        key: "underPartyName",
        api: "",
        tableConfig: [//表格配置
          {
            name: "运费承担对象",
            key: "customerName",
            value: "underPartyName"
          },
          {
            name: "运费承担对象编码",
            key: "customerNo",
            value: "underParty"
          },
        ],
        rules
      },
      {
        type: 'select',
        key: "premiumPartyType",
        selectKey: "typeInsurancePayer",
        name: "保险费承担方类型",
        prop: "premiumPartyType",
        selectOption: [],
        rules
      },
      {
        type: 'string',
        btn: true,
        disabled: true,
        name: "保险费承担对象",
        key: "premiumPartyName",
        api: "",
        tableConfig: [//表格配置
          {
            name: "保险费承担对象",
            key: "companyName",
            value: "premiumPartyName"
          },
          {
            name: "保险费承担对象编码",
            key: "companyCode",
            value: "premiumParty"
          },
        ],
        rules
      },
      {
        type: 'select',
        key: "collectFeeType",
        selectKey: "categoryExpenses",
        name: "杂费类别",
        prop: "collectFeeType",
        selectOption: [],
      },
      // {
      //   type: 'number',
      //   key: "cashAmount",
      //   name: "现金金额",
      //   prop: "cashAmount",
      // },
      {
        selectOption: [],
        type: 'select',
        key: "collectCurrency",
        selectKey: "currencyName",
        name: "杂费币别",
        prop: "collectCurrency"
      },
      // {
      //   selectOption: [],
      //   type: 'select',
      //   key: "deliveryMode",
      //   selectKey: "cargoMode",
      //   name: "交货方式",
      //   prop: "deliveryMode",
      //   rules
      // },
    ]
  },
  {
    title: '',
    list: [
      {
        selectOption: [],
        type: 'select',
        key: "sendMode",
        selectKey: "deliveryMethod",
        name: "物流派送方式",
        prop: "sendMode",
        rules
      },
      {
        type: 'select',
        key: "costRange",
        selectKey: "costInnterval",
        name: "费用区间",
        prop: "costRange",
        selectOption: [],
      },
      // {
      //   type: 'number',
      //   key: "chequeAmount",
      //   name: "支票金额",
      //   prop: "chequeAmount"
      // },
      // {
      //   type: 'number',
      //   key: "grossWeight",
      //   name: "毛重",
      //   prop: "grossWeight"
      // },
      // {
      //   type: 'number',
      //   key: "netWeight",
      //   name: "净重",
      //   prop: "netWeight"
      // },
      // {
      //   type: 'string',
      //   key: "pieces",
      //   name: "件数",
      //   prop: "pieces"
      // },
      // {
      //   type: 'string',
      //   key: "chargeObject",
      //   name: "计费对象", disabled: true,
      //   prop: "chargeObject"
      // },
      // {
      //   type: 'checkbox',
      //   key: "inland",
      //   name: "是否境内",
      //   prop: "inland"
      // },
      {
        type: 'string',
        key: "pickUpAddress",
        name: "自提地点",
        prop: "pickUpAddress"
      },
      {
        type: 'string',
        key: "remark",
        name: "备注",
        prop: "remark"
      },
      {
        type: 'string',
        key: "deliverRemark",
        name: "送货单打印备注",
        prop: "deliverRemark"
      }
    ]
  },

]