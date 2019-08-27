export default [
  {
    type: 'string',
    key: 'billNo',
    name: '付款单编码',
    prop: 'billNo',
    readonly: true
  },
  {
    selectOption: [],
    type: 'select',
    selectKey: 'paymentFormTypeName',
    key: 'paymentType',
    name: '付款类型',
    prop: 'paymentType'
  },
  {
    btn: true,
    type: 'string',
    key: 'delegeteBillNo',
    name: '付款申请单',
    prop: 'delegeteBillNo',
    readonly: true
  },
  {
    btn: true,
    type: 'string',
    key: 'companyName',
    name: '公司',
    prop: 'companyName'
  },
  {
    btn: true,
    type: 'string',
    key: 'agentPaymentCompanyName',
    name: '代理付款公司',
    prop: 'agentPaymentCompanyName'
  },
  {
    type: 'date',
    key: 'bizDate',
    name: '业务日期',
    prop: 'bizDate'
  },
  {
    selectOption: [],
    type: 'select',
    selectKey: 'receiptsAndPaymentsType',
    key: 'receiptsAndPaymentsType',
    name: '收付类别',
    prop: 'receiptsAndPaymentsType'
  },
  {
    type: 'money',
    key: 'immediateBalance',
    name: '即时余额',
    prop: 'immediateBalance'
  },
  {
    selectOption: [],
    type: 'select',
    selectKey: 'currencyName',
    key: 'payMoneyType',
    name: '付款币别',
    prop: 'payMoneyType'
  },
  {
    type: 'money',
    key: 'payAmount',
    name: '付款金额',
    prop: 'payAmount'
  },
  {
    type: 'calculate',
    key: 'exchangeRate',
    name: '汇率',
    prop: 'exchangeRate',
    readonly: true
  },
  {
    type: 'calculate',
    key: 'baseCurrency',
    name: '折本位币',
    prop: 'baseCurrency',
    readonly: true
  },
  {
    btn: true,
    type: 'string',
    key: 'paymentAccount',
    name: '付款账户',
    prop: 'paymentAccount'
  },
  {
    btn: true,
    type: 'string',
    key: 'paymentSubject',
    name: '付款科目',
    prop: 'paymentSubject'
  },
  {
    btn: true,
    type: 'string',
    key: 'paymentBank',
    name: '付款银行',
    prop: 'paymentBank'
  },
  // {
  // 	type: "string",
  // 	key: "bizType",
  // 	name: "业务种类",
  // 	prop: "bizType"
  // },
  {
    selectOption: [],
    type: 'select',
    selectKey: 'settlementMethod',
    key: 'settlementMethod',
    name: '结算方式',
    prop: 'settlementMethod'
  },
  {
    btn: true,
    type: 'string',
    key: 'settlementNo',
    name: '结算号',
    prop: 'settlementNo'
  },
  // {
  // 	btn: true,
  // 	type: "string",
  // 	key: "flowedOutPlannedItem",
  // 	name: "流出计划项目",
  // 	prop: "flowedOutPlannedItem"
  // },
  {
    btn: true,
    type: 'string',
    key: 'departmentName',
    name: '部门',
    prop: 'departmentName'
  },
  {
    type: 'textarea',
    key: 'repulseOpinion',
    name: '打回意见',
    prop: 'repulseOpinion'
  },
  // {
  // 	btn: true,
  // 	type: "string",
  // 	key: "flowedInPlannedItem",
  // 	name: "流入计划项目",
  // 	prop: "flowedInPlannedItem"
  // },
  {
    btn: true,
    type: 'string',
    key: 'costCenterName',
    name: '成本中心',
    prop: 'costCenterName'
  },
  {
    selectOption: [],
    type: 'select',
    selectKey: 'payeeType',
    key: 'receiverType',
    name: '收款人类型',
    prop: 'receiverType'
  },
  {
    btn: true,
    type: 'string',
    key: 'receiverName',
    name: '收款人名称',
    prop: 'receiverName'
  },
  {
    btn: true,
    type: 'string',
    key: 'receiverAccount',
    name: '收款账号',
    prop: 'receiverAccount'
  },
  {
    type: 'string',
    key: 'receiverBank',
    name: '收款银行',
    prop: 'receiverBank'
  },
  {
    type: 'string',
    key: 'receiverCountry',
    name: '收款方国家',
    prop: 'receiverCountry'
  },
  {
    type: 'string',
    key: 'receiverProvince',
    name: '收款方省',
    prop: 'receiverProvince'
  },
  {
    type: 'string',
    key: 'receiverCityCountry',
    name: '收款方市县',
    prop: 'receiverCityCountry'
  },
  {
    type: 'checkbox',
    key: 'urgent',
    name: '是否加急',
    prop: 'urgent'
  },
  // {
  // 	btn: true,
  // 	type: "string",
  // 	key: "project",
  // 	name: "项目",
  // 	prop: "project"
  // },
  // {
  // 	btn: true,
  // 	type: "string",
  // 	key: "projectManager",
  // 	name: "项目经理",
  // 	prop: "projectManager"
  // },
  {
    selectOption: [],
    type: 'select',
    selectKey: 'differentPlaces',
    key: 'differentPlaceSameCity',
    name: '同城异地',
    prop: 'differentPlaceSameCity'
  },
  {
    selectOption: [],
    type: 'select',
    selectKey: 'peerTravel',
    key: 'sameBankDifferentBank',
    name: '同行跨行',
    prop: 'sameBankDifferentBank'
  },
  {
    type: 'string',
    key: 'receiverRegion',
    name: '收款地区',
    prop: 'receiverRegion'
  },
  {
    type: 'string',
    key: 'otherReceiverSubject',
    name: '对方(收款)科目',
    prop: 'otherReceiverSubject'
  },
  {
    type: 'string',
    key: 'purpose',
    name: '用途',
    prop: 'purpose'
  },
  {
    type: 'string',
    key: 'summary',
    name: '摘要',
    prop: 'summary'
  },
  {
    type: 'string',
    key: 'attachmentCount',
    name: '附件数',
    prop: 'attachmentCount'
  },
  {
    selectOption: [],
    type: 'select',
    selectKey: 'sourcePayment',
    key: 'sourcePaymentType',
    name: '付款类型(来源付款申请单)',
    prop: 'sourcePaymentType'
  },
  {
    type: 'string',
    key: 'cashier',
    name: '出纳',
    prop: 'cashier'
  },
  {
    type: 'string',
    key: 'accounting',
    name: '会计',
    prop: 'accounting'
  }
  // {
  // 	type: "string",
  // 	key: "billCreator",
  // 	name: "制单人",
  // 	prop: "billCreator"
  // },
  // {
  // 	type: "string",
  // 	key: "modifier",
  // 	name: "修改人",
  // 	prop: "modifier"
  // },
  // {
  // 	type: "string",
  // 	key: "auditor",
  // 	name: "审核人",
  // 	prop: "auditor"
  // },
  // {
  // 	type: "string",
  // 	key: "approver",
  // 	name: "审批人",
  // 	prop: "approver"
  // },
]
