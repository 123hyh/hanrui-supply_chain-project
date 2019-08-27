import _ from 'lodash';

export default function () {
    // 实体：认款单子表
    let defaults = {
		"id": "",
		"tenantId": "hfy",
		"itemCode": "",
		"billNo": "",
		"documentaryPerson": "",
		"receiptPerson": "",
		"entrustOrderNo": "",
		"bizType": "",
		"declareCustoms": "",
		"feeNo": "",
		"feeProject": "",
		"settlementAmount": "",
		"hasSubscribedAmount": "",
		"subscribedAmount": "",
		"singleCurrency": "",
		"setUpTime": "",
		"receivablesDate": "",
		"collectionDate": "",
		"remark": ""

      };

    _.assign(this, defaults);
}
