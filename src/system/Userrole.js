import _ from 'lodash';

export default function () {
    // 实体：用户角色
    let defaults = {
		"id": "",
		"tenantId": "hfy",
		"userCode": "",
		"roleCode": ""

      };

    _.assign(this, defaults);
}
