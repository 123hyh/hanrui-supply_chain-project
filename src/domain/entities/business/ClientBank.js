import _ from 'lodash';

export default function () {
    // 实体：委托方银行信息
    let defaults = {
		"id": "",
		"tenantId": "hfy",
		"itemCode": "",
		"clientNo": "",
		"bankName": "",
		"bankCardNo": "",
		"bankAddress": "",
		"userName": "",
		"bankArea": "",
		"currency": ""

      };

    _.assign(this, defaults);
}
