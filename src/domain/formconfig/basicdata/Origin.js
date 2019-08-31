import validate from '@/domain/common/validate.js'
const rules = validate.setRequired()
export default [
  {
    type: 'string',
    key: 'originCode',
    name: '单据编号',
    prop: 'originCode',
    readonly: true,
    rules
  },

  {
    type: 'string',
    key: 'countryCode',
    prop: 'countryCode',
    name: '国家代码'
  },
  {
    type: 'string',
    key: 'originName',
    name: '名称',
    prop: 'originName',
    rules
  },
  {
    type: 'string',
    key: 'originAbb',
    name: '缩写',
    prop: 'originAbb',
    rules
  },
  {
    type: 'string',
    key: 'engName',
    name: '全英文名',
    prop: 'engName',
  },
  {
    type: 'string',
    key: 'description',
    name: '描述',
    prop: 'description'
  }
]
