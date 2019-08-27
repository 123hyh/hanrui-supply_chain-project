import _ from 'lodash';

export default function () {
    // 实体：计量单位
    let defaults = {
		"id": "",
		"tenantId": "",
		"measurementCode": "",
		"measurementGroup": "",
		"measurementUnit": "",
		"remark": ""

      };

    _.assign(this, defaults);
}
