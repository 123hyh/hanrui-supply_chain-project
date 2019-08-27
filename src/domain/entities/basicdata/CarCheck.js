import _ from 'lodash';

export default function () {
    // 实体：查车登记表
    let defaults = {
		"id": "",
		"tenantId": "",
		"carCheckCode": "",
		"checkTime": "",
		"trainNo": "",
		"customsCode": ""

      };

    _.assign(this, defaults);
}
