import _ from 'lodash';

export default function () {
    // 实体：报检用途
    let defaults = {
		"id": "",
		"tenantId": "",
		"inspectionPurposeCode": "",
		"inspectionPurposeName": "",
		"inspectionPurposeAbb": "",
		"customsCode": "",
		"description": ""

      };

    _.assign(this, defaults);
}
