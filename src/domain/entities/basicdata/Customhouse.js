import _ from 'lodash';

export default function () {
    // 实体：关区代码表
    let defaults = {
		"id": "",
		"tenantId": "hfy",
		"billNo": "",
		"customhouseName": "",
		"customsCode": "",
		"description": "",
		"status": ""

      };

    _.assign(this, defaults);
}
