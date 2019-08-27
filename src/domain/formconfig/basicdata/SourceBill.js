import validate from "@/domain/common/validate.js";
const rules = validate.setRequired();
export default [
	{
		type: 'string',
		key: "sourceBillCode",
		name: "供应商基础信息编码",
		prop: "sourceBillCode",
		rules
	},
	{
		type: 'string',
		key: "deliveryNoName",
		name: "提运单号",
		prop: "deliveryNoName",
		readonly: true,
		btn: true,
		rules
	},
	{
		type: 'string',
		key: "trainNo",
		name: "车次",
		prop: "trainNo",
		rules
	},
	{
		selectOption: [],
		type: 'select',
		selectKey: "declareCustoms",
		key: "customsType",
		name: "报关类型",
		prop: "customsType",
		rules
	},
	{
		type: 'checkbox',
		key: "hasSendCustoms",
		name: "已发报关",
		prop: "hasSendCustoms"
	},
	{
		type: 'string',
		key: "sender",
		name: "发送人",
		prop: "sender"
	},
	{
		type: 'date',
		key: "sendTime",
		name: "发送时间",
		prop: "sendTime"
	}
]