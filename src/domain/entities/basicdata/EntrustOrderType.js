import _ from 'lodash';

export default function () {
    // 实体：委托单类型
    let defaults = {
		"id": "",
		"tenantId": "",
		"entrustOrderTypeCode": "",
		"entrustOrderTypeName": ""

      };

    _.assign(this, defaults);
}
