import _ from 'lodash';

export default function () {
    // 实体：卖方接提货
    let defaults = {
		"id": "",
		"tenantId": "hfy",
		"itemCode": "",
		"billNo": "",
		"carrierCode": "",
		"carrierName": "",
		"deliverMode": "",
		"delegeteBillNo": "",
		"dispatchOrganizationCode": "",
		"dispatchOrganizationName": "",
		"carModel": "",
		"carModelName": "",
		"transportMode": "",
		"shipperCode": "",
		"shipperName": "",
		"pickUpDate": "",
		"contact": "",
		"contactTel": "",
		"phone": "",
		"dispatchLine": "",
		"dispatchLineName": "",
		"area": "",
		"areaName": "",
		"deliveryAddress": "",
		"underPartyType": "",
		"underParty": "",
		"underPartyName": "",
		"pickUpPayment": false,
		"premium": "",
		"premiumPartyType": "",
		"premiumParty": "",
		"premiumPartyName": "",
		"quantity": "",
		"totalWeight": "",
		"cardQuantity": "",
		"volume": "",
		"deliveryMode": "",
		"auditStatus": "",
		"premiumCurrency":"",
		"auditStatus":"",
		"remark": ""

      };

    _.assign(this, defaults);
}
