import validate from "@/domain/common/validate.js";
const rules = validate.setRequired();
export default [
	{
		type: 'string',
		key: "organizationName",
		name: "财务组织名称",
		prop: "organizationName",
		readonly: true,
		btn: true,
		rules
	},
	{
		selectOption: [],
		type: 'select',
		key: "chargeUpType",
		name: "记帐分类",
		prop: "chargeUpType",
    selectKey: 'classificationOfAccounts',
    rules
	},
	{
		type: 'select',
		key: "settlementCurrency",
		name: "结算币种",
		prop: "settlementCurrency",
		selectOption: [],
    selectKey: 'currencyName',
    rules
	},
	{
		selectOption: [],
		type: 'select',
		key: "settlementMode",
		name: "结算方式",
		prop: "settlementMode",
		selectKey: 'settlementMethod'
	},
	{
		selectOption: [],
		type: 'select',
		key: "payMode",
		name: "付款方式",
		prop: "payMode",
		selectKey: 'payMode'
	},
	{
		key: "receivableTerm",
		type: 'select',
		selectOption: [],
		selectKey: 'receivePayCondition',
		name: "收款条件",
		prop: "receivableTerm"
	},
	{
		type: 'string',
		key: "salesmanName",
		name: "业务员",
		prop: "salesmanName",
		readonly: true,
		btn: true
	},
	{
		type: 'string',
		key: "departmentName",
		name: "部门",
		prop: "departmentName",
		readonly: true,
		btn: true
	},
	{
		type: 'string',
		key: "contact",
		name: "会计联系人",
		prop: "contact"
	},
	{
		type: 'string',
		key: "contactDuty",
		name: "联系人职务",
		prop: "contactDuty"
	},
	{
		type: 'string',
		key: "tel",
		name: "办公电话",
		prop: "tel"
	},
	{
		type: 'string',
		key: "phone",
		name: "移动电话",
		prop: "phone"
	},
	{
		type: 'string',
		key: "postcode",
		name: "邮政编码",
		prop: "postcode"
	},
	{
		type: 'string',
		key: "fax",
		name: "传真",
		prop: "fax"
	},
	{
		type: 'string',
		key: "email",
		name: "Email",
		prop: "email"
	}
]