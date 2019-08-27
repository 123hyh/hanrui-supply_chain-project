import _ from 'lodash';

export default function () {
    // 实体：承运商财务信息表
    let defaults = {
		"id": "",
		"tenantId": "",
		"carrierCode": "",
		"financeCode": "",
		"financeName": "",
		"financeType": "",
		"currency": "",
		"settlementType": "",
		"paymentMethod": "",
		"paymentTerm": "",
		"accContact": "",
		"resign": "",
		"telephone": "",
		"moblephone": "",
		"postcode": "",
		"fax": "",
		"email": ""

      };

    _.assign(this, defaults);
}
