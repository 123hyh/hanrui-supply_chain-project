import _ from 'lodash';

export default function () {
    // 实体：境内目的地
    let defaults = {
		"id": "",
		"tenantId": "",
		"domesticDestinationCode": "",
		"domesticDestinationName": "",
		"domesticDestinationAbb": "",
		"customsCode": "",
		"description": "",
		"remark": ""

      };

    _.assign(this, defaults);
}
