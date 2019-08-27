import _ from 'lodash';

export default function () {
    // 实体：香港入库单
    let defaults = {
		"id": "",
		payableBillGenerated: "",
		"tenantId": "hfy",
		"billNo": "",
		"billName": "",
		"issueType": "",
		"issueTypeName": "",
		"bizDate": "",
		"supplier": "",
		"supplierName": "",
		"storeOrg": "",
		"storeOrgName":"",
		"department": "",
		"departmentName": "",
		"customer": "",
		"customerName": "",
		"billStatus": "",
		"sourceBillType": "",
		"reportGateType": "",
		"currency": "",
		"exchangeRate": "",
		"writeOff": false,
		"initData": false,
		"taxIncluded": false,
		"extraTax": false,
		"taxIncludedCost": false,
		"hasPayment": false,
		"payMode": "",
		"delegeteBillNo": "",
		"delegete": "",
		"delegeteName": "",
		"summary": "",
		"delegeteType": "",
		"delegeteTypeName": "",
		"auditor": "",
		"originator": ""

      };

    _.assign(this, defaults);
}
