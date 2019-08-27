import validate from "@/domain/common/validate.js";
const rules = validate.setRequired();
export default [
	{
		type: 'string',
		key: "brandOriginCode",
		name: "单据编码",
		prop: "brandOriginCode",
		readonly: true,
		rules
	},
	// {
	// 	text: true,
	// 	key: "clientNo",
	// 	name: "委托方",
	// 	prop: "clientNo"
	// },
	{
		type: 'string',
		key: "clientName",
		name: "委托方",
		prop: "clientName",
		readonly: true,
		btn: true,
		rules
	},
	// {
	// 	text: true,
	// 	key: "supplierCode",
	// 	name: "供应商",
	// 	prop: "supplierCode"
	// },
	{
		type: 'string',
		key: "supplierName",
		name: "供应商",
		prop: "supplierName",
		readonly: true,
		btn: true,
		rules
	},
	{
		type: 'string',
		key: "orderType",
		name: "订单型号",
		prop: "orderType",
		rules
	},
	{
		type: 'string',
		key: "incomingGoodsType",
		name: "来货型号",
		prop: "incomingGoodsType",
		rules
	},
	// {
	// 	text: true,
	// 	key: "brand",
	// 	name: "品牌",
	// 	prop: "brand"
	// },
	{
		type: 'string',
		key: "brandName",
		name: "品牌",
		prop: "brandName",
		readonly: true,
		btn: true,
		rules
	},
	// {
	// 	text: true,
	// 	key: "origin",
	// 	name: "产地",
	// 	prop: "origin"
	// },
	{
		type: 'string',
		key: "originName",
		name: "产地",
		prop: "originName",
		readonly: true,
		btn: true,
		rules
	},
	{
		type: 'number',
		key: "singleNetWeight",
		name: "单个净重",
		prop: "singleNetWeight"
	},
	{
		type: 'number',
		key: "totalNetWeight",
		name: "累计报关总净重",
		prop: "totalNetWeight"
	},
	{
		type: 'number',
		key: "totalCustomsNubs",
		name: "累计报关数量",
		prop: "totalCustomsNubs"
	},
	{
		type: 'number',
		key: "customsTimes",
		name: "报关次数",
		prop: "customsTimes"
	},
	{
		type: 'date',
		key: "lastDay",
		name: "最后报关日",
		prop: "lastDay"
	},
	{
		type: 'string',
		key: "remark",
		name: "备注",
		prop: "remark"
	}
]