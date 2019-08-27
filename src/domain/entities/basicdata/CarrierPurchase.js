import _ from 'lodash';

export default function () {
    // 实体：承运商采购信息表
    let defaults = {
		"id": "",
		"tenantId": "",
		"carrierCode": "",
		"purchaseCode": "",
		"purchaseName": "",
		"purchaseCompany": "",
		"deliveryCompany": "",
		"supplierLevel": "",
		"purchaseStatus": "",
		"remark": ""

      };

    _.assign(this, defaults);
}
