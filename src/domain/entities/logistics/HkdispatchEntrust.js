import _ from 'lodash';

export default function () {
    // 实体：调度单子表-委托信息
    let defaults = {
		"tenantId": "hfy",
		"dispatchOrderCode": "",
		"entrustOrderNo": "",
		"consignor": "",
		"consiCompany": "",
		"consignee":"",
		"telePhone":"",
		"address":"",
		"shipTime":"",
		"deliveryNo":"",
		"carTimes":"",
		"termNumber":"",
		"grossWeight":"",
		"weight":"",
		"transportTime":"",
		"timeType":"",
		"cardNo":"",
		"remark":"",
      };

    _.assign(this, defaults);
}
