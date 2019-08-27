import _ from 'lodash';

export default function () {
    // 实体：角色权限
    let defaults = {
		"id": "",
		"tenantId": "hfy",
		"roleCode": "",
		"menuCode": "",
		"menuSubCode": "",
		"auth": ""

      };

    _.assign(this, defaults);
}
