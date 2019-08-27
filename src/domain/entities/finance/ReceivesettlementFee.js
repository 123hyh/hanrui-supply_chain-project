import _ from 'lodash';

export default function () {
    // 实体：应收结算单子表-计费信息
    let defaults = {
		"id": "",
		"tenantId": "hfy",
		"itemCode": "",
		"billNo": "",
		"feeProject": "",
		"paymentType": "",
		"happenTime": "",
		"soureceCurrency": "",
		"sourceAmount": "",
		"settleCurrency": "",
		"settleRate": "",
		"countSettleAmount": "",
		"insideAmount": "",
		"reAndPay": "",
		"payableAmount": "",
		"receivablesDate": "",
		"invoice": "",
		"invoiceRate": "",
		"settleType": "",
		"settleUnitName": "",
		"settleUnitNameAmount": "",
		"hasOffAmount": "",
		"hasPledgedAmount": "",
		"depositAmount": "",
		"hasPledgedDeposit": "",
		"applicationAmount": "",
		"description": "",
		"sourceOrderCode": "",
		"exchangeFormula": "",
		"discountType": "",
		"interestVat": ""

      };

    _.assign(this, defaults);
}
