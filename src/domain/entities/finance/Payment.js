import _ from 'lodash';

export default function () {
    // 实体：付款单
    let defaults = {
		"id": "",
		"tenantId": "hfy",
		"company": "",
		"agentPaymentCompany": "",
		"bizDate": "",
		"billNo": "",
		"receiptsAndPaymentsType": "",
		"immediateBalance": "",
		"paymentType": "",
		"payMoneyType": "",
		"payAmount": "",
		"exchangeRate": "",
		"baseCurrency": "",
		"paymentAccount": "",
		"paymentSubject": "",
		"paymentBank": "",
		"bizType": "",
		"settlementMethod": "",
		"settlementNo": "",
		"flowedOutPlannedItem": "",
		"department": "",
		"repulseOpinion": "",
		"flowedInPlannedItem": "",
		"costCenter": "",
		"receiverType": "",
		"receiverName": "",
		"receiverAccount": "",
		"receiverBank": "",
		"receiverCountry": "",
		"receiverProvince": "",
		"receiverCityCountry": "",
		"urgent": false,
		"project": "",
		"projectManager": "",
		"differentPlaceSameCity": "",
		"sameBankDifferentBank": "",
		"receiverRegion": "",
		"otherReceiverSubject": "",
		"purpose": "",
		"summary": "",
		"attachmentCount": "",
		"sourcePaymentType": "",
		"billCreator": "",
		"modifier": "",
		"auditor": "",
		"approver": "",
		"cashier": "",
		"accounting": ""

      };

    _.assign(this, defaults);
}
