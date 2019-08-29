import validate from "@/domain/common/validate"
const rules = validate.setRequired()
export default [
	{
		type : "string",
		key: "employeeInfoCode",
		name: "职员编码",
		prop: "employeeInfoCode",
		disabled: true,
        rules,
	},
	{
		type : "string",
		key: "employeeInfoName",
		name: "名字",
		prop: "employeeInfoName",
        rules,
	},
	{
		type : "select",
		selectOption: [],
		selectKey: "gender",
		key: "gender",
		name: "性别",
		prop: "gender",
        rules,
	},
	{
		type : "string",
		key: "idCardNo",
		name: "身份证号码",
		prop: "idCardNo"
	},
	{
		type : "string",
		key: "birthAddress",
		name: "出生地址",
		prop: "birthAddress"
	},
	{
		type : "string",
		key: "department",
		name: "部门",
		prop: "department",
		btn: true,
		readonly: true,
        rules,
	},
	{
		type : "string",
		key: "leader",
		name: "上级领导",
		prop: "leader",
		btn: true,
		readonly: true,
        // rules,
	},
	{
		type : "string",
		key: "age",
		name: "年龄",
		prop: "age",
		rules: [{
			validator: validate.validateNum,
			trigger: 'blur',
		}]
	},
	{
		type : "string",
		key: "position",
		name: "员工职位",
		prop: "position",
        rules,
	},
	{
		type : "string",
		key: "contactInfo",
		name: "员工联系方式",
		prop: "contactInfo",
        rules,
	},
	{
		type : "string",
		key: "degree",
		name: "学位及学历",
		prop: "degree"
	},
	{
		type : "select",
		selectOption: [],
		selectKey: "employeeCertificationInfo",
		key: "authentication",
		name: "员工认证信息",
		prop: "authentication"
	},
	{
		type : "string",
		key: "vocational",
		name: "职（执）业资格信息",
		prop: "vocational"
	},
	{
		type : "select",
		selectOption: [],
		selectKey: "employeeReentryInfo",
		key: "reentryInfo",
		name: "员工再入职信息",
		prop: "reentryInfo"
	},
	{
		type : "string",
		key: "salary",
		name: "员工薪酬信息",
		prop: "salary",
	},
	{
		type : "select",
		selectOption: [],
		selectKey: "employeeSocialRelations",
		key: "socialRelations",
		name: "员工社会关系",
		prop: "socialRelations"
	},
	{
		type : "string",
		key: "emergencyContact",
		name: "员工紧急联系人",
		prop: "emergencyContact",
        // rules,
	},
	{
		type : "string",
		key: "emergencyContactPhone",
		name: "员工紧急联系人电话",
		prop: "emergencyContactPhone",
        // rules,
	},
	{
		type : "string",
		key: "languageAbility",
		name: "员工语言能力",
		prop: "languageAbility"
	},
	{
		type : "string",
		key: "photo",
		name: "员工照片",
		prop: "photo"
	},
	{
		type : "string",
		key: "technical",
		name: "员工技术信息",
		prop: "technical"
	},
	{
		type : "select",
		selectOption: [],
		selectKey: "employeeSocialSecurityInfo",
		key: "socialSecurity",
		name: "员工社保信息",
		prop: "socialSecurity"
	},
	{
		type : "select",
		selectOption: [],
		selectKey: "socialSecurityGrade",
		key: "socialSecurityGrade",
		name: "社保等级",
		prop: "socialSecurityGrade"
	}
]