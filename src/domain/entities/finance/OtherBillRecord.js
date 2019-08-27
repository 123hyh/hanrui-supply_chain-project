import _ from 'lodash';

export default function () {
    // 实体：其他计费单子表-修改记录
    let defaults = {
		"id": "",
		"tenantId": "hfy",
		"itemCode": "",
		"billNo": "",
		"billName": "",
		"updateCol": "",
		"preValues": "",
		"aftValues": ""

      };

    _.assign(this, defaults);
}
