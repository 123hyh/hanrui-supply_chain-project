import validate from "@/domain/common/validate.js";
const rules = validate.setRequired();
export default [
	{
		type: 'string',
		key: "clearanceFeesCode",
		name: "清关费用编码",
		prop: "clearanceFeesCode",
		disabled: true,
		rules
	},
	{
		type: 'string',
		key: "bankAccount",
		name: "银行账号",
		prop: "bankAccount",
		rules
	},
	{
		type: 'string',
		key: "bankName",
		name: "名称",
		prop: "bankName",
		rules
	},
	{
		type: 'string',
		key: "bankGroup",
		name: "开户单位",
		prop: "bankGroup",
		rules
	},
	{
		type: 'string',
		key: "institution",
		name: "金融机构",
		prop: "institution"
	},
	{
		type: 'checkbox',
		key: "singleCurrency",
		name: "单一币别",
		prop: "singleCurrency"
	},
	{
		selectOption: [],
		type: 'select',
		selectKey: 'currencyName',
		key: "currency",
		name: "币别",
		prop: "currency",
		rules
	},
	{
		type: 'string',
		key: "subject",
		name: "科目",
		prop: "subject",
		rules
	},
	{
		type: 'string',
		key: "applicant",
		name: "申请人",
		prop: "applicant",
	},
	{
		type: 'string',
		key: "phoneNo",
		name: "联系电话",
		prop: "phoneNo"
	},
	{
		type: 'checkbox',
		key: "deLiquidator",
		name: "是否默认清算户",
		prop: "deLiquidator"
	},
	{
		type: 'checkbox',
		key: "stopLiquidator",
		name: "是滞清算户",
		prop: "stopLiquidator"
	},
	{
		type: 'checkbox',
		key: "stopStroke",
		name: "是滞定向划转",
		prop: "stopStroke"
	},
	{
		type: 'checkbox',
		key: "directPayment",
		name: "允许银企直联支付",
		prop: "directPayment"
	},
	{
		type: 'checkbox',
		key: "bankApi",
		name: "设置银行接口资料",
		prop: "bankApi"
	},
	{
		type: 'string',
		key: "accountName",
		name: "银企账户名称",
		prop: "accountName",
		rules
	},
	{
		selectOption: [],
		type: 'select',
		selectKey: 'budgetNature',
		key: "budgetNature",
		name: "收支性质",
		prop: "budgetNature",
		rules
	},
	{
		type: 'string',
		key: "remark",
		name: "备注",
		prop: "remark"
	}
]