import _ from 'lodash';

export default function () {
    // 实体：企业资质代码表
    let defaults = {
		"id": "",
		"tenantId": "hfy",
		"billNo": "",
		"qualificationName": "",
		"classifi": "",
		"customsCode": "",
		"description": "",
		"status": ""

      };

    _.assign(this, defaults);
}
