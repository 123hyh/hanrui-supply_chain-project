import _ from 'lodash';

export default function () {
    // 实体：物料物流信息
    let defaults = {
		"id": "",
		"tenantId": "",
		"materielId": "",
		"materielLogisticsCode": "",
		"lengthUnit": "",
		"length": "",
		"width": "",
		"height": "",
		"weightUnit": "",
		"grossWeight": "",
		"netWeight": "",
		"volumeUnit": "",
		"volume": ""

      };

    _.assign(this, defaults);
}
