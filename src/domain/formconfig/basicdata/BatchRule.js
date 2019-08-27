import validate from "@/domain/common/validate"
const rules = validate.setRequired()
export default [
	{
		type: "string",
		key: "batchRuleCode",
		name: "批次规则定义编码",
		prop: "batchRuleCode",
		disabled: true,
        rules,
	},
	{
		type: "string",
		key: "batchRuleName",
		name: "规则名称",
		prop: "batchRuleName",
        rules,
	},
	{
		type: "string",
		key: "group",
		name: "组织",
		prop: "group",
        rules,
	},
	{
		type: "checkbox",
		key: "enable",
		name: "启用",
		prop: "enable"
	},
	{
		type: "string",
		key: "separator",
		name: "段间分隔符",
		prop: "separator"
	},
	{
		type: "string",
		key: "length",
		name: "编码总长",
		prop: "length"
	},
	{
		type: "string",
		key: "preview",
		name: "编码预览",
		prop: "preview"
	}
]