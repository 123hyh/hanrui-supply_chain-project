import _ from 'lodash';

export default function () {
    // 实体：集中调度单子表-收货信息
    let defaults = {
		// "id": "",
		// "tenantId": "hfy",
		"itemCode": "",
		"centreDispatchCode": "",
		"deliveryTrain": "",
		"deliveryNo": "",
		"route": "",
		"driver": "",
		"plateNo": "",
		"totalWeight": "",
		"capacity": "",
		"packageNumber": "",
		"originOrderCode": "",
		"totalOrders": "",
		"dispatchType": "",
		"deliveryPoint": "",
		"dispatchOrderCode": "",
		"remark": ""

      };

    _.assign(this, defaults);
}
