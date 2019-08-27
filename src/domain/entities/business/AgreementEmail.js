import _ from 'lodash';

export default function () {
    // 实体：协议管理邮箱
    let defaults = {
		"id": "",
		"tenantId": "hfy",
		"itemCode": "",
		"agreementNo": "",
		"email": "",
		"status": false

      };

    _.assign(this, defaults);
}
