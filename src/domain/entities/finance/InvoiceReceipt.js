import _ from 'lodash';

export default function () {
    // 实体：发票签收单
    let defaults = {
		"id": "",
		"tenantId": "hfy",
		"billNo": "",
		"status": "",
		"outOrderType": "",
		"outOrderCode": "",
		"customer": "",
		"receiver": "",
		"outTime": "",
		"invoiceNo": "",
		"followGoods": false,
		"remark": "",
		"reviewer": "",
		"reviewTime": ""

      };

    _.assign(this, defaults);
}
