import _ from 'lodash';

export default function () {
    // 实体：协议管理供应商费用
    let defaults = {
		"id": "",
		"tenantId": "hfy",
		"itemCode": "",
		"solutionNo": "",
		"supplierCode": "",
		"supplierName": "",
		"supplierNameEn": "",
		"chargeItemCode": "",
		"chargeItemName": "",
		"receivableMethod": "",
		"accountPeriod": "",
		"insideDayRate": "",
		"outsideDayRate": "",
		"dayRate": "",
		"breachDayRate": "",
		"noInterestDays": false,
		"chargeInterest": false,
		"chargeMode": "",
		"dcount": false,
		"discountType": "",
		"discountLimit": "",
		"currency": "",
		"discountRatio": ""

      };

    _.assign(this, defaults);
}
