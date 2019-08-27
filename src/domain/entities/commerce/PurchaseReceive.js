import _ from 'lodash';

export default function () {
    // 实体：采购订单收货信息
    let defaults = {
		"id": "",
		"tenantId": "hfy",
		"itemCode": "",
		"purchaseOrderNo": "",
		"billNo": "",
		"arrivalDate": "",
		"billStatus": "",
		"receiveType": "",
		"expressNo": "",
		"carrierCode": "",
		"carrierName": "",
		"cardBoardQuantity": "",
		"boxQuantity": "",
		"singleBoxQuantity": "",
		"inStorageRemark": "",
		"storehouse": "",
		"remark": ""

      };

    _.assign(this, defaults);
}
