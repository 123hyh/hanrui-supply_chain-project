import _ from 'lodash';

export default function () {
    // 实体：深圳收货子表
    let defaults = {
		"id": "",
		"tenantId": "hfy",
		"billNo": "",
		"itemCode": "",
		"materialCode": "",
		"materialName": "",
		"specificationType": "",
		"batchNo": "",
		"taxNo": "",
		"attachNo": "",
		"brand": "",
		"originPlace": "",
		"originPlaceName": "",
		"quantity": "",
		"unit": "",
		"netWeight": "",
		"grossWeight": "",
		"shippingMarks": "",
		"boxNoStart": "",
		"boxNoEnd": "",
		"boxCount": "",
		"warehouse": "",
		"warehouseName": "",
		"storehouse": "",
		"warehousingCountAll": "",
		"purchaseOrderNo": "",
		"purchaseOrderRowNo": "",
		"remark": "",
		"purchaseOrg": "",
		"warehousingCount": "",
		"incomeInvoiceNo": ""

      };

    _.assign(this, defaults);
}
