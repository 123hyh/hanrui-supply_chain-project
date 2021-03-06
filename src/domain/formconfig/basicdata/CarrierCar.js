import validate from "@/domain/common/validate"
const rules = validate.setRequired()
export default [
	{
		type: "string",
		key: "vehicleNo",
		name: "车牌号",
		prop: "vehicleNo"
	},
	{
		type : "string",
		key: "carType",
		name: "车型",
		prop: "carType"
	},
	{
		type: "string",
		key: "load",
		name: "载重",
		prop: "load"
	},
	{
		type : "number",
		rules,
		key: "pachageNo",
		name: "可载件数",
		prop: "pachageNo"
	},
	{
		type : "number",
		rules,
		key: "carriageVolume",
		name: "车厢容积(立方)",
		prop: "carriageVolume"
	}
]