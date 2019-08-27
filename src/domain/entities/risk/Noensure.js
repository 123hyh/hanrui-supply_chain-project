import _ from 'lodash';

export default function () {
    // 实体：无授信担保
    let defaults = {
		"id": "",
		"tenantId": "hfy",
		"creditNo": "",
		"customerCode": "",
		"customerName": "",
		"creditCompanyCode": "",
		"creditCompanyName": "",
		"creditCurrency": "",
		"creditAmount": "",
		"creditRmbAmount": "",
		"creditEnsureAmount": "",
		"exchangeRate": "",
		"startDate": "",
		"endDate": "",
		"creditLimit": "",
		"status": "",
		"repealPersonId": "",
		"repealPersonName": "",
		"repealTime": "",
		"repealReason": "",
		"creditType": "",
		"remark": "",
		"auditor": "",
		"auditTime": ""

      };

    _.assign(this, defaults);
}
