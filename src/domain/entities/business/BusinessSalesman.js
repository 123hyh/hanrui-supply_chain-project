import _ from 'lodash';

export default function () {
    // 实体：商机管理业务员
    let defaults = {
		"id": "",
		"tenantId": "hfy",
		"itemCode": "",
		"businessNo": "",
		"salesmanId": "",
		"salesmanName": "",
		"deptId": "",
		"deptName": "",
		"scale": ""

      };

    _.assign(this, defaults);
}
