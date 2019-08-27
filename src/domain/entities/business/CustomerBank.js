import _ from 'lodash';

export default function () {
    // 实体：供应链客户开户银行
    let defaults = {
		"id": "",
		"tenantId": "hfy",
		"itemCode": "",
		"customerNo": "",
		"bankName": "",
		"bankNo": "",
		"bankAddress": "",
		"userName": "",
		"currency": "",
		"bankArea": ""

      };

    _.assign(this, defaults);
}
