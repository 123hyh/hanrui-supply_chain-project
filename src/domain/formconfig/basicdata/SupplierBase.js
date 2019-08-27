import validate from '@/domain/common/validate';
const rules  = validate.setRequired()
export default [{
		type: "string",
		key: "supplierCode",
		name: "供应商编码",
		prop: "supplierCode",
		disabled: true,
	},
	{
		type: "string",
		key: "supplierName",
		name: "供应商中文名称",
    prop: "supplierName",
    rules
	},
	{
		type: "string",
		key: "supplierForeignName",
		name: "供应商外文名称",
		prop: "supplierForeignName"
	},
	{
		selectOption: [],
		type: "select",
		selectKey: "creditLevel",
		key: "creditLevel",
		name: "信用等级",
		prop: "creditLevel"
	},
	// {
	// 	type: "checkbox",
	// 	key: "withinSupplier",
	// 	name: "内部供应商",
	// 	prop: "withinSupplier"
	// },
	// {
	// 	type: "checkbox",
	// 	key: "onceSuspicious",
	// 	name: "是否曾经可疑",
	// 	prop: "onceSuspicious"
	// },
	// {
	// 	type: "checkbox",
	// 	key: "hasChecked",
	// 	name: "已审核",
	// 	prop: "hasChecked"
	// },
	// {
	// 	type: "string",
	// 	key: "tallyTimes",
	// 	name: "理货困难次数",
	// 	prop: "tallyTimes"
	// },
	{
		type: "string",
		key: "supplierAbb",
		name: "供应商简称",
		prop: "supplierAbb"
	},
	{
		type: "string",
		key: "remenberCode",
		name: "助记码",
		prop: "remenberCode"
	},
	{
		type: 'string',
		btn: true,
		key: "parentSupplierName",
		name: "上级供应商",
		prop: "parentSupplierName",
		readonly: true
	},
	// {
	// 	type: "string",
	// 	key: "parentSupplier",
	// 	name: "上级供应商",
	// 	prop: "parentSupplier"
	// },
	{
		type: "string",
		key: "pbLicense",
		name: "生产经营许可证",
		prop: "pbLicense"
	},
	{
		type: 'string',
		btn: true,
		key: "taxCategoryName",
		name: "税种名称",
		prop: "taxCategoryName",
		readonly: true
	},
	// {
	// 	type: "string",
	// 	key: "taxCategory",
	// 	name: "税种",
	// 	prop: "taxCategory"
	// },
	{
		type: "string",
		key: "taxRate",
		name: "税率 %",
		prop: "taxRate"
	},
	{
		type: "string",
		key: "gspAuthentication",
		name: "GSP认证",
		prop: "gspAuthentication"
	},
	{
		type: "string",
		key: "barCode",
		name: "条形码",
		prop: "barCode"
	},
	{
		selectOption: [],
		type: "select",
		selectKey: "industryType",
		key: "industry",
		name: "行业",
		prop: "industry"
	},
	{
		selectOption: [],
		type: "select",
		selectKey: "actualState",
		key: "actualStatus",
		name: "实际状态",
		prop: "actualStatus"
	},
	{
		type: "checkbox",
		key: "outsourcing",
		name: "是否委外",
		prop: "outsourcing"
	},
	{
		selectOption: [],
		type: "select",
		selectKey: "companyStatus",
		key: "supplierStatus",
		name: "供应商状态",
		prop: "supplierStatus"
	},
	{
		type: "string",
		key: "registerNo",
		name: "工商注册号",
		prop: "registerNo"
	},
	{
		type: "string",
		key: "registNumber",
		name: "税务登记号",
		prop: "registNumber"
	},
	{
		type: "string",
		key: "national",
		name: "国家",
		prop: "national"
	},
	{
		selectOption: [],
		type: "select",
		key: "province",
		name: "省份",
		prop: "province",
	},
	{
		selectOption: [],
		type: "select",
		key: "city",
		name: "市",
    prop: "city",
	},
	{
		selectOption: [],
		type: "select",
		key: "district",
		name: "区县",
		prop: "district"
	},
	{
		type: "string",
		key: "supplierAddress",
		name: "详细地址",
    prop: "supplierAddress",
    rules
	},
	{
		type: "string",
		key: "representative",
		name: "法人代表",
		prop: "representative"
	},
	{
		type: "string",
		key: "supplierLicense",
		name: "营业执照",
		prop: "supplierLicense"
	},
	{
		type: "string",
		key: "website",
		name: "公司网址",
		prop: "website"
	},
	{
		type: "string",
		key: "email",
		name: "E-MAIL",
		prop: "email"
	},
	{
		selectOption: [],
		type: "select",
		selectKey: "supplierClassification",
		key: "classify",
		name: "供应商分类",
    prop: "classify",
    rules
	},
	{
		type: "checkbox",
		key: "carrier",
		name: "是否承运商",
		prop: "carrier"
	},
	{
		type: "checkbox",
		key: "bigSupplier",
		name: "是否大供应商",
		prop: "bigSupplier"
	},
	{
		type: "textarea",
		key: "remark",
		name: "备注",
		prop: "remark"
	}
]
