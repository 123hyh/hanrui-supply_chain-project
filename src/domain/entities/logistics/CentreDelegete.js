import _ from 'lodash';

export default function () {
    // 实体：集中调度单子表-委托信息
    let defaults = {
		"id": "",
		"tenantId": "hfy",
		"itemCode": "",
		"centreDispatchCode": "",
		"delegeteBillNo": "",
		"sourceBillType": "",
		"sourceBillNo": "",
		"shippingRoute": "",
		"consignor": "",
		"consiCompany": "",
		"consignee": "",
		"telephone": "",
		"consiAddress": "",
		"businessMan": "",
		"pieces": "",
		"carTimes": "",
		"grossWeight": "",
		"remark": ""

      };

    _.assign(this, defaults);
}
