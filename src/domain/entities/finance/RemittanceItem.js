import _ from 'lodash';

export default function () {
    // 实体：调汇申请单子表
    let defaults = {
		"id": "",
		"tenantId": "hfy",
		"itemCode": "",
		"billNo": "",
		"paymentSubject": "",
		"paymentBank": "",
		"resourceCurrency": "",
		"resourceAmount": "",
		"paymentCurrency": "",
		"rate": "",
		"remittanceAmount": "",
		"paymentDate": "",
		"interestRate": "",
		"interestDate": "",
		"dueDate": "",
		"interestMethod": "",
		"interest": "",
		"yearInterest": "",
		"yearInterestTime": "",
		"crossYearInterest": "",
		"crossYearInterestTime": "",
		"reciprocatingType": "",
		"reciprocatingCode": "",
		"reciprocatingName": "",
		"receiptAccount": "",
		"receiptBank": "",
		"receiptAccountNo": "",
		"receiptSubject": "",
		"generateCode": "",
		"actualAmount": "",
		"actualResourceAmount": "",
		"actualResourceCurrency": "",
		"hkRemark": ""

      };

    _.assign(this, defaults);
}
