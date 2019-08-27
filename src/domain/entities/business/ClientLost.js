import _ from 'lodash';

export default function () {
    // 实体：委托方流失原因
    let defaults = {
		"id": "",
		"tenantId": "hfy",
		"itemCode": "",
		"clientNo": "",
		"lostReason": ""

      };

    _.assign(this, defaults);
}
