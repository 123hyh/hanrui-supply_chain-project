import _ from 'lodash';

export default function () {
    // 实体：发运单基础信息
    let defaults = {
		"id": "",
		"tenantId": "hfy",
		"shipmentBaseCode": "",
		"bizDate": "",
		"trainNo": "",
		"billStatus": "1",
		"delegete": "",
		"delegeteName": "",
		"boxCount": "",
		"weight": "",
		"thisBusiness": "",
		"thisBusinessName": "",
		"sendStatus": "",
		"originOrderType": "",
		"signTime": "",
		"actualShipmentTime": "",
		"shipmentGroup": "",
		"shipmentGroupName": "",
		"sender": "",
		"senderName": "",
		"mainCarrier": "",
		"mainCarrierName": "",
		"transportTiming": "",
		"transportTimingName": "",
		"sendUp": "",
		"client": "",
		"clientName": "",
		"receiveClient": "",
		"receiveClientName": "",
		"receiveContact": "",
		"telephone": "",
		"address": "",
		"carrierType": "",
		"route": "",
		"routeName": "",
		"deliveryArea": "",
		"deliveryAreaName": "",
		"driver": "",
		"driverName": "",
		"storekeeper": "",
		"storekeeperName": "",
		"plateNo": "",
		"plateNoName": "",
		"carrierCode": "",
		"transportType": "",
		"deliveryWay": "",
		"arrivePay": "",
		"startPlace": "",
		"endPlace": "",
		"planTime": "",
		"nightOperate": false,
		"needCash": false,
		"shelf": false,
		"bearType": "1",
		"feeBear": "",
		"feeBearName": "",
		"paymentType": "",
		"hasSend": false,
		"backBroker": "",
		"backBrokerName": "",
		"feeTarget": "",
		"border": "",
		"hasVerifi": false,
		"shippingModel": "",
		"shipmentStatus": "",
		"createOutOrder": false,
		"otherFee": false,
		"otherFeeType": "",
		"cash": "",
		"checkAmount": "",
		"otherCurrency": "",
		"invoiceNo": "",
		"shipmentArea": "",
		"expressDes": "",
		"expressDesName": "",
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
		"recomCarrierName": "",
		"recomFee": "",
		"groupInvoiceNo": "",
		"materialNo": "",
		"shipper": "",
		"shipperName": "",
      };

    _.assign(this, defaults);
}
