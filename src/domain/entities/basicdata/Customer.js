import _ from 'lodash';

export default function () {
    // 实体：客户
    let defaults = {
		"id": "",
		"tenantId": "",
		"customerNo": "",
		"customerName": "",
		"withinCustomer": false,
		"customerAbb": "",
		"foreignName": "",
		"remenberCode": "",
		"parentCustomer": "",
		"legalRepresentative": "",
		"taxNo": "",
		"registerNo": "",
		"pbLicense": "",
		"businessLicense": "",
		"taxCategory": "",
		"taxRate": "",
		"gspAuthentication": "",
		"barCode": "",
		"industry": "",
		"national": "",
		"country": "",
		"province": "",
		"district": "",
		"address": "",
		"website": "",
		"creditManage": false,
		"disableGroup": "",
		"customerStatus": false,
		"updateVersion": "",
		"presupposition": false,
		"outsourcing": false,
		"email": "",
		"websiteTwo": "",
		"actualStatus": false,
		"customerClassifi": false,
		"remark": ""

      };

    _.assign(this, defaults);
}
