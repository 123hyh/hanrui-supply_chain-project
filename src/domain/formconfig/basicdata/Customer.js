import validate from "@/domain/common/validate.js";
const rules = validate.setRequired();
export default [
	{
		type: 'string',
		key: "customerNo",
		name: "客户编码",
		prop: "customerNo",
		readonly: true
	},
	{
		type: 'string',
		key: "customerName",
		name: "名称",
		prop: "customerName",
		rules
	},
	{
		type: 'string',
		key: "shortName",
		name: "简称",
		prop: "shortName"
	},
	{
		type: 'string',
		key: "customerEnName",
		name: "外文名称",
		prop: "customerEnName"
	},
	{
		type: 'string',
		key: "shortCode",
		name: "助记码",
		prop: "shortCode"
	},
	{
		type: 'string',
		btn: true,
		key: "parentCustomerName",
		name: "上级客户",
		prop: "parentCustomerName",
		readonly: true
	},
	{
		key: "customerNature",
		name: "客户性质",
		prop: "customerNature",
		selectOption: [],
		type: 'select',
		selectKey: 'customerNature',
	},
	{
		type: 'string',
		key: "registeredNo",
		name: "工商注册号",
		prop: "registeredNo"
	},
	{
		type: 'string',
		key: "businessLicense",
		name: "营业执照",
		prop: "businessLicense"
	},
	{
		type: 'string',
		key: "businessCertificate",
		name: "生产/经营许可证",
		prop: "businessCertificate"
	},
	{
		type: 'string',
		key: "gspCertification",
		name: "GSP认证",
		prop: "gspCertification"
	},
	{
		type: 'string',
		key: "taxId",
		name: "税务登记号",
		prop: "taxId",
		rules
	},
	{
		type: 'string',
		key: "legalPerson",
		name: "法人代表",
		prop: "legalPerson"
	},
	{
		type: 'select',
		selectOption: [],
		selectKey: 'typeOfCompany',
		key: "trade",
		name: "行业",
		prop: "trade"
	},
	{
		type: 'string',
		key: "barCode",
		name: "条形码",
		prop: "barCode"
	},
	{
		type: 'string',
		key: "country",
		name: "国家",
		prop: "country"
	},
	{
		key: "province",
		name: "省份",
		prop: "province",
		selectOption: [],
		type: 'select',
	},
	{
		type: 'select',
		key: "city",
		name: "城市",
		prop: "city",
    selectOption: [],
	},
	{
		type: 'select',
		key: "county",
		name: "区县",
		prop: "county",
		selectOption: [],
	},
	{	
		type: 'string',
		key: "address",
		name: "地址",
		prop: "address",
		rules
	},
	// {
	// 	type: 'string',
	// 	key: "taxTypeCode",
	// 	name: "税种编码",
	// 	prop: "taxTypeCode",
	// 	disabled: true
	// },
	{
		type: 'string',
		btn: true,
		key: "taxTypeName",
		name: "税种名称",
		prop: "taxTypeName",
		readonly: true
	},
	{
		type: 'number',
		key: "taxRate",
		name: "税率%",
		prop: "taxRate"
	},
	{
		selectOption: [],
		type: 'select',
		key: "invoiceType",
		selectKey: 'invoiceType',
		name: "开票类型",
		prop: "invoiceType"
	},
	{
		type: 'string',
		key: "auditor",
		name: "审核人",
		prop: "auditor",
		disabled: true
	},
	{
		type: 'date',
		key: "auditTime",
		name: "审核时间",
		prop: "auditTime",
		disabled: true
	},
	{
		selectOption: [],
		type: 'select',
		key: "customerStatus",
		name: "客户状态",
		prop: "customerStatus",
		selectKey: 'actualState'
	},
	{
		selectOption: [],
		type: 'select',
		key: "customerType",
		name: "分类",
		prop: "customerType",
		selectKey: 'customerClassification',
		rules
	},
	{
		type: 'string',
		key: "customerTypeName",
		name: "分类全名",
		prop: "customerTypeName"
	}
]