import _ from 'lodash';

export default function () {
    // 实体：电子税单邮件发送日志
    let defaults = {
		"id": "",
		"tenantId": "",
		"mailSendLogCode": "",
		"operator": "",
		"sendAddress": "",
		"entrust": "",
		"sendTime": "",
		"business": "",
		"receiveAddress": "",
		"sendSuccess": false,
		"errorInfo": ""

      };

    _.assign(this, defaults);
}
