import _ from 'lodash';

export default function () {
    // 实体：管制品表
    let defaults = {
		"id": "",
		"tenantId": "hfy",
		"controlledGoodsCode": "",
		"model": "",
		"controlledGoods": "",
		"brand": "",
		"modelMatching": "",
		"useStatus": "",
		"controlCategory": "",
		"description": ""

      };

    _.assign(this, defaults);
}
