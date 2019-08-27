import _ from 'lodash';

export default function () {
    // 实体：集中调度单
    let defaults = {
		// "id": "",
		// "tenantId": "hfy",
		"centreDispatchCode": "",
		"billStatus": "",
		"totalOrders": "",
		"deliveryPoint": "",
		"totalNumbers": "",
		"totalWeight": "",
		"dispatchOrderName":"",
		"dispatchOrderCodes":"",
		"remark": ""

      };

    _.assign(this, defaults);
}
