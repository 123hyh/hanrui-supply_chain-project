import _ from 'lodash';

export default function () {
    // 实体：买方物流信息
    let defaults = {
		"id": "",
		"tenantId": "hfy",
		"buyerInfoNo": "",
		"entryNo": "",
		"specificationType": "",
		"inventoryName": "",
		"inventoryCode": "",
		"unit": "",
		"materialNo": "",
		"quantity": "",
		"deliveryQuantityCount": "",
		"piece": ""

      };

    _.assign(this, defaults);
}
