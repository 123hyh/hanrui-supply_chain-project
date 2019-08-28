import validate from '@/domain/common/validate'
const rules = validate.setRequired()
export default [
  // {
  // 	type: 'string',
  // 	key: "billCode",
  // 	name: "单据编码",
  // 	prop: "billCode"
  // },
  {
    type: 'string',
    key: 'billCode',
    name: '税种编码',
    prop: 'billCode',
    rules
  },
  {
    type: 'string',
    key: 'taxCategoryName',
    name: '名称',
    prop: 'taxCategoryName',
    rules
  },
  {
    type: 'number',
    key: 'tax',
    name: '税率%',
    prop: 'tax',
    rules
  },
  {
    type: 'select',
    selectOption: [],
    selectKey: 'taxType',
    key: 'taxType',
    name: '计税类型',
    prop: 'taxType',
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
