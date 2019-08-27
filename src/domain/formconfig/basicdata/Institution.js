import validate from '@/domain/common/validate'
const rules = validate.setRequired()
export default [
  {
    type: 'string',
    key: 'institutionCode',
    name: '编码',
    prop: 'institutionCode',
    disabled: true,
    rules
  },
  {
    type: 'string',
    key: 'institutionName',
    name: '中文名称',
    prop: 'institutionName',
    rules
  },
  {
    type: 'string',
    key: 'institutionAbb',
    name: '中文简称',
    prop: 'institutionAbb',
    rules
  },
  {
    type: 'select',
    selectOption: [],
    selectKey: 'institutionType',
    key: 'institutionType',
    name: '机关类别',
    prop: 'institutionType',
    rules
  },
  {
    type: 'string',
    key: 'customsCode',
    name: '代码',
    prop: 'customsCode',
    rules
  },
  {
    type: 'textarea',
    key: 'description',
    name: '描述',
    prop: 'description'
  }
]
