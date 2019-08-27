import _ from 'lodash';

export default function () {
    // 实体：原始舱单
    let defaults = {
		"id": "",
		"tenantId": "",
		"sourceBillCode": "",
		"deliveryNo": "",
		"trainNo": "",
		"customsType": "",
		"hasSendCustoms": false,
		"sender": "",
		"sendTime": ""

      };

    _.assign(this, defaults);
}
