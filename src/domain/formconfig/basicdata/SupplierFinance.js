import validate from '@/domain/common/validate';
const rules  = validate.setRequired()
export default [
	{
		type: "string",
		key: "financeName",
		name: "财务组织名称",
		prop: "financeName",
		btn: true,
    readonly: true,
    rules
	},
	{
		selectOption: [],
		type: "select",
		selectKey: "chargeUpType",
		key: "financeType",
		name: "记账分类",
    prop: "financeType",
    rules
	},
	{
		selectOption: [],
		type: "select",
		selectKey: "currencyName",
		key: "currency",
		name: "结算币种",
    prop: "currency",
    rules
	},
	{
		selectOption: [],
		type: "select",
		key: "settlementType",
		selectKey: "settlementMethod",
		name: "结算方式",
		prop: "settlementType"
	},
	{
		selectOption: [],
		type: "select",
		key: "paymentMethod",
		selectKey: "payMode",
		name: "付款方式",
		prop: "paymentMethod"
	},
	{
		selectOption: [],
		type: "select",
		key: "paymentTerm",
		selectKey: "paymentTerms",
		name: "付款条件",
		prop: "paymentTerm"
	},
	{
		type: "string",
		key: "accContact",
		name: "会计联系人",
		prop: "accContact"
	},
	{
		type: "string",
		key: "resign",
		name: "联系人职务",
		prop: "resign"
	},
	{
		type: "string",
		key: "telephone",
		name: "办公室电话",
		prop: "telephone"
	},
	{
		type: "string",
		key: "moblephone",
		name: "移动电话",
		prop: "moblephone"
	},
	{
		type: "string",
		key: "postcode",
		name: "邮政编码",
		prop: "postcode"
	},
	{
		type: "string",
		key: "fax",
		name: "传真",
		prop: "fax"
	},
	{
		type: "string",
		key: "email",
		name: "E-MAIL",
		prop: "email"
	}
]
