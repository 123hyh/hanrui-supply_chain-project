import _ from 'lodash';

export default function () {
    // 实体：协议管理
    let defaults = {
		"id": "",
		"tenantId": "hfy",
		"agreementNo": "",
		"agreementName": "",
		"agreementCode": "",
		"contractType": "",
		"versionNo": "",
		"passCount": "",
		"customerName": "",
		"customerCode": "",
		"legalPersonA": "",
		"legalPersonAAddress": "",
		"trusteeName": "",
		"trusteeCode": "",
		"trusteeLegalPerson": "",
		"trusteeAddress": "",
		"legalPersonC": "",
		"legalPersonCAddress": "",
		"legalPersonD": "",
		"legalPersonDAddress": "",
		"remark": "",
		"riskManagementInfo": "",
		"effectiveDate": "",
		"failureDate": "",
		"expireRemind": '',
		"contractDate": "",
		"insideDayRate": "",
		"outsideDayRate": "",
		"dayRate": "",
		"breachDayRate": "",
		"minCharge": "",
		"needAuditMinCharge": '',
		"needCheckAgreeMent": '',
		"customerAccountPeriod": "",
		"customerLimit": "",
		"customerComment": "",
		"authorizationEmail": "",
		"noServiceChargeAllowed": '',
		"auditor": "",
		"auditorTime": "",
		"reviewPeople": "",
		"reviewDate": "",
		"deliveryRequirements": "",
		"payMode": "",
		"payCycle": ""

      };

    _.assign(this, defaults);
}
