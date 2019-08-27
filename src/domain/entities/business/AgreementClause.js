import _ from 'lodash';

export default function () {
    // 实体：协议管理商务条款
    let defaults = {
		"id": "",
		"tenantId": "hfy",
		"itemCode": "",
		"solutionNo": "",
		"chargeItemCode": "",
		"chargeItemName": "",
		"inprice": false,
		"outprice": false,
		"remark": ""

      };

    _.assign(this, defaults);
}
