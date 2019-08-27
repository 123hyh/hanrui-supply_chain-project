import _ from 'lodash';

export default function () {
    // 实体：融资授信
    let defaults = {
		"id": "",
		"tenantId": "hfy",
		"creditNo": "",
		"assignmentAgreement": "",
		"agreementName": "",
		"creditCompanyCode": "",
		"creditCompanyName": "",
		"customerCode": "",
		"customerName": "",
		"currency": "",
		"exchangeRate": 0,
		"usageMode": "",
		"creditLimitRate": 0,
		"creditLimitAmount": "",
		"totalAmount": "",
		"homeCurrencyAmount": "",
		"status": "",
		"exportMaxTaxLimit": "",
		"exportAmountLimit": "",
		"creditLimit": "",
		"remark": ""

      };

    _.assign(this, defaults);
}
