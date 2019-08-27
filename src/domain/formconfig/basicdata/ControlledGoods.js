import validate from "@/domain/common/validate"
const rules = validate.setRequired()
export default [
	{
		type: 'string',
		key: "controlledGoodsCode",
		name: "单据编码",
		prop: "controlledGoodsCode",
		readonly: true,
        rules,
	},
	{
		type: 'string',
		key: "model",
		name: "型号",
		prop: "model",
        rules,
	},
	{
		type: 'string',
		key: "controlledGoods",
		name: "管制类别",
		prop: "controlledGoods",
        rules,
	},
	{
        btn: true,
		type: 'string',
		key: "tradeName",
		name: "品牌",
		prop: "tradeName",
        rules,
	},
	{
		selectOption: [],
		type: 'select',
		selectKey: "modelMatching",
		key: "modelMatching",
		name: "型号匹配",
		prop: "modelMatching",
        rules,
	},
	{
		selectOption: [],
		type: 'select',
		selectKey: "contModel",
		key: "controlCategory",
		name: "控制类别",
		prop: "controlCategory",
        rules,
	},
	{
		selectOption: [],
		type: 'select',
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