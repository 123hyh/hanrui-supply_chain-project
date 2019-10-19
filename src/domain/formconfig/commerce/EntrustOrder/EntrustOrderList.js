// import validate from "@/domain/common/validate"
// const rules = validate.setRequired()
const rules = [{required: true, message: "必填", trigger: 'change' }]
export default [
  {
    title: "", showline: false, list: [
      {
        type: "string",
        key: "entrustOrderNo",
        name: "委托订单号",
        prop: "entrustOrderNo",
        disabled: true,
        // rules,
      },
      {
        disabled: true,
        selectOption: [],
        type: "select",
        selectKey: "entrustOrderTypeG",
        name: "委托订单类型",
        key: "entrustOrderType",
        prop: "entrustOrderType",
        // rules
      },
      {
        type: "string",
        btn: true,
        key: "trusteeName",
        name: "受托方(公司)",
        prop: "trusteeName",
        readonly: true,
        rules
      },
      {
        type: "string",
        btn: true,
        key: "purchaseUnitName",
        name: "采购组织",
        prop: "purchaseUnitName",
        readonly: true,
        rules
      },
      {
        type: "date",
        key: "signDate",
        name: "签订日期",
        prop: "signDate",
        rules
      },
    ]
  },
  {
    title: "委托方", showline: true, list: [
      {
        type: "string",
        btn: true,
        key: "clientName",
        name: "委托方",
        prop: "clientName",
        readonly: true,
        rules
      },
      {
        btn: true,
        type: "string",
        key: "clientContactName",
        name: "联系人",
        prop: "clientContactName",
        readonly: true,
        rules
      },
      {
        type: "string",
        key: "clientTel",
        name: "电话",
        prop: "clientTel",
        disabled: true,
      },
      {
        type: "string",
        key: "clientPhone",
        name: "手机",
        prop: "clientPhone",
        disabled: true,
        // rules
      },
      {
        type: "string",
        key: "clientOrderNo",
        name: "委托方订单号",
        prop: "clientOrderNo"
      },
      {
        type: "string",
        key: "salesmanName",
        name: "接单人",
        prop: "salesmanName",
        disabled: true,
        // rules
      },
      {
        type: "string",
        key: "followPersonName",
        name: "跟单人",
        prop: "followPersonName",
        disabled: true,
        // rules
      }
    ]
  },
  {
    title: "卖方", showline: true, list: [
      {
        type: "string",
        btn: true,
        key: "supplierName",
        name: "供应商",
        prop: "supplierName",
        readonly: true,
        rules
      },
      {
        btn: true,
        type: "string",
        key: "supplierContactName",
        name: "联系人",
        prop: "supplierContactName",
        readonly: true,
        rules
      },
      {
        type: "string",
        key: "supplierPhone",
        name: "手机",
        prop: "supplierPhone",
        disabled: true,
        // rules
      },
      {
        type: "string",
        key: "supplierTel",
        name: "电话",
        prop: "supplierTel",
        disabled: true,
      },
      {
        selectOption: [],
        type: "select",
        key: "supplierCurrency",
        selectKey: "currencyName",
        name: "销售币别",
        prop: "supplierCurrency",
      },
      {
        type: "checkbox",
        key: "consignmentCollection",
        name: "委托收款",
        prop: "consignmentCollection"
      },
      {
        type: "checkbox",
        key: "deliverGoods",
        name: "卖方交(发)货",
        prop: "deliverGoods"
      },
    ]
  },
  {
    title: "买方", showline: true, list: [
      {
        type: "string",
        btn: true,
        key: "customerName",
        name: "客户",
        prop: "customerName",
        readonly: true,
        rules,
      },
      {
        selectOption: [],
        type: "select",
        key: "currency",
        selectKey: "currencyName",
        name: "采购币别",
        prop: "currency",
        disabled: true,
      },
      {
        type: 'integer',
        key: "currencyExchangeRate",
        name: "买方汇率",
        prop: "currencyExchangeRate",
			  decimal:6,
        isShow:true,
        disabled: true
      },
      {
        type: "checkbox",
        key: "consignmentPayment",
        name: "委托付款",
        prop: "consignmentPayment"
      },
      {
        type: "checkbox",
        key: "pickUpGoods",
        name: "买方接(提)货",
        prop: "pickUpGoods"
      },
    ]
  },
  {
    title: "", showline: true, list: [
      {
        type: "string",
        btn: true,
        key: "agreementName",
        name: "协议管理",
        prop: "agreementName",
        readonly: true,
        rules
      },
      {
        type: "string",
        btn: true,
        key: "agreementSolutionName",
        name: "协议方案",
        prop: "agreementSolutionName",
        readonly: true,
        rules
      },
      {
        selectOption: [],
        type: "select",
        key: "bizType",
        selectKey: "",//businessTypeG
        name: "业务类型",
        prop: "bizType",
        disabled: true,
      },
      {
        selectOption: [],
        type: "select",
        key: "reportGateType",
        selectKey: "declareCustoms",
        name: "报关类型",
        prop: "reportGateType",
        disabled: true,
        // rules
      },
      {
        selectOption: [],
        type: "select",
        key: "tradeMode",
        selectKey: "tradeModeName",
        name: "贸易方式",
        prop: "tradeMode",
        disabled: true,
        // rules
      },
      {
        selectOption: [],
        type: "select",
        key: "dealMode",
        selectKey: "transactionMode",
        name: "成交方式",
        prop: "dealMode",
        disabled: true,
        // rules
      },
      {
        selectOption: [],
        type: "select",
        key: "receivableMethod",
        selectKey: "payMode",
        name: "收款方式",
        prop: "receivableMethod",
        rules
      },
      // {
      //   selectOption: [],
      //   type: "select",
      //   key: "chargeMode",
      //   selectKey: "BillingMethod",
      //   name: "计价方式",
      //   prop: "chargeMode"
      // },
      {
        type: "checkbox",
        key: "reportUntilComplete",
        name: "等齐报",
        prop: "reportUntilComplete"
      },
      {
        type: "checkbox",
        key: "sendUntilComplete",
        name: "等齐送",
        prop: "sendUntilComplete"
      },
    ]
  },
  {
    title: "服务费计算", showline: true, list: [
      {
        selectOption: [],
        type: "select",
        selectKey: "serviceFeeType",
        key: "serviceCharge",
        name: "种类",
        prop: "serviceCharge",
        disabled: true,
      },
      {
        type: "number",
        ratio:true,
        key: "serviceTaxRate",
        name: "服务费率(%)",
        prop: "serviceTaxRate",
        disabled: true
      },
      {
        type: 'integer',
        key: "orderExchangeRate",
        name: "订单汇率",
			  decimal:6,
        prop: "orderExchangeRate",
        disabled: true
      },
      {
        type: "money",
        key: "serviceFee",
        name: "定额服务费",
        prop: "serviceFee",
        decimal:2,
        symbol:'￥',
        disabled: true,
      },
    ]
  },
]