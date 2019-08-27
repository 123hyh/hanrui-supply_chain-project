import _ from 'lodash';

export default function () {
    // 实体：委托方评估
    let defaults = {
		"id": "",
		"tenantId": "hfy",
		"itemCode": "",
		"clientEvaluationNo": "",
		"clientNo": "",
		"clientName": "",
		"clientEnName": "",
		"registerMoney": "",
		"companyAddress": "",
		"establishedTime": "",
		"actualReceiveAmount": "",
		"visitorId": "",
		"visitorName": "",
		"operateTerm": "",
		"customerDemand": "",
		"businessType": "",
		"accountPeriod": "",
		"customerLimit": "",
		"limitUse": "",
		"applyDayRate": "",
		"applyCount": "",
		"prePaymentScale": "",
		"receiveMethod": "",
		"ensureMeasure": "",
		"receivableDate": ""

      };

    _.assign(this, defaults);
}
