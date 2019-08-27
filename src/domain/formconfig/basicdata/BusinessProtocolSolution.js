export default [
  {
    type: 'string',
    name: '方案名称',
    key: 'solutionName'
  },
  {
    type: 'select',
    selectKey: 'declareCustoms',
    selectOption: [],
    key: 'customType',
    name: '报关类型'
  },
  {
    type: 'select',
    selectKey: 'businessTypeG',
    selectOption: [],
    key: 'businessType',
    name: '业务类型'
  },
  {
    type: 'select',
    selectKey: 'entrustOrderTypeG',
    selectOption: [],
    key: 'entrustOrderType',
    name: '订单类型'
  },
  {
    type: 'string',
    key: 'chargeFormula',
    name: '结算公式'
  },
  {
    type: 'select',
    selectKey: 'status',
    selectOption: [],
    key: 'status',
    name: '使用状态'
  },
  {
    type: 'textarea',
    name: '备注',
    key: 'remark',
    layout: `flex-basis: 91%;height: auto !important`
  }
]
