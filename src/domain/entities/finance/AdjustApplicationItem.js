import _ from 'lodash';

export default function () {
    // 实体：账务调整申请单子表
    let defaults = {
		"id": "",
		"tenantId": "hfy",
		"itemCode": "",
		"billNo": "",
		"entrustOrderNo": "",
		"originalProject": "",
		"accruedAmount": "",
		"invoicedAmount": "",
		"pledgedAmount": "",
		"adjustClassify": "",
		"adjustRatio": "",
		"adjustAccruedAmount": "",
		"adjustCostAmount": "",
		"invoice": false,
		"applicantAdjustReasons": "",
		"adjustFeeProject": "",
		"adjustStatus": false

      };

    _.assign(this, defaults);
}
