import _ from 'lodash';

export default function () {
    // 实体：员工档案
    let defaults = {
		"id": "",
		"tenantId": "",
		"employeeInfoCode": "",
		"employeeInfoName": "",
		"gender": "",
		"idCardNo": "",
		"birthAddress": "",
		"department": "",
		"leader": "",
		"age": "",
		"position": "",
		"contactInfo": "",
		"degree": "",
		"authentication": "",
		"vocational": "",
		"reentryInfo": "",
		"salary": "",
		"socialRelations": "",
		"emergencyContact": "",
		"emergencyContactPhone": "",
		"languageAbility": "",
		"photo": "",
		"technical": "",
		"socialSecurity": "",
		"socialSecurityGrade": ""

      };

    _.assign(this, defaults);
}
