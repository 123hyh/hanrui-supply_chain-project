import _ from 'lodash';

export default function () {
    // 实体：协议管理补充协议
    let defaults = {
		"id": "",
		"tenantId": "hfy",
		"itemCode": "",
		"solutionNo": "",
		"content": ""

      };

    _.assign(this, defaults);
}
