import _ from 'lodash';

export default function () {
    // 实体：进口报关计划单
    let defaults = {
		"id": "",
		"tenantId": "hfy",
		"planOrderNo": "",
		"depart": "",
		"customTitle": "",
		"status": "",
		"waitCustomList": "",
		"dealMode": "",
		"customOrderPrice": "",
		"customType": "",
		"unitType": "",
		"customContractNo": "",
		"carSort": "",
		"customOrderNo": "",
		"carNumber": "",
		"businessUnitCode": "",
		"businessUnitName": "",
		"transportMachine": "",
		"loadingDate": "",
		"flightNo": "",
		"declarationUnitCode": "",
		"declarationUnitName": "",
		"receiveUnitCode": "",
		"receiveUnitName": "",
		"deliveryOrderNo": "",
		"containerNo": "",
		"lastOrder": "",
		"quantity": "",
		"grossWeight": "",
		"netWeight": "",
		"customCurrency": "",
		"goodsCode": "",
		"goodsName": "",
		"customBoxQuantity": "",
		"totalItem": "",
		"totalAmount": "",
		"packageKind": "",
		"paperPages": "",
		"customDate": "",
		"wmsGenerate": "",
		"remark": "",
		"auditor": "",
		"auditTime": ""

      };

    _.assign(this, defaults);
}
