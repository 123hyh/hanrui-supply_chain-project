import _ from 'lodash';

export default function () {
    // 实体：协议管理保险事项
    let defaults = {
		"id": "",
		"tenantId": "hfy",
		"itemCode": "",
		"solutionNo": "",
		"startDate": "",
		"endDate": "",
		"insuranceCompany": "",
		"payer": "",
		"responsibleParty": "",
		"remark": ""

      };

    _.assign(this, defaults);
}
