import _ from 'lodash';

export default function () {
    // 实体：委托订单受托方收款
    let defaults = {
		"id": "",
		"tenantId": "hfy",
		"itemCode": "",
		"payBillNo": "",
		"payBussinesDate": "",
		"billStatus": "",
		"paymentTime": "",
		"paymentAmount": "",
		"paymentCurrency": "",
		"auditor": "",
		"auditTime": "",
		"entrustOrderNo": "",
		"amount": "",
		"actualAmount": "",
		"actualCurrency": "",
		"checkPerson": "",
		"receiptNo": "",
		"receiptPerson": "",
		"receiptTime": "",
		"arrivalDate": "",
		"receiptRemark": "",
		"affirmBillNo": "",
		"affirmNo": "",
		"affirmDate": "",
		"affirmAuditTime": "",
		"affirmAuditor": "",
		"settlementNo": "",
		"chargeItem": "",
		"affirmAmount": "",
		"affirmCurrency": "",
		"chargeTime": "",
		"affirmTime": "",
		"affirmRemark": ""

      };

    _.assign(this, defaults);
}
