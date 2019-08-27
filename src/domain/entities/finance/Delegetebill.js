import _ from 'lodash';

export default function () {
    // 实体：委托单表
    let defaults = {
		"id": "",
		"tenantId": "hfy",
		"entrustpayBillNo": "",
		"delegeteBillNo": "",
		"customer": "",
		"supplier": "",
		"delegete": "",
		"trustee": "",
		"dealingName": "",
		"dealingNameEn": "",
		"billState": "",
		"bizDate": "",
		"signDate": "",
		"purchaseOrg": "",
		"advancePayment": false,
		"reportGateType": "",
		"bizType": "",
		"paymentNature": "",
		"entrustPayAmount": "",
		"thisPaymentRate": "",
		"delegeteBillType": ""

      };

    _.assign(this, defaults);
}
