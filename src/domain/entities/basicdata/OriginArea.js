import _ from 'lodash';

export default function () {
    // 实体：原产地区代码表
    let defaults = {
		"id": "",
		"tenantId": "hfy",
		"billNo": "",
		"areaName": "",
		"customsCode": "",
		"description": "",
		"status": ""

      };

    _.assign(this, defaults);
}
