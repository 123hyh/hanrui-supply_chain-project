import _ from 'lodash';

export default function () {
    // 实体：报关单子表-集装箱
    let defaults = {
		"id": "",
		"tenantId": "hfy",
		"itemCode": "",
		"customsFormCode": "",
		"containerCode": "",
		"containerSpecification": "",
		"containerBox": "",
		"containerWeight": "",
		"mixLogo": "",
		"goodsRelation": ""

      };

    _.assign(this, defaults);
}
