import _ from 'lodash';

export default function () {
    // 实体：费用报销单子表
    let defaults = {
		"id": "",
		"tenantId": "hfy",
		"itemCode": "",
		"billNo": "",
		"bizType": "",
		"feeType": "",
		"description": "",
		"referencePerson": "",
		"happenDate": "",
		"applicationAmount": "",
		"authorizedAmount": "",
		"paymentDept": "",
		"paymentCompany": "",
		"remark": ""

      };

    _.assign(this, defaults);
}
