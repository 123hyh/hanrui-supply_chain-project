import validate from "@/domain/common/validate"
const rules = validate.setRequired()
export default [
	{
		type: "string",
		key: "deliveryAreaCode",
		name: "编码",
		prop: "deliveryAreaCode",
		disabled: true,
        rules,
	},
	{
		type: "string",
		key: "deliveryAreaName",
		name: "区域名称",
		prop: "deliveryAreaName",
        rules,
	},
	{
		type: "string",
		key: "national",
		name: "国家",
		prop: "national",
        rules,
	},
	{
		type: "textarea",
		key: "description",
		name: "描述",
    prop: "description",
    layout: `flex-basis:100%; height: auto !important`
	},
]