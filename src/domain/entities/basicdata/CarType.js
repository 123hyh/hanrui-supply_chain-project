import _ from 'lodash';

export default function () {
    // 实体：物流车型
    let defaults = {
		"id": "",
		"tenantId": "",
		"carTypeCode": "",
		"carTypeName": "",
		"carTypeAbb": "",
		"description": "",
		"remark": ""

      };

    _.assign(this, defaults);
}
