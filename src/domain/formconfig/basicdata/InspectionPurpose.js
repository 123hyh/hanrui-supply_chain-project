import validate from '@/domain/common/validate'
const rules = validate.setRequired()
export default [
  {
    type: 'string',
    key: 'inspectionPurposeCode',
    name: '编码',
    prop: 'inspectionPurposeCode',
    disabled: true,
    rules
  },
  {
    type: 'string',
    key: 'inspectionPurposeName',
    name: '中文名称',
    prop: 'inspectionPurposeName',
    rules
  },
  {
    type: 'string',
    key: 'inspectionPurposeAbb',
    name: '简称',
    prop: 'inspectionPurposeAbb',
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
