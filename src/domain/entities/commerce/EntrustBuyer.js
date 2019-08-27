import _ from 'lodash';

export default function () {
    // 实体：委托单买方信息
    let defaults = {
		"id": "",
		"tenantId": "hfy",
		"itemCode": "",
		"billNo": "",
		"entrustOrderNo": "",
		"dispatchOrganizationCode": "",
		"dispatchOrganizationName": "",
		"pickUpMode": "",
		"deliverDate": "",
		"arrivalDate": "",
		"receiveContactPerson": "",
		"contactTel": "",
		"receiveAddress": "",
		"status": "",
		"auditor": "",
		"auditTime": ""

      };

    _.assign(this, defaults);
}
