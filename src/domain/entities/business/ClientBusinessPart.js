import _ from 'lodash';

export default function () {
    // 实体：委托方商务员
    let defaults = {
		"id": "",
		"tenantId": "hfy",
		"itemCode": "",
		"clientNo": "",
		"businessPart": "",
		"mainPerson": false,
		"reportGateType": "",
		"pushMoney": "",
		"department": ""

      };

    _.assign(this, defaults);
}
