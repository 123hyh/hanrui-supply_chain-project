import _ from 'lodash';

export default function () {
    // 实体：配送车次单
    let defaults = {
		"id": "",
		"tenantId": "hfy",
		"distributionTrainCode": "",
		"outcarTime": "",
		"timeSlot": "",
		"deliveryTrain": "",
		"deliveryLine": "",
		"hasOutVehicles":"",
		"carrier": "",
		"plateNo": "",
		"driver": "",
		"load": "",
		"telePhone": "",
		"packageNo": "",
		"chargingScheme": "",
		"hasCutOrder": "",
		"hasOutStock": "",
		"outStockTime": "",
		"receiver": "",
		"shopper": "",
		"remark": ""

      };

    _.assign(this, defaults);
}
