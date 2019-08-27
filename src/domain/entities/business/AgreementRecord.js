import _ from 'lodash';

export default function () {
    // 实体：协议管理修改记录表
    let defaults = {
		"id": "",
		"tenantId": "hfy",
		"itemCode": "",
		"agreementNo": "",
		"operator": "",
		"operatorTime": "",
		"beforeContent": "",
		"afterContent": ""

      };

    _.assign(this, defaults);
}
