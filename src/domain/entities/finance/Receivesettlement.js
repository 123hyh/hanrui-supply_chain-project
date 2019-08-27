import _ from 'lodash';

export default function () {
    // 实体：应收结算单
    let defaults = {
		"id": "",
		"tenantId": "hfy",
		"billNo": "",
		"receiveDate": "",
		"settleCurrency": "",
		"delegeteBillNo": "",
		"lookEntrustOrder": "",
		"client": "",
		"customer": "",
		"company": "",
		"protocolQuery": "",
		"paymentType": "",
		"settlementMethod": "",
		"salesGroup": "",
		"lookOutStore": "",
		"status": "",
		"totalAmount": "",
		"bizType": "",
		"pricingProposal": "",
		"declareCustoms": "",
		"bizReceivable": "",
		"invoiceType": "",
		"taxCategory": "",
		"taxRate": "",
		"financialReceivables": "",
		"reportDate": "",
		"closureAmount": "",
		"parityFigure": "",
		"initDocuments": false,
		"hasGenerated": false,
		"noAddedTax": false,
		"freeShipmentFee": false,
		"noOverTax": false,
		"noOverInterest": false,
		"hasOverInterest": false,
		"agentBilling": false,
		"hasStatement": false,
		"guaranteeCustomers": false,
		"hasCommissionImport": false,
		"hasCheck": false,
		"commissionOne": "",
		"commissionTwo": "",
		"agentToEntrust": false,
		"remark": ""

      };

    _.assign(this, defaults);
}
