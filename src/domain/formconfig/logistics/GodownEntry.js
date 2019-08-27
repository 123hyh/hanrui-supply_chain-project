import validate from "@/domain/common/validate.js";
const rules = validate.setRequired();
export default [{
		key: "godownEntryCode",
		name: "香港收货入库单编号",
		prop: "godownEntryCode",
		type: "string",
		readonly: true,
		rules: [{ required: true, message: '必填', trigger: 'blur' }]
	},
	{
		selectOption: [{
				itemKey: '1',
				itemValue: '香港收货登记'
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
		name: "委托单号",
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
		rules
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
	// {
	// 	selectOption: [],
	// 	selectKey: "currencyName",
	// 	key: "currency",
	// 	name: "币种",
	// 	prop: "currency",
	// 	type: "select",
	// },
	{
		key: "exchangeRate",
		name: "汇率",
		prop: "exchangeRate",
		type: "number",
		rules: [{
			validator: validate.validateNum,
		}],
	},
	// {
	// 	selectOption: [],
	// 	selectKey: "paymentMethod",
	// 	key: "payMode",
	// 	name: "付款方式",
	// 	prop: "payMode",
	// 	type: "select",
	// },
	{
		key: "summary",
		name: "摘要",
		prop: "summary",
		type: "string",
	},
	{
		selectOption: [],
		selectKey: "principalAgentType",
		key: "principalAgent",
		name: "委托代理类型",
		prop: "principalAgent",
		type: "select",
	},
// 	{
// 		key: "auditor",
// 		name: "审核人",
// 		prop: "auditor",
// 		type: "string",
// 	},
// 	{
// 		key: "originator",
// 		name: "制单人",
// 		prop: "originator",
// 		type: "string",
// 	},
	// {
	// 	key: "writeOff",
	// 	name: "冲销",
	// 	prop: "writeOff",
	// 	type: "checkbox",
	// },
	{
		key: "initOrder",
		name: "初始化单据",
		prop: "initOrder",
		type: "checkbox",
	},
	// {
	// 	key: "includeTax",
	// 	name: "含税",
	// 	prop: "includeTax",
	// 	type: "checkbox",
	// },
	// {
	// 	key: "extraTax",
	// 	name: "价外税",
	// 	prop: "extraTax",
	// 	type: "checkbox",
	// },
	// {
	// 	key: "incost",
	// 	name: "税额计入成本",
	// 	prop: "incost",
	// 	type: "checkbox",
	// },
	// {
	// 	key: "hasPayment",
	// 	name: "是否已生成付应单",
	// 	prop: "hasPayment",
	// 	type: "checkbox",
	// },
]
