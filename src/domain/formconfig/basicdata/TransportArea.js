import validate from "@/domain/common/validate"
const rules = validate.setRequired()
export default [
	{
		type : "string",
		key: "areaCode",
		name: "区域编码",
		prop: "areaCode",
		disabled: true,
        rules,
	},
	{
		type : "string",
		key: "transportAreaName",
		name: "区域名称",
		prop: "transportAreaName",
        rules,
	},
	{
		type : "textarea",
		key: "remark",
		name: "备注",
		prop: "remark"
	}
]