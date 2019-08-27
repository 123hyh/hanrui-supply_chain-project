import validate from "@/domain/common/validate"
export default {
  list: [
    {
      type: 'string',
      key: "billNo",
      name: "单据编号",
      prop: "billNo",
      group: '2',
      order: 1
    },
    {
      type: 'string',
      key: "receiptNo",
      name: "收款单",
      prop: "receiptNo",
      group: '1'

    },
    {
      type: 'select',
      selectOption: [],
      selectKey: "currencyName",
      key: "sourceCurrency",
      name: "原币币别",
      prop: "sourceCurrency",
      group: '1'

    },
    {
      type: 'select',
      selectOption: [],
      selectKey: "collectionType",
      key: "receiptType",
      name: "收款类型",
      prop: "receiptType",
      group: '1'

    },
    {
      type: 'string',
      key: "receiptAccount", /* recCurrency */
      name: "收款账户",
      prop: "receiptAccount",
      group: '1'

    },
    {
      type: 'string',
      key: "receiptBank",
      name: "收款银行",
      prop: "receiptBank",
      group: '1'

    },
    {
      type: 'string',
      key: "paymentBank",
      name: "付款银行",
      prop: "paymentBank",
      group: '1'

    },
    {
      type: 'string',
      key: "paymentAccountName",
      name: "付款账户",
      prop: "paymentAccountName",
      group: '1'
    },
    {
      type: 'select',
      selectKey: 'payerType',
      selectOption: [],
      key: "communicateType",
      name: "往来类型",
      prop: "communicateType",
      group: '1'
    },
    {
      type: 'string',
      key: "communicateAccountName", /* communicateAccount */
      name: "往来户",
      prop: "communicateAccountName",
      group: '1'
    },
    {
      type: 'string',
      key: "unsubscribedAmount",
      name: "未认款金额",
      prop: "unsubscribedAmount",
      skey: 'currencyName',
      selectKey: 'currencyName',
      selectOption: [],
      rules: [{
        validator: validate.validateNum,
        trigger: ['blur']
      }],
      group: '1'
    },
    {
      type: 'date',
      key: "bizdate",
      name: "业务日期",
      prop: "bizdate",
      group: '2',
      order: 2
    },
    {
      type: 'select',
      selectOption: [],
      selectKey: "orderStatus",
      key: "status",
      name: "状态",
      prop: "status",
      isShow: true
    },
    {
      type: 'string',
      key: "currencyRate",
      name: "收款折应收币别汇率",
      prop: "currencyRate",
      group: '2',
      order: 4
    },
    {
      type: 'select',
      key: 'subCurrency',
      name: '收款认款金额币别',
      selectKey: 'currencyName',
      prop: 'subCurrency',
      selectOption: [],
      group: '2',
      order: 4.5
    },
    {
      type: 'calculate',
      readonly: true,
      key: "subscriptionAmount",
      name: "收款认款金额",
      prop: "subscriptionAmount",
      rules: [{
        validator: validate.validateNum,
        trigger: ['blur']
      }],
      group: '2',
      order: 5
    },
    {
      type: 'checkbox',
      key: "chargedBalance",
      name: "余额是否收取",
      prop: "chargedBalance",
      group: '2',
      order: 8
    },
    {
      type: 'select',
      key: 'recCurrency',
      name: '应收认款金额币别',
      selectKey: 'currencyName',
      selectOption: [],
      group: '2',
      order: 6
    },
    {
      type: 'number',
      key: "receivableAmount",
      name: "应收认款金额",
      prop: "receivableAmount",
      selectKey: 'currencyName',
      selectOption: [],
      rules: [{
        validator: validate.validateNum,
        trigger: ['blur', 'change']
      }],
      group: '2',
      order: 7
    },
    {
      type: 'checkbox',
      key: "hasCredentials",
      name: "是否已生成凭证",
      prop: "hasCredentials",
      group: '2',
      order: 3
    },
    {
      type: 'string',
      btn: true,
      key: 'customerNo',
      name: '客户',
      prop: 'customerNo'
    },
    {
      type: 'textarea',
      key: "remark",
      name: "备注",
      prop: "remark",
      group: '2',
      order: 9
    },
  ],
  otherConfig: {
    title: {
      '1': {
        visible: false
      },
      '2': {
        visible: false
      }
    },
    slot: {
      '2': {
        visible: true
      }
    }
  }
}