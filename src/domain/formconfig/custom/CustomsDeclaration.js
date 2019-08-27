import validate from "@/domain/common/validate"
const rules = validate.setRequired();
export default [
	{
		type: "string",
		key: "brokerCode",
		name: "报关员代码",
		prop: "brokerCode",
		rules
	},
	{
		type: "string",
		key: "verifyCode",
		name: "QP审核状态代码",
		prop: "verifyCode",
		rules
	},
	{
		type: "date",
		key: "releaseTime",
		name: "放行时间",
		prop: "releaseTime"
	},
	{
		type: "date",
		key: "closeDate",
		name: "结关日期",
		prop: "closeDate"
	},
	{
		type: "checkbox",
		key: "hasInspection",
		name: "已做报关检查",
		prop: "hasInspection"
	},
	{
		type: "string",
		key: "buyingPrice",
		name: "报关日的银行买入价",
		prop: "buyingPrice"
	},
	{
		type: "string",
		key: "busiTypeCode",
		name: "业务类型编码",
		prop: "busiTypeCode"
	},
	{
		selectOption: [],
		type: "select",
		selectKey: "businessType",
		key: "bizType",
		name: "业务类型",
		prop: "bizType"
	},
	{
		selectOption: [],
		type: "select",
		selectKey: "sourcedocumentType",
		key: "orderType",
		name: "委托单单据类型",
		prop: "orderType"
	},
	{
		type: "string",
		key: "approvalReceipt",
		name: "OP审批回执",
		prop: "approvalReceipt"
	}
]