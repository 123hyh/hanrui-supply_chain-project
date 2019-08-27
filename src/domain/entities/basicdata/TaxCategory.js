import _ from 'lodash';

export default function () {
    // 实体：税种表
    let defaults = {
		"id": "",
		"tenantId": "hfy",
		"billCode": "",
		"taxCategoryCode": "",
		"taxCategoryName": "",
		"tax": "",
		"taxType": "",
		"description": ""

      };

    _.assign(this, defaults);
}
