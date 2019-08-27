import _ from 'lodash';

export default function () {
    // 实体：融资授信抵押物
    let defaults = {
		"id": "",
		"tenantId": "hfy",
		"itemCode": "",
		"creditNo": "",
		"pawnNo": "",
		"pawnorCode": "",
		"pawnorName": "",
		"pawn": "",
		"currency": "",
		"exchangeRate": "",
		"originalPrice": "",
		"originalPriceProof": "",
		"appraisalValue": "",
		"evaluationOrganization": "",
		"evaluationMode": "",
		"mortgageRate": "",
		"customerLimit_Credit": "",
		"startDate": "",
		"endDate": "",
		"creditLimit": "",
		"remark": ""

      };

    _.assign(this, defaults);
}
