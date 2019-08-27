import _ from 'lodash';

export default function () {
    // 实体：收货通知单子表-基本信息
    let defaults = {
		"id": "",
		"tenantId": "hfy",
		"itemCode": "",
		"receiptOrderCode": "",
		"materialCode": "",
		"materialName": "",
		"ruleType": "",
		"batchNo": "",
		"taxNo": "",
		"attachNo": "",
		"brand": "",
		"originPlace": "",
		"quantity": "",
		"unit": "",
		"netWeight": "",
		"grossWeight": "",
		"shippingMarks": "",
		"boxNoStart": "",
		"boxNoEnd": "",
		"boxCount": "",
		"warehouse": "",
		"storehouse": "",
		"warehousingCountAll": "",
		"purchaseOrderNo": "",
		"purchaseOrderRowNo": "",
		"remark": "",
		"purchaseOrg": "",
		"hasIncomingNo": "",
		"incomeInvoiceNo": "",
		"auditor": "",
		"originator": ""

      };

    _.assign(this, defaults);
}
