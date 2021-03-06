import validate from "@/domain/common/validate"
const rules = [{required: true, message: "必填", trigger: 'change' }]
export default [
	{ title: "来货", showline:true, list: [
		{
			btn: true, 
			type: 'string',
			key: "orderModel",
			name: "来货编码",
			prop: "orderModel",
			readonly: true,
			// rules,
		},
		{
			btn: true, 
			type: 'string',
			key: "arrivalGoodsModel",
			name: "来货规格型号",
			prop: "arrivalGoodsModel",
			rules,
		},
		{
			btn: true, 
			type: 'string',
			key: "brandName",
			name: "品牌",
			prop: "brandName",
			readonly: true,
			rules,
		},
		{
			type: 'button',
			key: "brandNameorder",
			name: "",
			lable: "品牌记录",
			prop: "brandNameorder",
		},
		{
			btn: true, 
			type: 'string',
			key: "sourceAreaName",
			name: "原产地",
			prop: "sourceAreaName",
			rules,
		},
		{
			type: 'button',
			key: "sourceAreaNameorder",
			name: "",
			lable: "产地记录",
			prop: "sourceAreaNameorder",
		},
		{
			type: 'string',
			key: "arrivalGoodsName",
			name: "来货名称",
			prop: "arrivalGoodsName",
		},
	] },
	{ title: "海关商品归类", showline:true, list: [
		{
			type: 'string',
			key: "goodsName",
			name: "商品名称",
			prop: "goodsName",
			disabled: true,
		},
		{
			type: 'string',
			key: "taxNo",
			name: "税号",
			prop: "taxNo",
			disabled: true,
		},
		{
			type: 'string',
			key: "attachNo",
			name: "附号",
			prop: "attachNo",
			disabled: true,
		},
	] },
	{ title: "卖方销售", showline:true, list: [
		{
			type: 'integer',
			key: "sellerQuantity",
			name: "成交数量",
			prop: "sellerQuantity",
			rules,
		},
		{
			type: 'string',
			key: "sellerUnitName",
			name: "成交单位",
			prop: "sellerUnitName",
			btn: true,
			rules,
		},
		{
		  type: "money",
		  key: "sellerPrice",
		  name: "单价",
		  prop: "sellerPrice",
		  rules,
		},
		{
			selectOption: [],
			type: 'select',
			key: "sellerCurrency",
			selectKey: "currencyName",
			name: "币别",
			prop: "sellerCurrency",
			disabled: true,
		},
		{
			type: 'calc',
			solutionFormula:"sellerQuantity*sellerPrice",
			key: "sellerGoodsValue",
			name: "货价（货值）",
			prop: "sellerGoodsValue",
			disabled: true,
		},
		{
			type: 'integer',
			key: "pieceMum",
			name: "件数",
			prop: "pieceMum",
		},
		{
			type: 'integer',
			key: "netWeight",
			name: "净重(KG)",
			prop: "netWeight",
		},
		{
			type: 'integer',
			key: "grossWeight",
			name: "毛重(KG)",
			prop: "grossWeight",
		},
		{
		  type: "string",
		  key: "packingType",
		  name: "货物包装种类",
		  prop: "packingType",
		},
	] },
	{ title: "预估运保杂费", showline:true, list: [
		{
			type: 'integer',
			ratio:true,
			key: "freightRate",
			name: "运费费率(%)",
			prop: "freightRate",
		},
		{
			type: 'string',
			disabled: true,
			key: "freight",
			name: "运费",
			prop: "freight"
		},
		{
			type: 'integer',
			ratio:true,
			key: "premiumRate",
			name: "保费费率(%)",
			prop: "premiumRate",
		},
		{
			type: 'string',
			disabled: true,
			key: "premium",
			name: "保费",
			prop: "premium"
		},
		{
			type: 'integer',
			ratio:true,
			key: "extrasRate",
			name: "杂费费率(%)",
			prop: "extrasRate",
		},
		{
			type: 'string',
			disabled: true,
			key: "extras",
			name: "杂费",
			prop: "extras"
		},
		{
			type: 'money',
			key: "costAmount",
			name: "运保杂费额",
			prop: "costAmount",
			disabled: true,
		},
		{
			type: 'string',
			isShow:true,
			key: "dutiablePrice",
			name: "完税价格",
			prop: "dutiablePrice",
		},
	] },
	{ title: "报关（人民币）", showline:true, list: [
		{
			type: 'string',
			key: "controlledGoods",
			name: "管制物品",
			prop: "controlledGoods",
		},
		{
			btn: true, 
			type: 'string',
			key: "superviseModeName",
			name: "监管条件",
			prop: "superviseModeName",
			readonly:true
		},
	] },
	{ title: "服务费", showline:true, list: [
		{
			type: 'integer',
			ratio:true,
			key: "serviceExchangeRate",
			name: "费率(%)",
			prop: "serviceExchangeRate",
			disabled: true,
		},
		{
			selectOption: [],
			type: 'select',
			key: "serviceCurrency",
			selectKey: "currencyName",
			name: "币别",
			prop: "serviceCurrency",
			disabled: true,
		},
		{
			type: 'money',
			key: "serviceFee",
			name: "服务费",
			prop: "serviceFee",
			decimal:2,
			symbol:'￥',
			disabled: true,
		},
	] },
	{ title: "买方采购", showline:true, list: [
		{
			type: 'integer',
			key: "buyerExchangeRate",
			name: "货款汇率",
			decimal:6,
			prop: "buyerExchangeRate",
			disabled: true,
		},
		{
			selectOption: [],
			type: 'select',
			key: "buyerCurrency",
			selectKey: "currencyName",
			name: "币别",
			prop: "buyerCurrency",
			disabled: true,
		},
		{
			type: 'integer',
			isShow:true,
			key: "buyerRate",
			name: "买方汇率",
			decimal:6,
			prop: "buyerRate",
		},
		{
			type: 'calc',
			solutionFormula:"buyerGoodsValue/sellerQuantity",
			divisor:'sellerQuantity',
			key: "buyerPrice",
			name: "单价",
			prop: "buyerPrice",
			disabled: true,
		},
		{
			type: 'calc',
			solutionFormula:"(priceTax+serviceFee)/buyerRate",
			divisor:'buyerRate',
			key: "buyerGoodsValue",
			name: "货值",
			prop: "buyerGoodsValue",
			disabled: true,
		},
	] },
	{ title: "出口退税", showline:true, list: [
		{
			type: 'integer',
			ratio:true,
			key: "drawbackRate",
			name: "退税率(%)",
			prop: "drawbackRate"
		},
		{
			type: 'money',
			key: "drawback",
			name: "退税金额",
			prop: "drawback",
			disabled: true,
		},
	] },
	{ title: "", showline:true, list: [
		{
			type: 'integer',
			key: "volume",
			name: "体积(CBM)",
			prop: "volume",
		},
		{
			type: 'string',
			key: "poNo",
			name: "客户采购订单号",
			prop: "poNo"
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
			key: "clientModel",
			name: "委托方规格型号",
			prop: "clientModel"
		},
		{
			type: 'string',
			key: "batchNo",
			name: "批号",
			prop: "batchNo"
		},
		{
			type: 'string',
			key: "transactionUnit",
			name: "成交单位",
			prop: "transactionUnit"
		},
		{
			type: 'string',
			key: "threeCproject",
			name: "3C项目",
			prop: "threeCproject"
		},
	] },
]