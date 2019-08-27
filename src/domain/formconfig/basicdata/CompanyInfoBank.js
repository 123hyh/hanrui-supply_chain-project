import validate from "@/domain/common/validate.js";
const rules = validate.setRequired();
export default [
  {
    type: 'string',
    key: 'bankName',
    prop: 'bankName',
    name: '开户银行',
    rules,
  },
  {
    type: 'string',
    key: 'bankNo',
    prop: 'bankNo',
    name: '银行账号',
    rules,
  },
  {
    type: 'string',
    key: 'bankAddress',
    prop: 'bankAddress',
    name: '银行地址',
    rules,
  },
  {
    type: 'string',
    key: 'userName',
    prop: 'userName',
    name: '账户名称',
    rules,
  },
  {
    type: 'select',
    key: 'currency',
    prop: 'currency',
    name: '币别',
    selectKey: 'currencyName',
    selectOption: [],
    rules,
  },
  {
    type: 'string',
    key: 'bankArea',
    prop: 'bankArea',
    name: '开户地区',
    rules,
  },
]