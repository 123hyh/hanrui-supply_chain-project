import validate from "@/domain/common/validate"
const {setRequired} = validate,rules = setRequired();
export default [{
		type: 'string',
		key: "businessNo",
		name: "商机编号",
		prop: "businessNo",
		disabled: true,
	},
	{
		selectOption: [],
		type: 'select',
		selectKey: "businessOpportunity",
		key: "businessType",
		name: "商机分类",
		prop: "businessType",
		rules
  },
  {
		type: 'string',
		key: "customerName",
		name: "委托方名称",
		prop: "customerName",
		rules
	},

	{
		type: 'string',
		key: "customerShortName",
		name: "委托方简称",
		prop: "customerShortName",
		rules
	},
	/* {
		type: 'string',
		key: "customerCode",
		name: "委托方编码",
		prop: "customerCode",
		disabled: true,
	}, */
  {
		selectOption: [],
		type: 'select',
		selectKey: "typeOfCompany",
		key: "companyType",
		name: "公司类别",
		prop: "companyType",
		rules
	},
	{
		type: 'string',
		key: "companyAddress",
		name: "公司地址",
		prop: "companyAddress"
  },
  {
		type: 'string',
		key: "contactPerson",
		name: "联系人",
		prop: "contactPerson",
		rules
	},
	{
		type: 'string',
		key: "tel",
		name: "联系电话",
		prop: "tel",
		rules: [
			{ required: true, message: '必填', trigger: 'blur' },
			{ validator: validate.validateTel, trigger: ['blur'] }
		],
	},
	{
		type: 'string',
		key: "fax",
		name: "传真",
		prop: "fax",
	},
	{
		type: 'string',
		key: "email",
		name: "邮箱",
		prop: "email",
		rules: [
			{ type: 'email', message: '邮箱错误', trigger: ['blur', 'change'] },
		],
	},
	{
		type: 'string',
		key: "websiteUrl",
		name: "网址",
		prop: "websiteUrl",
		rules: [
			{ type: 'url', message: '网址错误', trigger: ['blur', 'change'] },
		],
	},
	{
		type: 'string',
		key: "registerMoney",
		name: "注册资金",
		prop: "registerMoney",
		rules: [
			{ validator: validate.validateNum, trigger: ['blur','change'] }
		],
	},
	
	{
		type: 'string',
		key: "employees",
		name: "员工人数",
		prop: "employees",
		rules: [
			{ validator: validate.validateNum, trigger: ['blur','change'] }
		],
	},
	{
		type: 'date',
		key: "establishedTime",
		name: "成立时间",
		prop: "establishedTime"
	},
	{
		type: 'string',
		key: "companyArea",
		name: "公司或厂面积(平方米)",
		prop: "companyArea",
		rules: [
			{ validator: validate.validateNum, trigger: ['blur','change'] }
		],
	},
	{
		type: 'string',
		key: "mainEquipment",
		name: "主要设备介绍",
		prop: "mainEquipment"
	},
	{
		type: 'string',
		key: "workEnvironment",
		name: "公司办公环境",
		prop: "workEnvironment"
	},
	{
		type: 'checkbox',
		key: "hasRealEstateOwner",
		name: "是否自有房产",
		prop: "hasRealEstateOwner"
	},
	{
		type: 'string',
		key: "businessLicense",
		name: "营业执照注册号",
		prop: "businessLicense"
	},
	{
		type: 'string',
		key: "taxId",
		name: "税务登记号",
		prop: "taxId"
	},
	/* {
		selectOption: [],
		type: 'select',
		selectKey: "businessOpportunityStatus",
		key: "status",
		name: "状态",
		prop: "status",
	}, */
	{
		type: 'string',
		key: "organizationCode",
		name: "组织机构代码",
		prop: "organizationCode"
	},
	{
		type: 'string',
		key: "mainBusiness",
		name: "主营业务介绍",
		prop: "mainBusiness"
	},
	{
		type: 'string',
		key: "industryCertification",
		name: "行业认证描述",
		prop: "industryCertification"
	},
	{
		type: 'string',
		key: "businessDescription",
		name: "商机描述",
		prop: "businessDescription"
	},
	{
		type: 'string',
		key: "honorDescription",
		name: "荣誉描述",
		prop: "honorDescription"
	},
	{
		type: 'date',
		key: "expirationDate",
		name: "保护截止日期",
    prop: "expirationDate",
    rules
	},
/* 	{
		type: 'string',
		key: "salesmanId",
		name: "接单人id",
		prop: "salesmanId",
	}, */
	{
		type: 'string',
		key: "salesmanName",
		name: "接单人名称",
		prop: "salesmanName",
		btn: true,
		readonly: true
	},
	{
		type: 'string',
		key: "offerRate",
		name: "已报价费率%",
		prop: "offerRate",
		rules: [
			{ validator: validate.validateNum, trigger: ['blur','change'] }
		],
	},
	{
		type: 'string',
		key: "remark",
		name: "备注",
		prop: "remark"
	}/* ,
	{
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
	} */
]
