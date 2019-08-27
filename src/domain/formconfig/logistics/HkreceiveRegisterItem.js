import validate from "@/domain/common/validate.js";
const rules = validate.setRequired();
export default [
	{
		type: 'string',
		key: "billNo",
		name: "单据编号",
		prop: "billNo",
		disabled: true,
		// rules
	},
	{
		key: "delegeteBillNo",
		name: "委托单号",
		prop: "delegeteBillNo",
		type: "string",
		disabled: true,
	},
	{
		type: 'string',
		key: "materialCode",
		name: "物料编码",
		prop: "materialCode",
		btn: true,
		readonly: true,
		rules
	},
	{
		type: 'string',
		key: "materialName",
		name: "物料名称",
		prop: "materialName",
		rules
	},
	{
		type: 'string',
		key: "specificationType",
		name: "规格型号",
		prop: "specificationType",
		rules
	},
	{
		type: 'string',
		key: "brandName",
		name: "品牌",
		btn: true,
		prop: "brandName",
		rules
	},
	{
		type: 'string',
		key: "originPlaceName",
		name: "产地",
		prop: "originPlaceName",
		btn: true,
		rules
	},
	{
		type: 'string',
		key: "quantity",
		name: "数量",
		prop: "quantity",
		rules: [...rules, {validator: validate.validateNum,}]
	},
	{
		type: 'string',
		key: "unitName",
		name: "计量单位",
		prop: "unitName",
		btn: true,
		rules
	},
	{
		type: 'number',
		key: "netWeight",
		name: "净重(KG)",
		prop: "netWeight",
		rules: [...rules, {validator: validate.validateNum,}]
	},
	{
		type: 'number',
		key: "grossWeight",
		name: "毛重(KG)",
		prop: "grossWeight",
		rules: [...rules, {validator: validate.validateNum,}]
	},
	{
		type: 'string',
		key: "shippingMarks",
		name: "唛头",
		prop: "shippingMarks"
	},
	{
		type: 'number',
		key: "boxNoStart",
		name: "起始箱号",
		prop: "boxNoStart",
		rules: [...rules, {validator: validate.validateNum}]
	},
	{
		type: 'number',
		key: "boxNoEnd",
		name: "结束箱号",
		prop: "boxNoEnd",
		rules: [...rules, {validator: validate.validateNum}]
	},
	{
		type: 'number',
		key: "boxCount",
		name: "总箱数",
		prop: "boxCount",
		rules: [...rules, {validator: validate.validateNum}]
	},
	{
		type: 'string',
		key: "batchNo",
		name: "批次",
		prop: "batchNo",
	},
	{
		type: 'string',
		key: "taxNo",
		name: "税号",
		btn: true,
		prop: "taxNo",
		rules
	},
	{
		type: 'string',
		key: "attachNo",
		name: "附号",
		prop: "attachNo"
	},
]