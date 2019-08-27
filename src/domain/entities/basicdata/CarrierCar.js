import _ from 'lodash';

export default function () {
    // 实体：承运商车辆
    let defaults = {
		"id": "",
		"tenantId": "hfy",
		"carrierCode": "",
		"itemCode": "",
		"vehicleNo": "",
		"carType": "",
		"load": "",
		"pachageNo": "",
		"carriageVolume": ""

      };

    _.assign(this, defaults);
}
