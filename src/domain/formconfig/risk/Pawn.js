import validate from '@/domain/common/validate.js'
const rules = validate.setRequired()
export default [
  {
    type: 'string',
    key: 'pawnNo',
    name: '单据编号',
    prop: 'pawnNo'
  },
  {
    type: 'string',
    key: 'pawn',
    name: '抵(质)押物名称',
    prop: 'pawn',
    rules
  },
  {
    type: 'select',
    selectOption: [],
    key: 'type',
    name: '属性',
    prop: 'type',
    selectKey: 'mortgageProperty',
    rules
  },
  {
    selectOption: [],
    type: 'select',
    key: 'pawnType',
    name: '抵(质)押物种类',
    prop: 'pawnType',
    selectKey: 'mortgageSpecies',
    rules
  },
  /* {
		selectOption: [],
		type: 'select',
		key: "pawnorCode",
		name: "抵",
		prop: "pawnorCode"
	}, */

  {
    type: 'string',
    key: 'pawnorName',
    name: '抵(质)押权人',
    prop: 'pawnorName',
    btn: true,
    readonly: true,
    rules
  },
  {
    type: 'string',
    key: 'pawnUnitName',
    name: '计量单位',
    prop: 'pawnUnitName',
    btn: true,
    readonly: true,
    rules
  },
  {
    type: 'string',
    key: 'pawnQuantity',
    name: '计量数量',
    prop: 'pawnQuantity'
  },
  /* 	{
			type: 'string',
			key: "debtorCode",
			name: "债务人编码",
			prop: "debtorCode"
		}, */
  {
    type: 'string',
    key: 'debtorName',
    name: '债务人',
    prop: 'debtorName',
    btn: true,
    readonly: true,
    rules
  },
  {
    type: 'select',
    selectOption: [],
    selectKey: 'typesOfMortgageUnits',
    key: 'pawnCompanyType',
    name: '抵(质)押物单位类型',
    prop: 'pawnCompanyType',
    rules
  },
  /* {
		selectOption: [],
		type: 'select',
		key: "pawnCompanyCode",
		name: "抵",
		prop: "pawnCompanyCode"
	}, */
  {
    type: 'string',
    key: 'pawnCompanyName',
    name: '抵(质)押物单位',
    prop: 'pawnCompanyName',
    btn: true,
    readonly: true,
    rules
  },
  {
    type: 'checkbox',
    key: 'notePawn',
    name: '是否票据抵押',
    prop: 'notePawn'
  },
  {
    type: 'select',
    selectOption: [],
    selectKey: 'billType',
    key: 'noteType',
    name: '票据类型',
    prop: 'noteType',
    disabled: true
  },
  {
    type: 'string',
    key: 'noteName',
    name: '票据',
    prop: 'noteName',
    disabled: true
  },
  {
    type: 'select',
    selectOption: [],
    key: 'currency',
    name: '币种',
    prop: 'currency',
    selectKey: 'currencyName',
    rules
  },
  {
    type: 'number',
    key: 'exchangeRate',
    name: '汇率',
    prop: 'exchangeRate',
    readonly: true
  },
  {
    type: 'number',
    key: 'originalPrice',
    name: '原价',
    prop: 'originalPrice',
    rules: [...rules, { validator: validate.validateNum }]
  },
  {
    type: 'number',
    key: 'originalPriceCurrency',
    name: '原价本位币',
    prop: 'originalPriceCurrency',
    readonly: true
  },
  {
    type: 'string',
    key: 'originalPriceProof',
    name: '原价凭证',
    prop: 'originalPriceProof'
  },

  {
    type: 'string',
    key: 'evaluationMode',
    name: '评估方式',
    prop: 'evaluationMode'
  },
  {
    type: 'string',
    key: 'evaluationOrganization',
    name: '评估单位',
    prop: 'evaluationOrganization'
  },
  {
    type: 'number',
    key: 'appraisalValue',
    name: '评估价值',
    prop: 'appraisalValue',
    rules: [...rules, { validator: validate.validateNum }]
  },
  {
    type: 'number',
    key: 'mortgageRate',
    name: '抵押率%',
    prop: 'mortgageRate',
    rules: [rules[0], { validator: validate.validateNum }]
  },
  {
    type: 'number',
    key: 'mortgageValue',
    name: '可抵押价值',
    prop: 'mortgageValue',
    readonly: true,
    rules: [rules[0], { validator: validate.validateNum }]
  },

  {
    type: 'checkbox',
    key: 'custody',
    name: '是否由押权人保管',
    prop: 'custody'
  },
  {
    type: 'number',
    key: 'custodyFee',
    name: '保管费',
    prop: 'custodyFee',
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
    name: '质押期限',
    prop: 'creditLimit'
  },
  {
    type: 'checkbox',
    key: 'repeal',
    name: '撤押',
    prop: 'repeal'
  },
  /* {
		type: 'string',
		key: "repealPersonId",
		name: "撤押人",
		prop: "repealPersonId",
		disabled: true
	}, */
  {
    type: 'string',
    key: 'repealPersonName',
    name: '撤押人',
    prop: 'repealPersonName',
    disabled: true
  },
  {
    type: 'date',
    key: 'repealTime',
    name: '撤押理由',
    prop: 'repealTime',
    disabled: true
  },
  {
    type: 'select',
    selectOption: [],
    key: 'status',
    name: '单据状态',
    prop: 'status',
    selectKey: 'mortgageFormStatus'
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
