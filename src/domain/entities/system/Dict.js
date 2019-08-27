import _ from 'lodash';

export default function () {
    // 实体：字典表
    let defaults = {
		"id": "",
		"tenantId": "hfy",
		"item": "",
		"itemKey": "",
		"itemValue": "",
		"orders": "",
		"system": false,
		"remark": ""

      };

    _.assign(this, defaults);
}
