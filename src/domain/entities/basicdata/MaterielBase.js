import _ from 'lodash';

export default function () {
    // 实体：物料基础信息
    let defaults = {
		"id": "",
		"tenantId": "",
		"materielCode": "",
		"tradeName": "",
		"materielStatus": "",
		"materielType": "",
		"measurementUnit": "",
		"remenberCode": "",
		"specificationType": "",
		"engineNo": "",
		"trademark": "",
		"barcode": "",
		"approvalNumber": "",
		"monovalent": ""

      };

    _.assign(this, defaults);
}
