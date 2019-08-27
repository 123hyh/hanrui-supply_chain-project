import _ from 'lodash';

export default function () {
    // 实体：担保管理
    let defaults = {
		"id": "",
		"tenantId": "hfy",
		"ensureNo": "",
		"securedUnitCode": "",
		"securedUnitName": "",
		"ensureUnitCode": "",
		"ensureUnitName": "",
		"companyCode": "",
		"companyName": "",
		"currency": "",
		"exchangeRate": "",
		"ensureAmount": "",
		"ensureCurrency": "",
		"ensureDeposits": "",
		"startDate": "",
		"endDate": "",
		"ensureTimeLimit": "",
		"status": "",
		"repealPersonId": "",
		"repealPersonName": "",
		"repealTime": "",
		"repealReason": "",
		"remark": "",
		"ensureUnitType": "",
		"auditor": "",
		"auditTime": ""

      };

    _.assign(this, defaults);
}
