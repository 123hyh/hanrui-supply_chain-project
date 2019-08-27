import _ from 'lodash';

export default function () {
    // 实体：仓储车辆信息
    let defaults = {
		"id": "",
		"tenantId": "",
		"vehicleInfoCode": "",
		"vehicleNo": "",
		"vehicleType": "",
		"carType": "",
		"loadWeight": "",
		"pachageNo": "",
		"carriageVolume": "",
		"driver": "",
		"phoneNo": "",
		"remark": ""

      };

    _.assign(this, defaults);
}
