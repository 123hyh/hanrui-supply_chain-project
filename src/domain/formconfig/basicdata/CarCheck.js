import validate from "@/domain/common/validate.js";
const rules = validate.setRequired();
export default [
	{
		type: 'string',
		key: "carCheckCode",
		name: "编码",
		prop: "carCheckCode",
		readonly: true,
		rules
	},
	{
		type: 'date',
		key: "checkTime",
		name: "查车日期",
		prop: "checkTime",
		rules
	},
	{
		btn:true,
		type: 'string',
		key: "trainNo",
		name: "车次",
		prop: "trainNo",
		rules
	},
	{
		type: 'string',
		key: "remark",
		name: "原因备注",
		prop: "remark"
	}
]