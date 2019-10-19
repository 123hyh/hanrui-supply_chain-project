let rules = {
  required: true,
  message: "不能为空",
  trigger: ['blur', 'change']
};
export default [
  {
    none: false,
    disab: false,
    nonetitle: false,
    title: "基础",
    text: false,
    items: [
      {
        none: false,
        disab: true,
        name: "entrustOrderNo",
        type: "input",
        label: "委托订单号",
        disabled: true,
        rules
      },
      {
        name: "entrustOrderType",
        type: "select",
        label: "委托订单类型",
        selectapi: "entrustOrderTypeG",
        disabled: true,
      },
      {
        name: "trusteeName",
        type: "inputbutton",
        label: "受托方(公司)",
        readonly: true,
        rules
      },
      {
        name: "purchaseUnitName",
        type: "inputbutton",
        label: "采购组织",
        readonly: true,
        rules
      },
      {
        name: "signDate",
        type: "date",
        label: "签订日期",
        rules
      }
    ]
  },
  {
    title: "委托方",
    items: [
      {
        name: "clientName",
        type: "inputbutton",
        label: "委托方",
        readonly: true,
        rules
      },
      {
        name: "clientContactName",
        type: "inputbutton",
        label: "联系人",
        readonly: true,
        rules
      },
      {
        name: "clientTel",
        type: "input",
        label: "电话",
        disabled: true,
      },
      {
        name: "clientPhone",
        type: "input",
        label: "手机",
        disabled: true
      },
      {
        name: "clientOrderNo",
        type: "input",
        label: "委托方订单号"
      },
      {
        name: "salesmanName",
        type: "input",
        label: "接单人",
        disabled: true
      },
      {
        name: "followPersonName",
        type: "input",
        label: "跟单人",
        disabled: true
      }
    ]
  },
  {
    title: "卖方",
    items: [
      {
        name: "supplierName",
        type: "inputbutton",
        label: "供应商",
        readonly: true,
        rules
      },
      {
        name: "supplierContactName",
        type: "inputbutton",
        label: "联系人",
        readonly: true,
        rules
      },
      {
        name: "supplierPhone",
        type: "input",
        label: "手机",
        disabled: true
      },
      {
        name: "supplierTel",
        type: "input",
        label: "电话",
        disabled: true
      },
      {
        name: "supplierCurrency",
        type: "select",
        label: "销售币别",
        selectapi: "currencyName"
      },
      {
        name: "consignmentCollection",
        type: "switch",
        label: "委托收款"
      },
      {
        name: "deliverGoods",
        type: "switch",
        label: "卖方交(发)货"
      }
    ]
  },
  {
    title: "买方",
    items: [
      {
        name: "customerName",
        type: "inputbutton",
        label: "客户",
        readonly: true,
        rules
      },
      {
        name: "currency",
        type: "select",
        label: "采购币别",
        selectapi: "currencyName",
        disabled: true
      },
      {
        name: "consignmentPayment",
        type: "switch",
        label: "委托付款"
      },
      {
        name: "pickUpGoods",
        type: "switch",
        label: "买方接(提)货"
      }
    ]
  },
  {
    title: "",
    items: [
      {
        name: "agreementName",
        type: "inputbutton",
        label: "协议管理",
        readonly: true,
        rules
      },
      {
        name: "agreementSolutionName",
        type: "inputbutton",
        label: "协议方案",
        rules
      },
      {
        name: "bizType",
        type: "select",
        label: "业务类型",
        selectapi: "businessTypeG",
        disabled: true
      },
      {
        name: "reportGateType",
        type: "select",
        label: "报关类型",
        selectapi: "declareCustoms",
        disabled: true
      },
      {
        name: "tradeMode",
        type: "select",
        label: "贸易方式",
        selectapi: "tradeModeName",
        disabled: true
      },
      {
        type: "select",
        name: "dealMode",
        selectapi: "transactionMode",
        label: "成交方式",
        disabled: true
      },
      {
        type: "select",
        name: "receivableMethod",
        selectapi: "payMode",
        label: "收款方式",
        rules
      },
      {
        name: "reportUntilComplete",
        type: "switch",
        label: "等齐报"
      },
      {
        name: "sendUntilComplete",
        type: "switch",
        label: "等齐送"
      }
    ]
  },
  {
    title: "服务费计算",
    items: [
      {
        name: "serviceCharge",
        type: "select",
        label: "种类",
        selectapi: "serviceFeeType",
        disabled: true
      },
      {
        name: "serviceTaxRate",
        label: "服务费率(%)",
        type: "num",
        disabled: true,
        rules
      },
      {
        name: "orderExchangeRate",
        label: "订单汇率",
        type: "num",
        decimal:6,
        disabled: true
      },
      {
        name: "serviceFee",
        label: "定额服务费",
        type: "money",
        decimal:2,
        symbol:'￥',
        disabled: true
      }
    ]
  }
];
