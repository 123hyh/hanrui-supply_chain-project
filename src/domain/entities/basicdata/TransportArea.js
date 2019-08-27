import _ from 'lodash';

export default function () {
    // 实体：物流仓储运输区域
    let defaults = {
		"id": "",
		"tenantId": "",
		"areaCode": "",
		"transportAreaName": "",
		"remark": ""

      };

    _.assign(this, defaults);
}
