import _ from 'lodash';

export default function () {
    // 实体：发运单子表-物料信息
    let defaults = {
		"id": "",
		"tenantId": "hfy",
		"itemCode": "",
		"shipmentBaseCode": "",
		"delegeteBillNo": "",
		"entrustOrderNos": "",
		"materialCode": "",
		"materialName": "",
		"specificationType": "",
		"batchNo": "",
		"unit": "",
		"price": "",
		"quantity": "",
		"amount": "",
		"shipper": "",
		"stockGroup": "",
		"shipWarehouse": "",
		"remark": "",
		"storehouse": "",
		"boxNoStart": "",
		"boxNoEnd": "",
		"shippingMarks": "",
		"incomeInvoiceNo": ""

      };

    _.assign(this, defaults);
}
