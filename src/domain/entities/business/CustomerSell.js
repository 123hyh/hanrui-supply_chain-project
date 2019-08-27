import _ from 'lodash';

export default function () {
    // 实体：供应链客户销售资料
    let defaults = {
		"id": "",
		"tenantId": "hfy",
		"itemCode": "",
		"customerNo": "",
		"organizationCode": "",
		"organizationName": "",
		"channelSalesCode": "",
		"channelSalesName": "",
		"receivableCustCode": "",
		"receivableCustName": "",
		"receiptCustCode": "",
		"receiptCustName": "",
		"deliverCustCode": "",
		"deliverCustName": "",
		"leadTime": "",
		"deliveryPriority": "",
		"discount": "",
		"status": "",
		"invoiceRemark": "",
		"containAgencyInvoice": false,
		"containInvoice": false

      };

    _.assign(this, defaults);
}
