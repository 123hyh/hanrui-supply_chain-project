import validate from '@/domain/common/validate.js'
const rules = validate.setRequired()
export default [
  {
    type: 'checkbox',
    key: 'submission',
    name: '提交归类',
    prop: 'submission'
  },
  {
    type: 'checkbox',
    key: 'declaration',
    name: '特殊申报',
    prop: 'declaration'
  },
  {
    type: 'string',
    key: 'exRemarks',
    name: '出口备注',
    prop: 'exRemarks'
  },
  {
    type: 'string',
    key: 'imRemarks',
    name: '进口备注',
    prop: 'imRemarks'
  },
  {
    selectOption: [],
    type: 'select',
    selectKey: 'tradeType',
    key: 'tradeType',
    name: '商品类型',
    prop: 'tradeType'
  },
  {
    selectOption: [],
    type: 'select',
    selectKey: 'declarationType',
    key: 'declarationType',
    name: '申报类型',
    prop: 'declarationType',
    rules
  },
  {
    type: 'string',
    type: 'string',
    key: 'aveNetWeight',
    name: '平均净重',
    prop: 'aveNetWeight'
  },
  {
    type: 'string',
    type: 'string',
    key: 'riskNetWeight',
    name: '风险净重',
    prop: 'riskNetWeight'
  },
  {
    type: 'string',
    key: 'codeVersion',
    name: '编码版本号',
    prop: 'codeVersion'
  },
  {
    type: 'string',
    key: 'inspectionNo',
    name: '检验检疫附加编号',
    prop: 'inspectionNo',
    btn: true,
    readonly: true
  },
  {
    type: 'string',
    key: 'inspectionName',
    name: '检验检疫名称',
    prop: 'inspectionName'
  },
  {
    type: 'string',
    key: 'taxClassifyNo',
    name: '税收分类',
    prop: 'taxClassifyNo'
  },
  {
    type: 'checkbox',
    key: 'favouredPolicy',
    name: '享受优惠政策',
    prop: 'favouredPolicy'
  },
  {
    type: 'string',
    key: 'policyContent',
    name: '优惠政策内容',
    prop: 'policyContent'
  }
]
