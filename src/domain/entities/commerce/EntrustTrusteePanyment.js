import _ from 'lodash';

export default function () {
    // 实体：委托订单受托方付款
    let defaults = {
		"id": "",
		"tenantId": "hfy",
		"itemCode": "",
		"entrustOrderNo": "",
		"settlementUnit": "",
		"inOutType": "",
		"unitType": "",
		"unitCode": "",
		"unitName": "",
		"unitEnName": "",
		"invoiceType": "",
		"paymentNature": "",
		"paymentType": "",
		"settlementDate": "",
		"settlementCurrentcy": "",
		"paymentAmount": "",
		"otherAmount": "",
		"otherCurrency": "",
		"paidOtherFee": false,
		"consignmentPayment": false

      };

    _.assign(this, defaults);
}
