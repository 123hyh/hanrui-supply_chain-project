import validate from "@/domain/common/validate"
const rules = validate.setRequired()
export default [
	{
		type : "string",
		key: "attachmentTypeCode",
		name: "附件类型编码",
		prop: "attachmentTypeCode",
		readonly: true,
        rules,
	},
	{
		type : "string",
		key: "deptCode",
		name: "所属部门",
		prop: "deptCode",
        rules,
	},
	{
		type : "string",
		key: "classifyName",
		name: "分类名称",
		prop: "classifyName",
        rules,
	},
	{
		type : "textarea",
		key: "description",
		name: "描述",
    prop: "description",
    layout: `flex-basis: 98%;height: auto !important`
	}
]