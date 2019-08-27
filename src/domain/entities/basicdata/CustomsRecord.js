import _ from 'lodash';

export default function () {
    // 实体：报关单删改记录
    let defaults = {
		"id": "",
		"tenantId": "",
		"customsRecordCode": "",
		"contractNo": "",
		"updateDate": "",
		"customsDate": "",
		"receiveAgent": "",
		"customsNo": "",
		"recordType": "",
		"entrustNo": "",
		"customerName": "",
		"model": "",
		"oldContent": "",
		"updateContent": "",
		"updateReason": "",
		"remark": ""

      };

    _.assign(this, defaults);
}
