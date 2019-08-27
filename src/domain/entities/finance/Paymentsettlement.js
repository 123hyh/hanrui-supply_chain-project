import _ from 'lodash';

export default function () {
    // 实体：应付结算单
    let defaults = {
		"id": "",
		"tenantId": "hfy",
		"billNo": "",
		"settlementType": "",
		"plannedPayDate": "",
		"delegeteBillNo": "",
		"bizDate": "",
		"state": "",
		"delegate": "",
		"bizType": "",
		"reportGateType": "",
		"settlementMoney": "",
		"settlementMethod": "",
		"receiverAccount": "",
		"settlementUnitType": "",
		"settlementUnit": "",
		"receiverAccountName": "",
		"companyName": "",
		"auditAgain": false,
		"receiverBank": "",
		"Initialization": false,
		"delegeteBillNoFY": "",
		"amountAll": "",
		"receiverPhone": "",
		"remark": "",
		"locked": false,
		"lockRemark": "",
		"temporaryAdvancePayTax": false,
		"billCreator": "",
		"billCreateDate": "",
		"auditor": "",
		"auditTime": "",
		"advancePayTax": false

      };

    _.assign(this, defaults);
}
