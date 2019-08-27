import _ from 'lodash';

export default function () {
    // 实体：上货单计划相关信息 
    let defaults = {
		"id": "",
		"tenantId": "hfy",
		"scheduleReleCode": "",
		"scheduleBaseCode": "",
		"goodsNameSpec": "",
		"packaging1": "",
		"packaging2": "",
		"payerAddress": "",
		"otherPayerAddress": "",
		"consigneeAddress": "",
		"otherConsigneeAddress": "",
		"licenseCode": "",
		"shippingCode": "",
		"plateNoHK": "",
		"driver": "",
		"phoneNo": "",
		"phoneNoHK": "",
		"carrierAddress": "",
		"regulateType": "",
		"carCustomsCode": "",
		"netWeight": "",
		"plateNo": "",
		"boxIdentification": "",
		"trailerWeight": "",
		"grossWeight": ""

      };

    _.assign(this, defaults);
}
