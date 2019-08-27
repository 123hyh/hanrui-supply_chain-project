import _ from 'lodash';

export default function () {
    // 实体：待报列表商品信息
    let defaults = {
		"id": "",
		"tenantId": "hfy",
		"preCustomsCode": "",
		"businessUnit": "",
		"agency": "",
		"serialNumber": "",
		"trusteeCode": "",
		"godownEntryCode": "",
		"goodsName": "",
		"taxNo": "",
		"attachmentNo": ""

      };

    _.assign(this, defaults);
}
