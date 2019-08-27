import _ from 'lodash';

export default function () {
    // 实体：包装种类
    let defaults = {
		"id": "",
		"tenantId": "",
		"packageTypeCode": "",
		"packageTypeName": "",
		"packageTypeAbb": "",
		"customsCode": "",
		"description": "",
		"remark": ""

      };

    _.assign(this, defaults);
}
