import _ from 'lodash';

export default function () {
    // 实体：承运商司机
    let defaults = {
		"id": "",
		"tenantId": "hfy",
		"carrierCode": "",
		"itemCode": "",
		"driverName": "",
		"phone": "",
		"telePhone": "",
		"idCard": "",
		"driveNo": ""

      };

    _.assign(this, defaults);
}
