import _ from 'lodash';

export default function () {
    // 实体：用户权限
    let defaults = {
		"id": "",
		"tenantId": "hfy",
		"userCode": "",
		"menuCode": "",
		"menuSubCode": "",
		"auth": ""

      };

    _.assign(this, defaults);
}
