import validate from "@/domain/common/validate.js";
const rules = validate.setRequired();
export default [
	{
		type: 'string',
		key: "arrivalCountryCode",
		name: "编码",
		prop: "arrivalCountryCode",
		rules
	},
	{
		type: 'string',
		key: "arrivalCountryName",
		name: "名称",
		prop: "arrivalCountryName",
		rules
	},
	{
		type: 'string',
		key: "arrivalCountryAbb",
		name: "简称",
		prop: "arrivalCountryAbb",
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