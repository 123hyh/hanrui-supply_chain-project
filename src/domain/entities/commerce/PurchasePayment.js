import _ from 'lodash';

export default function () {
    // 实体：采购订单付款信息
    let defaults = {
		"id": "",
		"tenantId": "hfy",
		"itemCode": "",
		"purchaseOrderNo": "",
		"entrustNo": "",
		"entrustPaymentNo": "",
		"paymentNature": "",
		"paymentAmount": "",
		"paymentCurrency": "",
		"settlementMode": "",
		"paymentUnitCode": "",
		"paymentUnitName": "",
		"paymentLimit": ""

      };

    _.assign(this, defaults);
}
