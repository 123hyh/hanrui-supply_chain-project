let rules = {
  required: true,
  message: "不能为空",
  trigger: ['blur', 'change']
};
export default [
  {
    title: "其它统计",
    items: [
      {
        name: "agencyFee",
        label: "代理报检费",
        type: "money",
        decimal:2,
        symbol:'￥',
        long: true
      },
      {
        name: "quarantineFee",
        label: "检疫费",
        type: "money",
        decimal:2,
        symbol:'￥',
        long: true
      },
      {
        name: "goodsValue",
        label: "卖方销售总货值",
        type: "moneyselect",
        disabled: true,
        selsect:'sellerCurrency',
        selectapi: "currencyName",
        selsectDisabled:true,
        long: true
      },
      {
        name: "customTotalAmount",
        label: "关税合计",
        type: "moneyselect",
        decimal:2,
        symbol:'￥',
        disabled: true,
        selsect:'customCurrency',
        selectapi: "currencyName",
        selsectDisabled:true,
        long: true
      },
      {
        name: "vatTotalAmount",
        label: "增值税合计",
        type: "moneyselect",
        decimal:2,
        symbol:'￥',
        disabled: true,
        selsect:'vatCurrency',
        selectapi: "currencyName",
        selsectDisabled:true,
        long: true
      },
      {
        name: "totalServiceCharge",
        label: "服务费总和",
        type: "moneyselect",
        decimal:2,
        symbol:'￥',
        disabled: true,
        selsect:'serviceCurrency',
        selectapi: "currencyName",
        selsectDisabled:true,
        long: true
      },
      {
        name: "matPayment",
        type: "switch",
        label: "是否垫货款",
        disabled: true,
        long: true
      },
      {
        name: "trusteePayGoodsAmount",
        label: "受托方应付货款总额",
        type: "moneyselect",
        disabled: true,
        selsect:'trusteeCurrency',
        selectapi: "currencyName",
        selsectDisabled:true,
        long: true
      },
      {
        name: "invoiceAmount",
        label: "应开票金额",
        type: "moneyselect",
        decimal:2,
        symbol:'￥',
        disabled: true,
        selsect:'invoiceCurrency',
        selectapi: "currencyName",
        selsectDisabled:true,
        long: true
      },
      {
        name: "advanceAmount",
        label: "预计应收总额",
        type: "moneyselect",
        decimal:2,
        symbol:'￥',
        disabled: true,
        selsect:'advanceCurrency',
        selectapi: "currencyName",
        selsectDisabled:true,
        long: true
      },
      {
        name: "refundCustomerAmount",
        label: "应退客户货款",
        type: "moneyselect",
        disabled: true,
        selsect:'srefundCurrency',
        selectapi: "currencyName",
        selsectDisabled:true,
        long: true
      },
      {
        name: "paidGoodsAmount",
        label: "已付货款总额",
        type: "moneyselect",
        disabled: true,
        selsect:'paidCurrency',
        selectapi: "currencyName",
        selsectDisabled:true,
        long: true
      },
      {
        name: "dayRate",
        label: "日利率(%)",
        type: "num",
        disabled: true,
        long: true
      },
      {
        name: "chargeInterest",
        type: "switch",
        label: "计息",
        disabled: true,
        long: true
      },
      {
        name: "invoiceType",
        type: "select",
        label: "发票类型",
        selectapi: "InvoiceTypes",
        long: true
      },
      {
        name: "minimumCharge",
        label: "最低消费差额",
        type: "money",
        decimal:2,
        symbol:'￥',
        disabled: true,
        long: true,
      },
      {
        name: "UnminimumCharge",
        label: "最低消费差额",
        type: "money",
        decimal:2,
        symbol:'￥',
        disabled: true,
        long: true,
        none: true,
      },
      {
        name: "supplierPayMode",
        type: "select",
        label: "付供应商货款方式",
        selectapi: "paymentToSuppliers",
        long: true,
        rules
      },
      {
        name: "pickUpType",
        type: "select",
        label: "提货信息",
        selectapi: "pickingInformation",
        long: true,
      },
      // {
      //   name: "specialTips",
      //   type: "input",
      //   label: "特别提示",
      // },
      {
        name: "invoiceRemark",
        type: "textarea",
        label: "发票备注",
        big: true
      },
      {
        name: "remark",
        type: "textarea",
        label: "备注",
        big: true
      },
    ]
  }
];
