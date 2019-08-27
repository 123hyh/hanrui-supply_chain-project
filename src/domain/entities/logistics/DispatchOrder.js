import _ from 'lodash';

export default function () {
    // 实体：调度单
    let defaults = {
		"id": "",
		"tenantId": "hfy",
		"dispatchOrderCode": "",
		"billStatus": "",
		"operator": "",
		"operateTime": "",
		"dispatchType": "",
		"deliveryTrain": "",
		"deliveryTime": "",
		"plateNo": "",
		"capacity": "",
		"carrier": "",
		"driver": "",
		"driverPhone": "",
		"packageNumber": "",
		"stocker": "",
		"stockTime": "",
		"stockStatus": "",
		"remark": "",
		"chargingScheme": "",
		"shopper": "",
		"outCar": "",
		"sendUp": "",
		"createWms": "",
		"shippingRoute": "",
		"carType": ""

      };

    _.assign(this, defaults);
}
