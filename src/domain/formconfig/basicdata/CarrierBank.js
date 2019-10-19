import validate from "@/domain/common/validate"
const rules = validate.setRequired()
export default [
  {
    type: 'string',
    key: 'bankName',
    prop: 'bankName',
    name: '开户银行',
    rules
  },
  {
    type: 'string',
    key: 'bankNo',
    prop: 'bankNo',
    name: '银行账号',
    rules
  },
  {
    type: 'string',
    key: 'bankAddress',
    prop: 'bankAddress',
    name: '银行地址'
  },
  {
    type: 'string',
    key: 'userName',
    prop: 'userName',
    name: '帐户名称',
    rules
  },
  {
    type: 'select',
    selectKey: 'currencyName',
    selectOption: [],
    key: 'currency',
    prop: 'currency',
    name: '币种',
    rules
  },
  {
    type: 'string',
    key: 'bankArea',
    prop: 'bankArea',
    name: '开户地区'
  },
]
