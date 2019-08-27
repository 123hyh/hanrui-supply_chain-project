import validate from "@/domain/common/validate"
const rules = validate.setRequired()
export default [
	{
		type : "string",
		key: "transportTimeCode",
		name: "时效编码",
		prop: "transportTimeCode",
		disabled: true,
        rules,
	},
	{
		type : "string",
		key: "transportTimeName",
		name: "名称",
		prop: "transportTimeName",
        rules,
	},
	{
		type : "string",
		key: "transportTimeNameAbb",
		name: "简称",
		prop: "transportTimeNameAbb",
        rules,
	},
	{
		type : "string",
		key: "carrier",
		name: "承运商",
		prop: "carrier",
        rules,
	},
	{
		type : "string",
		key: "timeType",
		name: "时效分类",
		prop: "timeType"
	},
	{
		type : "string",
		key: "timeName",
		name: "标准时效",
		prop: "timeName"
	},
	{
		type : "string",
		key: "throwingSystem",
		name: "抛件系统",
		prop: "throwingSystem"
	},
	{
		type : "textarea",
		key: "description",
		name: "描述",
		prop: "description"
	},
	{
		type : "textarea",
		key: "remark",
		name: "备注",
		prop: "remark"
	}
]