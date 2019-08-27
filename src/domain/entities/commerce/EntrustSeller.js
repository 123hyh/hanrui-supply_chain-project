import _ from 'lodash';

export default function () {
    // 实体：委托单卖方信息
    let defaults = {
		"id": "",
		"tenantId": "hfy",
		"itemCode": "",
		"billNo": "",
		"entrustOrderNo": "",
		"dispatchOrganizationCode": "",
		"dispatchOrganizationName": "",
		"deliverMode": "",
		"pickUpDate": "",
		"deliverUnitCode": "",
		"deliverUnitName": "",
		"status": "",
		"contact": "",
		"contactTel": "",
		"deliveryAddress": "",
		"auditor": "",
		"auditTime": ""

      };

    _.assign(this, defaults);
}
