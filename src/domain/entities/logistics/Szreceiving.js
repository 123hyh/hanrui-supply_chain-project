import _ from 'lodash';

export default function () {
    // 实体：深圳收货主表
    let defaults = {
		"id": "",
		"tenantId": "hfy",
		"billNo": "",
		"bizType": "",
		"issueType": "",
		"issueTypeName": "",
		"storeOrg": "",
		"storeOrgName": "",
		"warehouse": "",
		"warehouseName": "",
		"billStatus": "1",
		"sourceBillType": "",
		"delegeteBillNo": "",
		"reportGateType": "",
		"delegete": "",
		"delegeteName": "",
		"supplier": "",
		"supplierName": "",
		"customer": "",
		"customerName": "",
		"bizDate": "",
		"incomeVehicleOrder": "",
		"receiveStatus": "",
		"summary": "",
		"pieces": "",
		"areaCode": "",
		"carrier": "",
		"carrierName": "",
		"scheduleDeliveryTime": "",
		"auditor": "",
		"auditTime": ""

      };

    _.assign(this, defaults);
}
