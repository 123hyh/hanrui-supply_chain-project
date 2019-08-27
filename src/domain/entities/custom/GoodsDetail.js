import _ from 'lodash';

export default function () {
    // 实体：报关单子表-商品明细
    let defaults = {
		"id": "",
		"tenantId": "hfy",
		"itemCode": "",
		"customsFormCode": "",
		"delegeteBillNo": "",
		"orderNos": "",
		"goodsName": "",
		"taxNo": "",
		"attachNo": "",
		"tradeName": "",
		"specificationType": "",
		"brand": "",
		"brandType": "",
		"paramNo": "",
		"originPlace": "",
		"desCountry": "",
		"planNumber": "",
		"unitName": "",
		"netWeight": "",
		"grossWeight": "",
		"transactionPrice": "",
		"quantity": "",
		"transactionAmount": "",
		"boxNumber": "",
		"superConditions": "",
		"boxNo": "",
		"transactionNumber": "",
		"transactionUnitCode": "",
		"transactionUnitName": "",
		"legalNumber": "",
		"legalUnitCode": "",
		"legalUnitName": "",
		"secondNumber": "",
		"secondUnitCode": "",
		"secondUnitName": "",
		"freeCharge": "",
		"declaredModel": "",
		"accAmount": "",
		"unAmount": "",
		"hasAmount": "",
		"totalAmount": "",
		"batchNo": "",
		"superModel": "",
		"customsWiew": "",
		"exportEnjoyment": "",
		"iqPlusCode": "",
		"cargoAttribute": "",
		"iqName": "",
		"plusNumber": ""

      };

    _.assign(this, defaults);
}
