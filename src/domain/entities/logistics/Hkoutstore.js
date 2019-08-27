import _ from 'lodash';

export default function () {
    // 实体：香港出库主表
    let defaults = {
		"id": "",
		"tenantId": "hfy",
		"billNo": "",
		"bizType": "",
		"issueType": "",
		"issueTypeName": "",
		"bizDate": "",
		"deliveryCustomer": "",
		"deliveryCustomerName": "",
		"storeOrg": "",
		"storeOrgName": "",
		"department": "",
		"departmentName": "",
		"billStatus": "",
		"sourceBillType": "",
		"summary": "",
		"reportGateType": "",
		"delegete": "",
		"delegeteName": "",
		"inBillNo": "",
		"inBillNoDelegete": "",
		"inBillCustomer": "",
		"auditor": "",
		"auditTime": ""

      };

    _.assign(this, defaults);
}
