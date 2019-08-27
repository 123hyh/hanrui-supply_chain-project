import validate from "@/domain/common/validate.js";
const rules = validate.setRequired();
export default [{
		key: "billNo",
		name: "深圳收货入库单编号",
		prop: "billNo",
		type: "string",
		readonly: true,
		rules: [{ required: true, message: '必填', trigger: 'blur' }]
	},
	{
		selectOption: [{
				itemKey: '1',
				itemValue: '香港出库单'
			},
			{
				itemKey: '2',
				itemValue: '委托单'
			},
			{
				itemKey: '3',
				itemValue: '其他'
			},
		],
		key: "sourceBillType",
		name: "源单据类型",
		prop: "sourceBillType",
		type: "select",
		rules: [{ required: true, message: '必填', trigger: 'blur' }]
	},
	{
		key: "delegeteBillNo",
		name: "来源单号",
		prop: "delegeteBillNo",
		type: "string",
		api: {
			'1': 'getReceiptOrderList',
			'2': 'queryentrustorderSearch'
		}
	},
	{
		btn: true,
		key: "issueTypeName",
		name: "事务类型",
		prop: "issueTypeName",
		readonly: true,
		type: "string",
		api: "getTransactionTypeList",
		rules: [{ required: true, message: '必填', trigger: 'blur' }]
	},
	{
		btn: true,
		key: "storeOrgName",
		name: "库存组织",
		prop: "storeOrgName",
		readonly: true,
		type: "string",
		api: "getCreditCompanyNameData",
		rules
	},
	{
		btn: true,
		key: "departmentName",
		name: "部门",
		prop: "departmentName",
		readonly: true,
		type: "string",
		api: "getDepartment",
		rules: [{ required: true, message: '必填', trigger: 'blur' }]
	},
	{
		key: "bizDate",
		name: "业务日期",
		prop: "bizDate",
		type: "date",
	},
	{
		selectOption: [],
		selectKey: "declareCustoms",
		key: "reportGateType",
		name: "报关类型",
		prop: "reportGateType",
		type: "select",
		rules: [{ required: true, message: '必填', trigger: 'blur' }]
	},
	{
		btn: true,
		type: 'string',
		key: "delegeteName",
		name: "委托方",
		prop: "delegeteName",
		readonly: true,
		rules
	},
	{
		btn: true,
		type: 'string',
		key: "supplierName",
		name: "供应商",
		prop: "supplierName",
		readonly: true
	},
	{
		btn: true,
		type: 'string',
		key: "customerName",
		name: "客户",
		prop: "customerName",
		readonly: true
	},
	{
		key: "exchangeRate",
		name: "汇率",
		prop: "exchangeRate",
		type: "number",
		rules: [{
			validator: validate.validateNum,
		}],
	},
	{
		key: "summary",
		name: "摘要",
		prop: "summary",
		type: "string",
	},
	{
		selectOption: [],
		selectKey: "principalAgentType",
		key: "delegeteType",
		name: "委托代理类型",
		prop: "delegeteType",
		type: "select",
	},
	{
		key: "initData",
		name: "初始化单据",
		prop: "initData",
		type: "checkbox",
	},
	// {
	// 	selectOption: [],
	// 	selectKey: "currencyName",
	// 	key: "currency",
	// 	name: "币种",
	// 	prop: "currency",
	// 	type: "select",
	// },
	// {
	// 	selectOption: [],
	// 	selectKey: "paymentMethod",
	// 	key: "payMode",
	// 	name: "付款方式",
	// 	prop: "payMode",
	// 	type: "select",
	// },
	// {
	// 	key: "auditor",
	// 	name: "审核人",
	// 	prop: "auditor",
	// 	type: "string",
	// },
	// {
	// 	key: "originator",
	// 	name: "制单人",
	// 	prop: "originator",
	// 	type: "string",
	// },
	// {
	// 	key: "writeOff",
	// 	name: "冲销",
	// 	prop: "writeOff",
	// 	type: "checkbox",
	// },
	// {
	// 	key: "taxIncluded",
	// 	name: "含税",
	// 	prop: "taxIncluded",
	// 	type: "checkbox",
	// },
	// {
	// 	key: "extraTax",
	// 	name: "价外税",
	// 	prop: "extraTax",
	// 	type: "checkbox",
	// },
	// {
	// 	key: "taxIncludedCost",
	// 	name: "税额计入成本",
	// 	prop: "taxIncludedCost",
	// 	type: "checkbox",
	// },
	// {
	// 	key: "payableBillGenerated",
	// 	name: "是否已生成应付单",
	// 	prop: "payableBillGenerated",
	// 	type: "checkbox",
	// },
]
