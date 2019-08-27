import _ from 'lodash';

export default function () {
    // 实体：融资授信无授信担保
    let defaults = {
		"id": "",
		"tenantId": "hfy",
		"itemCode": "",
		"creditNo": "",
		"noCreditNo": "",
		"customerCode": "",
		"customerName": "",
		"creditCompanyCode": "",
		"creditCompanyName": "",
		"creditCurrency": "",
		"creditAmount": "",
		"creditRmbAmount": "",
		"exchangeRate": "",
		"startDate": "",
		"endDate": "",
		"creditLimit": "",
		"status": "",
		"repealPersonId": "",
		"repealTime": "",
		"repealReason": "",
		"creditType": "",
		"remark": "",
		"auditor": "",
		"auditTime": ""

      };

    _.assign(this, defaults);
}
