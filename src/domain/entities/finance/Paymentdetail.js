import _ from 'lodash';

export default function () {
    // 实体：付款明细表
    let defaults = {
		"id": "",
		"tenantId": "hfy",
		"billNo": "",
		"amount": "",
		"baseCurrency": "",
		"costCenter": "",
		"feeType": "",
		"otherSubject": "",
		"flowedOutPlannedItem": "",
		"remark": "",
		"billMoney": "",
		"billType": "",
		"incidentalAmount": "",
		"entrustPayAmount": "",
		"exchangeRateOnPayDay": "",
		"supplier": ""

      };

    _.assign(this, defaults);
}
