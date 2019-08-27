import _ from 'lodash';

export default function () {
    // 实体：委托方特殊功能
    let defaults = {
		"id": "",
		"tenantId": "hfy",
		"itemCode": "",
		"clientNo": "",
		"name": "",
		"type": ""

      };

    _.assign(this, defaults);
}
