import _ from 'lodash';

export default function () {
    // 实体：协议管理阶梯报价
    let defaults = {
		"id": "",
		"tenantId": "hfy",
		"itemCode": "",
		"solutionNo": "",
		"start": "",
		"end": "",
		"rate": ""

      };

    _.assign(this, defaults);
}
