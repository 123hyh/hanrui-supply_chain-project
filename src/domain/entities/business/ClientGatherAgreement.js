import _ from 'lodash';

export default function () {
    // 实体：委托方供应商委托收款协议
    let defaults = {
		"id": "",
		"tenantId": "hfy",
		"itemCode": "",
		"clientNo": "",
		"partyA": "",
		"partyB": "",
		"signDate": "",
		"hasAttachment": false

      };

    _.assign(this, defaults);
}
