import _ from 'lodash';
export default function () {
    // 实体：付款申请单
    let defaults = {
		"id": "",
		"tenantId": "hfy",
		"billNo": "",
		"multipleBill": false,
		"refundAllowedWhenArrears": false,
		'entrustOrderNo': "",
      };
    _.assign(this, defaults);
}
