import validate from "@/domain/common/validate.js";
export default [
	{
		key: "entrustOrderNos",
		name: "委托单号",
		prop: "entrustOrderNos",
		type: "string",
		btn: true,
		readonly: true,
		api: "queryentrustorderSearch",
	},
	{
		key: "materialCode",
		name: "物料编码",
		prop: "materialCode",
		type: "string",
	},
	{
		key: "materialName",
		name: "物料名称",
		prop: "materialName",
		type: "string",
		btn: true,
		readonly: true,
		api: "getMaterielBaseList",
	},
	{
		key: "specificationType",
		name: "规格型号",
		prop: "specificationType",
		type: "string",
		disabled: true
	},
	{
		key: "batchNo",
		name: "批次",
		prop: "batchNo",
		type: "string",
		disabled: true
	},
	{
		key: "unit",
		name: "计量单位",
		prop: "unit",
		type: "string",
		disabled: true
	},
	{
		key: "price",
		name: "单价",
		prop: "price",
		type: "number",
		disabled: true
	},
	{
		key: "quantity",
		name: "数量",
		prop: "quantity",
		type: "number",
		disabled: true
	},
	{
		key: "amount",
		name: "金额",
		prop: "amount",
		type: "number",
		disabled: true
	},
	{
		key: "shipper",
		name: "发货方",
		prop: "shipper",
		type: "string",
		btn: true,
		readonly: true,
		api: "querycompanyinfoSearch",
	},
	{
		key: "stockGroup",
		name: "发货方库存组织",
		prop: "stockGroup",
		type: "string",
		btn: true,
		readonly: true,
		api: "querywarehouseSearch",
	},
	{
		key: "shipWarehouse",
		name: "发货仓库",
		prop: "shipWarehouse",
		type: "string",
		btn: true,
		readonly: true,
		api: "querywarehouseSearch",
	},
	{
		key: "remark",
		name: "备注",
		prop: "remark",
		type: "string",
	},
	{
		key: "storehouse",
		name: "库位",
		prop: "storehouse",
		type: "string",
	},
	{
		key: "boxNoStart",
		name: "起始箱号",
		prop: "boxNoStart",
		type: "string",
	},
	{
		key: "boxNoEnd",
		name: "结束箱号",
		prop: "boxNoEnd",
		type: "string",
	},
	{
		key: "shippingMarks",
		name: "唛头",
		prop: "shippingMarks",
		type: "string",
	},
	{
		key: "incomeInvoiceNo",
		name: "来货发票号",
		prop: "incomeInvoiceNo",
		type: "string",
	}
]