import _ from 'lodash';

export default function () {
    // 实体：委托单转款信息
    let defaults = {
		"id": "",
		"tenantId": "hfy",
		"itemCode": "",
		"entrustOrderNo": "",
		"billNo": "",
		"bizDate": "",
		"refundAmount": "",
		"otherOrder": "",
		"transferOrderNo": "",
		"transferAmount": "",
		"transferCurrency": "",
		"intoOrderNo": "",
		"intoAmount": "",
		"intoCurrency": "",
		"transferReason": "",
		"auditTime": "",
		"auditor": ""

      };

    _.assign(this, defaults);
}
