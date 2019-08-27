import validate from "@/domain/common/validate"
const rules = validate.setRequired()
export default [
	{
		type : "string",
		key: "customsTypeCode",
		name: "报关类型编码",
		prop: "customsTypeCode",
		disabled: true,
        rules,
	},
	{
		type : "string",
		key: "customsTypeNameSingle",
		name: "报关类型名称(单抬头)",
		prop: "customsTypeNameSingle"
	},
	{
		type : "string",
		key: "customsTypeNameDouble",
		name: "报关类型名称(双抬头)",
		prop: "customsTypeNameDouble"
	}
]