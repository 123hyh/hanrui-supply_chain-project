import _ from 'lodash';

export default function () {
    // 实体：征免性质
    let defaults = {
		"id": "",
		"tenantId": "",
		"supplierCode": "",
		"exemptionCode": "",
		"exemptionName": "",
		"exemptionAbb": "",
		"customsCode": "",
		"description": ""

      };

    _.assign(this, defaults);
}
