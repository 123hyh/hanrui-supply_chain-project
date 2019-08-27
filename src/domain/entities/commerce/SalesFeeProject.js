import _ from 'lodash';

export default function () {
    // 实体：销售订单计费项目
    let defaults = {
		"id": "",
		"tenantId": "hfy",
		"salesOrderCode": "",
		"feeProject": "",
		"feeProjectName": "",
		"amount": ""

      };

    _.assign(this, defaults);
}
