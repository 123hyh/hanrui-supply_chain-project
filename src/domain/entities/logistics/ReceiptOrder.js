import _ from 'lodash';

export default function () {
    // 实体：收货通知单
    let defaults = {
		"id": "",
		"tenantId": "hfy",
		"receiptOrderCode": "",
		"bizType": "",
		"issueType": "",
		"storeOrg": "",
		"warehouse": "",
		"billStatus": "",
		"sourceBillType": "",
		"delegeteBillNo": "",
		"reportGateType": "",
		"delegete": "",
		"supplier": "",
		"client": "",
		"bizDate": "",
		"carTurn": "",
		"receiveStatus": "",
		"summary": "",
		"pieces": "",
		"areaCode": "",
		"carrier": "",
		"planTime": "",
		"auditor": "",
		"originator": ""

      };

    _.assign(this, defaults);
}
