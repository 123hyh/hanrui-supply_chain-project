import validate from "@/domain/common/validate"
const rules = validate.setRequired()
export default [
	{
		type: 'string',
		key: "goodsPlaceCode",
		name: "编码",
		prop: "goodsPlaceCode",
		readonly: true,
        rules,
	},
	{
		type: 'string',
		key: "goodsPlaceName",
		name: "名称",
		prop: "goodsPlaceName",
        rules,
	},
	{
		type: 'string',
		key: "goodsPlaceAbb",
		name: "简称",
		prop: "goodsPlaceAbb",
        rules,
	},
	{
		type: 'string',
		key: "customsCode",
		name: "对应海关编码",
		prop: "customsCode",
        rules,
	},
	{
		type: 'string',
		key: "description",
		name: "描述",
		prop: "description"
	}
]