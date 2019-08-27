import _ from 'lodash';

export default function () {
    // 实体：认款单
    let defaults = {
		"id": "",
		"tenantId": "hfy",
		"billNo": "",
		"receiptNo": "",
		"sourceCurrency": "",
		"receiptType": "",
		"receiptAccount": "",
		"receiptBank": "",
		"paymentBank": "",
		"paymentAccount": "",
		"communicateType": "",
		"communicateAccount": "",
		"unsubscribedAmount": "",
		"bizDate": "",
		"hasCredentials": false,
		"status": "",
		"currencyRate": "",
		"subscriptionAmount": "",
		"chargedBalance": "",
		"receivableAmount": "",
		"remark": ""

      };

    _.assign(this, defaults);
}
