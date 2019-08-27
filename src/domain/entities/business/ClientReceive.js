import _ from 'lodash';

export default function () {
    // 实体：委托方收货资料
    let defaults = {
		"id": "",
		"tenantId": "hfy",
		"itemCode": "",
		"clientNo": "",
		"receiveArea": "",
		"consignee": "",
		"receiveAddress": "",
		"contactTel": "",
		"phoneA": "",
		"phoneB": "",
		"postcode": "",
		"remark": ""

      };

    _.assign(this, defaults);
}
