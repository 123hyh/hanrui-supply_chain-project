import _ from 'lodash';

export default function () {
    // 实体：配送任务单
    let defaults = {
		"id": "",
		"tenantId": "hfy",
		"orderStatus": "",
		"distributionTaskCode": "",
		"dispatchType": "",
		"outCar": "",
		"carrier": "",
		"deliveryTrain": "",
		"deliveryCar": "",
		"carType": "",
		"driver": "",
		"driverPhone": "",
		"departureTime": "",
		"remark": "",
		"deliveryTime": "",
		"timeSlot": "",
		"outcarTime": "",
		"shopper": "",
		"chargingScheme": "",
		"shippingRoute": ""

      };

    _.assign(this, defaults);
}
