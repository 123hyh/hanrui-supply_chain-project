export default [
  {
    type: 'select',
    selectKey: '',
    selectOption: [
      { itemKey: '1', itemValue: '委托方' },
      { itemKey: '2', itemValue: '客户' },
      { itemKey: '3', itemValue: '供应商' }
    ],
    name: '往来户类型',
    key: 'type',
    prop: 'type'
  },
  {
    type: 'string',
    btn: true,
    key: 'paymentAccountName',/*  paymentAccount*/
    name: '往来户',
    prop: 'paymentAccountName',
  },
  {
    type: 'select',
    key: 'moneyType',
    name: '收款币别',
    prop: 'moneyType',
    selectKey: 'currencyName',
    selectOption: []
  },
  {
    type: 'string',
    btn: true,
    key: 'accountingName', /* accounting */
    prop: 'accountingName',
    name: '跟账人',
  }
]