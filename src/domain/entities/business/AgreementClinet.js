import _ from 'lodash';

export default function () {
    // 实体：协议管理委托方收款
    let defaults = {
		"id": "",
		"tenantId": "hfy",
		"itemCode": "",
		"solutionNo": "",
		"chargeItemCode": "",
		"chargeItemName": "",
		"receivableMethod": "",
		"advanceRatio": "",
		"settlementPeriod": "",
		"elasticRange": "",
		"receivableDate": "",
		"days": "",
		"months": "",
		"accountPeriod": "",
		"accountCheckDate": "",
		"settlementNum": "",
		"intervalDays": "",
		"paymentDate": "",
		"noInterestDays": '',
		"chargeInterest": '',
		"remark": ""

      };

    _.assign(this, defaults);
}
