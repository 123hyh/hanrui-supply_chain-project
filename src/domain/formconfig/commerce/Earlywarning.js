import validate from "@/domain/common/validate"
const rules = validate.setRequired()
export default [
  {
    title: "", showline: false, list: [
      {
        type: "string",
        key: "billNo",
        name: "预警编码",
        prop: "billNo",
        disabled: true
      },
      {
        type: "string",
        key: "bizName",
        name: "预警业务名称",
        prop: "bizName",
      },
      {
        type: "string",
        key: "jobName",
        name: "预警名称",
        prop: "jobName",
      },
      {
        selectOption: [],
        type: "select",
        selectKey: "status",
        key: "jobStatus",
        name: "状态",
        prop: "jobStatus",
      },
    ]
  },
  {
    title: "预警条件", showline: true, list: [
      {
        selectOption: [],
        type: "select",
        selectKey: "serviceFeeType",
        key: "i",
        name: "预警时间",
        prop: "i",
      },
      {
        selectOption: [],
        type: "select",
        selectKey: "serviceFeeType",
        key: "o",
        name: "执行频率",
        prop: "o",
      },
    ]
  },
  {
    title: "预警信息", showline: true, list: [
      {
        btn: true,
        type: "string",
        key: "cronExpression",
        name: "CRON表达式",
        prop: "cronExpression",
      },
      {
        type: "string",
        key: "jobDescription",
        name: "描述 ",
        prop: "jobDescription",
      },
    ]
  },
]