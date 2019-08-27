import _ from 'lodash';

export default function () {
    // 实体：司机信息
    let defaults = {
		"id": "",
		"tenantId": "",
		"driverInfoCode": "",
		"driverName": "",
		"driverType": "",
		"phone": "",
		"telePhone": "",
		"idCard": "",
		"homeAddress": "",
		"dutyDriver": false,
		"dutySend": false,
		"remark": ""

      };

    _.assign(this, defaults);
}
