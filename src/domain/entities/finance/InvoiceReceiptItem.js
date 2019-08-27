import _ from 'lodash';

export default function () {
    // 实体：发票签收单子表
    let defaults = {
		"id": "",
		"tenantId": "hfy",
		"itemCode": "",
		"billNo": "",
		"customer": "",
		"invoiceNo": "",
		"invoiceType": "",
		"receivableNo": "",
		"invoiceAmount": ""

      };

    _.assign(this, defaults);
}
