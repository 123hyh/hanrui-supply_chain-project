export default [
  {
    type: 'string',
    key: "billNo",
    name: "账务调整申请单编码",
    prop: "billNo"
  },
  {
    type: 'string',

    key: "entrustOrderNo",
    name: "委托单号",
    prop: "entrustOrderNo"
  },
  {
    type: 'string',

    key: "originalProject",
    name: "原计费项目",
    prop: "originalProject"
  },
  {
    type: 'number',

    key: "accruedAmount",
    name: "应计金额",
    prop: "accruedAmount"
  },
  {
    type: 'number',

    key: "invoicedAmount",
    name: "已开票金额",
    prop: "invoicedAmount"
  },
  {
    type: 'number',

    key: "pledgedAmount",
    name: "已认款金额",
    prop: "pledgedAmount"
  },
  {
    selectOption: [],
    type: 'select',
    key: "adjustClassify",
    name: "调整原因分类",
    prop: "adjustClassify"
  },
  {
    type: 'number',
    key: "adjustRatio",
    name: "调整比例(%)",
    prop: "adjustRatio"
  },
  {
    type: 'number',
    key: "adjustAccruedAmount",
    name: "调整应计金额",
    prop: "adjustAccruedAmount"
  },
  {
    type: 'number',
    key: "adjustCostAmount",
    name: "调整内部成本价",
    prop: "adjustCostAmount"
  },
  {
    type: 'checkbox',
    key: "invoice",
    name: "是否开票",
    prop: "invoice"
  },
  {
    type: 'string',
    key: "applicantAdjustReasons",
    name: "申请调整原因",
    prop: "applicantAdjustReasons"
  },
  {
    type: 'string',
    key: "adjustFeeProject",
    name: "调整后计费项目",
    prop: "adjustFeeProject"
  },
  {
    type: 'checkbox',
    key: "adjustStatus",
    name: "调整状态",
    prop: "adjustStatus"
  }
]