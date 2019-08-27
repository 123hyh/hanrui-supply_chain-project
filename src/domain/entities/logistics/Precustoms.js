import _ from 'lodash';

export default function () {
    // 实体：待报关列表
    let defaults = {
		"id": "",
		"tenantId": "hfy",
		"preCustomsCode": "",
		"trusteeCode": "",
		"godownEntryCode": "",
		"warehouseCode": "",
		"customsFormType": "",
		"falAgency": false,
		"preAgency": false,
		"contractNo": "",
		"deliveryNo": "",
		"carNo": "",
		"customsType": "",
		"entryPort": "",
		"conveyance": "",
		"loadingTime": "",
		"paperPages": "",
		"totalItem": "",
		"customBoxQuantity": "",
		"originOrder": "",
		"orderStatus": "",
		"customsStatus": "",
		"containerNo": "",
		"containerModel": "",
		"voyageNo": "",
		"vehicleSequence": "",
		"remark": "",
		"packageKind": "",
		"grossWeight": "",
		"brandConfirm": ""

      };

    _.assign(this, defaults);
}
