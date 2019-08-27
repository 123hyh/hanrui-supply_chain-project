import _ from 'lodash';

export default function () {
    // 实体：物料财务信息
    let defaults = {
		"id": "",
		"tenantId": "",
		"materielId": "",
		"materielFinanceCode": "",
		"currency": "",
		"settlementType": "",
		"paymentMethod": "",
		"paymentTerm": "",
		"financeType": "",
		"accContact": "",
		"resign": ""

      };

    _.assign(this, defaults);
}
