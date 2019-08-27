import _ from 'lodash';

export default function () {
    // 实体：发运单-运费承担方信息
    let defaults = {
		"id": "",
		"tenantId": "hfy",
		"shipmentFeeCode": "",
		"shipmentBaseCode": "",
		"bearType": "",
		"feeBear": "",
		"paymentType": "",
		"hasSend": false,
		"backBroker": "",
		"feeTarget": "",
		"border": false,
		"hasVerifi": false,
		"shippingModel": "",
		"shipmentStatus": "",
		"createOutOrder": false,
		"otherFee": false,
		"otherFeeType": "",
		"cash": "",
		"check": "",
		"otherCurrency": "",
		"invoiceNo": "",
		"shipmentArea": "",
		"expressDes": "",
		"shipCurrency": "",
		"receiveFee": "",
		"payFee": "",
		"payPremium": "",
		"selfAddress": "",
		"sendCity": "",
		"receiveCity": "",
		"withGoods": "",
		"firstSend": "",
		"appointCarrier": "",
		"infactFee": "",
		"sfReceiptNo": "",
		"grossWeight": "",
		"pieces": "",
		"summary": "",
		"recomCarrier": "",
		"recomFee": "",
		"groupInvoiceNo": "",
		"materialNo": "",
		"shipper": ""

      };

    _.assign(this, defaults);
}
