import _ from 'lodash';

export default function () {
    // 实体：应收结算单
    let defaults = {
		"id": "",
		"tenantId": "hfy",
		"billNo": "",
		"delegeteBillNo": "",
		"contractNo": "",
		"delegeteBillType": "",
		"company": "",
		"delegate": "",
		"settlementUnitType": "",
		"settlementUnit": "",
		"invoiceWithGoods": false,
		"carrierType": "",
		"vehicleOrder": "",
		"state": "",
		"abroadIncidental": "",
		"paymentSettlementMethod": "",
		"payDate": "",
		"takeTicketDate": "",
		"moneyType": ""

      };

    _.assign(this, defaults);
}
