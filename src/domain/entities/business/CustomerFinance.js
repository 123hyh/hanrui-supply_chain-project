import _ from 'lodash';

export default function () {
    // 实体：供应链客户财务资料
    let defaults = {
		"id": "",
		"tenantId": "hfy",
		"itemCode": "",
		"customerNo": "",
		"organizationCode": "",
		"organizationName": "",
		"chargeUpType": "",
		"settlementCurrency": "",
		"settlementMode": "",
		"payMode": "",
		"receivableTerm": "",
		"salesmanId": "",
		"salesmanName": "",
		"department": "",
		"contact": "",
		"contactDuty": "",
		"tel": "",
		"phone": "",
		"postcode": "",
		"fax": "",
		"email": ""

      };

    _.assign(this, defaults);
}
