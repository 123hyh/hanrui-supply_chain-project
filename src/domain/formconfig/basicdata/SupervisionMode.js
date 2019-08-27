import validate from "@/domain/common/validate.js";
const rules = validate.setRequired();
export default [
	{
		type: 'string',
		key: "supervisionModeCode",
		name: "编码",
		prop: "supervisionModeCode",
		rules
	},
	{
		type: 'string',
		key: "supervisionModeName",
		name: "名称",
		prop: "supervisionModeName",
		rules
	},
	{
		type: 'string',
		key: "supervisionModeAbb",
		name: "简称",
		prop: "supervisionModeAbb",
		rules
	},
	{
		type: 'string',
		key: "customsCode",
		name: "对应海关编码",
		prop: "customsCode",
		rules
	},
	{
		type: 'string',
		key: "description",
		name: "描述",
		prop: "description"
	}
]