import validate from '@/domain/common/validate';
const { setRequired } = validate;
export default [
  {
    type: "string",
    key: "clientNo",
    name: "委托方编号",
    prop: "clientNo",
    disabled: true,
  },
  {
    type: "string",
    btn: true,
    key: "businessPart",
    name: "商务员",
    prop: "businessPart",
    rules: setRequired()

  },
  {
    type: "checkbox",
    key: "mainPerson",
    name: "是否主跟单人",
    prop: "mainPerson"
  },
  {
    selectOption: [],
    type: "select",
    selectKey: "declareCustoms",
    key: "reportGateType",
    name: "报关类型",
    prop: "reportGateType"
  },
  {
    selectOption: [],
    type: "select",
    selectKey: "percentageBase",
    key: "percentageBase",
    name: "提成基数",
    prop: "percentageBase"
  },
  {
    type: "string",
    key: "pushMoney",
    name: "提成比率 %",
    prop: "pushMoney",
    rules: setRequired()

  },
  {
    type: "string",
    btn: true,
    key: "department",
    name: "部门",
    prop: "department"
  }
]