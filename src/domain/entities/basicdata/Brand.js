import _ from 'lodash';

export default function () {
    // 实体：品牌表
    let defaults = {
		"id": "",
		"tenantId": "hfy",
		"brandCode": "",
		"brandName": "",
		"brandAbb": "",
		"customsCode": "",
		"description": ""

      };

    _.assign(this, defaults);
}
