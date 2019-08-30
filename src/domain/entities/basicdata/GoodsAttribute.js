import _ from 'lodash';

export default function () {
    // 实体：货物属性代码表
    let defaults = {
		"id": "",
		"tenantId": "hfy",
		"billNo": "",
		"attrName": "",
		"customsCode": "",
		"description": "",
		"status": ""

      };

    _.assign(this, defaults);
}
