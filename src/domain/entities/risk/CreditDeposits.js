import _ from 'lodash';

export default function () {
    // 实体：融资授信保证金
    let defaults = {
		"id": "",
		"tenantId": "hfy",
		"itemCode": "",
		"creditNo": "",
		"depositsNo": "",
		"inInsureUnitCode": "",
		"inInsureUnitName": "",
		"outInsureUnitType": "",
		"outInsureUnitCode": "",
		"outInsureUnitName": "",
		"customerCode": "",
		"customerName": "",
		"currency": "",
		"exchangeRate": "",
		"depositsAmount": "",
		"depositsCurrency": "",
		"depositsInterestOnwer": "",
		"startDate": "",
		"endDate": "",
		"timeLimit": "",
		"type": "",
		"status": "",
		"repealPersonId": "",
		"repealTime": "",
		"repealReason": "",
		"remark": "",
		"auditor": "",
		"auditTime": ""

      };

    _.assign(this, defaults);
}
