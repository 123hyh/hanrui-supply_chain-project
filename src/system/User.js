import _ from 'lodash';

export default function () {
    // 实体：用户表
    let defaults = {
		"id": "",
		"tenantId": "hfy",
		"userCode": "",
		"userName": "",
		"password": "",
		"gender": "",
		"department": "",
		"position": "",
		"phone": "",
		"email": "",
		"birthday": "",
		"locked": false

      };

    _.assign(this, defaults);
}
