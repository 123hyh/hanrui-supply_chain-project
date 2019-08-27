import _ from 'lodash';

export default function () {
    // 实体：其它计费单
    let defaults = {
		"id": "",
		"tenantId": "hfy",
		"billNo": "",
		"company": "",
		"bizDate": "",
		"department": "",
		"handler": "",
		"status": ""

      };

    _.assign(this, defaults);
}
