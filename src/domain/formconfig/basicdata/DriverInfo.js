import validate from "@/domain/common/validate"
const rules = validate.setRequired()
export default [
	{
		type : "string",
		key: "driverInfoCode",
		name: "编码",
		prop: "driverInfoCode",
		disabled: true,
        rules,
	},
	{
		type : "string",
		key: "driverName",
		name: "姓名",
		prop: "driverName",
        rules,
	},
	{
		type : "select",
		selectOption : [],
		selectKey: "driverType",
		key: "driverType",
		name: "车辆类型",
		prop: "driverType",
        rules,
	},
	{
		type : "string",
		key: "phone",
		name: "手机",
		prop: "phone",
        rules,
	},
	{
		type : "string",
		key: "telePhone",
		name: "电话",
		prop: "telePhone",
        rules,
	},
	{
		type : "string",
		key: "idCard",
		name: "身份证号码",
		prop: "idCard",
        rules,
	},
	{
		type : "string",
		key: "homeAddress",
		name: "家庭住址",
		prop: "homeAddress",
        rules,
	},
	{
		type : "checkbox",
		key: "dutyDriver",
		name: "当班司机",
		prop: "dutyDriver"
	},
	{
		type : "checkbox",
		key: "dutySend",
		name: "当班配送",
		prop: "dutySend"
	},
	{
		type : "textarea",
		key: "remark",
		name: "备注",
		prop: "remark"
	}
]