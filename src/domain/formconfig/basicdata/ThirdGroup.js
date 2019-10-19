import validate from "@/domain/common/validate"
const rules = validate.setRequired()
export default [
	{
		type: 'string',
		key: "billCode",
		name: "编码",
		prop: "billCode",
        rules,
	},
	{
		type: 'string',
		key: "thirdGroupName",
		name: "名称",
		prop: "thirdGroupName",
        rules,
	},
	{
		type: 'string',
		key: "enterpriseTaxNo",
		name: "企业税号",
		prop: "enterpriseTaxNo",
        rules,
	},
	{
		type: 'string',
		key: "telephone",
		name: "电话",
		prop: "telephone",
        rules,
	},
	{
		type: 'string',
		key: "fax",
		name: "传真",
		prop: "fax"
	},
	{
		type: 'string',
		key: "mobilephone",
		name: "手机",
		prop: "mobilephone"
	},
	{
		type: 'string',
		key: "address",
		name: "地址",
		prop: "address",
        rules,
	},
	{
		type: 'select',
		selectOption: [],
		selectKey: "status",
		key: "useStatus",
		name: "使用状态",
		prop: "useStatus",
        rules,
	},
	{
		type: 'textarea',
		key: "description",
		name: "描述",
		prop: "description"
	},
]