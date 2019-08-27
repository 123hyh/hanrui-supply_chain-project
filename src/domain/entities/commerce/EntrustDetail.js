import _ from 'lodash';

export default function () {
    // 实体：委托订单收货报关明细
    let defaults = {
		"id": "",
		"tenantId": "hfy",
		"itemCode": "",
		"entrustOrderNo": "",
		"orderType": "",
		"orderCode": "",
		"orderNo": "",
		"date": "",
		"model": "",
		"quantity": ""

      };

    _.assign(this, defaults);
}
