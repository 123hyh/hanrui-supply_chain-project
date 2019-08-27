import _ from 'lodash';

export default function () {
    // 实体：仓储报价单子表
    let defaults = {
		"id": "",
		"tenantId": "hfy",
		"billCode": "",
		"itemCode": "",
		"financeProjectName": "",
		"financeProjectCode": "",
		"singlePrice": "",
		"miniConsumption": "",
		"feeUnit": "",
		"settlementCycle": "",
		"useSettlementCycle": false,
		"remark": ""

      };

    _.assign(this, defaults);
}
