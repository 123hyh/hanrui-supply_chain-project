import _ from 'lodash';

export default function () {
    // 实体：承运商货仓提货地址
    let defaults = {
		"id": "",
		"tenantId": "",
		"carrierCode": "",
		"deliveryCompanyCode": "",
		"deliveryCompanyName": "",
		"liaisonPerson": "",
		"shippingCompany": "",
		"carrierLevel": "",
		"cashDiscount": "",
		"defaultPurchaseGroup": ""

      };

    _.assign(this, defaults);
}
