import _ from 'lodash';

export default function () {
    // 实体：收款单收款信息表
    let defaults = {
		"id": "",
		"tenantId": "hfy",
		"billNo": "",
		"receiptsAmount": "",
		"baseCurrency": "",
		"otherSubject": "",
		"costCenter": "",
		"feeType": "",
		"flowedInPlannedItem": "",
		"remark": ""

      };

    _.assign(this, defaults);
}
