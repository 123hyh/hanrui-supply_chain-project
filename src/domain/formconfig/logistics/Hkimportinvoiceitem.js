import validate from "@/domain/common/validate.js";
const rules = validate.setRequired();
export default [
	{
		type: "string",
		key: "billNo",
		name: "单据编号",
		prop: "billNo",
		type: "string",
	},
	{
		type: "string",
		key: "itemCode",
		name: "子表主键",
		prop: "itemCode",
		type: "string",
  },
	{
		key: "entrustOrderNos",
		name: "委托单号",
		prop: "entrustOrderNos",
		type: "string",
		btn: true,
		readonly: true,
		api: "queryentrustorderSearch",
		rules
  },
  {
    key: "brandName",
		name: "品牌",
		prop: "brandName",
		type: "string",
		btn: true,
		readonly: true,
		api: "getBrandList",
  },
  {
    key: "sourceAreaName",
		name: "产地",
		prop: "sourceAreaName",
		type: "string",
		btn: true,
		readonly: true,
		api: "getOriginList",
  },
	{
		type: "string",
		key: "materialCode",
		name: "物料编码",
		prop: "materialCode",
		type: "string",
		rules
	},
	{
		type: "string",
		key: "materialName",
		name: "物料名称",
		prop: "materialName",
		type: "string",
		btn:true,
		api:"getEntrustGoods",
		rules
	},
	{
		type: "string",
		key: "specificationType",
		name: "规格型号",
		prop: "specificationType",
		type: "string",
		rules
	},
	{
		type: "string",
		key: "reportGoodsName",
		name: "报关商品名称",
		prop: "reportGoodsName",
		type: "string",
		rules
	},
	{
		type: "string",
		key: "batchNo",
		name: "批次",
		prop: "batchNo",
		type: "string",
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
		type: "string",
		key: "planQuantity",
		name: "计划数量",
		prop: "planQuantity",
		type: "number",
		rules: [{validator: validate.validateNum,}],
	},
	{
		type: "string",
		key: "availableQuantity",
		name: "可排数量",
		prop: "availableQuantity",
		type: "number",
		rules: [{validator: validate.validateNum,}],
	},
	{
		type: "string",
		key: "quantity",
		name: "数量",
		prop: "quantity",
		type: "number",
		rules: [{required: true, message: '必填', trigger: 'blur',validator: validate.validateNum,}],
	},
	{
		type: "string",
		key: "signedCountAll",
		name: "累计签收数量",
		prop: "signedCountAll",
		type: "number",
		rules: [{required: true, message: '必填', trigger: 'blur',validator: validate.validateNum,}],
	},
	{
		type: "string",
		key: "sendedCountAll",
		name: "累计已发运数量",
		prop: "sendedCountAll",
		type: "number",
		rules: [{required: true, message: '必填', trigger: 'blur',validator: validate.validateNum,}],
	},
	{
		type: true,
		type: "string",
		key: "mileage",
		name: "里程",
		prop: "mileage",
		type: "string",
	},
	{
		type: true,
		type: "string",
		key: "weight",
		name: "重量(KG)",
		prop: "weight",
		type: "number",
		rules: [{required: true, message: '必填', trigger: 'blur',validator: validate.validateNum,}],
	},
	{
		type: true,
		type: "string",
		key: "grossWeight",
		name: "毛重(KG)",
		prop: "grossWeight",
		type: "number",
		rules: [{required: true, message: '必填', trigger: 'blur',validator: validate.validateNum,}],
	},
	{
		type: "string",
		key: "lossCountAll",
		name: "累计途损数量",
		prop: "lossCountAll",
		type: "number",
		rules: [{validator: validate.validateNum,}],
	},
	{
		type: "string",
		key: "unshippedCount",
		name: "未发运数量",
		prop: "unshippedCount",
		type: "number",
		rules: [{validator: validate.validateNum,}],
	},
	{
		type: "string",
		key: "sourceBillId",
		name: "来源单据号ID",
		prop: "sourceBillId",
		type: "string",
	},
	// {
	// 	type: "string",
	// 	key: "sourceBillItem",
	// 	name: "采源单据分录",
	// 	prop: "sourceBillItem",
	// 	type: "string",
	// },
	{
		type: "string",
		key: "remark",
		name: "备注",
		prop: "remark",
		type: "string",
	},
	{
		type: "string",
		key: "deliveryCustomerName",
		name: "供应商",
		prop: "deliveryCustomerName",
		type: "string",
		btn: true,
		api:"querysupplierbaseSearch",
	},
	{
		type: "string",
		key: "receiveCustomerName",
		name: "应收客户",
		prop: "receiveCustomerName",
		type: "string",
		btn: true,
		api:"getCustomerList",
	},
	{
		type: "string",
		key: "shippingMarks",
		name: "唛头",
		prop: "shippingMarks",
		type: "string",
		rules
	},
	{
		type: "string",
		key: "boxNoStart",
		name: "起始箱号",
		prop: "boxNoStart",
		type: "string",
		rules
	},
	{
		type: "string",
		key: "boxNoEnd",
		name: "结束箱号",
		prop: "boxNoEnd",
		type: "string",
		rules
	},
	{
		type: "string",
		key: "incomeInvoiceNo",
		name: "来货发票号",
		prop: "incomeInvoiceNo",
		type: "string",
		rules
	},
	{
		type: "string",
		key: "pieces",
		name: "件数",
		prop: "pieces",
		type: "number",
		rules: [{required: true, message: '必填', trigger: 'blur',validator: validate.validateNum,}],
	},
	{
		selectOption: [],
		select: true,
		key: "moneyType",
		name: "结算币别",
		prop: "moneyType",
		type: "select",
		selectKey: "currencyName",
	},
	{
		type: true,
		type: "string",
		key: "price",
		name: "单价",
		prop: "price",
		type: "number",
		rules: [{validator: validate.validateNum,}],
	},
	{
		type: true,
		type: "string",
		key: "amount",
		name: "金额",
		prop: "amount",
		type: "number",
		rules: [{validator: validate.validateNum,}],
	},
	{
		type: true,
		type: "string",
		key: "originalCoinPrice",
		name: "原币单价",
		prop: "originalCoinPrice",
		type: "number",
		rules: [{validator: validate.validateNum,}],
	},
	{
		type: true,
		type: "string",
		key: "amountContainTax",
		name: "含税总金额",
		prop: "amountContainTax",
		type: "number",
		rules: [{validator: validate.validateNum,}],
	},
]