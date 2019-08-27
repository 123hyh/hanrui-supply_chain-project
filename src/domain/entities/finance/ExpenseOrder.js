import _ from 'lodash';

export default function () {
    // 实体：费用报销单
    let defaults = {
		"id": "",
		"tenantId": "hfy",
		"billNo": "",
		"expenseName": "",
		"expensePerson": "",
		"applicationDate": "",
		"applicationDept": "",
		"emergencyLevel": "",
		"paymentDept": "",
		"applicationCompany": "",
		"position": "",
		"paymentCompany": "",
		"paymentBear": "",
		"phoneNo": "",
		"paymentType": "",
		"attachmentNumbers": "",
		"currrency": "",
		"totalAmount": "",
		"reason": "",
		"remark": "",
		"expenseAmount": "",
		"advanceAmount": "",
		"cash": "",
		"reviewer": ""

      };

    _.assign(this, defaults);
}
