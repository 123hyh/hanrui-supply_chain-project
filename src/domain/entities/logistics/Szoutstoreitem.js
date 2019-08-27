import _ from 'lodash';

export default function () {
    // 实体：出库单子表
    let defaults = {
		"id": "",
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
		"warehouseName": "",
		"storehouse": "",
		"storekeeper": "",
		"attachedAttribute": "",
		"supplier": "",
		"unitStandardCost": "",
		"standardCost": "",
		"discountType": "",
		"discountAmount": "",
		"unitDiscount": "",
		"ActualTaxPrice": "",
		"completeCancellation": false,
		"cancelledAmount": "",
		"writeOffQuantity": ""

      };

    _.assign(this, defaults);
}
