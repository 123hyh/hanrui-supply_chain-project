import _ from 'lodash';

export default function () {
    // 实体：调汇申请单
    let defaults = {
		"id": "",
		"tenantId": "hfy",
		"billNo": "",
		"remittanceNo": "",
		"remittanceType": "",
		"interestPayer": "",
		"status": "",
		"bizDate": "",
		"reason": "",
		"year": "",
		"receiptNo": "",
		"actualAmount": "",
		"resourceAmount": "",
		"resourceCurrency": "",
		"szRemark": ""

      };

    _.assign(this, defaults);
}
