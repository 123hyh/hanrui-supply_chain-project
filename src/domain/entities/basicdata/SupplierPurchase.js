import _ from 'lodash';

export default function () {
    // 实体：供应商采购信息
    let defaults = {
		"id": "",
		"tenantId": "",
		"supplierCode": "",
		"purchaseCode": "",
		"purchaseName": "",
		"purchaseCompany": "",
		"deliveryCompany": "",
		"supplierLevel": "",
		"purchaseStatus": "",
		"remarks": ""

      };

    _.assign(this, defaults);
}
