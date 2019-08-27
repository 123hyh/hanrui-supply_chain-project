import _ from 'lodash';

export default function () {
    // 实体：交货区域
    let defaults = {
		"id": "",
		"tenantId": "",
		"deliveryAreaCode": "",
		"deliveryAreaName": "",
		"description": "",
		"national": ""

      };

    _.assign(this, defaults);
}
