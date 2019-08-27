import _ from 'lodash';

export default function () {
    // 实体：供应链客户联系人
    let defaults = {
		"id": "",
		"tenantId": "hfy",
		"itemCode": "",
		"customerNo": "",
		"contact": "",
		"tel": "",
		"dispatchLine": "",
		"receiveArea": "",
		"areaCode": "",
		"receiveShortName": "",
		"receiveCompany": "",
		"destination": "",
		"duty": "",
		"phone": "",
		"fax": "",
		"email": "",
		"postcode": "",
		"province": "",
		"city": "",
		"county": "",
		"contactAddress": "",
		"remark": "",
		"auditStatus": "",
		"bizType": "",
		"reviewPerson": "",
		"reviewTime": "",
		"review": false,
		"status": ""

      };

    _.assign(this, defaults);
}
