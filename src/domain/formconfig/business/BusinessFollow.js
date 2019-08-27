import validate from '@/domain/common/validate'
let { setRequired } = validate;
export default [
  /* {
    type: "string",
    key: "salesmanId",
    name: "业务员id",
    prop: "salesmanId"
  }, */
  {
    type: "string",
    key: "salesmanName",
    name: "业务员姓名",
    prop: "salesmanName",
		btn: true,
		readonly: true,
    rules: setRequired()
  },
  {
    type: "date",
    key: "followTime",
    name: "跟进时间",
    prop: "followTime",
    rules: setRequired()
  },
  {
    type: "string",
    key: "address",
    name: "地点",
    prop: "address",
    rules: setRequired()
  },
  {
    selectOption: [],
    type: "select",
    selectKey:'propulsionMode',
    key: "followMode",
    name: "推进方式",
    prop: "followMode",
    rules: setRequired()
  },
  {
    type: "string",
    key: "content",
    name: "内容",
    prop: "content",
    rules: setRequired()
  },
  {
    type: "string",
    key: "result",
    name: "结果",
    prop: "result",
    rules: setRequired()
  },
  {
    type: "string",
    key: "remark",
    name: "说明",
    prop: "remark"
  }
]