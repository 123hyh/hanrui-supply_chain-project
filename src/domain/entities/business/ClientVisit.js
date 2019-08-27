import _ from 'lodash';

export default function () {
    // 实体：委托方客户拜访记录
    let defaults = {
		"id": "",
		"tenantId": "hfy",
		"itemCode": "",
		"clientNo": "",
		"followPerson": "",
		"followTime": "",
		"followInfo": "",
		"contact": ""

      };

    _.assign(this, defaults);
}
