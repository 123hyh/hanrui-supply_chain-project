import _ from 'lodash';

export default function () {
    // 实体：供应链客户
    let defaults = {
		"id": "",
		"tenantId": "hfy",
		"customerNo": "",
		"customerName": "",
		"internalCustomer": false,
		"shortName": "",
		"customerEnName": "",
		"shortCode": "",
		"parentCustomerCode": "",
		"parentCustomerName": "",
		"customerNature": "",
		"registeredNo": "",
		"businessLicense": "",
		"businessCertificate": "",
		"gspCertification": "",
		"taxId": "",
		"legalPerson": "",
		"trade": "",
		"barCode": "",
		"country": "",
		"province": "",
		"city": "",
		"county": "",
		"address": "",
		"creditControl": false,
		"taxTypeCode": "",
		"taxTypeName": "",
		"taxRate": "",
		"invoiceType": "",
		"auditor": "",
		"auditTime": "",
		"customerStatus": "",
		"customerType": "",
		"customerTypeName": ""

      };

    _.assign(this, defaults);
}
