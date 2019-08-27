import _ from 'lodash';

export default function () {
    // 实体：产地表
    let defaults = {
		"id": "",
		"tenantId": "hfy",
		"originCode": "",
		"originName": "",
		"originAbb": "",
		"customsCode": "",
		"description": ""

      };

    _.assign(this, defaults);
}
