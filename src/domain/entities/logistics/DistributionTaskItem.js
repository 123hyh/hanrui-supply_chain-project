import _ from 'lodash';

export default function () {
    // 实体：配送任务单子表
    let defaults = {
		"id": "",
		"tenantId": "hfy",
		"itemCode": "",
		"distributionTaskCode": "",
		"receiveTime": "",
		"route": "",
		"area": "",
		"entrust": "",
		"consiCompany": "",
		"consignee": "",
		"address": "",
		"quantity": "",
		"stages": ""

      };

    _.assign(this, defaults);
}
