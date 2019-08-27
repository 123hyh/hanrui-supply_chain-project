export default [
	{
		title: '',
		list: [
			{
				type: 'label',
				key: "salesOrderCode",
				name: "销售订单编号",
				prop: "salesOrderCode"
			},
			{
				type: 'label',
				key: "stockCode",
				name: "存货编码",
				prop: "stockCode"
			},
			{
				type: 'label',
				key: "materialName",
				name: "物料名称",
				prop: "materialName"
			},
			{
				type: 'label',
				key: "specificationType",
				name: "规格型号",
				prop: "specificationType"
			},
			{
				type: 'label',
				key: "sourceArea",
				name: "产地",
				prop: "sourceArea"
			},
			{
				type: 'label',
				key: "brand",
				name: "品牌",
				prop: "brand"
			},
			{
				type: 'string',
				key: "boxOrder",
				name: "箱序",
				prop: "boxOrder"
			},
			{
				type: 'string',
				key: "boxNo",
				name: "箱号",
				prop: "boxNo"
			},
			{
				type: 'string',
				key: "deliveryBillNo",
				name: "送货单箱号",
				prop: "deliveryBillNo"
			},
			{
				type: 'string',
				key: "storehouse",
				name: "库位",
				prop: "storehouse"
			},
			{
				type: 'label',
				key: "grossWeight",
				name: "毛重",
				prop: "grossWeight"
			},
			{
				type: 'label',
				key: "netWeight",
				name: "净重",
				prop: "netWeight"
			},
			{
				type: 'string',
				key: "size",
				name: "尺寸",
				prop: "size"
			},
			{
				type: 'string',
				key: "box",
				name: "箱数",
				prop: "box"
			},
			{
				type: 'string',
				key: "quantity",
				name: "数量",
				prop: "quantity"
			},
			{
				type: 'label',
				key: "cusSpecificationType",
				name: "客户规格型号",
				prop: "cusSpecificationType"
			},
			{
				type: 'label',
				key: "customerMaterialNo",
				name: "客户物料号",
				prop: "customerMaterialNo"
			},
			{
				type: 'label',
				key: "po",
				name: "PO号",
				prop: "po"
			},
			{
				type: 'label',
				key: "supplierInvoiceNo",
				name: "供应商发票号",
				prop: "supplierInvoiceNo"
			},
			{
				type: 'string',
				key: "cardNo",
				name: "卡板号",
				prop: "cardNo"
			},
			{
				type: 'string',
				key: "cardTyoe",
				name: "板型",
				prop: "cardTyoe"
			},
			{
				type: 'label',
				key: "controlledGoods",
				name: "管制物品",
				prop: "controlledGoods"
			},
			{
				type: 'select',
				key: "measurement",
				name: "计量单位",
				selectKey: "measurementUnitName",
				prop: "measurement",
				selectOption: []
			},
			{
				type: 'label',
				key: "sellerPrice",
				name: "卖方销售单价",
				prop: "sellerPrice"
			},
			{
				type: 'select',
				key: "sellerCurrency",
				name: "卖方销售币种",
				prop: "sellerCurrency",
				selectKey: "currencyName",
				selectOption: []
			},
			{
				type: 'label',
				key: "sellerAmount",
				name: "卖方销售金额",
				prop: "sellerAmount",
				rely: ["quantity", "sellerPrice"]
			},
			{
				type: 'label',
				key: "buyerPurchasePrice",
				name: "买方采购单价",
				prop: "buyerPurchasePrice"
			},
			{
				type: 'select',
				key: "buyerPurchaseCurrency",
				name: "买方采购币种",
				prop: "buyerPurchaseCurrency",
				selectKey: "currencyName",
				selectOption: []
			},
			{
				type: 'label',
				key: "buyerPurchaseAmount",
				name: "买方采购金额",
				prop: "buyerPurchaseAmount",
				rely: ["quantity", "buyerPurchasePrice"]
			},
			{
				type: 'label',
				key: "tax",
				name: "税率",
				prop: "tax"
			},
			{
				type: 'label',
				key: "buyerTaxPrice",
				name: "买方含税单价",
				prop: "buyerTaxPrice",
				rely: ["tax", "buyerPurchasePrice"]
			},
			{
				type: 'label',
				key: "buyerTaxAmount",
				name: "买方含税金额",
				prop: "buyerTaxAmount",
				rely: ["quantity", "buyerTaxPrice"]
			},
			{
				type: 'label',
				key: "customerType",
				name: "客户型号",
				prop: "customerType"
			},
			{
				type: 'string',
				key: "bigCardNo",
				name: "大板数",
				prop: "bigCardNo"
			},
			{
				type: 'string',
				key: "customerPrice",
				name: "客户单价",
				prop: "customerPrice"
			},
			{
				type: 'string',
				key: "batch",
				name: "批次",
				prop: "batch"
			},
			// {
			// 	type:'label',
			// 	key: "dateCode",
			// 	name: "DATECODE",
			// 	prop: "dateCode"
			// },
			// {
			// 	type:'label',
			// 	key: "cartonId",
			// 	name: "CARTON",
			// 	prop: "cartonId"
			// }
		]
	}]