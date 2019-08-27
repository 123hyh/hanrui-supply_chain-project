import _ from 'lodash';

export default function () {
    // 实体：报关单基本资料
    let defaults = {
		"id": "",
		"tenantId": "hfy",
		"customsFormCode": "",
		"customsNo": "",
		"customsType": "",
		"customsStatusCode": "",
		"customsStatus": "",
		"preCode": "",
		"uniformCode": "",
		"billStatus": "",
		"customsFormType": "",
		"collectTax": "",
		"createWms": "",
		"remittance": "",
		"myInsure": "",
		"payTax": "",
		"shouldPay": "",
		"serviceCharge": "",
		"agentReceive": "",
      };

    _.assign(this, defaults);
}
