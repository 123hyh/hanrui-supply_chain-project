import _ from 'lodash';

export default function () {
    // 实体：香港出库子表
    let defaults = {
		"id": "",
		"volume": "",
		"tenantId": "hfy",
		"billNo": "",
		"itemCode": "",
		"specificationType": "",
		"deliveryAddress": "",
		"price": "",
		"priceTax": "",
		"amountCurrency": "",
		"inventoryCode": "",
		"inventoryName": "",
		"unit": "",
		"quantity": "",
		"taxRate": "",
		"priceContainTax": "",
		"priceNet": "",
		"amount": "",
		"taxCurrency": "",
		"priceTaxCurrency": "",
		"keyBillNo": "",
		"keyBillRowNo": "",
		"keyBillType": "",
		"contractNo": "",
		"batchNo": "",
		"baseUnit": "",
		"unitActualCost": "",
		"actualCost": "",
		"shippingMarks": "",
		"boxNoStart": "",
		"boxNoEnd": "",
		"boxCount": "",
		"warehouse": "",
		"storehouse": "",
		"storekeeper": "",
		"attachedAttribute": "",
		"supplier": "",
		"unitStandardCost": "",
		"standardCost": "",
		"discountType": "",
		"discountAmount": "",
		"unitDiscount": "",
		"actualTaxPrice": "",
		"completeCancellation": false,
		"cancelledAmount": "",
		"writeOffQuantity": ""

      };

    _.assign(this, defaults);
}
