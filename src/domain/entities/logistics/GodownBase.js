import _ from 'lodash';

export default function () {
    // 实体：香港入库单子表-基本信息
    let defaults = {
		"id": "",
		"tenantId": "hfy",
		"itemCode": "",
		"godownEntryCode": "",
		"delegeteBillNo": "",
		"inventoryCode": "",
		"inventoryName": "",
		"specificationType": "",
		"tradeName": "",
		"taxNo": "",
		"attachNo": "",
		"parameter": "",
		"planTurn": "",
		"batchNo": "",
		"supplierBatchNo": "",
		"brand": "",
		"originPlace": "",
		"unit": "",
		"quantity": "",
		"assistUnit": "",
		"shippingMarks": "",
		"boxNoStart": "",
		"boxNoEnd": "",
		"boxPlusNo": "",
		"boxCount": "",
		"netWeight": "",
		"grossWeight": "",
		"volume": "",
		"assictCount": "",
		"warehouse": "",
		"storekeeper": "",
		"storehouse": "",
		"customer": "",
		"unitStandardCost": "",
		"standardCost": "",
		"unitPurchaseCost": "",
		"purchaseCost": "",
		"unitActualCost": "",
		"actualCost": "",
		"shareCost": "",
		"price": "",
		"taxRate": "",
		"priceContainTax": "",
		"priceNet": "",
		"actualTaxPrice": "",
		"amount": "",
		"tax": "",
		"taxCurrency": "",
		"priceTax": "",
		"priceTaxCurrency": "",
		"completeCancellation": false,
		"cancelledQuantity": "",
		"cancelledAmount": "",
		"writeOffQuantity": "",
		"returnedQuantity": "",
		"keyBillType": "",
		"keyAmount": "",
		"keyQuantity": "",
		"purchaseOrg": "",
		"settlementSupplier": "",
		"remark": "",
		"customsValue": "",
		"customsValueCurrency": "",
		"incomeInvoiceNo": "",
		"commissionPriceOne": "",
		"commissionPriceTwo": "",
		"commissionOne": "",
		"commissionTwo": "",
		"exchangeRate": "",
		"commissionUserOne": "",
		"commissionUserTwo": "",
		"billType": "",
		"supplier": ""

      };

    _.assign(this, defaults);
}
