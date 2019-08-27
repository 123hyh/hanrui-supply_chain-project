import _ from 'lodash';

export default function () {
    // 实体：香港收货登记子表
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
		"quantity": "",
		"unit": "",
		"netWeight": "",
		"grossWeight": "",
		"shippingMarks": "",
		"boxNoStart": "",
		"boxNoEnd": "",
		"boxCount": ""

      };

    _.assign(this, defaults);
}
