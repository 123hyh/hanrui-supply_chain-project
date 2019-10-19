export default {
  api: "entrustorder",
  items: [
    {
      prop: "entrustOrderNo",
      label: "委托订单编码",
      width: 180,
    },
    {
      prop: "statusName",
      label: "单据状态",
      width: 80,
      // template:true,
    },
    {
      prop: "updateTime",
      label: "系统时间",
    },
    {
      prop: "entrustOrderTypeName",
      label: "委托订单类型"
    },
    {
      prop: "trusteeName",
      label: "受托方名称"
    },
    {
      prop: "purchaseUnitName",
      label: "采购组织名称"
    },
    {
      prop: "signDate",
      label: "签订日期",
      template:true,
    },
    {
      prop: "clientName",
      label: "委托方名称"
    },
    {
      prop: "clientContactName",
      label: "委托方联系人姓名"
    },
    {
      prop: "clientTelPhone",
      label: "委托方电话/手机",
      template:true,
    },
    // {
    //   prop: "clientTel",
    //   label: "委托方电话"
    // },
    // {
    //   prop: "clientPhone",
    //   label: "委托方手机"
    // },
    {
      prop: "clientOrderNo",
      label: "订单号"
    },
    // {
    //   prop: "salesmanName",
    //   label: "接单人"
    // },
    // {
    //   prop: "followPersonName",
    //   label: "跟单人"
    // },
    {
      prop: "salesmanfollowPersonName",
      label: "接单人/跟单人",
      template:true,
    },
    {
      prop: "supplierName",
      label: "供应商名称",
      width: "200"
    },
    {
      prop: "supplierContactName",
      label: "供应商联系人姓名"
    },
    // {
    //   prop: "supplierPhone",
    //   label: "卖方手机"
    // },
    // {
    //   prop: "supplierTel",
    //   label: "卖方电话"
    // },
    {
      prop: "supplierPhoneTel",
      label: "卖方手机/电话",
      template:true,
    },
    {
      prop: "supplierCurrencyName",
      label: "销售币别"
    },
    // {
    //   prop: "consignmentCollection",
    //   label: "委托收款"
    // },
    // {
    //   prop: "deliverGoods",
    //   label: "卖方交(发)货"
    // },
    {
      prop: "customerName",
      label: "客户名称"
    },
    {
      prop: "currencyName",
      label: "采购币别"
    },
    // {
    //   prop: "consignmentPayment",
    //   label: "委托付款",
    //   template:true,
    // },
    // {
    //   prop: "pickUpGoods",
    //   label: "买方接(提)货",
    //   template:true,
    // },
    {
      prop: "agreementName",
      label: "协议名称"
    },
    {
      prop: "agreementSolutionName",
      label: "协议方案名称"
    },
    {
      prop: "bizTypeName",
      label: "业务类型"
    },
    {
      prop: "reportGateTypeName",
      label: "报关类型"
    },
    {
      prop: "tradeModeName",
      label: "贸易方式"
    },
    {
      prop: "dealModeName",
      label: "成交方式"
    },
    {
      prop: "receivableMethodName",
      label: "收款方式"
    },
    // {
    //   prop: "chargeModeName",
    //   label: "计价方式"
    // },
    // {
    //   prop: "reportUntilComplete",
    //   label: "等齐报"
    // },
    // {
    //   prop: "sendUntilComplete",
    //   label: "等齐送"
    // },
    {
      prop: "serviceChargeName",
      label: "服务费计算-种类"
    },
    {
      prop: "serviceTaxRate",
      label: "服务费率%"
    },
    {
      prop: "orderExchangeRate",
      label: "订单汇率%"
    },
    {
      prop: "serviceFee",
      label: "定额服务费"
    },
    {
      prop: "goodsValue",
      label: "卖方销售总货值"
    },
    {
      prop: "customTotalAmount",
      label: "关税合计"
    },
    {
      prop: "customCurrencyName",
      label: "关税币别"
    },
    {
      prop: "vatTotalAmount",
      label: "增值税合计"
    },
    {
      prop: "vatCurrencyName",
      label: "增值税币别"
    },
    {
      prop: "totalServiceCharge",
      label: "服务费总和"
    },
    {
      prop: "serviceCurrencyName",
      label: "服务费币别"
    },
    // {
    //   prop: "matPayment",
    //   label: "是否垫货款"
    // },
    {
      prop: "trusteePayGoodsAmount",
      label: "受托方应付货款总额"
    },
    {
      prop: "invoiceAmount",
      label: "应开票金额"
    },
    {
      prop: "invoiceCurrencyName",
      label: "发票币别"
    },
    {
      prop: "advanceAmount",
      label: "预计应收总额"
    },
    {
      prop: "advanceCurrencyName",
      label: "应收币别"
    },
    {
      prop: "refundCustomerAmount",
      label: "应退客户货款"
    },
    {
      prop: "paidGoodsAmount",
      label: "已付货款总额"
    },
    {
      prop: "paidCurrencyName",
      label: "已付币别"
    },
    {
      prop: "dayRate",
      label: "日利率(%)"
    },
    // {
    //   prop: "chargeInterest",
    //   label: "计息"
    // },
    // {
    //   prop: "minCharge",
    //   label: "最低消费差额"
    // },
    // {
    //   prop: "minChargeCurrency",
    //   label: "最低消费差额币别"
    // },
    {
      prop: "supplierPayModeName",
      label: "付供应商货款方式"
    },
    {
      prop: "pickUpTypeName",
      label: "提货信息"
    },
    // {
    //   prop: "invoiceRemark",
    //   label: "发票备注"
    // },
    // {
    //   prop: "remark",
    //   label: "备注"
    // },
    // {
    //   prop: "trusteeCurrency",
    //   label: "受托方币别"
    // },
    // {
    //   prop: "refundCurrency",
    //   label: "应退币别"
    // },
    // {
    //   prop: "InStorage",
    //   label: "入香港仓"
    // },
    // {
    //   prop: "invoiceType",
    //   label: "开票类型"
    // },
    // {
    //   prop: "advanceActualAmount",
    //   label: "预计实收金额"
    // },
    // {
    //   prop: "actualCurrency",
    //   label: "实收币别"
    // },
    // {
    //   prop: "advanceReceivableDate",
    //   label: "预计收款日"
    // },
    // {
    //   prop: "orderType",
    //   label: "单据类型"
    // },
    // {
    //   prop: "specialTips",
    //   label: "特别提示"
    // },
    // {
    //   prop: "serviceChargeDis",
    //   label: "服务费折让"
    // },
  ]
};
