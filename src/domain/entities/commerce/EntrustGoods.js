import _ from 'lodash';

export default function () {
    // 实体：委托订单--商品信息
    let defaults = {
		"id": "",
		"tenantId": "hfy",
		"itemCode": "",
		"entrustOrderNo": "",
		"orderModel": "",
		"arrivalGoodsModel": "",
		"arrivalGoodsCode": "",
		"arrivalGoodsName": "",
		"goodsCode": "",
		"goodsName": "",
		"taxNo": "",
		"attachNo": "",
		"sellerQuantity": "",
		"sellerUnit": "",
		"sellerPrice": "",
		"sellerCurrency": "",
		"sellerGoodsValue": "",
		"controlledGoods": "",
		"superviseMode": "",
		"customsExchangeRate": "",
		"customTaxRate": "",
		"increaseTaxRate": "",
		"customTaxAmount": "",
		"vatTaxRate": "",
		"vatTaxAmount": "",
		"freightRate": "",
		"premiumRate": "",
		"extrasRate": "",
		"costAmount": "",
		"serviceExchangeRate": "",
		"serviceCurrency": "",
		"serviceFee": "",
		"buyerExchangeRate": "",
		"buyerCurrency": "",
		"buyerPrice": "",
		"buyerGoodsValue": "",
		"taxTypeCode": "",
		"taxTypeName": "",
		"otherTaxRate": "",
		"otherTaxAmount": "",
		"priceTax": "",
		"netWeight": "",
		"netWeightCredit": "",
		"grossWeight": "",
		"volume": "",
		"brand": "",
		"brandCredit": "",
		"sourceArea": "",
		"sourceAreaCredit": "",
		"materialCode": "",
		"materialName": "",
		"poNo": "",
		"supplierInvoiceNo": "",
		"batchNo": "",
		"threecItem": "",
		"increaseItem": ""

      };

    _.assign(this, defaults);
}
