import validate from '@/domain/common/validate'
const rules = validate.setRequired();
const layout = `flex-basis: 98%;height:auto !important`
export default [
  {
    type: 'string',
    key: 'financeProjectCode',
    name: '财务计费项目编码',
    prop: 'financeProjectCode',
    disabled: true,
    rules
  },
  {
    type: 'string',
    key: 'financeProjectName',
    name: '名称',
    prop: 'financeProjectName',
    rules
  },

  {
    type: 'string',
    key: 'debitSubject',
    name: '借方科目',
    prop: 'debitSubject',
    rules
  },
  {
    type: 'string',
    key: 'creditSubject',
    name: '贷方科目',
    prop: 'creditSubject',
    rules
  },
  {
    type: 'string',
    key: 'buildVersion',
    name: '编码版本号',
    prop: 'buildVersion'
  },
  {
    type: 'string',
    key: 'updateVersion',
    name: '修改版本号',
    prop: 'updateVersion'
  },
  {
    type: 'string',
    key: 'taxCodeSix',
    name: '税收分类编码6%',
    prop: 'taxCodeSix'
  },
  {
    type: 'string',
    key: 'taxCodeEleven',
    name: '税收分类编码11%',
    prop: 'taxCodeEleven'
  },
  {
    type: 'string',
    key: 'taxCodeSeventeen',
    name: '税收分类编码17%',
    prop: 'taxCodeSeventeen'
  },
  {
    type: 'string',
    key: 'taxClassifyName',
    name: '税收分类名称',
    prop: 'taxClassifyName'
  },
  {
    type: 'string',
    key: 'byname',
    name: '别名',
    prop: 'byname'
  },
  {
    type: 'checkbox',
    key: 'prePolicy',
    name: '享受优惠政策',
    prop: 'prePolicy'
  },
  {
    type: 'string',
    key: 'prePolicyText',
    name: '优惠政策内容',
    prop: 'prePolicyText'
  },
  {
    type: 'checkbox',
    key: 'outPrice',
    name: '价外',
    prop: 'outPrice'
  },
  {
    type: 'checkbox',
    key: 'inPrice',
    name: '价内',
    prop: 'inPrice'
  },
  {
    type: 'checkbox',
    key: 'forbidden',
    name: '禁用',
    prop: 'forbidden'
  },
  {
    type: 'textarea',
    key: 'description',
    name: '描述',
    prop: 'description',
    layout
  },
  {
    type: 'textarea',
    key: 'remark',
    name: '备注',
    prop: 'remark',
    layout
  }
]
