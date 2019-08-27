import validate from '@/domain/common/validate'
const rules = validate.setRequired()
export default [
  {
    type: 'string',
    key: 'stockStatusCode',
    name: '库存状态编码',
    prop: 'stockStatusCode',
    disabled: true,
    rules
  },
  {
    type: 'string',
    key: 'stockStatus',
    name: '库存状态',
    prop: 'stockStatus',
    rules
  },
  {
    type: 'textarea',
    key: 'description',
    name: '描述',
    prop: 'description',
    layout: `flex-basis: 100%;height: auto !important`
  }
]
