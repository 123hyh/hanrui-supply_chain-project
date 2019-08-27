import _ from 'lodash';

export default function () {
    // 实体：供应商货仓提货地址
    let defaults = {
		"id": "",
		"tenantId": "",
		"supplierCode": "",
		"deliveryCompanyCode": "",
		"deliveryCompanyName": "",
		"liaisonPerson": "",
		"shippingCompany": "",
		"supplierLevel": "",
		"cashDiscount": "",
		"defaultPurchaseGroup": ""

      };

    _.assign(this, defaults);
}
