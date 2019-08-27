import validate from "@/domain/common/validate.js";
const rules = validate.setRequired();
export default [
/* 	{
		type: 'string',
		key: "materielCode",
		name: "物料基础信息",
		prop: "materielCode",
		btn: true,
		rules
	}, */
	/* {
		type: 'string',
		key: "materielFinanceCode",
		name: "物料财务信息编码",
		prop: "materielFinanceCode"
	}, */
	{
		type: 'select',
		selectOption: [],
		key: "currency",
		name: "结算币种",
		prop: "currency",
		selectKey: 'currencyName',
		rules
	},
	{
		selectOption: [],
		type: 'select',
		key: "settlementType",
		name: "结算方式",
		prop: "settlementType",
		selectKey: 'settlementMethod',
		rules
	},
	{
		selectOption: [],
		type: 'select',
		key: "paymentMethod",
		name: "付款方式",
		prop: "paymentMethod",
		selectKey: 'paymentMethod',
		rules
	},
	{
		selectOption: [],
		type: 'select',
		key: "paymentTerm",
		name: "付款条件",
		prop: "paymentTerm",
		selectKey: 'paymentTerms',
		rules
	},
	{
		selectOption: [],
		type: 'select',
		key: "financeType",
		name: "记账分类",
		prop: "financeType",
		selectKey: 'chargeUpType',
		rules
	},
	{
		btn: true,
		type: 'string',
		key: "accContactName",
		name: "会计联系人",
		prop: "accContactName"
	},
	{
		type: 'string',
		key: "resign",
		name: "联系人职务",
		prop: "resign"
	}
]