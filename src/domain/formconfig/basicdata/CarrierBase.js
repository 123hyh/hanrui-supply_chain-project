import validate from "@/domain/common/validate"
export default [
	{
		type : "string",
		key: "carrierCode",
		name: "承运商编码",
    prop: "carrierCode",
    rules:validate.setRequired(),
		disabled: true
	},
	{
		type : "string",
		key: "carrierName",
		name: "承运商中文名称",
    prop: "carrierName",
    rules:validate.setRequired(),
	},
	{
		type : "string",
		key: "carrierForeignName",
		name: "承运商外文名称",
		prop: "carrierForeignName"
	},
	{
		type : "string",
		key: "registNumber",
		name: "注册号/税号",
		prop: "registNumber"
	},
	{
		type : "string",
		key: "national",
		name: "国家",
		prop: "national"
	},
	{
		type : "select",
		selectOption: [],
		key: "province",
		name: "省份",
    prop: "province",
	},
	{
		type : "select",
		selectOption: [],
		key: "city",
		name: "市",
    prop: "city",
	},
	{
		type : "select",
		selectOption: [],
		key: "district",
		name: "区县",
		prop: "district"
	},
	{
		type : "string",
		key: "carrierAddress",
		name: "详细地址",
    prop: "carrierAddress",
    rules:validate.setRequired(),
    
	},
	{
		type : "string",
		key: "representative",
		name: "法人代表",
		prop: "representative"
	},
	{
		type : "number",
		key: "registFund",
		name: "注册资金(万)",
		prop: "registFund",
		rules: [{
			validator: validate.validateNum,
			trigger: 'blur'
		}]
	},
	{
		type : "string",
		key: "scope",
		name: "经营范围",
		prop: "scope"
	},
	{
		type : "select",
		selectOption: [],
		selectKey: "companyStatus",
		key: "carrierStatus",
		name: "承运商状态",
		prop: "carrierStatus"
	},
	{
		type : "select",
		selectOption: [],
		selectKey: "companyType",
		key: "carrierType",
		name: "类型",
		prop: "carrierType"
	},
	{
		type : "date",
		key: "registTime",
		name: "注册日期",
		prop: "registTime"
	},
	{
		type : "string",
		key: "fax",
		name: "传真",
		prop: "fax"
	},
	{
		type : "string",
		key: "phone",
		name: "电话",
		prop: "phone",
	},
	{
		type : "string",
		key: "carrierLicense",
		name: "营业执照",
		prop: "carrierLicense"
	},
	{
		type : "string",
		key: "website",
		name: "公司网址",
		prop: "website",
		rules: [{
			validator: validate.validateUrl,
			trigger: 'blur'
		}]
	},
	{
		type : "string",
		key: "email",
		name: "E-MAIL",
		prop: "email",
		rules: [{
			type: 'email',
			message: '格式错误',
			trigger: 'blur'
		}]
	},
	{
		type : "select",
		selectOption: [],
		selectKey: "carrierClassify",
		key: "classify",
		name: "承运商分类",
    prop: "classify",
    rules:validate.setRequired(),
	},
	// {
	// 	type : "checkbox",
	// 	key: "carrier",
	// 	name: "是否承运商",
	// 	prop: "carrier"
	// },
	{
		type : "checkbox",
		key: "supplier",
		name: "是否供应商",
		prop: "supplier"
	},
	{
		type : "textarea",
		key: "remark",
		name: "备注",
    prop: "remark",
    layout: 'flex-basis:94.5%;height:auto !important'
	}
]