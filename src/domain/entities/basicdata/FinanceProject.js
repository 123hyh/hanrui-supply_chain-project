import _ from 'lodash';

export default function () {
    // 实体：财务计费项目
    let defaults = {
		"id": "",
		"tenantId": "",
		"financeProjectCode": "",
		"financeProjectName": "",
		"description": "",
		"debitSubject": "",
		"creditSubject": "",
		"buildVersion": "",
		"updateVersion": "",
		"taxCodeSix": "",
		"taxCodeEleven": "",
		"taxCodeSeventeen": "",
		"taxClassifyName": "",
		"byname": "",
		"prePolicy": false,
		"prePolicyText": "",
		"outPrice": false,
		"inPrice": false,
		"forbidden": false,
		"remark": ""

      };

    _.assign(this, defaults);
}
