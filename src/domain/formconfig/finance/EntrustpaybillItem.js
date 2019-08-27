export default {
  list: [
    {
      type: 'string',
      key: 'itemCode',
      name: '子表编码',
      prop: 'itemCode',
      isShow: true,
      group: 1
    },
    {
      type: 'string',
      key: 'billNo',
      name: '主表编码',
      prop: 'billNo',
      isShow: true,
      group: 1
    },
    {
      type: 'string',
      key: 'entrustOrderNo',
      name: '委托单号',
      prop: 'entrustOrderNo',
      group: 1
    },
    // {
    //   type: 'checkbox',
    //   key: 'paymentOnly',
    //   name: '仅供走账',
    //   prop: 'paymentOnly',
    //   group: 1
    // },
    // {
    //   type: 'number',
    //   key: 'entrustAmount',
    //   name: '委托付货款金额',
    //   prop: 'entrustAmount',
    //   group: 1
    // },
    {
      type: 'number',
      key: 'sellerAmount',
      name: '卖方销售金额',
      prop: 'sellerAmount',
      disabled: true,
      group: 1
    },
    {
      type: 'select',
      selectOption: [],
      selectKey: 'currencyName',
      key: 'sellerCurrency',
      name: '卖方销售币别',
      prop: 'sellerCurrency',
      disabled: true,
      group: 1
    },
    {
      type: 'number',
      key: 'needPay',
      name: '此次需付款金额',
      prop: 'needPay',
      group: 1
    },
    // {
    //   type: 'string',
    //   key: 'paymentDeadline',
    //   name: '付款期限',
    //   prop: 'paymentDeadline',
    //   group: 1
    // },
    {
      type: 'select',
      selectOption: [],
      selectKey: 'declareCustoms',
      key: 'reportGateType',
      name: '报关类型',
      prop: 'reportGateType',
      disabled: true,
      group: 1
    },
    {
      type: 'select',
      selectOption: [],
      selectKey: '',//businessType
      key: 'bizType',
      name: '业务类型',
      disabled: true,
      prop: 'bizType',
      group: 1
    },
    {
      type: 'number',
      key: 'sellerRate',
      name: '汇率（卖方销售）',
      prop: 'sellerRate',
      disabled: true,
      group: 1
    },
    {
      type: 'number',
      key: 'inciAmount',
      name: '付杂费金额',
      prop: 'inciAmount',
      group: 1
    },
    {
      type: 'select',
      selectOption: [],
      selectKey: 'currencyName',
      key: 'inciCurrency',
      name: '杂费币别',
      prop: 'inciCurrency',
      group: 1
    },
    {
      type: 'number',
      key: 'inciRate',
      name: '汇率（杂费）',
      prop: 'inciRate',
      group: 1
    },
    {
      type: 'select',
      selectOption: [],
      selectKey: 'remittanceMethod',
      key: 'remittanceMethod',
      name: '汇差处理方式',
      prop: 'remittanceMethod',
      group: 1
    },
    {
      type: 'number',
      key: 'remittanceAmount',
      name: '汇差金额',
      prop: 'remittanceAmount',
      disabled: true,
      group: 1
    },
    // {
    //   type: 'string',
    //   key: 'formula',
    //   name: '计算公式',
    //   prop: 'formula',
    //   group: 1
    // },
    // {
    //   type: 'number',
    //   key: 'remittanceReceive',
    //   name: '汇差',
    //   prop: 'remittanceReceive',
    //   group: 1
    // },
    // {
    //   type: 'string',
    //   key: 'bizFormula',
    //   name: '业务应收公式',
    //   prop: 'bizFormula',
    //   group: 1
    // },
    // {
    //   type: 'string',
    //   key: 'ticket',
    //   name: '代入票',
    //   prop: 'ticket',
    //   group: 1
    // },
    {
      type: 'string',
      key: 'remark',
      name: '备注',
      prop: 'remark',
      group: 1
    },
    {
      type: 'checkbox',
      key: 'hasPay',
      name: '是否已付款',
      prop: 'hasPay',
      disabled: true,
      group: 1
    },
    // {
    //   type: 'number',
    //   key: 'hasPayAmount',
    //   name: '已付款金额',
    //   prop: 'hasPayAmount',
    //   group: 1
    // },
    // {
    //   type: 'date',
    //   key: 'payTime',
    //   name: '付款时间',
    //   prop: 'payTime',
    //   group: 1
    // },
    {
      type: 'select',
      selectKey: 'exchangeRateBasis',
      selectOption: [],
      key: 'rateBasis',
      name: '货款汇率取值依据',
      prop: 'rateBasis',
      disabled: true,
      group: 1
    },
    {
      type: 'date',
      key: 'rateDate',
      name: '货款汇率日期',
      prop: 'rateDate',
      disabled: true,
      group: 1
    },
    {
      type: 'number',
      key: 'rate',
      name: '货款汇率',
      prop: 'rate',
      disabled: true,
      group: 1
    },
    // {
    //   type: 'number',
    //   key: 'proceedsRate',
    //   name: '货价收入汇率',
    //   prop: 'proceedsRate',
    //   group: 1
    // },
    // {
    //   type: 'number',
    //   key: 'receivableAmount',
    //   name: '应收金额',
    //   prop: 'receivableAmount',
    //   group: 1
    // },
    // {
    //   type: 'string',
    //   key: 'agreementPay',
    //   name: '协议付款性质',
    //   prop: 'agreementPay',
    //   group: 1
    // },
    // {
    //   type: 'string',
    //   key: 'backCode',
    //   name: '往来户编码',
    //   prop: 'backCode',
    //   group: 1
    // },
    // {
    //   type: 'string',
    //   key: 'backName',
    //   name: '往来户名称',
    //   prop: 'backName',
    //   group: 1
    // },
    // {
    //   type: 'string',
    //   key: 'backEnName',
    //   name: '往来户英文名称',
    //   prop: 'backEnName',
    //   group: 1
    // },
    // {
    //   type: 'string',
    //   key: 'trusteeCode',
    //   name: '指定受托方公司编码',
    //   prop: 'trusteeCode',
    //   group: 1
    // },
    // {
    //   type: 'string',
    //   key: 'trusteeName',
    //   name: '指定受托方公司名称',
    //   prop: 'trusteeName',
    //   group: 1
    // },
    // {
    //   type: 'string',
    //   key: 'supplierCode',
    //   name: '上级供应商编码',
    //   prop: 'supplierCode',
    //   group: 1
    // },
    // {
    //   type: 'string',
    //   key: 'supplierName',
    //   name: '上级供应商名称',
    //   prop: 'supplierName',
    //   group: 1
    // },
    // {
    //   type: 'number',
    //   key: '.js',
    //   name: '实际代付金额',
    //   prop: '.js',
    //   group: 1
    // },
    // {
    //   type: 'number',
    //   key: 'advanceAmount',
    //   name: '实际垫付金额',
    //   prop: 'advanceAmount',
    //   group: 1
    // },
    // {
    //   type: 'date',
    //   key: 'advanceDate',
    //   name: '实际垫付账期',
    //   prop: 'advanceDate',
    //   group: 1
    // },
    // {
    //   type: 'number',
    //   key: 'applyAmount',
    //   name: 'E链申请付汇金额',
    //   prop: 'applyAmount',
    //   group: 1
    // },
    // {
    //   type: 'number',
    //   key: 'paidAmount',
    //   name: 'E链委托付款金额',
    //   prop: 'paidAmount',
    //   group: 1
    // }
  ],
  otherConfig: {
    title: {
      '1': {
        visible: false
      }
    }
  }
}
