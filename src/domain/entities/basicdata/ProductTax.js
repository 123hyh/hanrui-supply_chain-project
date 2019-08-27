import _ from 'lodash';

export default function () {
    // 实体：关务客品税号
    let defaults = {
		"id": "",
		"tenantId": "",
		"productTaxCode": "",
		"materielId": "",
		"tradeName": "",
		"specification": "",
		"delegete": "",
		"reportGateType": "",
		"siVerify": false,
		"declareType": ""

      };

    _.assign(this, defaults);
}
