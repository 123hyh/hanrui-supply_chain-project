import _ from 'lodash';

export default function () {
    // 实体：关联理由代码表
    let defaults = {
		"id": "",
		"tenantId": "hfy",
		"billNo": "",
		"reasonsName": "",
		"customsCode": "",
		"description": "",
		"status": ""

      };

    _.assign(this, defaults);
}
