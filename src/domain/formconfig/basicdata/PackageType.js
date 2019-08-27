import validate from "@/domain/common/validate.js";
const rules = validate.setRequired();
export default [
	{
		type: 'string',
		key: "packageTypeCode",
		name: "编码",
		prop: "packageTypeCode",
		readonly: true,
		rules
	},
	{
		type: 'string',
		key: "packageTypeName",
		name: "中文名称",
		prop: "packageTypeName",
		rules
	},
	{
		type: 'string',
		key: "packageTypeAbb",
		name: "简称",
		prop: "packageTypeAbb",
		rules
	},
	{
		type: 'string',
		key: "customsCode",
		name: "国际代码",
		prop: "customsCode",
		rules
	},
	{
		type: 'string',
		key: "description",
		name: "描述",
		prop: "description",
	},
	{
		type: 'string',
		key: "remark",
		name: "备注",
		prop: "remark"
	}
]