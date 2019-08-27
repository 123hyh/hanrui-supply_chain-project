import _ from 'lodash';

export default function () {
    // 实体：待报关入库单
    let defaults = {
		"id": "",
		"tenantId": "hfy",
		"preCustomsCode": "",
		"trusteeCode": "",
		"equalReport": "",
		"godownEntryCode": "",
		"warehouse": "",
		"customsType": "",
		"agency": "",
		"entryPort": ""

      };

    _.assign(this, defaults);
}
