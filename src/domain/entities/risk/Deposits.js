import _ from 'lodash';

export default function () {
    // 实体：保证金管理
    let defaults = {
		"id": "",
		"tenantId": "hfy",
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
		"repealPersonName": "",
		"repealTime": "",
		"repealReason": "",
		"remark": "",
		"auditor": "",
		"auditTime": ""

      };

    _.assign(this, defaults);
}
