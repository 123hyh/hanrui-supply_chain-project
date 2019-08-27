import _ from 'lodash';

export default function () {
    // 实体：仓库状态
    let defaults = {
		"id": "",
		"warehouseStatusCode": "",
		"warehouseStatus": "",
		"jzAmount": "",
		"description": ""

      };

    _.assign(this, defaults);
}
