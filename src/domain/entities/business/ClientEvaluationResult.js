import _ from 'lodash';

export default function () {
    // 实体：委托方评估结果
    let defaults = {
		"id": "",
		"tenantId": "hfy",
		"itemCode": "",
		"clientEvaluationNo": "",
		"customerType": "",
		"ensureMeasure": "",
		"accountPeriod": "",
		"customerLimit": "",
		"limitUse": "",
		"applyDayRate": "",
		"applyCount": "",
		"prePaymentScale": "",
		"receiveMethod": "",
		"remark": ""

      };

    _.assign(this, defaults);
}
