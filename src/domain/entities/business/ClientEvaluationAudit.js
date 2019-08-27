import _ from 'lodash';

export default function () {
    // 实体：委托方评估审核信息
    let defaults = {
		"id": "",
		"tenantId": "hfy",
		"itemCode": "",
		"clientEvaluationNo": "",
		"content": ""

      };

    _.assign(this, defaults);
}
