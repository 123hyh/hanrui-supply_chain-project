import _ from 'lodash';

export default function () {
    // 实体：凭证摘要
    let defaults = {
		"id": "",
		"tenantId": "",
		"voucherSummaryCode": "",
		"voucherSummaryName": "",
		"remark": ""

      };

    _.assign(this, defaults);
}
