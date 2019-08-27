import _ from 'lodash';

export default function () {
    // 实体：财务计费方式
    let defaults = {
		"id": "",
		"tenantId": "",
		"financeChargeCode": "",
		"chargeName": "",
		"chargeAbb": "",
		"description": ""

      };

    _.assign(this, defaults);
}
