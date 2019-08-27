import _ from 'lodash';

export default function () {
    // 实体：关务物料
    let defaults = {
		"id": "",
		"tenantId": "",
		"customsMaterielCode": "",
		"tradeName": "",
		"taxNo": "",
		"attachNo": "",
		"minTariff": "",
		"maxTariff": "",
		"submission": false,
		"declaration": false,
		"supervisionConditions": "",
		"imRemarks": "",
		"exRemarks": "",
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
