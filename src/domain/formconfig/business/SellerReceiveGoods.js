import validate from '@/domain/common/validate';
const rules = validate.setRequired()
export default [
  {
    title: "",
    list: [
      {
        type: "string",
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
        key: "carrierName", //表单元素v-model显示
        api: 'querycarrierbaseSearch',
        rules: [
          { required: true, message: "不能为空", trigger: "blur" }
        ],
        tableConfig: [//表格配置
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
      //   type: "string",
      //   btn: true,
      //   disabled: true,
      //   name: "车型",
      //   key: "carModelName",
      //   api: "getCarModelList",
      //   tableConfig: [
      //     {
      //       name: "车型",
      //       key: "carTypeName",
      //       value: "carModelName"
      //     },
      //     {
      //       name: "车型编码",
      //       key: "carTypeCode",
      //       value: "carModel"
      //     },
      //   ],
      // },
      {
        type: "string",
        key: "packingType",
        name: "货物包装种类",
        prop: "packingType",
      },
      {
        selectOption: [],
        type: "select",
        key: "transportMode",
        selectKey: "shippingType",
        name: "运输方式",
        prop: "transportMode",
        rules
      },
      {
        type: "date",
        key: "pickUpDate",
        name: "要求提货日期",
        prop: "pickUpDate",
        rules
      },
    ]
  },
  {
    title: "卖方交(发)货人信息",
    list: [
      {
        type: "string",
        key: "carrygoods",
        name: "提货单号",
        prop: "carrygoods",
      },
      {
        type: "string",
        key: "shipperName",
        name: "发货方",
        prop: "shipperName",
        rules
      },
      {
        type: "string",
        key: "contact",
        name: "联系人",
        prop: "contact",
        rules
      },
      {
        type: "string",
        key: "contactTel",
        name: "联系电话",
        prop: "contactTel"
      },
      {
        type: "string",
        key: "phone",
        name: "联系手机",
        prop: "phone",
        rules
      },
      // {
      //   type: 'string',
      //   btn: true,
      //   disabled: true,
      //   name: "发运路线",
      //   key: "dispatchLineName",
      //   api: "getDispatchLineData",
      //   tableConfig: [//表格配置
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
        type: "string",
        key: "deliveryAddress",
        name: "交货地点",
        prop: "deliveryAddress",
        rules
      },
      {
        selectOption: [],
        type: "select",
        key: "deliverMode",
        selectKey: "sellerMode",
        name: "发货方式",
        prop: "deliverMode",
        rules
      },

    ]
  },
  {
    title: "",
    list: [
      {
        type: "select",
        key: "underPartyType",
        selectKey: "freightPayerType",
        name: "提货费承担类型",
        prop: "underPartyType",
        selectOption: [],
        rules

      },
      {
        type: 'string',
        btn: true,
        disabled: true,
        name: "提货费承担对象",
        key: "underPartyName",
        api: "",
        tableConfig: [//表格配置
          {
            name: "提货费承担对象",
            key: "customerName",
            value: "underPartyName"
          },
          {
            name: "提货费承担对象编码",
            key: "customerNo",
            value: "underParty"
          },
        ],
        rules

      },
      {
        type: "checkbox",
        key: "pickUpPayment",
        name: "提货付货款",
        prop: "pickUpPayment"
      },
      {
        type: "string",
        key: "premium",
        name: "保险费",
        prop: "premium"
      },
      {
        type: "select",
        key: "premiumCurrency",
        selectKey: "currencyName",
        name: "保险费币别",
        selectOption: []
      },
      {
        type: "select",
        key: "premiumPartyType",
        selectKey: "freightPayerType",
        name: "保险费承担类型",
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
        type: "number",
        key: "quantity",
        name: "交(提)货件数",
        prop: "quantity"
      },
      {
        type: "number",
        key: "totalWeight",
        name: "总重量",
        prop: "totalWeight"
      },
      {
        type: "number",
        key: "cardQuantity",
        name: "卡板数量",
        prop: "cardQuantity"
      },
      {
        type: "number",
        key: "volume",
        name: "总体积",
        prop: "volume"
      },
      {
        selectOption: [],
        type: "select",
        key: "deliveryMode",
        selectKey: "cargoMode",
        name: "交货方式",
        prop: "deliveryMode",
        rules

      },
      /* {
        selectOption: [],
        type: "select",
        key: "status",
        selectKey: "orderStatus",
        name: "状态",
        prop: "status"
      },
      {
        selectOption: [],
        type: "select",
        key: "auditStatus",
        selectKey: "reviewStatus",
        name: "复审状态",
        prop: "auditStatus"
      }, */
      {
        type: "string",
        key: "remark",
        name: "备注",
        prop: "remark"
      }
    ]
  }
]