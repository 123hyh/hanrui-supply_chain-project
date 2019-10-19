import validate from '@/domain/common/validate.js'
const rules = validate.setRequired()
export default [
  {
    type: 'string',
    key: 'depositsNo',
    name: '保证金单号',
    prop: 'depositsNo',
    readonly: true,
    rules
  },
  /* 	{
		type: 'string',
		key: "inInsureUnitCode",
		name: "收保",
		prop: "inInsureUnitCode"
	}, */
  {
    type: 'string',
    key: 'inInsureUnitName',
    name: '收保(押)金单位',
    prop: 'inInsureUnitName',
    btn: true,
    readonly: true,
    rules
  },
  {
    type: 'select',
    selectOption: [],
    selectKey: 'typesOfInsuredUnits',
    key: 'outInsureUnitType',
    name: '出保(押)单位类型',
    prop: 'outInsureUnitType',
    rules
  },
  /* 	{
		type: 'string',
		key: "outInsureUnitCode",
		name: "出保",
		prop: "outInsureUnitCode"
	}, */
  {
    type: 'string',
    key: 'outInsureUnitName',
    name: '出保(押)金单位',
    prop: 'outInsureUnitName',
    btn: true,
    readonly: true,
    rules
  },
  /* {
		type: 'string',
		key: "customerCode",
		name: "委托方编码",
		prop: "customerCode",
		readonly: true
	}, */
  {
    type: 'string',
    key: 'customerName',
    name: '委托方',
    prop: 'customerName',
    btn: true,
    rules
  },
  {
    selectOption: [],
    type: 'select',
    key: 'currency',
    name: '币别',
    prop: 'currency',
    selectKey: 'currencyName',
    rules
  },
  {
    type: 'number',
    key: 'exchangeRate',
    name: '汇率',
    prop: 'exchangeRate',
    readonly: true,
    rules
  },
  {
    type: 'number',
    key: 'depositsAmount',
    name: '保证(押)金额',
    prop: 'depositsAmount',
    rules
  },
  {
    type: 'number',
    key: 'depositsCurrency',
    name: '保证(押)金额本位币',
    prop: 'depositsCurrency',
    readonly: true,
    rules
  },
  {
    type: 'select',
    selectOption: [],
    key: 'depositsInterestOnwer',
    name: '保证(押)金利息归属',
    prop: 'depositsInterestOnwer',
    selectKey: 'attributionOfMarginInterest',
    rules
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
    type: 'number',
    key: 'timeLimit',
    name: '期限(天)',
    prop: 'timeLimit',
  },
  {
    type: 'select',
    selectOption: [],
    key: 'type',
    name: '类型',
    prop: 'type',
    selectKey: 'marginType',
    rules
  },
  /* {
		type: 'select',
		selectOption: [],
		key: "status",
		name: "单据状态",
		prop: "status",
		selectKey: 'depositFormStatus'
	}, */
  /* {
		type: 'string',
		key: "repealPersonId",
		name: "撤保证(押)金人ID",
		prop: "repealPersonId"
	}, */
  {
    type: 'checkbox',
    key: 'repeal',
    name: '撤保',
    prop: 'repeal'
  },
  {
    type: 'string',
    key: 'repealPersonName',
    name: '撤保证(押)金人',
    prop: 'repealPersonName',
    btn: false,
    disabled: true
  },
  {
    type: 'date',
    key: 'repealTime',
    name: '撤保证(押)金时间',
    prop: 'repealTime',
    disabled: true
  },
  {
    type: 'string',
    key: 'repealReason',
    name: '撤保证(押)金理由',
    prop: 'repealReason',
    disabled: true
  },
  /* 	{
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
