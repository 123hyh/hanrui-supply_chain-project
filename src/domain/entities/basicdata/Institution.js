import _ from 'lodash';

export default function () {
    // 实体：机关信息
    let defaults = {
		"id": "",
		"tenantId": "",
		"institutionCode": "",
		"institutionName": "",
		"institutionType": "",
		"institutionAbb": "",
		"customsCode": "",
		"description": ""

      };

    _.assign(this, defaults);
}
