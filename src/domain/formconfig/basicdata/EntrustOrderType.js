import validate from "@/domain/common/validate"
const rules = validate.setRequired()
export default [
	{
		type: "string",
		key: "entrustOrderTypeCode",
		name: "委托单类型编码",
		prop: "entrustOrderTypeCode",
		disabled: true,
        rules,
	},
	{
		type: "string",
		key: "entrustOrderTypeName",
		name: "委托单类型",
		prop: "entrustOrderTypeName",
        rules,
	}
]