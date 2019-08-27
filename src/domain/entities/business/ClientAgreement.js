import _ from 'lodash';

export default function () {
    // 实体：委托方协议明细
    let defaults = {
		"id": "",
		"tenantId": "hfy",
		"itemCode": "",
		"clientNo": "",
		"agreementName": "",
		"agreementCode": "",
		"signDate": "",
		"status": ""

      };

    _.assign(this, defaults);
}
