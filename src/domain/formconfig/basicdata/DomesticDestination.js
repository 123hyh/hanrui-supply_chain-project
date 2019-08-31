import validate from '@/domain/common/validate'
const rules = validate.setRequired()
const layout = `flex-basis:100%; height: auto !important`
export default [
  {
    type: 'string',
    key: 'domesticDestinationCode',
    name: '编码',
    prop: 'domesticDestinationCode',
    disabled: true,
    rules
  },
  {
    type: 'string',
    key: 'domesticDestinationName',
    name: '国内地区名称',
    prop: 'domesticDestinationName',
    rules
  },
  {
    type: 'string',
    key: 'domesticDestinationAbb',
    name: '简称',
    prop: 'domesticDestinationAbb',
  },
  {
    type: 'string',
    key: 'customsCode',
    name: '国内地区代码',
    prop: 'customsCode',
    rules
  },
  {
    type: 'textarea',
    key: 'description',
    name: '描述',
    prop: 'description',
    layout,
    isShow: true
  },
  {
    type: 'textarea',
    key: 'remark',
    name: '备注',
    prop: 'remark',
    layout,
    isShow: true

  }
]
