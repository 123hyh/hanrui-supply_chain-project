import _ from 'lodash';

export default function () {
    // 实体：关务清关费用
    let defaults = {
		"id": "",
		"tenantId": "",
		"clearanceFeesCode": "",
		"bankAccount": "",
		"bankName": "",
		"bankGroup": "",
		"institution": "",
		"singleCurrency": false,
		"currency": "",
		"subject": "",
		"applicant": "",
		"phoneNo": "",
		"defaultLiquidator": false,
		"stopLiquidator": false,
		"stopStroke": false,
		"directPayment": false,
		"bankApi": false,
		"accountName": "",
		"budgetNature": "",
		"remark": ""

      };

    _.assign(this, defaults);
}
