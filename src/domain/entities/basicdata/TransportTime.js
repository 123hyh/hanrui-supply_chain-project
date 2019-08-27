import _ from 'lodash';

export default function () {
    // 实体：运输时效
    let defaults = {
		"id": "",
		"tenantId": "",
		"transportTimeCode": "",
		"transportTimeName": "",
		"transportTimeNameAbb": "",
		"carrier": "",
		"description": "",
		"timeType": "",
		"timeName": "",
		"throwingSystem": "",
		"remark": ""

      };

    _.assign(this, defaults);
}
