import _ from 'lodash';

export default function () {
    // 实体：报关单子表-随附单证
    let defaults = {
		"id": "",
		"tenantId": "hfy",
		"itemCode": "",
		"customsFormCode": "",
		"customsAttachedCode": "",
		"customsAttachedNo": ""

      };

    _.assign(this, defaults);
}
