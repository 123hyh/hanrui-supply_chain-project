import _ from 'lodash';

export default function () {
    // 实体：出口预收汇款单
    let defaults = {
		"id": "",
		"tenantId": "hfy",
		"billNo": "",
		"outEntrustOrderNo": "",
		"clientNo": "",
		"outCheckNo": "",
		"outReceiptNo": "",
		"canTransferAmount": "",
		"outAmount": "",
		"outCurrency": "",
		"arrivalDate": "",
		"status": ""

      };

    _.assign(this, defaults);
}
