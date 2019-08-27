import _ from 'lodash';

export default function () {
    // 实体：凭证管理子表
    let defaults = {
		"id": "",
		"tenantId": "hfy",
		"itemCode": "",
		"voucherManageCode": "",
		"summary": "",
		"subject": "",
		"debtor": "",
		"lender": ""

      };

    _.assign(this, defaults);
}
