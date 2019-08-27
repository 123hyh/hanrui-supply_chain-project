import validate from '@/domain/common/validate'
export default [
  {
    type: 'string',
    key: 'deliveryRequirements',
    name: '交(提)货日期',
    prop: 'deliveryRequirements'
  },
  {
    type: 'string',
    key: 'agreementNo',
    name: '协议编号',
    prop: 'agreementNo',
    disabled: true
  },
  {
    type: 'select',
    selectKey: 'paymentMethod',
    selectOption: [],
    key: 'payMode',
    name: '付款方式',
    prop: 'payMode'
  },
  {
    type: 'string',
    key: 'payCycle',
    name: '自卖方交货日期多少天支付',
    prop: 'payCycle',
    rules: [
      {
        validator: validate.validateNum,
        trigger: ['blur', 'change']
      }
    ]
  }
]
