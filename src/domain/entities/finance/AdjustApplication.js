import _ from 'lodash';

export default function () {
    // 实体：账务调整申请单
    let defaults = {
		"id": "",
		"tenantId": "hfy",
		"billNo": "",
		"billStatus": "",
		"applicantDate": "",
		"applicantType": "",
		"adjustmentSources": "",
		"adjustmentAmount": "",
		"applicanter": "",
		"applicantDept": "",
		"receiptTax": false,
		"remark": "",
		"company": "",
		"settlementUnitType": "",
		"settlementUnit": "",
		"client": "",
		"currency": ""

      };

    _.assign(this, defaults);
}
