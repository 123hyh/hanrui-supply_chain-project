import _ from 'lodash';

export default function () {
    // 实体：应付计费信息表
    let defaults = {
		"id": "",
		"tenantId": "hfy",
		"billNo": "",
		"receiverPayment": "",
		"delegateBillNo": "",
		"orderNo": "",
		"bizType": "",
		"reportGateType": "",
		"chargeDate": "",
		"chargeItem": "",
		"amount": "",
		"chargeMoneyType": "",
		"settlementMoney": "",
		"settlementExchangeRate": "",
		"settlementMoneyAmount": "",
		"shouldChargeAmount": "",
		"applyAmountAll": "",
		"unApplyAmount": "",
		"paidAmount": "",
		"writeOffAmountAll": "",
		"remark": "",
		"sourceBillType": "",
		"sourceBillNo": "",
		"warehousingRate": "",
		"refundType": ""

      };

    _.assign(this, defaults);
}
