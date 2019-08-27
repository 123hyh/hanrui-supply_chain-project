import _ from 'lodash';

export default function () {
    // 实体：部门表
    let defaults = {
		// "id": "",
		// "departmentCode": "",
		"departmentName": "",
		"parentDepartment": "",
		"remark": ""
      };

    _.assign(this, defaults);
}
