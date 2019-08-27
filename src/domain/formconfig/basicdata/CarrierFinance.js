import validate from '@/domain/common/validate'
const { setRequired } = validate;
export default [
  {
    type: "string",
    key: "financeName",
    name: "财务组织名称",
    prop: "financeName",
    btn: true,
    readonly: true,
    rules: setRequired()
  },
  {
    type: "select",
    selectOption: [],
    selectKey: "chargeUpType",
    key: "financeType",
    name: "记账分类",
    prop: "financeType",
    rules: setRequired()
  },
  {
    type: "select",
    selectOption: [],
    selectKey: "currencyName",
    key: "currency",
    name: "结算币种",
    prop: "currency",
    rules: setRequired()
  },
  {
    type: "select",
    selectOption: [],
    selectKey: "settlementMethod",
    key: "settlementType",
    name: "结算方式",
    prop: "settlementType"
  },
  {
    type: "select",
    selectOption: [],
    selectKey: "paymentMethod",
    key: "paymentMethod",
    name: "付款方式",
    prop: "paymentMethod"
  },
  {
    type: "select",
    selectOption: [],
    selectKey: "paymentTerms",
    key: "paymentTerm",
    name: "付款条件",
    prop: "paymentTerm"
  },
  {
    type: "string",
    key: "accContact",
    name: "会计联系人",
    prop: "accContact"
  },
  {
    type: "string",
    key: "resign",
    name: "联系人职务",
    prop: "resign"
  },
  {
    type: "string",
    key: "telephone",
    name: "办公室电话",
    prop: "telephone",
  },
  {
    type: "string",
    key: "moblephone",
    name: "移动电话",
    prop: "moblephone",
  },
  {
    type: "string",
    key: "postcode",
    name: "邮政编码",
    prop: "postcode"
  },
  {
    type: "string",
    key: "fax",
    name: "传真",
    prop: "fax"
  },
  {
    type: "string",
    key: "email",
    name: "E-MAIL",
    prop: "email",
    rules: [{
      type: 'email',
      message: '格式错误',
      trigger: 'blur'
    }]
  }
]