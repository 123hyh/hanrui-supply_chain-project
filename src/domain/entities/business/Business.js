import _ from 'lodash';

export default function () {
    // 实体：商机管理
    let defaults = {
		"id": "",
		"tenantId": "hfy",
		"businessNo": '',
		"businessType": "",
		"companyType": "",
		"customerShortName": "",
		"customerCode": "",
		"customerName": "",
		"companyAddress": "",
		"tel": "",
		"fax": "",
		"email": "",
		"contactPerson": "",
		"registerMoney": "",
		"websiteUrl": "",
		"employees": "",
		"establishedTime": "",
		"companyArea": "",
		"mainEquipment": "",
		"workEnvironment": "",
		"hasRealEstateOwner": "",
		"businessLicense": "",
		"taxId": "",
		"organizationCode": "",
		"mainBusiness": "",
		"industryCertification": "",
		"businessDescription": "",
		"honorDescription": "",
		"expirationDate": "",
		"salesmanId": "",
		"salesmanName": "",
		"offerRate": "",
		"remark": "",
		"auditor": "",
		"auditTime": ""

      };

    _.assign(this, defaults);
}
