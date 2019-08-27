import _ from 'lodash';

export default function () {
    // 实体：出口预收汇款单子表
    let defaults = {
		"id": "",
		"tenantId": "hfy",
		"itemCode": "",
		"billNo": "",
		"intoEntrustOrderNo": "",
		"clientNo": "",
		"intoAmount": "",
		"intoCurrency": "",
		"exportSettlementAmount": ""

      };

    _.assign(this, defaults);
}
