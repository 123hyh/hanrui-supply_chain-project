import _ from 'lodash';

export default function () {
    // 实体：境内货源地
    let defaults = {
		"id": "",
		"tenantId": "hfy",
		"goodsPlaceCode": "",
		"goodsPlaceName": "",
		"goodsPlaceAbb": "",
		"customsCode": "",
		"description": ""

      };

    _.assign(this, defaults);
}
