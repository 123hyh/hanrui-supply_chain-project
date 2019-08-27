import validate from "@/domain/common/validate"
const rules = validate.setRequired()
export default [
	{
		type : "string",
		key: "warehouseStatusCode",
		name: "仓库状态编码",
		prop: "warehouseStatusCode",
		disabled: true,
        rules,
	},
	{
		type : "string",
		key: "warehouseStatus",
		name: "仓库状态",
		prop: "warehouseStatus"
	},
	{
		type : "number",
		key: "jzAmount",
		name: "结转金额",
		prop: "jzAmount"
	},
	{
		type : "textarea",
		key: "description",
		name: "描述",
		prop: "description"
	}
]