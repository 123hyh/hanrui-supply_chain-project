import _ from 'lodash';

export default function () {
    // 实体：供应链客户委托方
    let defaults = {
		"id": "",
		"tenantId": "hfy",
		"itemCode": "",
		"customerNo": "",
		"clientNo": "",
		"clientName": ""

      };

    _.assign(this, defaults);
}
