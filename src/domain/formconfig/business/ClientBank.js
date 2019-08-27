
import validate from "@/domain/common/validate"
const rules = validate.setRequired()
export default [
	{
		type: "string",
		key: "billNo",
		name: "委托方编号",
		prop: "billNo",
		disabled: true,
	},
	{
		type: "string",
		key: "bankName",
		name: "开户银行",
		prop: "bankName",
		rules
	},
	{
		type: "string",
		key: "bankNo",
		name: "银行账号",
		prop: "bankNo",
		rules
	},
	{
		type: "string",
		key: "bankAddress",
		name: "银行地址",
		prop: "bankAddress"
	},
	{
		type: "string",
		key: "userName",
		name: "账户名称",
    prop: "userName",
    rules
	},
	{
		type: "string",
		key: "bankArea",
		name: "开户地区",
		prop: "bankArea"
	},
	{
		selectOption: [],
		type: "select",
		selectKey: "currencyName",
		key: "currency",
		name: "币别",
    prop: "currency",
    rules
	}
]