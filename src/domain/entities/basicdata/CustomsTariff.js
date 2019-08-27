import _ from 'lodash';

export default function () {
    // 实体：关务税则
    let defaults = {
		"id": "",
		"tenantId": "",
		"customsTariffCode": "",
		"taxNo": "",
		"attachNo": "",
		"tradeName": "",
		"minTariff": "",
		"maxTariff": "",
		"rebateRate": "",
		"firstUnitCode": "",
		"firstUnitName": "",
		"secondUnitCode": "",
		"secondUnitName": "",
		"transactionUnitCode": "",
		"transactionUnitName": "",
		"valueAddRate": "",
		"superCondition": "",
		"remark": ""

      };

    _.assign(this, defaults);
}
