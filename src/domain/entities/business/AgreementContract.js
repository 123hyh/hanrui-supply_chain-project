import _ from 'lodash';

export default function () {
    // 实体：协议管理合同表
    let defaults = {
		"id": "",
		"tenantId": "hfy",
		"itemCode": "",
		"agreementNo": "",
		"deliveryRequirements": "",
		"payMode": "",
		"payCycle": ""

      };

    _.assign(this, defaults);
}
