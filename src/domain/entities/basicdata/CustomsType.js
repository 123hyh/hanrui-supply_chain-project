import _ from 'lodash';

export default function () {
    // 实体：关务报关类型
    let defaults = {
		"id": "",
		"tenantId": "",
		"customsTypeCode": "",
		"customsTypeNameSingle": "",
		"customsTypeNameDouble": ""

      };

    _.assign(this, defaults);
}
