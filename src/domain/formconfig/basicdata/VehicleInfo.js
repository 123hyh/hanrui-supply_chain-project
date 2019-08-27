import validate from "@/domain/common/validate"
const rules = validate.setRequired()
export default [
	{
		type : "string",
		key: "vehicleInfoCode",
		name: "车辆信息编码",
		prop: "vehicleInfoCode",
		disabled: true,
		rules,
	},
	{
		type : "string",
		key: "vehicleNo",
		name: "车牌号",
		prop: "vehicleNo",
		rules,
	},
	{
		type : "select",
		selectOption: [],
		selectKey: "vehicleType",
		key: "vehicleType",
		name: "类型",
		prop: "vehicleType",
		rules,
	},
	{
		type : "string",
		key: "carType",
		name: "车型",
		prop: "carType",
		rules,
	},
	{
		type : "string",
		key: "loadWeight",
		name: "载重",
		prop: "loadWeight",
		rules,
	},
	{
		type : "string",
		key: "pachageNo",
		name: "可载件数",
		prop: "pachageNo",
		rules,
	},
	{
		type : "string",
		key: "carriageVolume",
		name: "车厢容积",
		prop: "carriageVolume",
		rules,
	},
	{
		type : "string",
		key: "driver",
		name: "默认司机",
		prop: "driver",
		rules,
	},
	{
		type : "string",
		key: "phoneNo",
		name: "司机电话",
		prop: "phoneNo",
		rules,
	},
	{
		type : "textarea",
		key: "remark",
		name: "备注",
		prop: "remark"
	}
]