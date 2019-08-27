import _ from 'lodash';

export default function () {
    // 实体：第三方
    let defaults = {
		"id": "",
		"tenantId": "hfy",
		"billCode": "",
		"thirdGroupName": "",
		"enterpriseTaxNo": "",
		"telephone": "",
		"fax": "",
		"mobilephone": "",
		"address": "",
		"description": "",
		"useStatus": ""

      };

    _.assign(this, defaults);
}
