import validate from '@/domain/common/validate';
const { setRequired } = validate, rules = setRequired();
export default [
  // 	{
  // 		type: "string",
  // 		key: "solutionNo",
  // 		name: "方案编号",
  // 		prop: "solutionNo",
  // 		disabled: true,
  // 	},
  // 	{
  // 		type: "string",
  // 		key: "chargeItemCode",
  // 		name: "计费项目编码",
  // 		prop: "chargeItemCode"
  // 	},
  {
    type: "string",
    key: "chargeItemName",
    name: "计费项目名称",
    prop: "chargeItemName",
    btn: true,
    readonly: true,
    rules
  },
  {
    selectOption: [],
    type: "select",
    selectKey: "paymentForDelivery",
    key: "receivableMethod",
    name: "收款方式",
    prop: "receivableMethod",
    rules
  },
  {
    type: "string",
    key: "advanceRatio",
    name: "预收比例%",
    prop: "advanceRatio",
    rules: [rules[0],{
      validator: validate.validateNum,
      trigger: ['blur', 'change']
    }]
  },
  {
    selectOption: [],
    type: "select",
    selectKey: "MethodOfEstablishingAccounts",
    key: "settlementPeriod",
    name: "立账方式",
    prop: "settlementPeriod",
    rules
  },
  {
    type: "string",
    key: "elasticRange",
    name: "立账偏离天数",
    prop: "elasticRange",
    rules: [{
      validator: validate.validateNum,
      trigger: ['blur', 'change']
    }]
  },
  {
    type: "date",
    key: "receivableDate",
    name: "固定日期",
    prop: "receivableDate"
  },
  {
    type: "string",
    key: "days",
    name: "日",
    prop: "days",
    rules: [{
      validator: validate.validateNum,
      trigger: ['blur', 'change']
    }]
  },
  {
    type: "string",
    key: "months",
    name: "月数",
    prop: "months",
    rules: [{
      validator: validate.validateNum,
      trigger: ['blur', 'change']
    }]
  },
  {
    type: "string",
    key: "accountPeriod",
    name: "账期(天)",
    prop: "accountPeriod",
    rules: [{
      validator: validate.validateNum,
      trigger: ['blur', 'change']
    }]
  },
  {
    type: "date",
    key: "accountCheckDate",
    name: "对账日",
    prop: "accountCheckDate"
  },
  {
    type: "string",
    key: "settlementNum",
    name: "周数/月结次数",
    prop: "settlementNum",
    rules: [{
      validator: validate.validateNum,
      trigger: ['blur', 'change']
    }]
  },
  {
    type: "string",
    key: "intervalDays",
    name: "间隔日",
    prop: "intervalDays",
    rules: [{
      validator: validate.validateNum,
      trigger: ['blur', 'change']
    }]
  },
  {
    type: "date",
    key: "paymentDate",
    name: "付款日",
    prop: "paymentDate"
  },
  {
    type: "checkbox",
    key: "noInterestDays",
    name: "不加免息天数",
    prop: "noInterestDays",
  },
  {
    type: "checkbox",
    key: "chargeInterest",
    name: "单独计息",
    prop: "chargeInterest"
  },
  {
    type: "textarea",
    key: "remark",
    name: "备注",
    prop: "remark"
  }
]