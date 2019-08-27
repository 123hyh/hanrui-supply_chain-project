import _ from 'lodash';

export default function () {
    // 实体：融资授信担保单
    let defaults = {
		"id": "",
		"tenantId": "hfy",
		"itemCode": "",
		"creditNo": "",
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
		"repealTime": "",
		"repealReason": "",
		"remark": "",
		"type_Ensure": "",
		"auditor": "",
		"auditTime": ""

      };

    _.assign(this, defaults);
}
