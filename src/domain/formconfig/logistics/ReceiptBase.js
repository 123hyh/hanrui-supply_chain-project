export default [
	/* {
		type: 'string',
		key: "itemCode",
		name: "子表编码-基本信息",
		prop: "itemCode"
	}, */
	{
		type: 'string',
		key: "receiptOrderCode",
		name: "收货单编码",
		prop: "receiptOrderCode",
		readonly: true
	},
	{
		type: 'string',
		key: "delegeteBillNo",
		name: "委托单号",
		prop: "delegeteBillNo",
		readonly: true
	},
	{
		type: 'string',
		key: "materialCode",
		name: "物料编码",
		prop: "materialCode",
		btn: true
	},
	{
		type: 'string',
		key: "materialName",
		name: "物料名称",
		prop: "materialName"
	},
	{
		type: 'string',
		key: "ruleType",
		name: "规则型号",
		prop: "ruleType"
	},
	{
		type: 'string',
		key: "batchNo",
		name: "批次",
		prop: "batchNo"
	},
	{
		type: 'string',
		key: "taxNo",
		name: "税号",
		prop: "taxNo",
		btn: true
	},
	{
		type: 'string',
		key: "attachNo",
		name: "附号",
		prop: "attachNo"
	},
	{
		type: 'string',
		key: "brandName",
		name: "品牌",
		prop: "brandName",
		btn: true
	},
	{
		type: 'string',
		key: "originPlaceName",
		name: "产地",
		prop: "originPlaceName",
		btn: true
	},
	{
		type: 'string',
		key: "quantity",
		name: "数量",
		prop: "quantity"
	},
	// {
	// 	type: 'string',
	// 	key: "unit",
	// 	name: "计量单位",
	// 	prop: "unit",
	// 	btn: true
	// },
	{
		type: 'string',
		key: "unitName",
		name: "计量单位",
		prop: "unitName",
		btn: true,
		// type: 'select',
		// key: "unitName",
		// name: "计量单位",
		// prop: "unitName",
		// selectKey: 'measurementUnitName',
		// selectOption: []
	},
	{
		type: 'number',
		key: "netWeight",
		name: "净重",
		prop: "netWeight"
	},
	{
		type: 'number',
		key: "grossWeight",
		name: "毛重",
		prop: "grossWeight"
	},
	{
		type: 'string',
		key: "shippingMarks",
		name: "唛头",
		prop: "shippingMarks"
	},
	{
		type: 'string',
		key: "boxNoStart",
		name: "起始箱号",
		prop: "boxNoStart"
	},
	{
		type: 'string',
		key: "boxNoEnd",
		name: "结束箱号",
		prop: "boxNoEnd"
	},
	{
		type: 'string',
		key: "boxCount",
		name: "总箱数",
		prop: "boxCount"
	},
	{
		type: 'string',
		key: "warehouse",
		name: "仓库",
		prop: "warehouse",
		btn: true,
		readonly: true
	},
	{
		type: 'string',
		key: "storehouse",
		name: "库位",
		prop: "storehouse"
	},
	{
		type: 'string',
		key: "warehousingCountAll",
		name: "累计入库数量",
		prop: "warehousingCountAll"
	},
	{
		type: 'string',
		key: "purchaseOrderNo",
		name: "采购订单号",
		prop: "purchaseOrderNo"
	},
	{
		type: 'string',
		key: "purchaseOrderRowNo",
		name: "采购订单行号",
		prop: "purchaseOrderRowNo"
	},
	{
		type: "string",
		key: "purchaseOrgName",
		name: "采购组织",
		prop: "purchaseOrgName",
		btn: true,
		readonly: true
	},
	{
		type: 'string',
		key: "hasIncomingNo",
		name: "仓储已入库数量",
		prop: "hasIncomingNo"
	},
	{
		type: 'string',
		key: "incomeInvoiceNo",
		name: "来货发票号",
		prop: "incomeInvoiceNo"
	},
	{
		type: 'string',
		key: "remark",
		name: "备注",
		prop: "remark"
	},
]