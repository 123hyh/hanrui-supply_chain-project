import _ from 'lodash';

export default function () {
    // 实体：商品税号
    let defaults = {
		"id": "",
		"tenantId": "",
		"goodsTaxCode": "",
		"goodsName": "",
		"taxNo": "",
		"attachNo": "",
		"submission": false,
		"declaration": false,
		"supervisionConditions": "",
		"minTariff": "",
		"rebateRate": "",
		"inRemark": "",
		"exRemark": "",
		"tradeType": "",
		"declarationType": "",
		"aveNetWeight": "",
		"riskNetWeight": "",
		"codeVersion": "",
		"inspectionNo": "",
		"taxClassifyNo": "",
		"taxClassifyName": "",
		"favouredPolicy": false,
		"inspectionName": "",
		"policyContent": ""

      };

    _.assign(this, defaults);
}
