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
    key: "salesman",
    name: "销售员",
    prop: "salesman",
    rules: setRequired()
  },
  {
    type: "checkbox",
    key: "mainPerson",
    name: "是否主接单人",
    prop: "mainPerson"
  },
  {
    selectOption: [],
    type: "select",
    selectKey: "percentageBase",
    key: "percentageBase",
    name: "提成基数",
    prop: "percentageBase",
    rules: setRequired()
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
  },
  {
    type: "string",
    key: "remark",
    name: "备注",
    prop: "remark"
  }
]