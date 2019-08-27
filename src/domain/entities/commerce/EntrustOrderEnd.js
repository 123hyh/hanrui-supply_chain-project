import _ from 'lodash';

export default function () {
    // 实体：委托订单尾表
    let defaults = {
		"id": "",
		"tenantId": "hfy",
		"itemCode": "",
		"entrustOrderNo": "",
		"pickUpType": "",
		"orderType": "",
		"remark": "",
		"specialTips": "",
		"serviceCharge": "",
		"invoiceRemark": "",
		"goodsValue": "",
		"sellerCurrency": "",
		"trusteePayGoodsAmount": "",
		"trusteeCurrency": "",
		"matPayment": false,
		"refundCustomerAmount": "",
		"refundCurrency": "",
		"InStorage": false,
		"paidGoodsAmount": "",
		"paidCurrency": "",
		"vatTotalAmount": "",
		"vatCurrency": "",
		"customTotalAmount": "",
		"customCurrency": "",
		"invoiceAmount": "",
		"invoiceCurrency": "",
		"dayRate": "",
		"chargeInterest": false,
		"invoiceType": false,
		"minCharge": "",
		"minChargeCurrency": "",
		"totalServiceCharge": "",
		"serviceCurrency": "",
		"advanceActualAmount": "",
		"actualCurrency": "",
		"advanceAmount": "",
		"advanceCurrency": "",
		"advanceReceivableDate": "",
		"supplierPayMode": ""

      };

    _.assign(this, defaults);
}
