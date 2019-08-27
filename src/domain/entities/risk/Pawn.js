import _ from 'lodash';

export default function () {
    // 实体：抵押物管理
    let defaults = {
		"id": "",
		"tenantId": "hfy",
		"pawnNo": "",
		"pawn": "",
		"type": "",
		"pawnType": "",
		"pawnorCode": "",
		"pawnorName": "",
		"pawnUnit": "",
		"pawnQuantity": "",
		"debtorCode": "",
		"debtorName": "",
		"pawnCompanyType": "",
		"pawnCompanyCode": "",
		"pawnCompanyName": "",
		"isNotePawn": "",
		"noteType": "",
		"noteName": "",
		"currency": "",
		"exchangeRate": "",
		"originalPrice": "",
		"originalPriceCurrency": "",
		"originalPriceProof": "",
		"appraisalValue": "",
		"evaluationMode": "",
		"evaluationOrganization": "",
		"mortgageValue": "",
		"mortgageRate": "",
		"isCustody": "",
		"custodyFee": "",
		"startDate": "",
		"endDate": "",
		"creditLimit": "",
		"repealPersonId": "",
		"repealPersonName": "",
		"repealTime": "",
		"status": "",
		"remark": "",
		"auditor": "",
		"auditTime": ""

      };

    _.assign(this, defaults);
}
