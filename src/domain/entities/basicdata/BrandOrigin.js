import _ from 'lodash';

export default function () {
    // 实体：物料品牌产地表
    let defaults = {
		"id": "",
		"tenantId": "hfy",
		"brandOriginCode": "",
		"clientNo": "",
		"carrierCode": "",
		"orderType": "",
		"incomingGoodsType": "",
		"brand": "",
		"origin": "",
		"singleNetWeight": "",
		"totalNetWeight": "",
		"totalCustomsNubs": "",
		"customsTimes": "",
		"lastDay": "",
		"remark": ""

      };

    _.assign(this, defaults);
}
