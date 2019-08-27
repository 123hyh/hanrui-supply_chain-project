import _ from 'lodash';

export default function () {
    // 实体：用户表
    let defaults = {
			"id": "",
			"itemCode": "",
			"title": "",
			"publicTime": "",
			"content": "",
			"attachmentsUrl": "",	
    };

    _.assign(this, defaults);
}
