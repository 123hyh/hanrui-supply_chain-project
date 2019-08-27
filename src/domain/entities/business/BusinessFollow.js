import _ from 'lodash';

export default function () {
    // 实体：商机管理推进记录
    let defaults = {
		"id": "",
		"tenantId": "hfy",
		"itemCode": "",
		"businessNo": "",
		"salesmanId": "",
		"salesmanName": "",
		"followTime": "",
		"address": "",
		"followMode": "",
		"content": "",
		"result": "",
		"remark": ""

      };

    _.assign(this, defaults);
}
