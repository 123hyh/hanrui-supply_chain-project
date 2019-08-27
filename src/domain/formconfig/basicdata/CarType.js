import validate from "@/domain/common/validate"
const rules = validate.setRequired()
export default [
	{
		type : "string",
		key: "carTypeCode",
		name: "车型编码",
		prop: "carTypeCode",
		disabled: true,
		rules,
	},
	{
		type : "string",
		key: "carTypeName",
		name: "名称",
		prop: "carTypeName",
		rules,
	},
	{
		type : "string",
		key: "carTypeAbb",
		name: "简称",
		prop: "carTypeAbb",
		rules,
	},
	{
		type : "string",
		key: "description",
		name: "描述",
		prop: "description",
		rules,
	},
	{
		type : "textarea",
		key: "remark",
		name: "备注",
		prop: "remark"
	}
]