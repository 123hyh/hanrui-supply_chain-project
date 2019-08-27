import _ from 'lodash';

export default function () {
    // 实体：关务海关单位转换表
    let defaults = {
		"id": "",
		"tenantId": "",
		"unitConvertCode": "",
		"originalUnit": "",
		"targetUnit": "",
		"remark": ""

      };

    _.assign(this, defaults);
}
