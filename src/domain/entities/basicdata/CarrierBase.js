import _ from 'lodash';

export default function () {
    // 实体：承运商基础信息表
    let defaults = {
		"id": "",
		"tenantId": "",
		"carrierCode": "",
		"carrierName": "",
		"carrierForeignName": "",
		"registNumber": "",
		"national": "",
		"province": "",
		"city": "",
		"district": "",
		"carrierAddress": "",
		"representative": "",
		"registFund": "",
		"scope": "",
		"carrierStatus": "",
		"carrierType": "",
		"registTime": "",
		"fax": "",
		"phone": "",
		"carrierLicense": "",
		"website": "",
		"email": "",
		"classify": "",
		"carrier": false,
		"supplier": false,
		"remark": ""

      };

    _.assign(this, defaults);
}
