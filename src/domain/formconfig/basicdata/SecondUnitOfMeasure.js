import validate from '@/domain/common/validate'
const rules = validate.setRequired()
export default [
  {
    type: 'string',
    key: 'measurementCode',
    prop: 'measurementCode',
    name: '第二计量单位编码',
    isShow: true
  },
  {
    type: 'string',
    btn: true,
    prop: 'measurementUnit',
    name: '第二计量单位',
    key: 'measurementUnit',
    rules
  },
  {
    type: 'string',
    prop: 'measurementGroup',
    key: 'measurementGroup',
    name: '第二计量单位组'
  },
  {
    type: 'checkbox',
    prop: 'forbidden',
    key: 'forbidden',
    name: '是否禁用'
  },
  {
    type: 'textarea',
    key: 'remark',
    prop: 'remark',
    name: '备注',
    layout: 'flex-basis:100%;height: auto !important'
  }
]
