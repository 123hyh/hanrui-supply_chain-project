import _ from 'lodash';

export default function () {
    // 实体：应付物料信息表
    let defaults = {
		"id": "",
		"tenantId": "hfy",
		"billNo": "",
		"materialModel": "",
		"materialName": "",
		"unit": "",
		"quantity": "",
		"price": "",
		"amount": "",
		"moneyType": "",
		"remark": "",
		"writeOffQuantity": "",
		"writeOffAmount": "",
		"unWriteOffAmount": "",
		"invoicedQuantity": "",
		"invoicedAmount": ""

      };

    _.assign(this, defaults);
}
