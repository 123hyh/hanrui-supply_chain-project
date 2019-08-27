import _ from 'lodash';

export default function () {
    // 实体：监管方式
    let defaults = {
		"id": "",
		"tenantId": "hfy",
		"supervisionModeCode": "",
		"supervisionModeName": "",
		"supervisionModeAbb": "",
		"customsCode": "",
		"description": ""

      };

    _.assign(this, defaults);
}
