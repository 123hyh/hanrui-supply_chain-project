export default [
  {
    type: 'string',
    name: '委托单号',
    key: 'delegeteBillNo',
    prop: 'delegeteBillNo'
  },
  {
    type: 'date',
    name: '开始日期',
    key: 'createTimeFrom',
    prop: 'createTimeFrom'
  },
  {
    type: 'date',
    name: '结束日期',
    key: 'createTimeTo',
    prop: 'createTimeTo'
  },
  {
    type: 'string',
    btn: true,
    key: 'clientName',/* client */
    prop: 'clientName',
    name: '客户'
  },
  {
    type: 'select',
    key: 'entrustOrderType',
    selectKey: 'entrustOrderType',
    selectOption: [],
    name: '委托单类型'
  },
  {
    type: 'string',
    btn: true,
    key: 'delegateName',/* delegate */
    props: 'delegateName',
    name: '委托方'
  }
]