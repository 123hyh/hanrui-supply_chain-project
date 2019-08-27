import _ from 'lodash';

export default function () {
    // 实体：委托方财务资料
    let defaults = {
		"id": "",
		"tenantId": "hfy",
		"itemCode": "",
		"clientNo": "",
		"organizationCode": "",
		"organizationName": "",
		"keepAccountsType": "",
		"settlementCurrentcy": "",
		"settlementMode": "",
		"payMode": "",
		"paymentTerms": "",
		"leader": "",
		"department": "",
		"contact": "",
		"contactDuty": "",
		"tel": "",
		"phone": "",
		"fax": "",
		"postcode": "",
		"email": "",
		"status": ""

      };

    _.assign(this, defaults);
}
