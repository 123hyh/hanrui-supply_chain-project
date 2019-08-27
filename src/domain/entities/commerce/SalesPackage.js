import _ from 'lodash';

export default function () {
    // 实体：销售订单装箱单
    let defaults = {
		"id": "",
		"tenantId": "hfy",
		"salesOrderCode": "",
		"stockCode": "",
		"materialName": "",
		"specificationType": "",
		"sourceArea": "",
		"brand": "",
		"boxOrder": "",
		"boxNo": "",
		"deliveryBillNo": "",
		"storehouse": "",
		"grossWeight": "",
		"netWeight": "",
		"size": "",
		"box": "",
		"quantity": "",
		"cusSpecificationType": "",
		"customerMaterialNo": "",
		"po": "",
		"supplierInvoiceNo": "",
		"cardNo": "",
		"cardTyoe": "",
		"controlledGoods": "",
		"measurement": "",
		"sellerPrice": "",
		"sellerCurrency": "",
		"sellerAmount": "",
		"buyerPurchasePrice": "",
		"buyerPurchaseCurrency": "",
		"buyerPurchaseAmount": "",
		"tax": "",
		"buyerTaxPrice": "",
		"buyerTaxAmount": "",
		"customerType": "",
		"bigCardNo": "",
		"customerPrice": "",
		"batch": "",
		"dateCode": "",
		"cartonId": ""

      };

    _.assign(this, defaults);
}
