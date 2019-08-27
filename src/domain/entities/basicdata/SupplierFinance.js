import _ from 'lodash';

export default function () {
    // 实体：供应商财务信息
    let defaults = {
		"id": "",
		"tenantId": "",
		"supplierCode": "",
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
