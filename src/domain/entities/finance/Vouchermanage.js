import _ from 'lodash';

export default function () {
    // 实体：凭证管理
    let defaults = {
		"id": "",
		"tenantId": "hfy",
		"voucherManageCode": "",
		"accountingDate": "",
		"bizDate": "",
		"voucherType": "",
		"voucherNo": "",
		"accountingPeriod": "",
		"referenceInfo": "",
		"attachments": "",
		"uploadOrder": "",
		"createUser": "",
		"verifyUser": "",
		"cashier": "",
		"postUser": "",
		"invalid": ""

      };

    _.assign(this, defaults);
}
