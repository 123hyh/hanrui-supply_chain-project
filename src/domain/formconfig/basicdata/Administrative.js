import validate from "@/domain/common/validate"
const rules = validate.setRequired()
export default [
	{
		type : "string",
		key: "customsCode",
		name: "关务编码唯一",
		prop: "customsCode",
		disabled: true,
		rules
	},
	{
		type : "string",
		key: "administrativeCode",
		name: "行政区域代码",
		prop: "administrativeCode",
		rules
	},
	{
		type : "string",
		key: "administrative",
		name: "所辖行政区",
		prop: "administrative",
		rules
	},
	{
		type : "string",
		key: "national",
		name: "国家",
		prop: "national",
		rules
	},
	{
    type : "select",
    selectKey:'',
    selectOption: [],
		key: "province",
		name: "省份",
		prop: "province",
		rules
	},
	{
    type : "select",
    selectKey:'',
    selectOption: [],
		key: "city",
		name: "城市",
		prop: "city",
		rules
	},
	{
		type : "select",
    selectKey:'',
    selectOption: [],
		key: "district",
		name: "区县",
		prop: "district",
		rules
	},
	{
		type : "string",
		key: "address",
		name: "详细地址",
		prop: "address",
		rules
	},
	{
		type : "textarea",
		key: "remark",
		name: "备注",
    prop: "remark",
    layout: 'flex-basis:98%; height: auto !important'
	}
]