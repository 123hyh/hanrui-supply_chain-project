import _ from 'lodash';

export default function () {
    // 实体：发运路线
    let defaults = {
		"id": "",
		"tenantId": "hfy",
		"shippingRouteCode": "",
		"shippingRouteName": "",
		"startPlace": "",
		"endPlace": "",
		"carrier": "",
		"remark": ""

      };

    _.assign(this, defaults);
}
