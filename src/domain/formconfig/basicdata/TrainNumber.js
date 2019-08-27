import validate from "@/domain/common/validate.js";
const rules = validate.setRequired();
export default [
	// {
	// 	type: 'string',
	// 	key: "trainNumberCode",
	// 	name: "车次编码",
	// 	prop: "trainNumberCode"
	// },
	{
		type: 'string',
		key: "trainNumberName",
		name: "车次名称",
		prop: "trainNumberName",
		rules
	},
	{
		type: 'string',
		key: "trainNo",
		name: "车次编号",
		prop: "trainNo",
		rules
	}
]