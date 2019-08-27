import _ from 'lodash';

export default function () {
    // 实体：角色表
    let defaults = {
		"id": "",
		"tenantId": "hfy",
		"roleCode": "",
		"roleName": "",
		"remark": ""

      };

    _.assign(this, defaults);
}
