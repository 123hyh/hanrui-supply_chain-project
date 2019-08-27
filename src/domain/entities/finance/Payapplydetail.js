import _ from 'lodash';

export default function () {
    // 实体：付款申请明细表
    let defaults = {
		"id": "",
		"tenantId": "hfy",
		"billNo": "",
		"delegateBillNo": "",
		"chargeItem": "",
		"otherSubject": "",
		"exchangeRate": "",
		"recordedAmount": "",
		"applyPayAmount": "",
		"actualPayAmount": "",
		"innerDeductedCommission": "",
		"advancePayTax": false,
		"temporaryAdvancePayTax": false,
		"remark": "",
		"sourceBillType": "",
		"sourceBillNo": "",
		"initSourceBillType": "",
		"initSourceBillNo": "",
		"delegateBillCreateTime": "",
		"refundType": "",
		"delegateBillType": "",
		"difference": "",
		"warehousingRate": ""

      };

    _.assign(this, defaults);
}
