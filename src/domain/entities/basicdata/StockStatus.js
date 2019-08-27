import _ from 'lodash';

export default function () {
    // 实体：库存状态
    let defaults = {
		"id": "",
		"stockStatusCode": "",
		"stockStatus": "",
		"status": "",
		"jzAmount": "",
		"description": ""

      };

    _.assign(this, defaults);
}
