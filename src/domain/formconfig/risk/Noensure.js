import validate from '@/domain/common/validate.js'
const rules = validate.setRequired()
export default [
  {
    type: 'string',
    key: 'noCreditNo',
    name: '授信单号',
    prop: 'noCreditNo',
    readonly: true,
    rules
  },
  /* {
		type: 'string',
		key: "customerCode",
		name: "委托方编码",
		prop: "customerCode"
	}, */
  {
    type: 'string',
    key: 'customerName',
    name: '委托方',
    prop: 'customerName',
    btn: true,
    readonly: true,
    rules
  },
  /* {
		type: 'string',
		key: "creditCompanyCode",
		name: "授信公司",
		prop: "creditCompanyCode"
	}, */
  {
    type: 'string',
    key: 'creditCompanyName',
    name: '授信公司',
    prop: 'creditCompanyName',
    readonly: true,
    btn: true,
    rules
  },
  {
    type: 'select',
    selectOption: [],
    key: 'creditCurrency',
    name: '授信币种',
    prop: 'creditCurrency',
    selectKey: 'currencyName',
    rules
  },
  {
    type: 'number',
    key: 'exchangeRate',
    name: '汇率',
    readonly: true,
    prop: 'exchangeRate',
    rules: [{ validator: validate.validateNum }]
  },
  {
    type: 'number',
    key: 'creditAmount',
    name: '授信金额',
    prop: 'creditAmount',
    rules: [{ validator: validate.validateNum }]
  },
  {
    type: 'number',
    key: 'creditRmbAmount',
    name: '授信人民币金额',
    readonly: true,
    prop: 'creditRmbAmount',
    rules: [{ validator: validate.validateNum }]
  },
  {
    type: 'number',
    key: 'creditEnsureAmount',
    name: '授信保证金额',
    prop: 'creditEnsureAmount',
    rules: [{ validator: validate.validateNum }]
  },

  {
    type: 'date',
    key: 'startDate',
    name: '开始日',
    prop: 'startDate',
    rules
  },
  {
    type: 'date',
    key: 'endDate',
    name: '截止日',
    prop: 'endDate',
    rules
  },
  {
    type: 'string',
    key: 'creditLimit',
    name: '授信期限',
    prop: 'creditLimit'
  },
  {
    type: 'select',
    selectOption: [],
    key: 'status',
    name: '单据状态',
    prop: 'status',
    selectKey: 'unsecuredStatus'
  },
  /* 	{
		type: 'string',
		key: "repealPersonId",
		name: "撤保人",
		prop: "repealPersonId"
	}, */
  {
    key: 'repeal',
    type: 'checkbox',
    name: '撤保',
    prop: 'repeal'
  },
  {
    type: 'string',
    key: 'repealPersonName',
    name: '撤保人',
    prop: 'repealPersonName',
    disabled: true
  },
  {
    type: 'date',
    key: 'repealTime',
    name: '撤保时间',
    prop: 'repealTime',
    disabled: true
  },
  {
    type: 'string',
    key: 'repealReason',
    name: '撤保理由',
    prop: 'repealReason',
    disabled: true
  },
  {
    type: 'select',
    selectOption: [],
    key: 'creditType',
    name: '授信类别',
    prop: 'creditType',
    selectKey: 'creditCategory',
    rules
  },
  /* {
		type: 'string',
		key: "auditor",
		name: "审核人",
		prop: "auditor"
	},
	{
		type: 'date',
		key: "auditTime",
		name: "审核时间",
		prop: "auditTime"
	}, */
  {
    type: 'textarea',
    key: 'remark',
    name: '备注',
    prop: 'remark',
    layout: 'flex-basis: 98%;height:auto !important'
  }
]
