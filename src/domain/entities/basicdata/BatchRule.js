import _ from 'lodash';

export default function () {
    // 实体：批次规则定义
    let defaults = {
		"id": "",
		"tenantId": "",
		"batchRuleCode": "",
		"batchRuleName": "",
		"group": "",
		"enable": '',
		"separator": "",
		"length": "",
		"preview": ""

      };

    _.assign(this, defaults);
}
