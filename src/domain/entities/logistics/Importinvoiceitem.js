import _ from 'lodash';

export default function () {
    // 实体：进口发货单子表
    let defaults = {
		"id": "",
		"tenantId": "hfy",
		"billNo": "",
		"itemCode": "",
		"serialNo": "",
		"materialCode": "",
		"materialName": "",
		"specificationType": "",
		"reportGoodsName": "",
		"batchNo": "",
		"moneyType": "",
		"unit": "",
		"planQuantity": "",
		"availableQuantity": "",
		"quantity": "",
		"price": "",
		"amount": "",
		"originalCoinPrice": "",
		"amountContainTax": "",
		"signedCountAll": "",
		"sendedCountAll": "",
		"mileage": "",
		"weight": "",
		"grossWeight": "",
		"lossCountAll": "",
		"unshippedCount": "",
		"sourceBillId": "",
		"sourceBillItem": "",
		"remark": "",
		"deliveryCustomer": "",
		"deliveryCustomerName": "",
		"receiveCustomer": "",
		"receiveCustomerName": "",
		"shippingMarks": "",
		"boxNoStart": "",
		"boxNoEnd": "",
		"incomeInvoiceNo": "",
		"pieces": ""

      };

    _.assign(this, defaults);
}
