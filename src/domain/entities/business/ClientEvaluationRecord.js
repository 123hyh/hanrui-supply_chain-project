import _ from 'lodash';

export default function () {
    // 实体：拜访信息
    let defaults = {
		"id": "",
		"tenantId": "hfy",
		"itemCode": "",
		"clientEvaluationNo": "",
		"content": ""

      };

    _.assign(this, defaults);
}
