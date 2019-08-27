import _ from 'lodash';

export default function () {
    // 实体：关务集装箱基础信息
    let defaults = {
		"id": "",
		"tenantId": "",
		"containerCode": "",
		"containerName": "",
		"containerAbb": "",
		"containerSpecification": "",
		"description": "",
		"remark": ""

      };

    _.assign(this, defaults);
}
