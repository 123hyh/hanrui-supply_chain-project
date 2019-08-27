import _ from 'lodash';

export default function () {
    // 实体：销售订单商品信息
    let defaults = {
		"id": "",
		"tenantId": "hfy",
		"salesOrderCode": "",
		"stockCode": "",
		"materialName": "",
		"specificationType": "",
		"sourceArea": "",
		"brand": "",
		"warehouseTime": "",
		"warehouse": "",
		"storehouse": "",
		"actualStorehouse": "",
		"controlledGoods": "",
		"quantity": "",
		"measurement": "",
		"boxNo": "",
		"cardNo": "",
		"sellerPrice": "",
		"sellerCurrency": "",
		"sellerAmount": "",
		"buyerPurchasePrice": "",
		"buyerPurchaseCurrency": "",
		"buyerPurchaseAmount": "",
		"tax": "",
		"buyerTaxPrice": "",
		"buyerTaxAmount": "",
		"remark": "",
		"unshippedQuantity": "",
		"uncorrelatedQuantity": "",
		"cuShipmentQuantity": "",
		"cuOutputQuantity": "",
		"cuStockOutputQuantity": "",
		"customerMaterialNo": "",
		"po": "",
		"supplierInvoiceNo": "",
		"mark": "",
		"box": "",
		"batch": "",
		"dateCode": "",
		"cartonId": "",
		"wmsCode": ""

      };

    _.assign(this, defaults);
}
