import _ from 'lodash';

export default function () {
    // 实体：委托方开票资料
    let defaults = {
		"id": "",
		"tenantId": "hfy",
		"itemCode": "",
		"clientNo": "",
		"invoiceShortName": "",
		"invoiceName": "",
		"invoiceAddress": "",
		"invoiceTel": "",
		"invoiceEmail": "",
		"invoiceFile": "",
		"invoiceSendMode": "",
		"remark": ""

      };

    _.assign(this, defaults);
}
