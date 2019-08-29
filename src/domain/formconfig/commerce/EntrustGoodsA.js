import validate from "@/domain/common/validate"
export default [
	// {
	// 	type: 'string',
	// 	key: "itemCode",
	// 	name: "表业务主键编号",
	// 	prop: "itemCode"
	// },
	// {
	// 	type: 'string',
	// 	key: "entrustOrderNo",
	// 	name: "委托订单号",
	// 	disabled: true,
	// 	prop: "entrustOrderNo"
	// },
	{
		btn: true, 
		type: 'string',
		key: "orderModel",
		name: "来货编码",
		prop: "orderModel",
		rules: [{ required: true, message: '必填', trigger: 'blur' }],
		readonly: true,
	},
	{
		type: 'string',
		key: "arrivalGoodsModel",
		name: "来货规格型号",
		prop: "arrivalGoodsModel"
	},
	// {
	// 	type: 'string',
	// 	key: "arrivalGoodsCode",
	// 	name: "来货编码",
	// 	prop: "arrivalGoodsCode"
	// },
	{
		type: 'string',
		key: "arrivalGoodsName",
		name: "来货名称",
		prop: "arrivalGoodsName"
	},
	// {
	// 	type: 'string',
	// 	key: "goodsCode",
	// 	name: "商品编码",
	// 	prop: "goodsCode",
	// 	readonly: true,
	// },
	{
		type: 'string',
		key: "goodsName",
		name: "海关商品名称",
		prop: "goodsName",
		disabled: true,
	},
	{
		// btn: true,
		type: 'string',
		key: "taxNo",
		name: "税号",
		prop: "taxNo",
		disabled: true,
	},
	{
		// btn: true, 
		type: 'string',
		key: "attachNo",
		name: "附号",
		prop: "attachNo",
		disabled: true,
	},
	{
		type: 'string',
		key: "sellerQuantity",
		name: "卖方数量",
		prop: "sellerQuantity",
		rules: [{
			validator: validate.validateNaN,
			trigger: ['blur', 'change']
		}]
	},
	{
		type: 'string',
		key: "sellerUnitName",
		name: "卖方单位",
		prop: "sellerUnitName",
		btn: true
	},
	// {
	// 	selectOption: [],
	// 	selectKey: "measurementUnitName",
	// 	type: 'select',
	// 	key: "sellerUnit",
	// 	name: "卖方单位",
	// 	prop: "sellerUnit",
	// 	disabled: true,
	// },
	{
		type: 'string',
		key: "sellerPrice",
		name: "卖方单价",
		prop: "sellerPrice",
		rules: [{
			validator: validate.validateNum,
			trigger: ['blur', 'change']
		}]
	},
	{
		selectOption: [],
		type: 'select',
		key: "sellerCurrency",
		selectKey: "currencyName",
		name: "卖方币别",
		prop: "sellerCurrency",
		disabled: true,
	},
	{
		type: 'string',
		key: "sellerGoodsValue",
		name: "卖方货价",
		prop: "sellerGoodsValue",
		disabled: true,
		rules: [{
			validator: validate.validateNum,
			trigger: ['blur', 'change']
		}]
	},
	{
		type: 'string',
		key: "controlledGoods",
		name: "管制物品",
		prop: "controlledGoods",
		disabled: true,
	},
	// {
	// 	btn: true, 
	// 	type: 'string',
	// 	key: "superviseMode",
	// 	name: "监管方式编码",
	// 	prop: "superviseMode"
	// },
	{
		btn: true, 
		type: 'string',
		key: "superviseModeName",
		name: "监管方式",
		prop: "superviseMode"
	},
	{
		type: 'string',
		key: "customsExchangeRate",
		name: "海关汇率",
		prop: "customsExchangeRate",
		disabled: true,
		rules: [{
			validator: validate.validateNum,
			trigger: ['blur', 'change']
		}]
	},
	{
		type: 'string',
		key: "customTaxRate",
		name: "海关税率%",
		prop: "customTaxRate",
		disabled: true,
		rules: [{
			validator: validate.validateNum,
			trigger: ['blur', 'change']
		}]
	},
	{
		type: 'string',
		key: "increaseTaxRate",
		name: "加征税率%",
		prop: "increaseTaxRate",
		disabled: true,
		rules: [{
			validator: validate.validateNum,
			trigger: ['blur', 'change']
		}]
	},
	{
		type: 'string',
		key: "customTaxAmount",
		name: "海关税额",
		prop: "customTaxAmount",
		disabled: true,
		rules: [{
			validator: validate.validateNum,
			trigger: ['blur', 'change']
		}]
	},
	{
		type: 'string',
		key: "vatTaxRate",
		name: "增值税税率%",
		prop: "vatTaxRate",
		disabled: true,
		rules: [{
			validator: validate.validateNum,
			trigger: ['blur', 'change']
		}]
	},
	{
		type: 'string',
		key: "vatTaxAmount",
		name: "增值税税额",
		prop: "vatTaxAmount",
		disabled: true,
		rules: [{
			validator: validate.validateNum,
			trigger: ['blur', 'change']
		}]
	},
	{
		type: 'string',
		key: "freightRate",
		name: "运费费率%",
		prop: "freightRate",
		rules: [{
			validator: validate.validateNum,
			trigger: ['blur', 'change']
		}]
	},
	{
		type: 'string',
		key: "premiumRate",
		name: "保费费率%",
		prop: "premiumRate",
		rules: [{
			validator: validate.validateNum,
			trigger: ['blur', 'change']
		}]
	},
	{
		type: 'string',
		key: "extrasRate",
		name: "杂费费率%",
		prop: "extrasRate",
		rules: [{
			validator: validate.validateNum,
			trigger: ['blur', 'change']
		}]
	},
	{
		type: 'string',
		key: "costAmount",
		name: "运保杂费额",
		prop: "costAmount",
		disabled: true,
		rules: [{
			validator: validate.validateNum,
			trigger: ['blur', 'change']
		}]
	},
	{
		type: 'string',
		key: "serviceExchangeRate",
		name: "服务费费率%",
		prop: "serviceExchangeRate",
		// disabled: true,
		rules: [{
			validator: validate.validateNum,
			trigger: ['blur', 'change']
		}]
	},
	{
		selectOption: [],
		type: 'select',
		key: "serviceCurrency",
		selectKey: "currencyName",
		name: "服务费币别",
		prop: "serviceCurrency",
		disabled: true,
	},
	{
		type: 'string',
		key: "serviceFee",
		name: "服务费",
		prop: "serviceFee",
		disabled: true,
		rules: [{
			validator: validate.validateNum,
			trigger: ['blur', 'change']
		}]
	},
	{
		type: 'string',
		key: "buyerExchangeRate",
		name: "买方货款汇率",
		prop: "buyerExchangeRate",
		disabled: true,
		rules: [{
			validator: validate.validateNum,
			trigger: ['blur', 'change']
		}]
	},
	{
		selectOption: [],
		type: 'select',
		key: "buyerCurrency",
		selectKey: "currencyName",
		name: "买方币别",
		prop: "buyerCurrency",
		disabled: true,
	},
	{
		type: 'string',
		key: "buyerPrice",
		name: "买方单价",
		prop: "buyerPrice",
		rules: [{
			validator: validate.validateNum,
			trigger: ['blur', 'change']
		}]
	},
	{
		type: 'string',
		key: "buyerGoodsValue",
		name: "买方货值",
		prop: "buyerGoodsValue",
		disabled: true,
		rules: [{
			validator: validate.validateNum,
			trigger: ['blur', 'change']
		}]
	},
	// {
	// 	type: 'string',
	// 	key: "taxTypeCode",
	// 	name: "税种编码",
	// 	prop: "taxTypeCode"
	// },
	{
		btn: true, 
		type: 'string',
		key: "taxTypeName",
		name: "其他税种",
		prop: "taxTypeName"
	},
	{
		type: 'string',
		key: "otherTaxRate",
		name: "其他税率%",
		prop: "otherTaxRate",
		rules: [{
			validator: validate.validateNum,
			trigger: ['blur', 'change']
		}]
	},
	{
		type: 'string',
		key: "otherTaxAmount",
		name: "其他税金",
		prop: "otherTaxAmount",
		disabled: true,
		rules: [{
			validator: validate.validateNum,
			trigger: ['blur', 'change']
		}]
	},
	{
		type: 'string',
		key: "priceTax",
		name: "价税合计",
		prop: "priceTax",
		disabled: true,
		rules: [{
			validator: validate.validateNum,
			trigger: ['blur', 'change']
		}]
	},
	{
		type: 'string',
		key: "netWeight",
		name: "净重kg",
		prop: "netWeight",
		rules: [{
			validator: validate.validateNum,
			trigger: ['blur', 'change']
		}]
	},
	{
		type: 'string',
		key: "netWeightCredit",
		name: "净重可信度",
		prop: "netWeightCredit",
		disabled: true,
	},
	{
		type: 'string',
		key: "grossWeight",
		name: "毛重kg",
		prop: "grossWeight",
		rules: [{
			validator: validate.validateNum,
			trigger: ['blur', 'change']
		}]
	},
	{
		type: 'string',
		key: "volume",
		name: "体积(立方)",
		prop: "volume",
		rules: [{
			validator: validate.validateNum,
			trigger: ['blur', 'change']
		}]
	},
	// {
	// 	btn: true, 
	// 	type: 'string',
	// 	key: "brand",
	// 	name: "品牌编码",
	// 	prop: "brand"
	// },
	{
		btn: true, 
		type: 'string',
		key: "brandName",
		name: "品牌",
		prop: "brand"
	},
	{
		type: 'string',
		key: "brandCredit",
		name: "品牌可信度",
		prop: "brandCredit",
		disabled: true,
	},
	// {
	// 	btn: true, 
	// 	type: 'string',
	// 	key: "sourceArea",
	// 	name: "原产地编码",
	// 	prop: "sourceArea"
	// },
	{
		btn: true, 
		type: 'string',
		key: "sourceAreaName",
		name: "原产地",
		prop: "sourceArea"
	},
	{
		type: 'string',
		key: "sourceAreaCredit",
		name: "原产地可信度",
		prop: "sourceAreaCredit",
		disabled: true,
	},
	{
		type: 'string',
		key: "materialCode",
		name: "委托方物料编码",
		prop: "materialCode"
	},
	{
		type: 'string',
		key: "materialName",
		name: "委托方物料名称",
		prop: "materialName"
	},
	{
		type: 'string',
		key: "poNo",
		name: "PO号",
		prop: "poNo"
	},
	{
		type: 'string',
		key: "supplierInvoiceNo",
		name: "供应商发票号",
		prop: "supplierInvoiceNo"
	},
	{
		type: 'string',
		key: "batchNo",
		name: "批号",
		prop: "batchNo"
	},
	{
		type: 'string',
		key: "threecItem",
		name: "3C项目",
		prop: "threecItem"
	},
	{
		type: 'string',
		key: "increaseItem",
		name: "加征税目",
		prop: "increaseItem"
	}
]