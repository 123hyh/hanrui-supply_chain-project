import validate from '@/domain/common/validate.js'
const rules = validate.setRequired()
export default [
  {
    type: 'string',
    key: 'ensureNo',
    name: '担保单号',
    prop: 'ensureNo',
    rules
  },
  /* 	{
		type: 'string',
		key: "securedUnitCode",
		name: "被担保单位编码",
		prop: "securedUnitCode"
	}, */
  {
    type: 'string',
    key: 'securedUnitName',
    name: '被担保单位',
    prop: 'securedUnitName',
    readonly: true,
    btn: true,
    rules
  },
  /* 	{
		type: 'string',
		key: "ensureUnitCode",
		name: "担保单位编码",
		prop: "ensureUnitCode"
  }, */
  {
    selectOption: [],
    type: 'select',
    key: 'ensureUnitType',
    name: '担保单位类型',
    prop: 'ensureUnitType',
    selectKey: 'typesOfInsuredUnits',
    rules
  },
  {
    type: 'string',
    key: 'ensureUnitName', //ensureUnitCode
    name: '担保单位',
    prop: 'ensureUnitName',
    readonly: true,
    btn: true,
    rules
  },
  /* 	{
		type: 'string',
		key: "companyCode",
		name: "公司编码",
		prop: "companyCode"
	}, */
  {
    type: 'string',
    key: 'companyName',
    name: '公司',
    prop: 'companyName',
    readonly: true,
    btn: true,
    rules
  },
  {
    selectOption: [],
    type: 'select',
    key: 'currency',
    selectKey: 'currencyName',
    name: '币种',
    prop: 'currency',
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
    key: 'ensureAmount',
    name: '担保金额',
    prop: 'ensureAmount',
    rules
  },
  {
    type: 'number',
    key: 'ensureCurrency',
    name: '担保金额本位币',
    prop: 'ensureCurrency',
    readonly: true
  },
  {
    type: 'number',
    key: 'ensureDeposits',
    name: '担保保证金',
    prop: 'ensureDeposits',
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
    type: 'string',
    key: 'ensureTimeLimit',
    name: '担保期限',
    prop: 'ensureTimeLimit'
  },
  /* 	{
		selectOption: [],
		type: 'select',
		key: "status",
		selectKey: "orderStatus",
		name: "单据状态",
		prop: "status"
	}, */
  /* {
		type: 'string',
		key: "repealPersonId",
		name: "撤保人id",
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
