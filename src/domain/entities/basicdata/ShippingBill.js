import _ from 'lodash';

export default function () {
    // 实体：关务舱单
    let defaults = {
		"id": "",
		"tenantId": "",
		"shippingBillCode": "",
		"deliveryCode": "",
		"targetUnit": "",
		"customsType": "",
		"sendCustoms": false,
		"sendPerson": "",
		"sendTime": "",
		"remark": ""

      };

    _.assign(this, defaults);
}
