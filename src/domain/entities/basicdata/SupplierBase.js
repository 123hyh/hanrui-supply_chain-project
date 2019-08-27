import _ from 'lodash';

export default function () {
    // 实体：供应商
    let defaults = {
		"id": "",
		"tenantId": "",
		"supplierCode": "",
		"supplierName": "",
		"supplierForeignName": "",
		"registNumber": "",
		"national": "",
		"province": "",
		"city": "",
		"district": "",
		"supplierAddress": "",
		"representative": "",
		"registFund": "",
		"scope": "",
		"supplierStatus": "",
		"supplierType": "",
		"registTime": "",
		"fax": "",
		"phone": "",
		"supplierLicense": "",
		"website": "",
		"email": "",
		"classify": "",
		"carrier": "",
		"supplier": "",
		"remarks": ""

      };

    _.assign(this, defaults);
}
