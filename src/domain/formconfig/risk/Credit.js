import validate from "@/domain/common/validate.js";
const rules = validate.setRequired();
export default [{
		type: 'string',
		key: "creditNo",
		name: "融资授信单号",
		readonly: true
	},
	{
		type: 'string',
		key: "customerName",
		name: "委托方",
		btn: true,
		readonly: true,
		rules,
	},
	{
		type: 'string',
		btn: true,
		readonly: true,
		key: "agreementName",
		name: "委托协议",
		rules
	},
	/* {
		type: 'string',
		key: "agreementName",
		name: "委托协议名称",
		rules: []
	}, */
	{
		type: 'string',
		btn: true,
		readonly: true,
		key: "creditCompanyName",
		name: "授信公司",
		rules
	},
/* 	{
		type: 'string',
		key: "creditCompanyCode",
		name: "授信公司编码",
		rules: []
	}, */

/* 	{
		type: 'string',
		key: "customerCode",
		name: "委托方编码",
		rules: []
	}, */

	{
		type: 'select',
		selectOption: [],
		key: "currencyName",
		name: "币种",
    readonly: true,
    rules
		// selectKey: 'currencyName',
	},
	{
		type: 'number',
		key: "exchangeRate",
		name: "汇率 %",
		readonly: true,
		rules: [...rules, {validator: validate.validateNum,}]
	},
	{
		type: 'select',
		selectOption: [],
		key: "usageMode",
		name: "额度使用方式",
    selectKey: 'limitUseType',
    rules
	},
	{
		type: 'number',
		key: "creditLimitRate",
		name: "放贷授信额度比率",
		rules
	},
	{
		type: 'number',
		key: "creditLimitAmount",
		name: "放贷授信额度金额(万)",
		readonly: true,
		rules: [],
	},
	{
		type: 'number',
		key: "totalAmount",
		name: "总信用额度(万)",
		readonly: true
	},
	{
		type: 'number',
		key: "homeCurrencyAmount",
		name: "折本位币(万)",
		rules,
		readonly: true

	},
	/* {
		type: 'select',
		selectOption: [{itemKey: '0', itemValue: '新增'}],
		key: "status",
		name: "状态",
		// rules,
		// selectKey: 'orderStatus',
	}, */
	{
		type: 'number',
		key: "exportMaxTaxLimit",
		name: "出口垫税额度(万)",
		readonly: true

	},
	{
		type: 'number',
		key: "exportAmountLimit",
		name: "出口价款额度(万)",
		rules: [],
		readonly: true

	},
	{
		type: 'number',
		key: "creditLimit",
		name: "非出口信用额度(万)",
		rules: [],
		readonly: true

	},
	{
		type: 'textarea',
		key: "remark",
		name: "备注"
	}
]