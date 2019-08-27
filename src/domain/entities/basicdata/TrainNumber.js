import _ from 'lodash';

export default function () {
    // 实体：车次
    let defaults = {
		"id": "",
		"tenantId": "",
		"trainNumberCode": "",
		"trainNumberName": "",
		"trainNo": ""

      };

    _.assign(this, defaults);
}
