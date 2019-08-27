import _ from 'lodash';

export default function () {
    // 实体：委托方政策邮箱通知
    let defaults = {
		"id": "",
		"tenantId": "hfy",
		"itemCode": "",
		"clientNo": "",
		"customerCode": "",
		"customerName": "",
		"email": "",
		"followPersonId": "",
		"followPersonName": "",
		"salesmanId": "",
		"salesmanName": "",
		"status": false

      };

    _.assign(this, defaults);
}
