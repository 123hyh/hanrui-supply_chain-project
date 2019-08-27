export default [
	{

		prop: 'salesOrderCode',
		label: '销售订单编号',//单据编号
		width: '150',
	},
	{

		prop: 'stockCode',//来货编码
		label: '存货编码',
		width: '150',
	},
	{

		prop: 'materialName',
		label: '物料名称',//物料名称
		width: '150',
	},
	{

		prop: 'specificationType',//来货规格型号
		label: '规格型号',
		width: '150',
	},
	{

		prop: 'sourceArea',
		label: '产地',
		width: '150',//原产地
	},
	{

		prop: 'brand',
		label: '品牌',//品牌
		width: '150',
	},
	{
		type: "number",
		prop: 'boxOrder',//Lu
		label: '箱序',
		width: '150',
	},
	{
		type: "number",
		prop: 'boxNo',//lu
		label: '箱号',
		width: '150',
	},
	{
		type: "number",
		prop: 'deliveryBillNo',
		label: '送货单箱号',//lu
		width: '150',
	},
	{
		type: "number",
		prop: 'storehouse',
		label: '库位',//lu
		width: '150',
	},
	{
		type: "number",
		prop: 'grossWeight',
		label: '毛重',//毛重
		width: '150',
	},
	{
		type: "number",
		prop: 'netWeight',
		label: '净重',//净重
		width: '150',
	},
	{
		type: "number",
		prop: 'size',//lu
		label: '尺寸',
		width: '150',
	},
	{
		type: "number",
		prop: 'box',
		label: '箱数',//lu
		width: '150',
	},
	{
		type: "number",
		prop: 'quantity',//lu
		label: '数量',
		width: '150',
	},
	{

		prop: 'cusSpecificationType',
		label: '客户规格型号',//来货规格型号
		width: '150',
	},
	{

		prop: 'customerMaterialNo',
		label: '客户物料号',//lu
		width: '150',
	},
	{

		prop: 'po',
		label: 'PO号',//PO号
		width: '150',
	},
	{

		prop: 'supplierInvoiceNo',
		label: '供应商发票号',//供应商发票号
		width: '150',
	},
	{
		type: "number",
		prop: 'cardNo',
		label: '卡板号',//lu
		width: '150',
	},
	{
		type: "text",
		prop: 'cardTyoe',
		label: '板型',//lu
		width: '150',
	},
	{
		type: "text",
		prop: 'controlledGoods',
		label: '管制物品',//管制物品
		width: '150',
	},
	{
		type: "select",
		prop: 'measurement',
		label: '计量单位',//下拉
		selectKey: "measurementUnitName",
		width: '150',
		selectOption: []
	},
	{

		prop: 'sellerPrice',//卖方单价
		label: '卖方销售单价',
		width: '150',
	},
	{
		type: "select",
		selectKey: "currencyName",
		prop: 'sellerCurrency',
		label: '卖方销售币种',//下拉：币别列表
		width: '150',
		selectOption: []
	},
	{
		type:"compute",
		prop: 'sellerAmount',
		label: '卖方销售金额',// = 数量*卖方单价
		width: '150',

	},
	{

		prop: 'buyerPurchasePrice',
		label: '买方采购单价',//买方单价
		width: '150',
	},
	{
		type: "select",
		selectKey: "currencyName",
		prop: 'buyerPurchaseCurrency',
		label: '买方采购币种',//下拉：币别
		width: '150',
		selectOption: []
	},
	{
		type:"compute",
		prop: 'buyerPurchaseAmount',
		label: '买方采购金额',// 数量*买方单价
		width: '150',
	},
	{

		prop: 'tax',
		label: '税率',//增值税税率
		width: '150',
	},
	{
		type:"compute",
		prop: 'buyerTaxPrice',//增值税税率*买方单价
		label: '买方含税单价',
		width: '150',
	},
	{
		type:"compute",
		prop: 'buyerTaxAmount',//买方含税单价'*数量
		label: '买方含税金额',
		width: '150',
	},
	{

		prop: 'customerType',
		label: '客户型号',//lu
		width: '150',
	},
	{
		type: "number",
		prop: 'bigCardNo',
		label: '大板数',//lu
		width: '150',
	},
	{
		type: "number",
		prop: 'customerPrice',
		label: '客户单价',//lu
		width: '150',
	},
	{
		type: "number",
		prop: 'batch',
		label: '批次',//lu
		width: '150',
	},

	// {
	// 	prop: 'dateCode',
	// 	label: 'DATECODE',
	// 	width: '150',
	// },
	// {
	// 	prop: 'cartonId',
	// 	label: 'CARTON',
	// 	width: '150',
	// },
	// {
	// 	prop: 'creator',
	// 	label: '数据创建者',
	// 	width: '150',
	// },
	// {
	// 	prop: 'createTime',
	// 	label: '数据创建时间',
	// 	width: '150',
	// },
	// {
	// 	prop: 'updater',
	// 	label: '数据修改者',
	// 	width: '150',
	// },
	// {
	// 	prop: 'updateTime',
	// 	label: '数据修改时间',
	// 	width: '150',
	// },
	// {
	// 	prop: 'deleted',
	// 	label: '逻辑删除标识',
	// 	width: '150',
	// }
]