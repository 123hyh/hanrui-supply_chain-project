import _ from 'lodash';

export default function () {
    // 实体：代付款明细表
    let defaults = {
		"id": "",
		"tenantId": "hfy",
		"entrustpayBillNo": "",
		"delegeteBillNo": "",
		"accountKeepingOnly": "",
		"delegetePayAmount": "",
		"sellerSalesAmount": "",
		"sellerMoneyType": "",
		"thisPaymentAmount": "",
		"paymentTerm": "",
		"reportGateType": "",
		"bizType": "",
		"sellerSalesExchangeRate": "",
		"incidentalPayAmount": "",
		"incidentalMoneyType": "",
		"incidentalExchangeRate": "",
		"exchangeRateDiffDeal": "",
		"exchangeRateDiffAmount": "",
		"calculationFormula": "",
		"exchangeRateDiff": "",
		"businessReceiptsFormula": "",
		"substitutionInvoice": "",
		"remark": "",
		"paided": false,
		"paidAmount": "",
		"payTime": "",
		"goodsPaymentExchangeRateAs": "",
		"goodsPaymentExchangeRateTime": "",
		"goodsPaymentExchangeRate": "",
		"priceIncomeExchangeRate": "",
		"shouldReceiptsAmount": "",
		"agreementPaymentNature": "",
		"dealingName": "",
		"dealingNameEn": "",
		"appointTrusteeCompany": "",
		"superiorSupplier": "",
		"agentPayAmount": "",
		"advancePayAmount": "",
		"advancePayAccountPeriod": "",
		"eChainApplyAmount": "",
		"eChainDelegeteAmount": ""

      };

    _.assign(this, defaults);
}
