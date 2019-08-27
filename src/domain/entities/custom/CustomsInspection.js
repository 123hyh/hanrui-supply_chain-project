import _ from 'lodash';

export default function () {
    // 实体：报关报检信息
    let defaults = {
		"id": "",
		"tenantId": "hfy",
		"inspectionCode": "",
		"customsFormCode": "",
		"brokerCode": "",
		"verifyCode": "",
		"releaseTime": "",
		"closeDate": "",
		"hasInspection": "",
		"buyingPrice": "",
		"busiTypeCode": "",
		"bizType": "",
		"orderType": "",
		"approvalReceipt": "",
		"iqOffice": "",
		"licenseOffice": "",
		"destinationOffice": "",
		"portOffice": "",
		"inspectionWayCode": "",
		"inspectionWay": "",
		"packageQuantity": "",
		"packageType": ""

      };

    _.assign(this, defaults);
}
