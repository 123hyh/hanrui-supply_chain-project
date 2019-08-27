import _ from 'lodash';

export default function () {
    // 实体：香港收货登记
    let defaults = {
		"id": "",
		"tenantId": "hfy",
		"billNo": "",
		"bizType": "",
		"issueType": "",
		"storeOrg": "",
		"warehouse": "",
		"billStatus": "",
		"sourceBillType": "",
		"delegeteBillNo": "",
		"reportGateType": "",
		"delegete": "",
		"supplier": "",
		"customer": "",
		"incomeVehicleOrder": "",
		"receiveStatus": "",
		"scheduleDeliveryTime": "",
		"summary": "",
		"pieces": "",
		"areaCode": "",
		"registerFee": "",
		"auditor": "",
		"auditTime": ""

      };

    _.assign(this, defaults);
}
