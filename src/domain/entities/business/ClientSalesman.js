import _ from 'lodash';

export default function () {
    // 实体：委托方业务员
    let defaults = {
		"id": "",
		"tenantId": "hfy",
		"itemCode": "",
		"clientNo": "",
		"salesman": "",
		"mainPerson": false,
		"pushMoney": "",
		"department": "",
		"remark": ""

      };

    _.assign(this, defaults);
}
