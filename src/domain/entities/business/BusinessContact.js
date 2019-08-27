import _ from 'lodash';

export default function () {
    // 实体：商机管理联系人
    let defaults = {
		"id": "",
		"tenantId": "hfy",
		"itemCode": "",
		"businessNo": "",
		"mainContact": false,
		"contact": "",
		"englishName": "",
		"position": "",
		"phoneNo": "",
		"email": "",
		"qq": "",
		"msn": "",
		"tel": "",
		"calendarType": "",
		"birthday": "",
		"faxNo": "",
		"interest": "",
		"assistant": "",
		"nativePlace": "",
		"postcode": "",
		"homePhone": "",
		"address": "",
		"ortherAddress": "",
		"remark": ""

      };

    _.assign(this, defaults);
}
