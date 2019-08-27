import _ from 'lodash';

export default function () {
    // 实体：深圳出库主表
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
		"billStatus": "1",
		"sourceBillType": "",
		"summary": "",
		"reportGateType": "",
		"delegete": "",
		"delegeteName": "",
		"inBillNo": "",
		"inBillNoDelegete": "",
		"inBillNoDelegeteName": "",
		"inBillCustomer": "",
		"inBillCustomerName": "",
		"auditor": "",
		"auditTime": ""

      };

    _.assign(this, defaults);
}
