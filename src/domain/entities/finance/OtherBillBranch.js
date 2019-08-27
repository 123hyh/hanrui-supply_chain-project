import _ from 'lodash';

export default function () {
    // 实体：其他计费单子表-分录
    let defaults = {
		"id": "",
		"tenantId": "hfy",
		"itemCode": "",
		"billNo": "",
		"receiveUnit": "",
		"payableUnit": "",
		"entrustOrderNo": "",
		"entrustOrderType": "",
		"clientCode": "",
		"receiveUnitType": "",
		"occurrenceDate": "",
		"payableUnitType": "",
		"feeProject": "",
		"makePrice": "",
		"currency": "",
		"payableAmount": "",
		"receiveAmount": "",
		"inSettlementPrice": "",
		"settlementMethod": "",
		"paymentTime": "",
		"paymenter": ""

      };

    _.assign(this, defaults);
}
