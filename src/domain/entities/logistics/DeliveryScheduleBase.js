import _ from 'lodash';

export default function () {
    // 实体：上货单计划基本信息
    let defaults = {
		"id": "",
		"tenantId": "hfy",
		"scheduleBaseCode": "",
		"planDate": "",
		"planTime": "",
		"tripsCode": "",
		"trips": "",
		"charterBus": false,
		"busEntrustNo": "",
		"port": "",
		"startWarehouse": "",
		"endWarehouse": "",
		"platesNo": "",
		"carrier": "",
		"carType": "",
		"freightType": "",
		"containerCode": "",
		"freight": "",
		"currency": "",
		"containerNo": "",
		"containerSpecification": "",
		"remark": "",
		"departTime": "",
		"arrivePortTime": "",
		"leavePortTime": "",
		"destinationTime": "",
		"shipmentTime": "",
		"overTime": "",
		"hasSend": false,
		"hasBackOrder": false,
		"declareCodeHK": "",
		"user": "",
		"operateTime": ""

      };

    _.assign(this, defaults);
}
