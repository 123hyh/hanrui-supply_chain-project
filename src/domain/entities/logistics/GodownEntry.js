import _ from 'lodash';

export default function () {
    // 实体：香港入库单
    let defaults = {
		"id": "",
		"tenantId": "hfy",
		"godownEntryCode": "",
		"issueType": "",
		"issueTypeName": "",
		"bizDate": "",
		"supplier": "",
		"supplierName": "",
		"storeOrg": "",
		"storeOrgName":"",
		"department": "",
		"departmentName": "",
		"billStatus": "",
		"sourceBillType": "",
		"reportGateType": "",
		"currency": "",
		"exchangeRate": "",
		"writeOff": false,
		"initOrder": false,
		"includeTax": false,
		"extraTax": false,
		"incost": false,
		"hasPayment": false,
		"payMode": "",
		"delegeteBillNo": "",
		"delegete": "",
		"delegeteName": "",
		"summary": "",
		"principalAgent": "",
		"auditor": "",
		"originator": ""

      };

    _.assign(this, defaults);
}
