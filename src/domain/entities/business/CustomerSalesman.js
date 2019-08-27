import _ from 'lodash';

export default function () {
    // 实体：供应链客户销售员
    let defaults = {
		"id": "",
		"tenantId": "hfy",
		"itemCode": "",
		"customerNo": "",
		"salesmanId": "",
		"salesmanName": ""

      };

    _.assign(this, defaults);
}
