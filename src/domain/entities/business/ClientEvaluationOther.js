import _ from 'lodash';

export default function () {
    // 实体：委托方评估其他信息
    let defaults = {
		"id": "",
		"tenantId": "hfy",
		"itemCode": "",
		"clientEvaluationNo": "",
		"customerShortName": "",
		"businessLicense": "",
		"businessType": false,
		"businessNo": "",
		"network": "",
		"isAcceptance": false,
		"companyArea": "",
		"annualSurveyTime": "",
		"employees": "",
		"contact": "",
		"tel": "",
		"duty": "",
		"fax": "",
		"shareholder": "",
		"legalPerson": "",
		"ranked": "",
		"businessRemark": "",
		"customerExplain": "",
		"ownOffice": false,
		"ownRealEstate": false,
		"ownFactory": false,
		"attachmentCount": "",
		"factoryContact": "",
		"factoryDuty": "",
		"factoryTel": "",
		"factoryPhone": "",
		"factoryFax": "",
		"factoryEmail": "",
		"factoryEmployees": "",
		"factoryArea": "",
		"factoryProduct": "",
		"factoryAddress": ""

      };

    _.assign(this, defaults);
}
