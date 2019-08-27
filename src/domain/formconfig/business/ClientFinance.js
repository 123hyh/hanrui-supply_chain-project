import validate from "@/domain/common/validate"
const rules = validate.setRequired()
export default [
/* 	{
		type: "string",
		key: "clientNo",
		name: "委托方编号",
		prop: "clientNo",
		disabled: true,
	},
	{
		type: "string",
		btn: true,
		key: "organizationCode",
		name: "财务组织编码",
		prop: "organizationCode",
		disabled: true,
	}, */
	{
		btn: true,
		type: "string",
		key: "organizationName",
		name: "财务组织名称",
		prop: "organizationName",
		disabled: true,
	},
	{
		selectOption: [],
		type: "select",
		selectKey: "chargeUpType",
		key: "keepAccountsType",
		name: "记账分类",
    prop: "keepAccountsType",
    rules
	},
	{
		selectOption: [],
		type: "select",
		selectKey: "currencyName",
		key: "settlementCurrentcy",
		name: "结算币别",
    prop: "settlementCurrentcy",
    rules
	},
	{
		selectOption: [],
		type: "select",
		selectKey: "settlementMethod",
		key: "settlementMode",
		name: "结算方式",
		prop: "settlementMode"
	},
	{
		selectOption: [],
		type: "select",
		selectKey: "payMode",
		key: "payMode",
		name: "付款方式",
    prop: "payMode",
    // rules
	},
	{
		selectOption: [],
		type: "select",
		selectKey: "paymentTerms",
		key: "paymentTerms",
		name: "付款条件",
		prop: "paymentTerms"
	},
	{
		btn: true,
		type: "string",
		key: "leader",
		name: "财务业务员",
		prop: "leader",
		disabled: true,
	},
	{
		btn: true,
		type: "string",
		key: "department",
		name: "部门",
		prop: "department",
		disabled: true,
	},
	{
		type: "string",
		key: "contact",
		name: "联系人",
		prop: "contact"
	},
	{
		type: "string",
		key: "contactDuty",
		name: "联系人职务",
		prop: "contactDuty"
	},
	{
		type: "string",
		key: "tel",
		name: "电话",
		prop: "tel",
		rules: [{
			validator: validate.validateTel,
			trigger: ['blur','change']
		}]
	},
	{
		type: "string",
		key: "phone",
		name: "手机",
		prop: "phone",
		rules: [{
			validator: validate.validateTel,
			trigger: ['blur','change']
		}]
	},
	{
		type: "string",
		key: "fax",
		name: "传真",
		prop: "fax"
	},
	{
		type: "string",
		key: "postcode",
		name: "邮政编码",
		prop: "postcode"
	},
	{
		type: "string",
		key: "email",
		name: "邮件",
		prop: "email",
	},
	{
		selectOption: [],
		type: "select",
		selectKey: "informationStatus",
		key: "status",
		name: "财务资料状态",
		prop: "status"
	}
]