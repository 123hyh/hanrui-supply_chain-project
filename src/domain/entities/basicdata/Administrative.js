import _ from 'lodash';

export default function () {
    // 实体：关务行政区域代码表
    let defaults = {
		"id": "",
		"tenantId": "",
		"customsCode": "",
		"administrativeCode": "",
		"administrative": "",
		"national": "",
		"province": "",
		"city": "",
		"district": "",
		"address": "",
		"remark": ""

      };

    _.assign(this, defaults);
}
