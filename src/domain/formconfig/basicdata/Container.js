import validate from '@/domain/common/validate.js'
const rules = validate.setRequired()
export default [
  {
    type: 'string',
    key: 'containerCode',
    name: '集装箱编码',
    prop: 'containerCode',
    readonly: true,
    rules
  },
  {
    type: 'string',
    key: 'containerName',
    name: '名称',
    prop: 'containerName',
    rules
  },
  {
    type: 'string',
    key: 'containerAbb',
    name: '简称',
    prop: 'containerAbb',
    rules
  },
  {
    type: 'string',
    key: 'containerCoding',
    name: '集装箱代码',
    prop: 'containerCoding',
    rules
  },
  {
    type: 'string',
    key: 'containerSpecification',
    name: '集装箱规格',
    prop: 'containerSpecification',
    rules
  },
  {
    type: 'string',
    key: 'description',
    name: '描述',
    prop: 'description',
    isShow: true
  },
  {
    type: 'string',
    key: 'remark',
    name: '备注',
    prop: 'remark',
    isShow: true
  }
]
