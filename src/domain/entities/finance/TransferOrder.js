import _ from 'lodash';

export default function () {
    // 实体：转款单
    let defaults = {
		"id": "",
		"tenantId": "hfy",
		"billNo": "",
		"transferType": "",
		"bizDate": "",
		"bizStatus": "",
		"originalPaymentAddress": "",
		"outInfo": "",
		"outEntrust": "",
		"settlementAdvice": "",
		"outCustomer": "",
		"outSupplier": "",
		"outSettlementMethod": "",
		"outAmount": "",
		"outCurrency": "",
		"canTransferAmount": "",
		"canTransferCurrency": "",
		"outRmbRate": "",
		"paymentDayRate": "",
		"transferReason": "",
		"intoInfo": "",
		"intoEntrust": "",
		"intoCustomer": "",
		"intoSupplier": "",
		"intoSettlementMethod": "",
		"intoAmount": "",
		"intoCurrency": "",
		"intoCurrencyRate": "",
		"intoRmbRate": "",
		"shippingRate": "",
		"sinkDifference": "",
		"remark": ""

      };

    _.assign(this, defaults);
}
