import _ from 'lodash';

export default function () {
    // 实体：委托订单报关信息
    let defaults = {
		"id": "",
		"tenantId": "hfy",
		"itemCode": "",
		"entrustOrderNo": "",
		"businessUnitCode": "",
		"businessUnitName": "",
		"declarationUnitCode": "",
		"declarationUnitName": "",
		"contractNo": "",
		"receiveUnitType": "",
		"receiveUnitCode": "",
		"receiveUnitName": "",
		"importPortCode": "",
		"importPortName": "",
		"sellerType": "",
		"sellerCode": "",
		"sellerName": ""

      };

    _.assign(this, defaults);
}
