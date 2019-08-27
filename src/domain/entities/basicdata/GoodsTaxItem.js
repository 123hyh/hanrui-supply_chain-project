import _ from 'lodash';

export default function () {
    // 实体：商品税号子表
    let defaults = {
		"id": "",
		"tenantId": "",
		"goodsTaxCode": "",
		"itemCode": "",
		"goodsName": "",
		"description": "",
		"param": false

      };

    _.assign(this, defaults);
}
