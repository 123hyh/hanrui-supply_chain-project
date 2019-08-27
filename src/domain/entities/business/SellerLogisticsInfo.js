import _ from 'lodash';

export default function () {
    // 实体：卖方物流信息
    let defaults = {
		"id": "",
		"tenantId": "hfy",
		"sellerInfoNo": "",
		"entryNo": "",
		"specificationType": "",
		"inventoryName": "",
		"inventoryCode": "",
		"unit": "",
		"quantity": "",
		"deliveryQuantityCount": "",
		"piece": ""

      };

    _.assign(this, defaults);
}
