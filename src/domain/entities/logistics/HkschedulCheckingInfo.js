import _ from 'lodash';

export default function () {
    // 实体：上货单计划核对信息
    let defaults = {
		"id": "",
		"tenantId": "hfy",
		"checkingInfoCode": "",
		"scheduleBaseCode": "",
		"cutOrder": false,
		"totalOrders": "",
		"totalWeight": "",
		"totalUnitName": "",
		"totalNetWeight": "",
		"netUnitName": "",
		"boxCount": "",
		"cutOrderResult": false,
		"cutOrderTime": "",
		"cutOrderUser": "",
		"cutDifference": "",
		"loadResult": false,
		"loadTime": "",
		"loadUser": "",
		"loadDifference": ""

      };

    _.assign(this, defaults);
}
