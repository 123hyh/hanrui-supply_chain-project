import _ from 'lodash';

export default function () {
    // 实体：委托方客户联系人
    let defaults = {
		"id": "",
		"tenantId": "hfy",
		"itemCode": "",
		"clientNo": "",
		"leader": "",
		"duty": "",
		"tel": "",
		"phone": "",
		"email": "",
		"wxNo": "",
		"qq": "",
		"birthday": "",
		"otherInfo": ""

      };

    _.assign(this, defaults);
}
