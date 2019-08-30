import _ from 'lodash';

export default function () {
    // 实体：监管证件代码表
    let defaults = {
		"id": "",
		"tenantId": "hfy",
		"billNo": "",
		"credentialsName": "",
		"customsCode": "",
		"description": "",
		"status": ""

      };

    _.assign(this, defaults);
}
