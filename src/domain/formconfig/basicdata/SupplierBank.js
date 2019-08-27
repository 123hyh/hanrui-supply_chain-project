import validate from "@/domain/common/validate.js";
const rules = validate.setRequired();
export default [
/* 	{
		type: 'string',
		key: "customerNo",
		name: "编码",
		prop: "customerNo"
	}, */
	{
		type: 'string',
		key: "bankName",
		name: "开户银行",
    prop: "bankName",
    rules
	},
	{
		type: 'string',
		key: "bankNo",
		name: "银行帐号",
		prop: "bankNo",
		rules
	},
	{
		type: 'string',
		key: "bankAddress",
		name: "银行地址",
		prop: "bankAddress"
	},
	{
		type: 'string',
		key: "userName",
		name: "帐户名称",
    prop: "userName",
    rules
	},
	{
		selectOption: [],
		type: 'select',
		key: "currency",
		name: "币别",
		prop: "currency",
    selectKey: 'currencyName',
    rules
	},
	{
		type: 'string',
		key: "bankArea",
		name: "开户地区",
		prop: "bankArea"
	}
]