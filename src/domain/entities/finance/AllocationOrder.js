import _ from 'lodash';

export default function () {
    // 实体：资金调拨单
    let defaults = {
		"id": "",
		"tenantId": "hfy",
		"billNo": "",
		"company": "",
		"attachmentNumbers": "",
		"bizDate": "",
		"type": "",
		"costCenter": "",
		"outCurrency": "",
		"outAccount": "",
		"outSubject": "",
		"outAmount": "",
		"outLocalRate": "",
		"outLocalAmount": "",
		"outPlanProject": "",
		"allocationRate": "",
		"outBalnce": "",
		"intoCurrency": "",
		"intoAccount": "",
		"intoSubject": "",
		"intoAmount": "",
		"intoLocalRate": "",
		"intoLocalAmount": "",
		"intoPlanProject": "",
		"trustees": "",
		"intoBalnce": "",
		"summary": "",
		"feeCurrency": "",
		"feeAccount": "",
		"costSubject": "",
		"feeAmount": "",
		"feeLocalRate": "",
		"feeLocalAmount": "",
		"feeProject": "",
		"feePlanProject": "",
		"exchange": "",
		"lossSubject": "",
		"lossPlanProject": "",
		"reviewer": "",
		"cashier": "",
		"accounting": ""

      };

    _.assign(this, defaults);
}
