import _ from 'lodash';

export default function () {
    // 实体：运抵国
    let defaults = {
		"id": "",
		"tenantId": "hfy",
		"arrivalCountryCode": "",
		"arrivalCountryName": "",
		"arrivalCountryAbb": "",
		"customsCode": "",
		"description": ""

      };

    _.assign(this, defaults);
}
