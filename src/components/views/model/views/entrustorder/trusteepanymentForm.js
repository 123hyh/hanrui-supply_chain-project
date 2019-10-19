let rules = {
  required: true,
  message: "不能为空",
  trigger: ['blur', 'change']
};
export default [
  {
    nonetitle: true,
    items: [
      {
        name: "settlementUnitName",
        type: "inputbutton",
        label: "结算单位",
        readonly: true,
        rules
      },
      {
        name: "inOutType",
        type: "input",
        label: "收付类别",
      },
      {
        name: "unitType",
        type: "input",
        label: "往来户类型",
      },
      {
        name: "unitName",
        type: "input",
        label: "往来户名称",
      },
      {
        name: "unitEnName",
        type: "input",
        label: "往来户英文名称",
      },
      {
        name: "invoiceType",
        type: "select",
        label: "发票类型",
        selectapi: "InvoiceTypes",
        disabled: true,
      },
      {
        name: "paymentNature",
        type: "input",
        label: "付款性质",
      },
      {
        name: "paymentType",
        type: "input",
        label: "付款期限",
      },
      {
        name: "settlementDate",
        type: "date",
        label: "约定结算日期",
      },
      {
        name: "settlementCurrentcy",
        type: "select",
        label: "约定结算币别",
        selectapi: "currencyName",
      },
      {
        name: "paymentAmount",
        type: "money",
        label: "约定付款金额",
      },
      {
        name: "otherAmount",
        type: "money",
        label: "付杂费金额",
      },
      {
        name: "otherCurrency",
        type: "select",
        label: "杂费币种",
        selectapi: "currencyName",
      },
      {
        name: "paidOtherFee",
        type: "switch",
        label: "是否已付杂费",
      },
      {
        name: "consignmentPayment",
        type: "switch",
        label: "是否已委托付款",
      },
    ]
  }
];
