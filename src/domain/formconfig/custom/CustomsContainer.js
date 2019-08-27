import validate from '@/domain/common/validate';
const rules = validate.setRequired();
export default [
	{
		type: "string",
		key: "customsFormCode",
		name: "关联报关单编码",
		prop: "customsFormCode",
		disabled: true,
		rules
	},
	{
		type: "string",
		btn: true,
		key: "containerCode",
		name: "集装箱代码",
		prop: "containerCode",
		rules
	},
	{
		type: "string",
		btn: true,
		key: "containerSpecification",
		name: "集装箱规格",
		prop: "containerSpecification",
		rules
	},
	{
		type: "string",
		key: "containerBox",
		name: "集装箱号",
		prop: "containerBox",
		rules
	},
	{
		type: "string",
		key: "containerWeight",
		name: "集装箱自重",
		prop: "containerWeight"
	},
	{
		type: "string",
		key: "mixLogo",
		name: "拼箱标识",
		prop: "mixLogo"
	},
	// {
	// 	type: "date",
	// 	key: "goodsRelation",
	// 	name: "商品项关系",
	// 	prop: "goodsRelation"
	// }
]