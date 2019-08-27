import _ from 'lodash';

export default function () {
    // 实体：深圳上货计划单基本信息
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
		"startWarehouseName":"",
		"endWarehouse": "",
		"endWarehouseName": "",
		"platesNo": "",
		"platesNoName": "",
		"carrier": "",
		"carrierName": "",
		"carType": "",
		"freightType": "",
		"containerName": "",
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
