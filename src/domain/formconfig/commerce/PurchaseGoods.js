export default [
	{
		text: true,
		key: "itemCode",
		name: "表业务主键编号",
		prop: "itemCode"
	},
	{
		text: true,
		key: "purchaseOrderNo",
		name: "采购订单编号",
		prop: "purchaseOrderNo"
	},
	// {
	// 	text: true,
	// 	key: "serialNo",
	// 	name: "序号",
	// 	prop: "serialNo"
	// },
	{
		text: true,
		key: "specificationType",
		name: "规格型号",
		prop: "specificationType"
	},
	{
		text: true,
		key: "goodsName",
		name: "名称",
		prop: "goodsName"
	},
	{
		text: true,
		key: "goodsCode",
		name: "编码",
		prop: "goodsCode"
	},
	{
		text: true,
		key: "taxNo",
		name: "税号",
		prop: "taxNo"
	},
	{
		text: true,
		key: "attachNo",
		name: "附号",
		prop: "attachNo"
	},
	{
		text: true,
		key: "goodsCode_customs",
		name: "海关商品编码",
		prop: "goodsCode_customs"
	},
	{
		text: true,
		key: "goodsName_customs",
		name: "海关商品名称",
		prop: "goodsName_customs"
	},
	{
		text: true,
		key: "customsGoodsModel",
		name: "海关商品规格型号",
		prop: "customsGoodsModel"
	},
	{
		type: true,
		text: true,
		key: "quantity",
		name: "订货数量",
		prop: "quantity",
		rules: [...rules, {validator: validate.validateNum,}]
	},
	{
		type: true,
		text: true,
		key: "price",
		name: "订货单价",
		prop: "price"
	},
	{
		selectOption: [],
		select: true,
		key: "currency",
		name: "订货币别",
		prop: "currency"
	},
	{
		type: true,
		text: true,
		key: "amount",
		name: "订货金额",
		prop: "amount"
	},
	{
		text: true,
		key: "unit",
		name: "卖方销售-计量单位",
		prop: "unit"
	},
	{
		selectOption: [],
		select: true,
		key: "sellerCurrency",
		name: "卖方销售-币别",
		prop: "sellerCurrency"
	},
	{
		type: true,
		text: true,
		key: "sellerPrice",
		name: "卖方销售-单价",
		prop: "sellerPrice"
	},
	{
		type: true,
		text: true,
		key: "sellerQuantity",
		name: "卖方销售-数量",
		prop: "sellerQuantity"
	},
	{
		type: true,
		text: true,
		key: "sellerGoodsValue",
		name: "卖方销售-货价",
		prop: "sellerGoodsValue"
	},
	{
		text: true,
		key: "controlledGoods",
		name: "报关-管制物品",
		prop: "controlledGoods"
	},
	{
		text: true,
		key: "telecomLicence",
		name: "报关-电讯许可证",
		prop: "telecomLicence"
	},
	{
		selectOption: [],
		select: true,
		key: "superviseMode",
		name: "报关-监管方式",
		prop: "superviseMode"
	},
	{
		type: true,
		text: true,
		key: "exchangeRate",
		name: "报关-海关征税汇率",
		prop: "exchangeRate"
	},
	{
		type: true,
		text: true,
		key: "extrasTaxRate",
		name: "税/杂费-关税税率",
		prop: "extrasTaxRate"
	},
	{
		type: true,
		text: true,
		key: "extrasTariff",
		name: "税/杂费-关税",
		prop: "extrasTariff"
	},
	{
		type: true,
		text: true,
		key: "extrasVat",
		name: "税/杂费-进口环节增值税",
		prop: "extrasVat"
	},
	{
		type: true,
		text: true,
		key: "freightRate",
		name: "运费费率",
		prop: "freightRate"
	},
	{
		type: true,
		text: true,
		key: "premiumRate",
		name: "保费费率",
		prop: "premiumRate"
	},
	{
		type: true,
		text: true,
		key: "extrasRate",
		name: "杂费费率",
		prop: "extrasRate"
	},
	{
		type: true,
		text: true,
		key: "buyerExchangeRate",
		name: "买方采购-货款汇率",
		prop: "buyerExchangeRate"
	},
	{
		selectOption: [],
		select: true,
		key: "buyerCurrency",
		name: "买方采购-币别",
		prop: "buyerCurrency"
	},
	{
		type: true,
		text: true,
		key: "buyerPrice",
		name: "买方采购-单价",
		prop: "buyerPrice"
	},
	{
		type: true,
		text: true,
		key: "buyerGoodsValue",
		name: "买方采购-货价",
		prop: "buyerGoodsValue"
	},
	{
		text: true,
		key: "buyerTaxType",
		name: "买方采购-税种",
		prop: "buyerTaxType"
	},
	{
		type: true,
		text: true,
		key: "buyerTaxRate",
		name: "买方采购-税率",
		prop: "buyerTaxRate"
	},
	{
		type: true,
		text: true,
		key: "totalAmount",
		name: "买方采购-价税合计",
		prop: "totalAmount"
	},
	{
		type: true,
		text: true,
		key: "netWeight",
		name: "净重",
		prop: "netWeight"
	},
	{
		type: true,
		text: true,
		key: "grossWeight",
		name: "毛重",
		prop: "grossWeight"
	},
	{
		type: true,
		text: true,
		key: "volume",
		name: "体积",
		prop: "volume"
	},
	{
		text: true,
		key: "brand",
		name: "品牌",
		prop: "brand"
	},
	{
		text: true,
		key: "sourceArea",
		name: "原产地",
		prop: "sourceArea"
	},
	{
		text: true,
		key: "receiveQuantity",
		name: "累计收货数量",
		prop: "receiveQuantity"
	},
	{
		text: true,
		key: "inStorageQuantity",
		name: "累计入库",
		prop: "inStorageQuantity"
	},
	{
		text: true,
		key: "buyerMaterialCode",
		name: "买方物料-编码",
		prop: "buyerMaterialCode"
	},
	{
		text: true,
		key: "buyerMaterialName",
		name: "买方物料-名称",
		prop: "buyerMaterialName"
	},
	{
		text: true,
		key: "materialModel",
		name: "买方物料-规格型号",
		prop: "materialModel"
	},
	{
		type: true,
		text: true,
		key: "taxRate",
		name: "改单前后税率",
		prop: "taxRate"
	},
	{
		text: true,
		key: "superviseTerm",
		name: "改单前后监管条件",
		prop: "superviseTerm"
	},
	{
		text: true,
		key: "producerProduct",
		name: "改单前后管制品",
		prop: "producerProduct"
	},
	{
		text: true,
		key: "storehouse",
		name: "库位",
		prop: "storehouse"
	},
	{
		text: true,
		key: "passNo",
		name: "出/入口证号码",
		prop: "passNo"
	},
	{
		text: true,
		key: "threecItem",
		name: "3C项目",
		prop: "threecItem"
	}
]