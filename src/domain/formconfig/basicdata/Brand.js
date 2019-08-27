import validate from "@/domain/common/validate.js";
const rules = validate.setRequired();
export default [
	{
		type: 'string',
		key: "brandCode",
		name: "编码",
		prop: "brandCode",
		rules
	},
	{
		type: 'string',
		key: "brandName",
		name: "名称",
		prop: "brandName",
		rules
	},
	{
		type: 'string',
		key: "brandAbb",
		name: "其他名称",
		prop: "brandAbb",
		rules
	},
	{
		type: 'string',
		key: "engName",
		name: "英文名",
		prop: "engName",
		rules
	},
	{
		type: 'string',
		key: "description",
		name: "描述",
		prop: "description"
	}
]