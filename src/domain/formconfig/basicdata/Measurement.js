import validate from '@/domain/common/validate'
const rules = validate.setRequired(),
  layout = `flex-basis:98%; height: auto !important`
export default [
  {
    type: 'string',
    key: 'measurementCode',
    name: '计量单位编码',
    prop: 'measurementCode',
    disabled: true,
    rules
  },
  {
    type: 'select',
    selectOption: [],
    selectKey: 'unitGroup',
    key: 'measurementGroup',
    name: '计量单位组',
    prop: 'measurementGroup',
    rules
  },
  {
    type: 'string',
    key: 'measurementCoding',
    name: '计量单位代码',
    prop: 'measurementCoding',
    rules
  },
  {
    type: 'string',
    key: 'measurementUnit',
    name: '计量单位名称',
    prop: 'measurementUnit',
    rules
  },
  {
    type: 'string',
    key: 'assistUnit',
    name: '辅助计量单位',
    prop: 'assistUnit'
  },
  /*   {
    type: 'string',
    key: 'conversionRate',
    prop: 'conversionRate',
    name: '换算比例(%)'
  }, */
  {
    type: 'textarea',
    key: 'remark',
    name: '备注',
    prop: 'remark',
    layout
  }
]
