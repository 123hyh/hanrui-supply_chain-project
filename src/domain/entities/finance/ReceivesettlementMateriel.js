import _ from 'lodash';

export default function () {
    // 实体：应收结算单子表-物料信息
    let defaults = {
		"id": "",
		"tenantId": "hfy",
		"itemCode": "",
		"billNo": "",
		"materielType": "",
		"materielName": "",
		"measurement": "",
		"quantity": "",
		"unitPrice": "",
		"actualUnitPrice": "",
		"amount": "",
		"tariff": "",
		"currency": "",
		"remark": ""

      };

    _.assign(this, defaults);
}
