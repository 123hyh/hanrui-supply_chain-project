export default {
  list: [
    {
      type: 'string',
      readonly: true,
      key: 'billNo',
      name: '单据编号',
      prop: 'billNo',
      group: '1',
      order: 1
    },
    {
      type: 'string',
      btn: true,
      readonly: true,
      key: 'entrustOrderNo',
      name: '委托单号',
      prop: 'entrustOrderNo',
      group: '1',
      order: 1.9
    },
    {
      type: 'checkbox',
      key: 'payBeyond',
      name: '是否超额付款',
      prop: 'payBeyond',
      group: '1',
      order: 5
    },
    {
      type: 'checkbox',
      key: 'booked',
      name: '是否已预约',
      prop: 'booked',
      isShow: true,
      group: '1'
    },
    {
      type: 'select',
      selectKey: 'paymentNature',
      selectOption: [],
      key: 'payNature',
      name: '付款性质',
      prop: 'payNature',
      group: '1',
      order: 6
    },
    {
      type: 'select',
      selectKey: 'payOperation',
      selectOption: [],
      key: 'payOperation',
      name: '付款操作',
      prop: 'payOperation',
      group: '1',
      order: 7
    },
    {
      type: 'string',
      btn: true,
      key: 'delegeteName',
      name: '委托方',
      prop: 'delegeteName',
      group: '1',
      order: 2
    },
    {
      type: 'string',
      key: 'trusteeName',
      name: '受托方',
      prop: 'trusteeName',
      group: '1',
      order: 3
    },
    {
      type: 'string',
      btn: true,
      key: 'agentName',
      name: '代理方',
      prop: 'agentName',
      group: '1',
      order: 4
    },
    {
      type: 'select',
      selectOption: [{ itemKey: '1', itemValue: '货款' }],
      selectKey: '', //selectKey: "paymentType",
      key: 'payType',
      name: '付款类型',
      prop: 'payType',
      group: '1',
      order: 8,
    },
    {
      type: 'string',
      key: 'financeproject',
      name: '款项明细',
      prop: 'financeproject',
			disabled: true,
      group: '1',
      order: 8
    },
    {
      type: 'select',
      selectOption: [],
      selectKey: 'currencyName',
      key: 'payMontyType',
      name: '付款币别',
      prop: 'payMontyType',
      group: '1',
      order: 13
    },
    {
      type: 'select',
      selectOption: [],
      selectKey: 'freightPayerType',
      key: 'serviceChargePayerType',
      name: '手续费承担方类型',
      prop: 'serviceChargePayerType',
      group: '1',
      order: 9
    },
    {
      type: 'string',
      key: 'checkNumber',
      name: '支票号码',
      prop: 'checkNumber',
      isShow: true,
      group: '1'
    },
    {
      type: 'number',
      key: 'payMoneyRMBexchangeRate',
      name: '付款币别：人民币汇率',
      prop: 'payMoneyRMBexchangeRate',
      group: '1',
      order: 14
    },
    {
      type: 'string',
      btn: true,
      readonly: true,
      key: 'serviceChargeName',
      name: '手续费承担方',
      prop: 'serviceChargeName',
      group: '1',
      order: 10
    },
    {
      type: 'string',
      btn: true,
      readonly: true,
      key: 'receiptsBill',
      name: '收款单',
      prop: 'receiptsBill',
      group: '1',
      order: 16
    },
    {
      type: 'string',
      key: 'financialReceiptsAudit',
      name: '财务收款审核',
      prop: 'financialReceiptsAudit',
      isShow: true,
      group: '1'
    },
    {
      type: 'number',
      key: 'receiptsAmount',
      name: '收款金额',
      prop: 'receiptsAmount',
			disabled: true,
      group: '1',
      order: 17
    },
    /*  {
       select: true,
       selectOption: [],
       selectKey: "",
       key: "billState",
       name: "单据状态",
       prop: "billState"
     }, */
    {
      type: 'string',
      readonly: true,
      key: 'ownReceiveBankName',
      name: '收款银行',
      prop: 'ownReceiveBankName',
			disabled: true,
      group: '1',
      order: 18
    },
    {
      type: 'select',
      selectOption: [],
      selectKey: 'freightPayerType',
      key: 'incidentalPayerType',
      name: '杂费承担方类型',
      prop: 'incidentalPayerType',
      group: '1',
      order: 11
    },
    {
      type: 'string',
      btn: true,
      readonly: true,
      key: 'incidentalPayerName',
      name: '杂费承担方',
      prop: 'incidentalPayerName',
      group: '1',
      order: 12
    },
    {
      type: 'number',
      key: 'expectedAmountReceipt',
      name: '预计收款金额',
      prop: 'expectedAmountReceipt',
      isShow: true,
      group: '1'
    },
    {
      type: 'date',
      key: 'plannedPayDate',
      name: '计划付款日期',
      prop: 'plannedPayDate',
      group: '1',
      order: 15
    },
    {
      type: 'number',
      key: 'payForOthersAmount',
      name: '代付合计金额',
      prop: 'payForOthersAmount',
			disabled: true,
      group: '1',
      order: 20
    },
    {
      type: 'date',
      key: 'termBillFinishDate',
      name: '期票结束日期',
      prop: 'termBillFinishDate',
      isShow: true,
      group: '1'
    },
    {
      type: 'string',
      key: 'remark',
      name: '备注',
      prop: 'remark',
      isShow: true,
      group: '1'
    },
    {
      type: 'number',
      key: 'advancePaymentAmount',
      name: '垫付合计金额',
      prop: 'advancePaymentAmount',
      group: '1',
			disabled: true,
      order: 19
    },
    {
      type: 'checkbox',
      key: 'shouldReceiveBill',
      name: '是否应收单',
      prop: 'shouldReceiveBill',
      isShow: true,
      group: '2'
    },
    {
      type: 'string',
      key: 'termBillDays',
      name: '期票天数',
      prop: 'termBillDays'
    },
    {
      type: 'string',
      btn: true,
      readonly: true,
      key: 'receiverUserName',
      name: '收款方',
      prop: 'receiverUserName',
      group: '2',
      order: 1
    },
    {
      type: 'checkbox',
      key: 'innerDeduction',
      name: '是否内扣',
      prop: 'innerDeduction',
      group: '2',
      order: '99'
    },
    {
      type: 'string',
      key: 'country',
      name: '国家',
      prop: 'country',
      group: '2',
      order: 2
    },
    {
      type: 'number',
      key: 'ttServiceCharge',
      name: 'TT手续费',
      prop: 'ttServiceCharge',
      group: '2',
      order: 10
    },
    {
      type: 'select',
      selectOption: [],
      selectKey: 'currencyName',
      key: 'serviceChargeMoneyType',
      name: '手续费币别',
      prop: 'serviceChargeMoneyType',
      group: '2',
      order: 11
    },
    {
      type: 'select',
      selectOption: [],
      selectKey: 'handlingChargeMethod',
      key: 'wayOfServiceCharge',
      name: '手续费承担方式',
      prop: 'wayOfServiceCharge',
      group: '2',
      order: 12
    },
    {
      type: 'string',
      btn: true,
      key: 'payeeAccount',
      name: '收款人账号',
      prop: 'payeeAccount',
      group: '2',
      order: 4
    },
    {
      type: 'checkbox',
      key: 'fullAccountArrival',
      name: '是否全额到账',
      prop: 'fullAccountArrival',
      isShow: true,
      group: '2'
    },
    {
      type: 'string',
      key: 'city',
      name: '城市',
      prop: 'city',
      group: '2',
      order: 3
    },
    {
      type: 'string',
      key: 'swiftCode',
      name: 'SWIFT',
      prop: 'swiftCode',
      group: '2',
      order: 9
    },
    {
      type: 'checkbox',
      key: 'accountBeenPaid',
      name: '账号是否付过',
      prop: 'accountBeenPaid',
      group: '2',
      order: 111
    },
    {
      type: 'string',
      key: 'bankNO',
      name: '银行编号',
      prop: 'bankNO',
      isShow: true,
      group: '2'
    },
    {
      type: 'string',
      key: 'receiveBank',
      name: '收款银行',
      prop: 'receiveBank',
      group: '2',
      order: 5
    },
    {
      type: 'string',
      key: 'destination',
      name: '目的地',
      prop: 'destination',
      group: '2',
      order: 6
    },
    {
      type: 'select',
      selectOption: [],
      selectKey: 'settlementMethod',
      key: 'settlementMethod',
      name: '结算方式',
      prop: 'settlementMethod',
      group: '2',
      order: 8
    },
    {
      type: 'string',
      key: 'payeePhone',
      name: '收款人电话',
      prop: 'payeePhone',
      group: '2',
      order: 13
    },
    {
      type: 'string',
      key: 'payeeFax',
      name: '收款人传真',
      group: '2',
      prop: 'payeeFax',
      order: 14
    },
    {
      type: 'string',
      key: 'invoiceName',
      name: '开票名称',
      group: '2',
      prop: 'invoiceName',
      order: 15
    },
    {
      type: 'string',
      key: 'invoiceAbbreviation',
      name: '开票简称',
      group: '2',
      prop: 'invoiceAbbreviation',
      order: 16
    },
    {
      type: 'string',
      key: 'receiveBankAddress',
      name: '收款银行地址',
      group: '2',
      prop: 'receiveBankAddress',
      order: 7
    },
    {
      type: 'string',
      key: 'postscript',
      name: '附言',
      group: '2',
      prop: 'postscript',
      order: 19
    },
    {
      type: 'checkbox',
      key: 'discount',
      name: '是否贴现',
      group: '2',
      prop: 'discount',
      order: 17
    },
    {
      type: 'select',
      selectOption: [],
      selectKey: 'discountType',
      key: 'discountType',
      name: '贴现类型',
      prop: 'discountType',
      group: '2',
      order: 18
    },
    {
      key: 'auditor',
      name: '审核人',
      prop: 'auditor',
      isShow: true,
      group: '2',
      isShow: true
    },
    {
      date: true,
      key: 'auditTime',
      name: '审核时间',
      prop: 'auditTime',
      isShow: true,
      group: '2',
      isShow: true
    }
  ],
  otherConfig: {
    title: {
      '1': {},
      '2': {
        text: '付款 基本信息',
        visible: true
      }
    },
    slot: {
      '2': {
        visible: true
      }
    }
  }
}
